import {
  FaClock,
  FaChartBar,
  FaFacebook,
  FaTwitter,
  FaShare,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../../../components/Breadcrumb';

const ArticleHero = ({ blog }) => {
  const title = blog?.title || 'How the system of Web Development works';
  const author = blog?.postedBy || 'Emma Rose';
  const readTime = blog?.readTime || '2 minute read';
  const views = blog?.engagement?.views ? `${blog.engagement.views} views` : '1.6K views';
  const shares = blog?.engagement?.shares ? `${blog.engagement.shares} shares` : '1.2K shares';

  return (
    <div className='relative flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[80vh] px-5 pt-28 pb-16 text-center'>
      {/* Breadcrumb */}
      <div className='mb-8 relative z-10'>
        <Breadcrumb
          crumbs={[
            { label: 'Blogs', href: '/blogs' },
            { label: title.length > 40 ? `${title.slice(0, 40)}...` : title },
          ]}
        />
      </div>

      {/* Category Badge if present */}
      {blog?.category && (
        <div className='relative z-10 mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold text-[#ff6533] uppercase tracking-wider backdrop-blur-sm'>
          {blog.category}
        </div>
      )}

      {/* Heading */}
      <h1
        id='about-heading'
        className='relative z-10 text-white font-bold leading-tight tracking-tight text-[clamp(1.75rem,5vw,3.75rem)] max-w-5xl mb-6'
      >
        {title}
      </h1>

      {/* Meta description / info */}
      <div className='relative z-10 text-white/60 text-base xl:text-lg max-w-3xl leading-relaxed mb-10'>
        <div className='flex flex-wrap items-center justify-center gap-y-4 text-[#FFFFFF] text-sm md:text-base font-medium'>
          <span className='flex items-center'>
            by <span className='text-white ml-1 font-semibold'>{author}</span>
          </span>

          <span className='mx-3 hidden md:inline opacity-40'>—</span>

          <div className='flex items-center gap-2'>
            <FaClock size={15} className='text-[#ff6533]' />
            <span>{readTime}</span>
          </div>

          <span className='mx-3 hidden md:inline opacity-40'>—</span>

          <div className='flex items-center gap-2'>
            <FaChartBar size={15} className='text-[#ff6533]' />
            <span>{views}</span>
          </div>

          <span className='mx-3 hidden md:inline opacity-40'>—</span>

          {/* Social Icons */}
          <div className='flex items-center gap-4'>
            <button
              type='button'
              aria-label='Share on Facebook'
              className='hover:text-[#ff6533] transition-colors cursor-pointer'
            >
              <FaFacebook size={17} fill='currentColor' />
            </button>
            <button
              type='button'
              aria-label='Share on Twitter'
              className='hover:text-[#ff6533] transition-colors cursor-pointer'
            >
              <FaTwitter size={17} fill='currentColor' />
            </button>
            <button
              type='button'
              aria-label='Share'
              className='hover:text-[#ff6533] transition-colors cursor-pointer'
            >
              <span className='flex items-center gap-1.5'>
                <FaShare size={16} fill='currentColor' />
                <span className='text-xs'>{shares}</span>
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        to='/contact'
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
      </Link>
    </div>
  );
};

export default ArticleHero;
