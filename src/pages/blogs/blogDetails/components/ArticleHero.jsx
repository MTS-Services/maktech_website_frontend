import {
  FaClock,
  FaChartBar,
  FaFacebook,
  FaTwitter,
  FaShare,
  FaArrowRight,
} from "react-icons/fa";
import Breadcrumb from "../../../../components/Breadcrumb";

const ArticleHero = () => {
  return (
    <div className='relative flex flex-col items-center justify-center h-screen px-5 pt-28 pb-16 text-center'>
      {/* Breadcrumb */}
      <div className='mb-10 relative z-10'>
        <Breadcrumb
          crumbs={[
            { label: 'Blogs', href: '/blogs' },
            { label: 'Blog Details' },
          ]}
        />
      </div>

      {/* Heading */}
      <h1
        id='about-heading'
        className='relative z-10 text-white font-bold leading-tight tracking-tight text-[clamp(1.75rem,5vw,4rem)] max-w-5xl mb-6'
      >

        How the system of Web Development works

      </h1>

      {/* Description */}
      <p className='relative z-10 text-white/60 text-base xl:text-lg max-w-2xl leading-relaxed mb-10'>
        <div className="flex flex-wrap items-center justify-center gap-y-4 text-[#FFFFFF] text-sm md:text-base font-medium">
          <span className="flex items-center">
            by <span className="text-white ml-1">Emma Rose</span>
          </span>

          <span className="mx-3 hidden md:inline">—</span>

          <div className="flex items-center gap-2">
            <FaClock size={16} />
            <span>2 minute read</span>
          </div>

          <span className="mx-3 hidden md:inline">—</span>

          <div className="flex items-center gap-2">
            <FaChartBar size={16} />
            <span>1.6K views</span>
          </div>

          <span className="mx-3 hidden md:inline">—</span>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <button className="hover:text-white transition-colors">
              <FaFacebook size={18} fill="currentColor" />
            </button>
            <button className="hover:text-white transition-colors">
              <FaTwitter size={18} fill="currentColor" />
            </button>
            <button className="hover:text-white transition-colors">
              <span className="flex items-center gap-1">
                <FaShare size={18} fill="currentColor" />
                <span className="text-xs">1.2K shares</span>
              </span>
            </button>
          </div>
        </div>
      </p>

      {/* CTA */}
      <button

        className='relative z-10 group inline-flex items-center gap-3 overflow-hidden bg-orange-bg-cta hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.45)] text-white font-semibold rounded-full transition-all duration-200 active:scale-[0.97] border-0 cursor-pointer'
        style={{ padding: '13px 28px' }}
      >
        <span className='inline-block -translate-x-0.5 transition-transform duration-300 ease-out delay-75 group-hover:translate-x-0'>
          Contact With US
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
      </button>
    </div>
  );
};

export default ArticleHero;
