import AnimatedCounter from '../../../components/AnimatedCounter';

const AboutSection = () => {
  const stats = [
    { target: 7500, label: 'Clients Worldwide', suffix: '+' },
    { target: 11000, label: 'Projects Delivered', suffix: '+' },
    { target: 180, label: 'In-House Professionals', suffix: '+' },
    { target: 6, label: 'Years in Operation', suffix: '+' },
  ];

  return (
    <section className='hidden xl:block w-full bg-white text-black py-20 relative z-10'>
      <div className='container mx-auto px-5 xl:px-8 2xl:px-12'>
        {/* Top Content (Image + Text) */}
        <div className='flex items-center gap-12 xl:gap-20 mb-16'>
          {/* Image Side */}
          <div className='w-[45%] shrink-0'>
            <img
              src='/WhoWeare/whoweare.png'
              alt='Team working in office'
              className='w-full h-auto object-cover rounded-sm'
            />
          </div>

          {/* Text Side */}
          <div className='flex-1 flex flex-col items-start 2xl:gap-2'>
            {/* Badge */}
            <div className='flex items-center gap-2 bg-[#f0ddd8] px-3 py-1.5 border border-[#e5cac3] rounded-md'>
              <div className='relative flex items-center justify-center w-3.5 h-3.5'>
                <span className='absolute w-full h-full bg-orange-bg-cta rounded-full opacity-30'></span>
                <span className='w-2 h-2 bg-orange-bg-cta rounded-full'></span>
              </div>
              <span className='text-xl font-medium text-[#555555]'>
                Who We are
              </span>
            </div>

            {/* Heading */}
            <h2 className='text-2xl xl:text-4xl 2xl:text-5xl font-medium leading-tight tracking-tight'>
              <span style={{ color: '#2F2F2F' }}>More </span>
              <span style={{ color: '#6e6e6e' }}>Than a </span>
              <span style={{ color: '#BFBDBD' }}>Team We&apos;re</span>
              <br />
              <span style={{ color: '#2F2F2F' }}>Your </span>
              <span style={{ color: '#6e6e6e' }}>Tech </span>
              <span
                className='relative inline-block'
                style={{ color: '#BFBDBD' }}
              >
                Partner
                <img
                  src='/Vector 511.png'
                  alt=''
                  aria-hidden='true'
                  className='absolute bottom-2 left-0 w-full pointer-events-none'
                />
              </span>
            </h2>

            {/* Paragraph */}
            <p className='text-[#676767] xl:text-lg 2xl:text-[22px] leading-relaxed max-w-xl'>
              A group of designers, developers, and problem-solvers focused on
              long-term digital success. A group of designers, developers,
            </p>

            {/* CTA Button */}
            <button
              className='mt-2 bg-orange-bg-cta hover:bg-[#d14608] text-white px-6 py-3 rounded-sm text-base font-semibold flex items-center gap-2 transition-colors duration-200 cursor-pointer'
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = '#d14608')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = '#ff6533')
              }
            >
              Learn More
              <svg
                width='14'
                height='14'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='M5 12h14M12 5l7 7-7 7' />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className='grid grid-cols-4 gap-4'>
          {stats.map((stat, idx) => (
            <div key={idx} className='flex flex-col gap-1'>
              <h3 className='text-4xl xl:text-5xl font-bold text-(--color-white-bg-font) tracking-tight'>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </h3>
              <p className='text-[#666666] text-lg font-medium mt-1'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
