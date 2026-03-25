import { Link } from 'react-router-dom'

const ServiceCaseStudyCard = () => {
  const linePositions = [12, 30, 50, 68, 88]

  return (
    <section className='relative overflow-hidden px-5 pb-16 sm:px-8 md:pb-24'>
      <div className='pointer-events-none absolute inset-0 z-0'>
        {linePositions.map((position, index) => (
          <div
            key={index}
            className='absolute top-0 bottom-0 w-px bg-linear-to-b from-transparent via-black/20 to-transparent'
            style={{ left: `${position}%` }}
          >
            <div
              className='absolute w-0.5 h-12 rounded-full opacity-60 animate-dropFall'
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                background:
                  'linear-gradient(to bottom, rgba(255,255,255,0.1), #FF6533)',
                animationDelay: `${index * 2}s`,
              }}
            />
            <div
              className='absolute w-0.5 h-10 rounded-full opacity-45 animate-dropFall'
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                background:
                  'linear-gradient(to bottom, rgba(255,255,255,0.1), #FF6533)',
                animationDelay: `${index * 2 + 4}s`,
              }}
            />
          </div>
        ))}
      </div>

      <div className='relative z-10 flex justify-center'>
        <div className='w-full container px-5 xl:px-8 2xl:px-12'>
          <div className='rounded-lg bg-white/95 p-8 md:p-12 lg:p-16'>
            <div className='grid gap-12 md:grid-cols-2 md:gap-16'>
              {/* Left side - Badge, Heading, Image */}
              <div className='flex flex-col'>
                <div className='mb-6 inline-flex w-fit items-center gap-2 rounded-full bg-orange-100 px-4 py-2'>
                  <div className='h-3 w-3 rounded-full bg-orange-500' />
                  <span className='text-sm font-medium text-orange-600'>
                    CMS Development
                  </span>
                </div>

                <h2 className='text-3xl font-bold text-gray-900 md:text-4xl'>
                  Website & CMS
                  <br />
                  Development
                </h2>

                {/* Placeholder for case study image */}
                <div className='mt-8 aspect-video rounded-lg bg-linear-to-br from-orange-400 to-orange-600 overflow-hidden'>
                  <img
                    src='/services_image/Rectangle 6393.jpg'
                    alt='Website & CMS Development case study'
                    className='h-full w-full object-cover'
                  />
                </div>
              </div>

              {/* Right side - Results, Info, CTA */}
              <div className='flex flex-col justify-between'>
                <div>
                  <div className='mb-8'>
                    <h3 className='text-lg md:text-xl lg:text-2xl font-semibold text-[#666666]'>
                      Results.
                    </h3>
                    <p className='mt-2 text-base md:text-lg text-[#666666]'>
                      Scalable digital infrastructure built for performance.
                    </p>
                  </div>

                  <p className='text-base md:text-lg text-[#666666]'>
                    We design and develop secure, high-speed, conversion-focused
                    websites that act as growth foundations — not digital
                    brochures.
                  </p>

                  {/* What We Build */}
                  <div className='mt-8'>
                    <h4 className='text-lg md:text-xl lg:text-2xl font-semibold text-[#3D3D3D]'>
                      What We Build
                    </h4>
                    <ul className='mt-3 space-y-2 text-sm text-[#666666]'>
                      <li className='flex items-start'>
                        <span className='mr-3 text-orange-500'>•</span>
                        <span>Custom Websites</span>
                      </li>
                      <li className='flex items-start'>
                        <span className='mr-3 text-orange-500'>•</span>
                        <span>WordPress Development</span>
                      </li>
                      <li className='flex items-start'>
                        <span className='mr-3 text-orange-500'>•</span>
                        <span>Wix Platforms</span>
                      </li>
                      <li className='flex items-start'>
                        <span className='mr-3 text-orange-500'>•</span>
                        <span>Shopify & eCommerce Solutions</span>
                      </li>
                    </ul>
                  </div>

                  {/* Our Operations */}
                  <div className='mt-8'>
                    <h4 className='text-lg md:text-xl lg:text-2xl font-semibold text-[#3D3D3D]'>
                      Our Operations
                    </h4>
                    <p className='mt-3 space-y-2 text-sm text-[#666666]'>
                      Built for startups.
                      <br />
                      Structured for SMEs.
                      <br />
                      Engineered for enterprise scale.
                    </p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className='mt-8'>
                  <Link
                    to='/case-study'
                    className='group inline-flex items-center gap-3 rounded-full bg-orange-500 px-6 py-3 text-base font-medium text-white transition-transform duration-200 hover:-translate-y-0.5'
                  >
                    See Our Work
                    <span className='flex h-8 w-8 items-center justify-center rounded-full bg-white text-orange-500'>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceCaseStudyCard
