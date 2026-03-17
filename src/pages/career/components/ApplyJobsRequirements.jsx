const ApplyJobsRequirements = () => {
    const requirements = [
        {
            title: "Proven Social Media Design Experience",
            description: "A portfolio showing range across Instagram, LinkedIn, Facebook — static posts, stories, and campaign visuals."
        },
        {
            title: "Brand Consistency & Visual Hierarchy",
            description: "Ability to maintain a cohesive brand identity while designing content that stops the scroll."
        },
        {
            title: "Motion Graphics & Reels Design",
            description: "Experience creating short-form video content and animated posts for high-engagement platforms."
        },
        {
            title: "Cross-Team Collaboration",
            description: "Comfortable working alongside content, marketing, and product teams to deliver on time."
        }
    ];

    return (
        <section className="relative overflow-hidden bg-white px-5 py-16">
            
            {/* Background Blur Gradients (Figma Code Implementation) */}
            <div className="absolute -left-[200px] md:-left-[400px] top-[10%] h-[450px] w-[800px] md:w-[600px] -rotate-[37deg] rounded-full bg-[#FF6533]/20 blur-[120px] md:blur-[188px] pointer-events-none"></div>
            <div className="absolute -right-[200px] md:-right-[400px] bottom-[10%] h-[450px] w-[800px] md:md:w-[600px]  -rotate-[37deg] rounded-full bg-[#FF6533]/20 blur-[120px] md:blur-[188px] pointer-events-none"></div>

            <div className="relative z-10 mx-auto max-w-[1200px] flex flex-col lg:flex-row gap-12 lg:gap-20">
                
                {/* Left side: Section Title & Icon */}
                <div className="flex w-full lg:w-[280px] items-start gap-4 shrink-0">
                    {/* Custom Icon from Figma */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#DAB8AC] mt-1">
                        <div className="h-[16px] w-[16px] rounded-full bg-gradient-to-br from-[#FFBEA9] to-[#FA6332] shadow-[2.25px_3.37px_4.5px_rgba(68,18,0,0.36)]"></div>
                    </div>
                    <h2 className="text-[24px] font-normal text-[#383838] leading-tight">
                        Job Requirements
                    </h2>
                </div>

                {/* Right side: Content */}
                <div className="flex flex-col gap-12 lg:gap-16 flex-1">
                    
                    {/* Main Description */}
                    <h3 className="text-2xl font-medium leading-[1.3] text-[#383838]">
                        Proficiency in Figma, Adobe Photoshop, and Illustrator Strong command of industry-standard design tools for creating polished, on-brand visuals.
                    </h3>

                    {/* Requirements Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
                        {requirements.map((req, idx) => (
                            <div key={idx} className="flex flex-col gap-1">
                                <h4 className="text-[20px] font-normal text-[#383838]">
                                    {req.title}
                                </h4>
                                <p className="text-[20px]  font-normal text-[#383838] leading-[1.3]">
                                    {req.description}
                                </p>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </section>
    );
};

export default ApplyJobsRequirements;