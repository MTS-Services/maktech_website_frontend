import { Link } from 'react-router-dom'
import Breadcrumb from '../../../components/Breadcrumb'

const ServiceBanner = () => {
  return (
    <section className='flex items-center justify-center min-h-screen px-5 pt-20 pb-12 sm:px-8 sm:pt-24 lg:pt-28'>
      <div className='w-full container text-center'>
        <div className='mb-7'>
          <Breadcrumb label='Services' />
        </div>

        <h1 className='mx-auto max-w-190 text-white font-semibold text-[40px] leading-[1.2] tracking-[-0.02em] md:text-[58px] md:leading-[1.12]'>
          <span className='md:hidden'>
            Designing Experiences
            <br />
            That DriveGrowth
          </span>
          <span className='hidden md:inline'>
            Designing Systems That
            <br />
            Drive Growth
          </span>
        </h1>

        <p className='mx-auto mt-7 max-w-6xl text-[16px] leading-[1.6] text-white/75 md:text-[28px] md:leading-[1.6]'>
          <span className='md:hidden'>
            We&apos;re a digital-first team helping businesses build meaningful
            products through strategy, design, and technology.
          </span>
          <span className='hidden md:inline'>
            We operate as a full-stack IT company delivering scalable websites,
            applications, and performance systems engineered for long-term
            business success.
          </span>
        </p>

        <div className='mt-10'>
          <Link
            to='/contact'
            className='group inline-flex items-center gap-3 overflow-hidden rounded-full bg-orange-bg-cta text-white font-semibold transition-all duration-200 hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.45)] active:scale-[0.97]'
            style={{ padding: '13px 28px' }}
          >
            <span className='inline-block -translate-x-0.5 transition-transform duration-300 ease-out delay-75 group-hover:translate-x-0 md:hidden'>
              View Services
            </span>
            <span className='hidden md:inline-block -translate-x-0.5 transition-transform duration-300 ease-out delay-75 group-hover:translate-x-0'>
              Contact With Us
            </span>
            <span className='flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'>
              <svg
                width='14'
                height='14'
                viewBox='0 0 16 16'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M3 8h10M9 4l4 4-4 4' />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ServiceBanner
