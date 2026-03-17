import Breadcrumb from "../../../components/Breadcrumb";

const ApplyJobsHero = () => {
    return (
        <div className="w-full">
            {/* Existing Hero Section */}
            <div className='relative flex flex-col items-center justify-center min-h-[60vh] px-5 pt-28 pb-16 text-center'>
                {/* Breadcrumb */}
                <div className='mb-10 relative z-10'>
                    <Breadcrumb label='Career' />
                </div>

                {/* Heading */}
                <h1
                    id='about-heading'
                    className='relative z-10 text-white font-bold leading-tight tracking-tight text-[clamp(1.75rem,5vw,4rem)] max-w-5xl mb-6'
                >
                    Be a member of MAKTECH
                </h1>

                {/* Description */}
                <p className='relative z-10 text-white/60 text-base xl:text-lg max-w-2xl leading-relaxed mb-10'>
                    We’re a digital-first team helping businesses build meaningful products through strategy, design, and technology.
                </p>
            </div>

            {/* New Job Details Section (Based on Image) */}
            <section className="container mx-auto px-5 pb-16 max-w-[1200px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    
                    {/* Left: Image */}
                    <div className="w-full h-[300px]  overflow-hidden border border-white/5">
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" 
                            alt="Social Media Designer working" 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="flex flex-col items-start gap-6 lg:pr-10">
                        
                        {/* Vacancy Badge */}
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-[#36231C] border border-white/5">
                            {/* Orange Dot with slight glow */}
                            <div className="relative flex items-center justify-center w-3 h-3">
                                <span className="absolute inline-flex w-full h-full rounded-full bg-[#F55D2C] opacity-40 blur-[2px]"></span>
                                <span className="relative inline-flex rounded-full w-2.5 h-2.5 bg-gradient-to-br from-[#ff855c] to-[#F55D2C]"></span>
                            </div>
                            <span className="text-[#E3E3E3] text-sm md:text-base font-normal">
                                Vacancy: 2
                            </span>
                        </div>

                        {/* Title (White and Gray combination) */}
                        <h2 className="text-4xl  font-medium tracking-wide">
                            <span className="text-white">Social Media Designer </span>
                            
                        </h2>

                        {/* Description */}
                        <p className="text-white text-lg  leading-relaxed">
                            We are looking for a creative social media designer who is able to design social media contents for growing our social media profiles.
                        </p>
                    </div>
                    
                </div>
            </section>
        </div>
    );
};

export default ApplyJobsHero;