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
                    // No targetId provided: fetch first available job from API
                    try {
                        const listRes = await apiClient.get('/api/v1/jobs?limit=1');
                        const items = listRes.data?.data;
                        if (!isCancelled && Array.isArray(items) && items.length > 0) {
                            setJob(items[0]);
                            return;
                        }
                    } catch (err) {
                        console.warn('Default job fetch failed:', err);
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
