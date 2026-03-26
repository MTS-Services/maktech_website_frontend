import { Link } from 'react-router-dom'

const services = [
  {
    id: 1,
    title: 'UI/UX Design',
    description:
      'User-centered interfaces designed to convert, engage, and scale.',
    link: '/services/ui-ux',
  },
  {
    id: 2,
    title: 'MERN STACK Development',
    description:
      'High-performance, responsive websites built with clean code for ultimate speed and SEO.',
    link: '/services/mern',
  },
  {
    id: 3,
    title: 'Flutter App Development',
    description:
      'Native-quality iOS and Android applications delivered from a single, scalable codebase.',
    link: '/services/flutter',
  },
  {
    id: 4,
    title: 'Laravel Dev',
    description:
      'Robust, secure, and enterprise-grade web applications built on the world\'s leading PHP framework.',
    link: '/services/laravel',
  },
  {
    id: 5,
    title: 'WordPress Development',
    description:
      'Custom-tailored CMS solutions that combine ease of use with powerful, flexible functionality.',
    link: '/services/wordpress',
  },
  {
    id: 6,
    title: 'Shopify Development',
    description:
      'High-converting e-commerce storefronts designed to streamline your sales and scale your brand.',
    link: '/services/shopify',
  },
  {
    id: 7,
    title: 'Wix Development',
    description:
      'Custom-tailored CMS solutions that combine ease of use with powerful, flexible functionality.',
    link: '/services/wix',
  },
  {
    id: 8,
    title: 'Digital Marketing',
    description:
      'High-converting e-commerce storefronts designed to streamline your sales and scale your brand.',
    link: '/services/digital-marketing',
  },
  {
    id: 9,
    title: 'Graphic Design',
    description:
      'Robust, secure, and enterprise-grade web applications built on the world\'s leading PHP framework.',
    link: '/services/graphic-design',
  },
  {
    id: 10,
    title: 'AI/ML',
    description:
      'Intelligent solutions powered by machine learning models, automation, and data insights.',
    link: '/services/ai-ml',
  },
  {
    id: 11,
    title: 'SaaS Product',
    description:
      'Data analytics products and reporting pipelines that turn raw data into decisions.',
    link: '/services/sas-product',
  },
]

const ServiceGrid = () => {
  return (
    <section className='px-5 pb-16 sm:px-8 md:pb-24'>
      <div className='flex justify-center'>
        <div className='w-full container px-5 xl:px-8 2xl:px-12'>
          {/* Header */}
          <div className='mb-12 md:mb-16 lg:mb-20'>
            <div className='mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100/50 px-4 py-2'>
              <div className='h-2.5 w-2.5 rounded-full bg-orange-500' />
              <span className='text-sm font-medium text-white'>
                Our more Services
              </span>
            </div>

            <h2 className='mt-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl'>
              End-to-End Digital Solutions
              <br />
              
            </h2>

            <p className='mt-4 max-w-2xl text-base text-white/70 md:text-lg'>
              From UI/UX design to full-stack development, we cover everything
              your product needs to grow.
            </p>
          </div>

          {/* Service Grid */}
          <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
            {services.map((service) => (
              <div
                key={service.id}
                className='group rounded-lg border border-white/10 bg-[#101515] p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange-bg-cta hover:bg-orange-bg-cta md:p-8'
              >
                {/* Icon with hover effect */}
                <div className='mb-6 relative h-16 w-16'>
                  {/* Default Icon - visible when not hovering */}
                  <div className='absolute inset-0 text-white/60 opacity-80 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-75 group-hover:rotate-12'>
                    <svg
                      width='64'
                      height='64'
                      viewBox='0 0 32 32'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='1.5'
                    >
                      <rect x='4' y='4' width='10' height='10' />
                      <rect x='18' y='4' width='10' height='10' />
                      <rect x='4' y='18' width='10' height='10' />
                      <rect x='18' y='18' width='10' height='10' />
                    </svg>
                  </div>
                  {/* Hover Icon - visible when hovering */}
                  <div className='absolute inset-0 opacity-0 scale-75 -rotate-12 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-80 group-hover:rotate-0'>
                    <img 
                      src='/services_image/service/Frame 2147225682.svg' 
                      alt='' 
                      className='w-16 h-16 drop-shadow-lg'
                    />
                  </div>
                </div>

                {/* Title */}
                <h3 className='mb-3 text-lg font-semibold text-white group-hover:text-white transition-colors md:text-xl'>
                  {service.title}
                </h3>

                {/* Description */}
                <p className='mb-6 text-sm text-white/60 group-hover:text-white/90 leading-relaxed transition-colors md:text-base'>
                  {service.description}
                </p>

                {/* Read More Link */}
                <Link
                  to={service.link}
                  className='inline-flex items-center gap-2 text-orange-bg-cta group-hover:text-white font-medium transition-all duration-200 hover:gap-3 group'
                >
                  Read More
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='transition-transform group-hover:translate-x-1'
                  >
                    <path d='M3 8h10M9 4l4 4-4 4' />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServiceGrid
