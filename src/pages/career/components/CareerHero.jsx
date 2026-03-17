import Breadcrumb from "../../../components/Breadcrumb";
import { NavLink } from "react-router-dom";

const CareerHero = () => {
    return (
        <div className='relative flex flex-col items-center justify-center h-screen px-5 pt-28 pb-16 text-center'>
            {/* Breadcrumb */}
            <div className='mb-10 relative z-10'>
                <Breadcrumb label='Career' />
            </div>

            {/* Heading */}
            <h1
                id='about-heading'
                className='relative z-10 text-white font-bold leading-tight tracking-tight text-[clamp(1.75rem,5vw,4rem)] max-w-5xl mb-6'
            >

                Build What Matters.

                <span className='relative inline-block'>
                    Grow Where It Counts.

                </span>
            </h1>

            {/* Description */}
            <p className='relative z-10 text-white/60 text-base xl:text-lg max-w-2xl leading-relaxed mb-10'>
                Join a team of 180+ professionals where your work shapes real products,
                real businesses, and a real career path.
            </p>

            {/* CTA */}
            <NavLink
                to='/apply-jobs'
                className='relative z-10 group inline-flex items-center gap-3 overflow-hidden bg-orange-bg-cta hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.45)] text-white font-semibold rounded-full transition-all duration-200 active:scale-[0.97] no-underline'
                style={{ padding: '13px 28px' }}
            >
                <span className='inline-block -translate-x-0.5 transition-transform duration-300 ease-out delay-75 group-hover:translate-x-0'>
                    Explore Open Roles
                </span>
                <span
                    className='w-7 h-7 flex items-center justify-center rounded-full bg-white shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
                    aria-hidden='true'
                >
                    <svg
                        width='14'
                        height='14'
                        viewBox='0 0 16 16'
                        fill='none'
                        stroke='black'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        aria-hidden='true'
                    >
                        <path d='M3 8h10M9 4l4 4-4 4' />
                    </svg>
                </span>
            </NavLink>
        </div>
    );
};

export default CareerHero;
