import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import apiClient from "../../../services/apiClient";

const FALLBACK_POSITIONS = [
    {
        id: 1,
        title: "Website UI/UX designer",
        department: "Crafts engaging, user-friendly\nwebsites.",
        vacancy: "02",
        skills: ["Landing Page", "UI/UX", "SAS", "Prototype"],
        link: "/apply-jobs",
    },
    {
        id: 2,
        title: "MERN Developer",
        department: "Crafts engaging, user-friendly\nwebsites.",
        vacancy: "02",
        skills: ["Landing Page", "UI/UX", "SAS", "Prototype", "Design System"],
        link: "/apply-jobs",
    },
    {
        id: 3,
        title: "Laravel Developer",
        department: "Crafts engaging, user-friendly\nwebsites.",
        vacancy: "02",
        skills: ["Landing Page", "UI/UX", "SAS", "Prototype", "Design System"],
        link: "/apply-jobs",
    },
    {
        id: 4,
        title: "Graphic Designer",
        department: "Crafts engaging, user-friendly\nwebsites.",
        vacancy: "02",
        skills: ["Landing Page", "UI/UX", "SAS", "Prototype", "Design System"],
        link: "/apply-jobs",
    },
    {
        id: 5,
        title: "Digital Marketer",
        department: "Crafts engaging, user-friendly\nwebsites.",
        vacancy: "02",
        skills: ["Landing Page", "SEO", "Content", "Campaign", "Design System"],
        link: "/apply-jobs",
    },
    {
        id: 6,
        title: "Optimized for budget",
        department: "Crafts engaging, user-friendly\nwebsites.",
        vacancy: "02",
        skills: ["Landing Page", "UI/UX", "SAS", "Prototype", "Design System"],
        link: "/apply-jobs",
    },
];

const CareerOpenings = () => {
    const [positions, setPositions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isCancelled = false;

        const fetchJobs = async () => {
            try {
                const res = await apiClient.get('/api/v1/jobs?page=1&limit=50&searchTerm=');
                if (!isCancelled && res.data?.success && Array.isArray(res.data.data)) {
                    // Strictly filter active jobs only (isActive === true)
                    const activeJobs = res.data.data.filter((j) => j.isActive === true);

                    const mapped = activeJobs.map((job) => {
                        let skills = [];
                        if (Array.isArray(job.skills) && job.skills.length > 0) {
                            skills = job.skills;
                        } else if (typeof job.skills === 'string' && job.skills.trim()) {
                            skills = job.skills.split(',').map(s => s.trim()).filter(Boolean);
                        } else {
                            const tags = [];
                            if (job.department) tags.push(job.department);
                            if (job.jobTypes?.[0]?.title) tags.push(job.jobTypes[0].title);
                            if (job.salary && job.salary.toLowerCase() !== 'negotiable') {
                                tags.push(job.salary);
                            }
                            skills = tags.length > 0 ? tags : ["Full-time", "Design System", "Remote"];
                        }

                        return {
                            id: job.id,
                            title: job.title,
                            department: job.description || job.department || "Crafts engaging, user-friendly\nwebsites.",
                            vacancy: job.vacancy ? String(job.vacancy).padStart(2, '0') : "01",
                            skills,
                            link: `/apply-jobs?id=${job.id}`,
                            rawJob: job,
                        };
                    });

                    setPositions(mapped);
                } else if (!isCancelled) {
                    setPositions([]);
                }
            } catch (err) {
                console.warn('Failed to load jobs from API:', err);
                if (!isCancelled) {
                    setPositions([]);
                }
            } finally {
                if (!isCancelled) {
                    setLoading(false);
                }
            }
        };

        fetchJobs();

        return () => {
            isCancelled = true;
        };
    }, []);

    return (
        <section id="career-openings" className="py-16 lg:py-20">
            <div className="max-w-360 mx-auto flex flex-col gap-16 sm:gap-20">

                {/* Header Section */}
                <div className="relative flex flex-col items-center gap-6 sm:gap-8 text-center z-10">
                    {/* Opening Badge */}
                    <div className="px-4 py-2 bg-black/10 border border-white/20 rounded-full inline-flex items-center justify-center">
                        <span className="text-white text-base sm:text-lg font-normal">
                            Opening
                        </span>
                    </div>

                    {/* Main Title */}
                    <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-medium leading-tight md:leading-[83.20px]">
                        Grow Infinitely! With us.
                    </h2>
                </div>

                {/* Job Cards Grid or Loading / Empty State */}
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="w-10 h-10 border-4 border-[#FF6533] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : positions.length === 0 ? (
                    <div className="text-center py-16 px-6 bg-[#2A2A2A]/70 border border-white/10 rounded-2xl max-w-xl mx-auto shadow-2xl backdrop-blur-md">
                        <div className="w-14 h-14 rounded-full bg-[#FF6533]/20 text-[#FF6533] flex items-center justify-center mx-auto mb-4">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                            </svg>
                        </div>
                        <h3 className="text-white text-xl sm:text-2xl font-semibold mb-2">No Open Positions Currently</h3>
                        <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
                            All our current roles are currently paused or filled. Check back soon for new career openings!
                        </p>
                        <NavLink
                            to="/contact"
                            className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#FF6533] hover:bg-[#e5501a] text-white text-sm font-semibold transition-colors"
                        >
                            Get in Touch
                        </NavLink>
                    </div>
                ) : (
                    <div className="relative grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-4 md:px-0">
                        {positions.map((position) => (
                            <div
                                key={position.id}
                                className="flex flex-col justify-between p-6 bg-[#373737] rounded-xl hover:bg-[#3d3d3d] transition-all duration-300 border border-white/5 hover:border-white/10 group shadow-lg"
                            >
                                <div className="flex flex-col gap-6">
                                    {/* Job Title & Details */}
                                    <div className="flex flex-col items-start gap-1">
                                        <NavLink
                                            to={position.link}
                                            state={{ job: position.rawJob }}
                                            className="text-[#E3E3E3] group-hover:text-white text-2xl font-medium leading-tight mb-1 transition-colors"
                                        >
                                            {position.title}
                                        </NavLink>
                                        <div className="flex flex-col items-start gap-2 mt-2">
                                            <p className="text-white/80 text-base font-normal whitespace-pre-line line-clamp-2">
                                                {position.department}
                                            </p>
                                            <p className="text-[#FF6533] text-sm font-medium">
                                                Vacancy: {position.vacancy}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-[10px] items-start content-start">
                                        {position.skills.map((skill, idx) => (
                                            <div
                                                key={idx}
                                                className={`px-[10px] py-1.5 rounded flex items-center justify-center transition-colors ${
                                                    skill === "+5 more" ? "bg-[#535353]" : "bg-[#2A2A2A]"
                                                }`}
                                            >
                                                <span className="text-white/90 text-sm font-normal">
                                                    {skill}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                                    <span className="text-white text-base font-semibold">
                                        Apply
                                    </span>
                                    <NavLink
                                        to={position.link}
                                        state={{ job: position.rawJob }}
                                        className="w-10 h-10 p-2 bg-[#F55D2C] hover:bg-[#e5501a] rounded-lg flex items-center justify-center transition-all duration-200 group-hover:scale-105 active:scale-95 shadow-md"
                                        aria-label={`Apply for ${position.title}`}
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default CareerOpenings;