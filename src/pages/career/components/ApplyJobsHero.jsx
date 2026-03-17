import { NavLink } from "react-router-dom";

const ApplyJobsHero = () => {
    return (
        <div className="w-full">
            {/* Existing Hero Section */}
            <div className='relative flex flex-col items-center justify-center min-h-[60vh] px-5 pt-28 pb-16 text-center'>
                {/* Breadcrumb */}
                <div className='mb-10 relative z-10'>
                    <nav aria-label='Breadcrumb'>
                        <ol className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/20 text-xs md:text-sm text-white/60'>
                            <li>
                                <NavLink to='/' className='hover:text-white transition-colors duration-150'>
                                    Home
                                </NavLink>
                            </li>
                            <li aria-hidden='true' className='text-white/35'>
                                <svg width='12' height='12' viewBox='0 0 12 12' fill='none' aria-hidden='true'>
                                    <path
                                        d='M4.5 2.5L7.5 6L4.5 9.5'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </li>
                            <li>
                                <NavLink to='/career' className='hover:text-white transition-colors duration-150'>
                                    Career
                                </NavLink>
                            </li>
                            <li aria-hidden='true' className='text-white/35'>
                                <svg width='12' height='12' viewBox='0 0 12 12' fill='none' aria-hidden='true'>
                                    <path
                                        d='M4.5 2.5L7.5 6L4.5 9.5'
                                        stroke='currentColor'
                                        strokeWidth='1.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </li>
                            <li>
                                <span aria-current='page' className='text-white font-medium'>
                                    Apply for job
                                </span>
                            </li>
                        </ol>
                    </nav>
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
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-lg bg-gradient-to-br from-[#FF6533]/30 to-[#1C1C1C] border border-white/80">

                            <div className="h-[10px] w-[10px] rounded-full bg-gradient-to-br from-[#FFBEA9] to-[#FA6332] shadow-[2.25px_3.37px_4.5px_rgba(68,18,0,0.36)]"></div>

                            <span className="text-white text-sm md:text-base font-normal">
                                Vacancy: 2
                            </span>
                        </div>

                        {/* Title (White and Gray combination) */}
                        <h2 className="text-4xl  font-medium tracking-wide">
                            <span className="text-white">Social Media Designer </span>

                        </h2>

                        {/* Description */}
                        <p className="text-[#DBDBDB] text-lg  leading-relaxed">
                            We are looking for a creative social media designer who is able to design social media contents for growing our social media profiles.
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default ApplyJobsHero;