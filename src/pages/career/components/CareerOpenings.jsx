




import { NavLink } from "react-router-dom";

const CareerOpenings = () => {

    const positions = [
        {
            id: 1,
            title: "Website UI/UX designer",
            department: "Crafts engaging, user-friendly\nwebsites.",
            vacancy: "02",
            skills: ["Landing Page", "UI/UX", "SAS", "Prototype", "Prototype"],
            link: "/contact",
        },
        {
            id: 2,
            title: "MERN Developer",
            department: "Crafts engaging, user-friendly\nwebsites.",
            vacancy: "02",
            skills: ["Landing Page", "UI/UX", "SAS", "Prototype", "Design System", "Sketch"],
            link: "/contact",
        },
        {
            id: 3,
            title: "Laravel Developer",
            department: "Crafts engaging, user-friendly\nwebsites.",
            vacancy: "02",
            skills: ["Landing Page", "UI/UX", "SAS", "Prototype", "Design System", "+5 more"],
            link: "/contact",
        },
        {
            id: 4,
            title: "Graphic Designer",
            department: "Crafts engaging, user-friendly\nwebsites.",
            vacancy: "02",
            skills: ["Landing Page", "UI/UX", "SAS", "Prototype", "Design System", "Sketch"],
            link: "/contact",
        },
        {
            id: 5,
            title: "Optimized for budget",
            department: "Crafts engaging, user-friendly\nwebsites.",
            vacancy: "02",
            skills: ["Landing Page", "UI/UX", "SAS", "Prototype", "Design System", "Sketch"],
            link: "/contact",
        },
        {
            id: 6,
            title: "Optimized for budget",
            department: "Crafts engaging, user-friendly\nwebsites.",
            vacancy: "02",
            skills: ["Landing Page", "UI/UX", "SAS", "Prototype", "Design System", "Sketch"],
            link: "/contact",
        },
    ];

    return (
        <section className=" py-16 lg:py-20">
            <div className="max-w-7xl mx-auto   flex flex-col gap-20">

                {/* Header Section */}
                <div className="relative flex flex-col items-center gap-8 text-center z-10">


                    {/* Opening Badge */}
                    <div className="px-4 py-2 bg-black/10 border border-white/20 rounded-full  inline-flex items-center justify-center">
                        <span className="text-white text-lg font-normal">
                            Opening
                        </span>
                    </div>

                    {/* Main Title */}
                    <h2 className="text-white text-4xl md:text-5xl font-medium leading-tight md:leading-[83.20px]">
                        Grow Infinitely! With us.
                    </h2>
                </div>

                {/* Job Cards Grid */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 px-4 md-px-0">
                    {positions.map((position) => (
                        <div
                            key={position.id}
                            className="flex flex-col justify-between p-6 bg-[#373737]"
                        >
                            <div className="flex flex-col gap-6">
                                {/* Job Title & Details */}
                                <div className="flex flex-col items-start gap-1">
                                    <h3 className="text-[#E3E3E3] text-2xl font-medium leading-tight mb-1">
                                        {position.title}
                                    </h3>
                                    <div className="flex flex-col items-start gap-2 mt-2">
                                        <p className="text-white text-base font-normal whitespace-pre-line">
                                            {position.department}
                                        </p>
                                        <p className="text-white text-base ">
                                            Vacancy: {position.vacancy}
                                        </p>
                                    </div>
                                </div>

                                {/* Skills Tags */}
                                <div className="flex flex-wrap gap-[10px] items-start content-start">
                                    {position.skills.map((skill, idx) => (
                                        <div
                                            key={idx}
                                            className={`px-[10px] py-2 flex items-center justify-center transition-colors ${skill === "+5 more" ? "bg-[#535353]" : "bg-[#2A2A2A]"
                                                }`}
                                        >
                                            <span className="text-white text-base font-normal">
                                                {skill}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Apply Button */}
                            <div className="flex justify-between items-center mt-8 pt-6  border-t-3 border-white/10">
                                <span className="text-white text-base font-semibold">
                                    Apply
                                </span>
                                <NavLink
                                    to='/apply-jobs'
                                    className="w-10 h-10 p-2 bg-[#F55D2C] rounded flex items-center justify-center"
                                    aria-label={`Apply for ${position.title}`}
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="2"
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
            </div>
        </section>
    );
};

export default CareerOpenings;