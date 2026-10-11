import { useState } from "react";
import { NavLink } from "react-router-dom";

const normalizeImageUrl = (url) => {
    if (!url || typeof url !== 'string') return null;
    if (url.includes('localhost:3000')) {
        return null; // Fallback to premium placeholder if dummy localhost
    }
    if (url.startsWith('http://www.api.maktechgroup.com')) {
        return url.replace('http://www.api.maktechgroup.com', 'https://www.api.maktechgroup.com');
    }
    return url;
};

const DEFAULT_COVER = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

const ApplyJobsHero = ({ job }) => {
    const [imgSrc, setImgSrc] = useState(normalizeImageUrl(job?.coverImage) || DEFAULT_COVER);

    const title = job?.title || "Social Media Designer";
    const vacancy = job?.vacancy ?? 2;
    const description = job?.description || "We are looking for a creative social media designer who is able to design social media contents for growing our social media profiles.";
    const department = job?.department;
    const salary = job?.salary;

    return (
        <div className="w-full">
            {/* Existing Hero Section */}
            <div className='relative flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh] px-5 pt-28 pb-12 text-center'>
                {/* Breadcrumb */}
                <div className='mb-10 relative z-10'>
                    <nav aria-label='Breadcrumb'>
                        <ol className='inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-black/20 text-xs md:text-sm text-white/60 backdrop-blur-sm'>
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
                                    {title}
                                </span>
                            </li>
                        </ol>
                    </nav>
                </div>

                {/* Heading */}
                <h1
                    id='about-heading'
                    className='relative z-10 text-white font-bold leading-tight tracking-tight text-[clamp(1.75rem,5vw,3.75rem)] max-w-5xl mb-6'
                >
                    Be a member of MAKTECH
                </h1>

                {/* Description */}
                <p className='relative z-10 text-white/70 text-base xl:text-lg max-w-2xl leading-relaxed mb-10'>
                    We’re a digital-first team helping businesses build meaningful products through strategy, design, and technology.
                </p>
            </div>

            {/* Job Details Section */}
            <section className="container mx-auto px-5 pb-16 max-w-[1200px]">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center bg-[#252525]/60 border border-white/10 rounded-2xl p-6 sm:p-8 lg:p-10 backdrop-blur-md shadow-2xl">

                    {/* Left: Image */}
                    <div className="w-full h-[280px] sm:h-[340px] rounded-xl overflow-hidden border border-white/10 bg-[#1e1e1e]">
                        <img
                            src={imgSrc}
                            alt={`${title} cover`}
                            onError={() => setImgSrc(DEFAULT_COVER)}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Right: Content */}
                    <div className="flex flex-col items-start gap-5 lg:pr-6">

                        {/* Badges container */}
                        <div className="flex flex-wrap items-center gap-3">
                            {/* Vacancy Badge */}
                            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-lg bg-gradient-to-br from-[#FF6533]/30 to-[#1C1C1C] border border-white/30">
                                <div className="h-[8px] w-[8px] rounded-full bg-gradient-to-br from-[#FFBEA9] to-[#FA6332] shadow-[2.25px_3.37px_4.5px_rgba(68,18,0,0.36)]"></div>
                                <span className="text-white text-xs sm:text-sm font-medium">
                                    Vacancy: {vacancy}
                                </span>
                            </div>

                            {department && (
                                <span className="px-3 py-1 rounded-lg bg-white/10 text-white/80 text-xs sm:text-sm font-medium border border-white/10">
                                    {department}
                                </span>
                            )}

                            {salary && (
                                <span className="px-3 py-1 rounded-lg bg-[#FF6533]/20 text-[#FF6533] text-xs sm:text-sm font-semibold border border-[#FF6533]/30">
                                    {salary}
                                </span>
                            )}
                        </div>

                        {/* Title */}
                        <h2 className="text-3xl sm:text-4xl font-semibold tracking-wide text-white leading-tight">
                            {title}
                        </h2>

                        {/* Description */}
                        <p className="text-[#DBDBDB] text-base sm:text-lg leading-relaxed whitespace-pre-line">
                            {description}
                        </p>
                    </div>

                </div>
            </section>
        </div>
    );
};

export default ApplyJobsHero;