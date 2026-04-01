import AnimatedCounter from '../../../components/AnimatedCounter';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const linePositions = [12, 30, 50, 68, 88];

  const stats = [
    { target: 7500, label: 'Clients Worldwide', suffix: '+' },
    { target: 11000, label: 'Projects Delivered', suffix: '+' },
    { target: 180, label: 'In-House Professionals', suffix: '+' },
    { target: 6, label: 'Years in Operation', suffix: '+' },
  ];

  return (
    <section className='w-full bg-white text-black py-12 xl:py-28 relative z-10 overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 z-0'>
        {linePositions.map((position, index) => (
          <div
            key={index}
            className='absolute -top-15 bottom-0 w-px bg-linear-to-b from-transparent via-black/20 to-transparent'
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

      <div className='container mx-auto px-5 xl:px-8 2xl:px-12 relative z-10'>
        {/* Top Content (Image + Text) */}
        <div className='flex flex-col xl:flex-row items-center gap-8 xl:gap-20 mb-12 xl:mb-16'>
          {/* Image Side */}
          <div className='w-full xl:w-[45%] shrink-0'>
            <img
              src='/alvaro-reyes-LXx1hwmp67E-unsplash.jpg'
              alt='Team working in office'
              className='w-full h-auto object-cover rounded-sm'
            />
          </div>

          {/* Text Side */}
          <div className='flex-1 flex flex-col items-start gap-3 xl:gap-0 2xl:gap-2 w-full'>
            {/* Badge */}
            <div className='flex items-center gap-2 bg-[#f0ddd8] px-3 py-1.5 border border-[#e5cac3] rounded-md'>
              <div className='relative flex items-center justify-center w-3.5 h-3.5'>
                <span className='absolute w-full h-full bg-orange-bg-cta rounded-full opacity-30'></span>
                <span className='w-2 h-2 bg-orange-bg-cta rounded-full'></span>
              </div>
              <span className='text-base xl:text-xl font-medium text-[#555555]'>
                Who We are
              </span>
            </div>

            {/* Heading */}
            <h2 className='text-xl xl:text-4xl 2xl:text-5xl font-medium leading-tight tracking-tight'>
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
                  className='absolute bottom-1 xl:bottom-2 left-0 w-full pointer-events-none'
                />
              </span>
            </h2>

            {/* Paragraph */}
            <p className='text-[#676767] text-base xl:text-lg 2xl:text-[22px] leading-relaxed max-w-xl'>
              A group of designers, developers, and problem-solvers focused on
              long-term digital success. A group of designers, developers,
            </p>

            {/* CTA Button */}
            <Link
              to="/about"
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
            </Link>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className='grid grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-4'>
          {stats.map((stat, idx) => (
            <div key={idx} className='flex flex-col gap-1'>
              <h3 className='text-3xl xl:text-5xl font-bold text-(--color-white-bg-font) tracking-tight'>
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </h3>
              <p className='text-[#666666] text-base xl:text-lg font-medium mt-1'>
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
