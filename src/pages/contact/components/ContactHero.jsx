import { NavLink } from "react-router-dom";

const ContactHero = () => {
    return (
        <div className='relative flex flex-col items-center justify-center h-screen  px-5 pt-28 pb-2 md:pb-16 text-center'>
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
                            <span aria-current='page' className='text-white font-medium'>
                                Contact
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

                Designing

                <span className='relative inline-block'>
                    Experiences That DriveGrowth

                </span>
            </h1>

            {/* Description */}
            <p className='relative z-10 text-white/60 text-base xl:text-lg max-w-2xl leading-relaxed mb-10'>
                We’re a digital-first team helping businesses build meaningful
                products through strategy, design, and technology.
            </p>
        </div>
    );
};

export default ContactHero;
