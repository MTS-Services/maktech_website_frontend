import { Link } from 'react-router-dom'

const ServiceShowcase = ({
  badgeText = 'What We Build',
  title = 'We engineer scalable digital products, not just lines of code.',
  description = 'Our MERN engagements typically include:',
  bullets = [
    'End-to-end Full Stack Development Process',
    'MongoDB Database Architecture & Optimization',
    'Express.js REST API & Middleware Development',
    'React.js Component Systems & State Management',
    'Node.js Server-Side Logic & Performance Tuning',
    'JWT Authentication & Role-Based Access Control',
    'Cloud Deployment, CI/CD & Scalability Setup',
  ],
  imageSrc = '/services_image/mern-showcase.jpg',
  imageAlt = 'Service showcase',
  ctaText = 'View Case Studies',
  ctaLink = '/our_work',
  className = '',
}) => {
  return (
    <section className={`relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 ${className}`}>
      {/* Soft peach background similar to home WhyChooseUs */}
      <div
        className='absolute inset-0'
        aria-hidden='true'
        style={{
          background:
            'radial-gradient(140% 120% at 0% 0%, rgba(255, 182, 146, 0.35), rgba(255, 182, 146, 0) 55%), radial-gradient(160% 150% at 100% 0%, rgba(255, 208, 184, 0.32), rgba(255, 208, 184, 0) 60%), linear-gradient(180deg, #fffdfb 0%, #fff5ef 100%)',
        }}
      />

      {/* Glow blobs — match WhyChooseUs blur */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -left-24 -bottom-24 h-[500px] w-[500px] rounded-full opacity-70 blur-[120px]'
        style={{ background: 'rgba(255, 101, 51, 0.35)' }}
      />
      <div
        aria-hidden='true'
        className='pointer-events-none absolute -right-20 -top-20 h-[520px] w-[460px] rounded-full opacity-70 blur-[130px]'
        style={{ background: 'rgba(255, 101, 51, 0.30)' }}
      />

      <div className='container relative z-10 mx-auto grid items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14 xl:gap-16'>
        {/* Image */}
        <div className='flex justify-center'>
          <div className='overflow-hidden rounded-xl shadow-[0_25px_50px_rgba(0,0,0,0.18)] ring-1 ring-black/5 max-w-xl w-full bg-white/60 backdrop-blur-sm'>
            <img
              src={imageSrc}
              alt={imageAlt}
              className='h-full w-full object-cover'
              loading='lazy'
            />
          </div>
        </div>

        {/* Content */}
        <div className='flex flex-col gap-5 text-[#2f2f2f]'>
          {/* Badge */}
          <div className='inline-flex items-center gap-2 rounded-full border border-[#e5cac3] bg-[#f0ddd8] px-3 py-1.5 text-sm font-medium text-[#5a443d] shadow-sm w-fit'>
            <span className='relative flex h-3.5 w-3.5 items-center justify-center'>
              <span className='absolute h-full w-full rounded-full bg-[#ff6533]/30' />
              <span className='h-2 w-2 rounded-full bg-gradient-to-b from-[#ff8a5a] to-[#ff6533]' />
            </span>
            {badgeText}
          </div>

          <h2 className='text-2xl leading-tight font-semibold sm:text-3xl md:text-[32px] md:leading-[1.25] text-[#2b2b2b]'>
            {title}
          </h2>

          <p className='text-sm sm:text-base text-[#4b4b4b]'>{description}</p>

          <ul className='space-y-2 text-sm sm:text-base text-[#4b4b4b]'>
            {bullets.map((item, idx) => (
              <li key={idx} className='flex gap-2'>
                <span className='mt-1 inline-block h-1.5 w-1.5 rounded-full bg-[#ff6533]' aria-hidden='true' />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className='pt-2'>
            <Link
              to={ctaLink}
              className='inline-flex items-center gap-2 rounded-full bg-orange-bg-cta px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5'
            >
              {ctaText}
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
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceShowcase
