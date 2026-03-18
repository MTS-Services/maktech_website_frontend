import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BlogHeroCard = () => {
  return (
    <section className="flex items-center justify-center p-6 py-24 min-h-[500px]">
      <div className=" w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">

        {/* Left Side: Image Container */}
        <div className="relative group overflow-hidden rounded-lg shadow-2xl">
          <img
            src="/Rectangle.png"
            alt="Developer working on web system"
            className="w-full h-auto object-cover "
          />
        </div>

        {/* Right Side: Content */}
        <div className="flex flex-col space-y-6">

          {/* Category Badge */}

          <div className="my-6 inline-flex self-start items-center gap-2 rounded-lg border border-white/25 bg-gradient-to-r from-[#FF6533]/30 to-[#1C1C1C] px-2 py-1.5 pr-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-[8px] bg-[#623A2C] p-[5.33px]">
              <div className="h-3 w-3 rounded-full bg-[radial-gradient(86.93%_86.93%_at_14.58%_10.42%,#FFBEA9_0%,#FA6332_100%)] shadow-[2.25px_3.375px_4.5px_rgba(68,18,0,0.36)]" />
            </div>
            <span className="text-[18px] font-normal text-white">Blog-Web</span>
          </div>


          {/* Headline */}
          <h1 className="text-4xl   font-bold text-white leading-tight">
            How the system of Web <span className="text-gray-400"> Development</span> works
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-xl leading-relaxed max-w-lg">
            In this blog, he is trying to develop a web, the blog is about the web...
          </p>


          {/* CTA */}
          <button
            className='relative z-10 self-start group inline-flex items-center gap-3 overflow-hidden bg-orange-bg-cta hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.45)] text-white font-semibold rounded-full transition-all duration-200 active:scale-[0.97] border-0 cursor-pointer'
            style={{ padding: '13px 28px' }}
          >
            <span className='inline-block -translate-x-0.5 transition-transform duration-300 ease-out delay-75 group-hover:translate-x-0'>
              Read More
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
      </div>
    </section>
  );
};

export default BlogHeroCard;