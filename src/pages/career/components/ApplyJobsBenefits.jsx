import { FaDollarSign, FaBook, FaBuilding, FaHeartbeat } from 'react-icons/fa';

const ApplyJobsBenefits = () => {
    const benefits = [
        {
            icon: <FaDollarSign className="w-8 h-8 text-orange-bg-cta" />,
            title: "Competitive Salary",
            description: "Competitive salary package for the role that reflects your skills, experience, and the value you bring to the company."
        },
        {
            icon: <FaBook className="w-8 h-8 text-orange-bg-cta" />,
            title: "Growth & Learning",
            description: "Budget for courses, certifications, and continuous learning opportunities to grow professionally with the company."
        },
        {
            icon: <FaBuilding className="w-8 h-8 text-orange-bg-cta" />,
            title: "Structured Work Environment",
            description: "Flexible and clear processes, defined workflows, and transparent hierarchies to support your individual growth."
        },
        {
            icon: <FaHeartbeat className="w-8 h-8 text-orange-bg-cta" />,
            title: "Health & Wellbeing",
            description: "Comprehensive health coverage for you and your dependents with superior benefits along with wellness programs."
        }
    ];

    return (
        <section className="px-5 py-16 xl:px-0 xl:py-24 ">
            <div className="mx-auto max-w-[1200px] flex flex-col gap-8 md:gap-10 xl:flex-row xl:gap-12">
                {/* Header */}
                <div className="mb-0 xl:mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-lg bg-[#DAB8AC] mt-1">
                            <div className="h-[8px] w-[8px] rounded-full bg-gradient-to-br from-[#FFBEA9] to-[#FA6332] shadow-[2.25px_3.37px_4.5px_rgba(68,18,0,0.36)]"></div>
                        </div>
                        <h2 className="text-2xl xl:text-3xl font-semibold">Employee Benefits</h2>
                    </div>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {benefits.map((benefit, idx) => (
                        <div
                            key={idx}
                            className="p-6 rounded-lg border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] max-w-sm"
                        >
                            <div className="shrink-0 mb-2">
                                {benefit.icon}
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-white mb-2">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        {benefit.description}
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

export default ApplyJobsBenefits;
