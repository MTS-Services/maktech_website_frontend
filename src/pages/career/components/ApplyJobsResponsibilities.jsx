import { FaPalette, FaFilm, FaUsers, FaCheckCircle } from 'react-icons/fa';

const DEFAULT_RESPONSIBILITIES = [
    {
        icon: <FaPalette className="w-8 h-8 text-orange-bg-cta" />,
        title: "Create & Design",
        description: "Design static, story, and campaign social media assets that engage audiences, reflect brand guidelines, and drive results."
    },
    {
        icon: <FaFilm className="w-8 h-8 text-orange-bg-cta" />,
        title: "Produce & Animate",
        description: "Produce short-form video content and animations for high-engagement platforms and campaign visuals."
    },
    {
        icon: <FaUsers className="w-8 h-8 text-orange-bg-cta" />,
        title: "Collaborate & Execute",
        description: "Work out Marketing, Sales, and Product teams to understand briefs, timelines, and deliverables."
    },
    {
        icon: <FaCheckCircle className="w-8 h-8 text-orange-bg-cta" />,
        title: "Manage & Deliver",
        description: "Manage multiple projects, meet deadlines, and maintain brand consistency across all content pieces delivered."
    }
];

const ICONS = [
    <FaPalette key="1" className="w-8 h-8 text-orange-bg-cta" />,
    <FaFilm key="2" className="w-8 h-8 text-orange-bg-cta" />,
    <FaUsers key="3" className="w-8 h-8 text-orange-bg-cta" />,
    <FaCheckCircle key="4" className="w-8 h-8 text-orange-bg-cta" />
];

const ApplyJobsResponsibilities = ({ job }) => {
    const responsibilities = Array.isArray(job?.responsibilities) && job.responsibilities.length > 0
        ? job.responsibilities.map((r, idx) => ({
            icon: ICONS[idx % ICONS.length],
            title: r.title,
            description: r.description
        }))
        : DEFAULT_RESPONSIBILITIES;

    return (
        <section className="px-5 py-16 xl:px-0 xl:py-24">
            <div className="mx-auto max-w-[1200px] flex flex-col gap-8 md:gap-10 xl:flex-row xl:gap-16">
                {/* Header */}
                <div className="mb-0 xl:mb-12 shrink-0">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-[#DAB8AC] mt-1">
                            <div className="h-[8px] w-[8px] rounded-full bg-gradient-to-br from-[#FFBEA9] to-[#FA6332] shadow-[2.25px_3.37px_4.5px_rgba(68,18,0,0.36)]"></div>
                        </div>
                        <h2 className="text-2xl xl:text-3xl text-white font-semibold">Key Responsibilities</h2>
                    </div>
                </div>

                {/* Responsibilities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                    {responsibilities.map((resp, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-xl border border-white/10 bg-[#282828] hover:border-white/20 transition-all duration-300"
                        >
                            <div className="flex-shrink-0 mb-3">
                                {resp.icon}
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {resp.title}
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        {resp.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ApplyJobsResponsibilities;
