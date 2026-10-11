import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import apiClient from "../../services/apiClient";
import ApplyJobsHero from "./components/ApplyJobsHero";
import ApplyJobsRequirements from "./components/ApplyJobsRequirements";
import ApplyJobsResponsibilities from "./components/ApplyJobsResponsibilities";
import ApplyJobsBenefits from "./components/ApplyJobsBenefits";
import ApplyContact from "./components/ApplyContact";

const ApplyJobs = () => {
    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryId = queryParams.get('id');
    const targetId = id || queryId;

    const [job, setJob] = useState(location.state?.job || null);
    const [loading, setLoading] = useState(!location.state?.job && !!targetId);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [targetId]);

    useEffect(() => {
        let isCancelled = false;

        if (location.state?.job) {
            setJob(location.state.job);
            setLoading(false);
            return;
        }

        const fetchJob = async () => {
            setLoading(true);
            try {
                if (targetId) {
                    // 1. Try directly fetching the job by targetId
                    try {
                        const res = await apiClient.get(`/api/v1/jobs/${encodeURIComponent(targetId)}`);
                        if (!isCancelled && res.data?.success && res.data.data) {
                            setJob(res.data.data);
                            return;
                        }
                    } catch (err) {
                        console.warn('Direct fetch job by ID failed:', err);
                    }

                    // 2. Fallback: Search in jobs list
                    try {
                        const listRes = await apiClient.get('/api/v1/jobs?limit=100');
                        const items = listRes.data?.data;
                        if (Array.isArray(items)) {
                            const found = items.find(item => item.id === targetId);
                            if (!isCancelled && found) {
                                setJob(found);
                                return;
                            }
                        }
                    } catch (listErr) {
                        console.error('Jobs list fallback failed:', listErr);
                    }
                } else {
                    // No targetId provided: fetch first available ACTIVE job from API
                    try {
                        const listRes = await apiClient.get('/api/v1/jobs?limit=50');
                        const items = listRes.data?.data;
                        if (!isCancelled && Array.isArray(items)) {
                            const activeFirst = items.find(item => item.isActive === true);
                            if (activeFirst) {
                                setJob(activeFirst);
                                return;
                            }
                        }
                    } catch (err) {
                        console.warn('Default active job fetch failed:', err);
                    }
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchJob();

        return () => {
            isCancelled = true;
        };
    }, [targetId, location.state?.job]);

    useEffect(() => {
        if (job?.title) {
            document.title = `${job.title} – Career at Maktech`;
        } else {
            document.title = 'Apply for Job – Maktech';
        }
    }, [job]);

    if (loading) {
        return (
            <main className="min-h-[70vh] flex items-center justify-center">
                <div className="w-9 h-9 border-2 border-orange-bg-cta border-t-transparent rounded-full animate-spin"></div>
            </main>
        );
    }

    if (!job) {
        return (
            <main className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
                <div className="w-14 h-14 rounded-full bg-[#FF6533]/20 text-[#FF6533] flex items-center justify-center mx-auto mb-4">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                </div>
                <h2 className="text-white text-2xl font-semibold mb-2">No Open Position Found</h2>
                <p className="text-white/70 text-base mb-6 max-w-md">
                    The requested position is currently unavailable or inactive.
                </p>
                <a
                    href="/career"
                    className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#FF6533] hover:bg-[#e5501a] text-white text-sm font-semibold transition-colors"
                >
                    View All Careers
                </a>
            </main>
        );
    }

    return (
        <main
            id='about'
            aria-labelledby='about-heading'
            className='relative w-full overflow-hidden'
        >
            <ApplyJobsHero job={job} />
            <ApplyJobsRequirements job={job} />
            <ApplyJobsResponsibilities job={job} />
            <ApplyJobsBenefits job={job} />
            <ApplyContact job={job} />
        </main>
    );
};

export default ApplyJobs;
