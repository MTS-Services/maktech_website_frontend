import { useEffect, useRef, useState } from 'react';

// ─── Animated counter — fires once when scrolled into view ─────────────────
const AnimatedCounter = ({ target, duration = 2000, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    let startTime = null;
    const tick = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutQuart for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

// ─── Static data — outside component to avoid recreation on each render ────
const STATS = [
  { target: 7500, label: 'Clients Worldwide', suffix: '+' },
  { target: 11000, label: 'Projects Delivered', suffix: '+' },
  { target: 180, label: 'In-House Professionals', suffix: '+' },
  { target: 6, label: 'Years in Operation', suffix: '+' },
];

// ─── About section ───────────────────────────────────────────────────────────
const AboutSection = () => (
  <section
    id='about'
    aria-labelledby='about-heading'
    className='relative w-full overflow-hidden bg-black-bg'
    style={{
      backgroundImage: 'url(/home_banner_bg.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    {/* Left glass effect — decorative, desktop only */}
    <div
      className='hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0'
      aria-hidden='true'
    >
      <img
        src='/glassEffectLeft.png'
        alt=''
        width={220}
        height={440}
        loading='lazy'
        decoding='async'
        className='h-auto'
      />
    </div>

    {/* Right glass effect — decorative, desktop only */}
    <div
      className='hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0'
      aria-hidden='true'
    >
      <img
        src='/glassEffectRight.png'
        alt=''
        width={220}
        height={440}
        loading='lazy'
        decoding='async'
        className='h-auto'
      />
    </div>

    {/* Hero content */}
    <div className='relative z-10 flex flex-col items-center justify-center min-h-[88vh] xl:min-h-screen px-5 pt-28 pb-16 text-center'>
      {/* Breadcrumb */}
      <nav aria-label='Breadcrumb' className='mb-10'>
        <ol className='inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-sm text-white/70'>
          <li>
            <a
              href='/'
              className='hover:text-white transition-colors duration-150'
            >
              Home
            </a>
          </li>
          <li aria-hidden='true'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              aria-hidden='true'
            >
              <path
                d='M4.5 2.5L7.5 6L4.5 9.5'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </li>
          <li>
            <span aria-current='page' className='text-white/90 font-medium'>
              About US
            </span>
          </li>
        </ol>
      </nav>

      {/* Heading */}
      <h1
        id='about-heading'
        className='text-white font-bold leading-tight tracking-tight text-[clamp(1.75rem,5vw,4rem)] max-w-4xl mb-6'
      >
        Designing Digital Systems That Support Sustainable{' '}
        <span className='relative inline-block'>
          Growth
          <img
            src='/Vector 511.png'
            alt=''
            aria-hidden='true'
            fetchPriority='low'
            className='absolute -bottom-1 left-0 w-full pointer-events-none'
          />
        </span>
      </h1>

      {/* Description */}
      <p className='text-white/60 text-base xl:text-lg max-w-2xl leading-relaxed mb-10'>
        Maktech is a full-stack IT company built around one idea: strategy only
        matters when execution is coordinated. We bring planning, technology,
        and delivery into a single working system so growth becomes repeatable,
        not accidental.
      </p>

      {/* CTA */}
      <a
        href='#contact'
        className='group inline-flex items-center gap-3 bg-orange-bg-cta hover:bg-[#d14608] text-white font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95'
        style={{ padding: '13px 28px' }}
      >
        Contact With US
        <span
          className='w-7 h-7 flex items-center justify-center rounded-full bg-white shrink-0'
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
      </a>
    </div>

    {/* Stats bar */}
    <div className='relative z-10 border-t border-white/10 px-5 py-12 xl:px-16'>
      <div className='container mx-auto grid grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-4'>
        {STATS.map(({ target, label, suffix }) => (
          <div key={label} className='flex flex-col gap-1'>
            <span className='text-white text-4xl xl:text-5xl font-bold tracking-tight'>
              <AnimatedCounter target={target} suffix={suffix} />
            </span>
            <span className='text-white/50 text-base font-medium mt-1'>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
