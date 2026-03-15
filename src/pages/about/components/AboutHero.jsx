import Breadcrumb from '../../../components/Breadcrumb';

const AboutHero = () => (
  <div className='relative flex flex-col items-center justify-center min-h-[88vh] xl:min-h-screen px-5 pt-28 pb-16 text-center'>
    {/* Left glass effect — decorative, desktop only */}
    <div
      className='hidden xl:block absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none select-none'
      aria-hidden='true'
    >
      <img
        src='/glassEffectRight.png'
        alt=''
        width={1040}
        height={420}
        loading='lazy'
        decoding='async'
        className='-ml-98 mt-100 '
      />
    </div>

    {/* Right glass effect — decorative, desktop only */}
    <div
      className='hidden xl:block absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none'
      aria-hidden='true'
    >
      <img
        src='/glassEffectLeft.png'
        alt=''
        width={240}
        height={420}
        loading='lazy'
        decoding='async'
      />
    </div>

    {/* Breadcrumb */}
    <div className='mb-10 relative z-10'>
      <Breadcrumb label='About US' />
    </div>

    {/* Heading */}
    <h1
      id='about-heading'
      className='relative z-10 text-white font-bold leading-tight tracking-tight text-[clamp(1.75rem,5vw,4rem)] max-w-4xl mb-6'
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
    <p className='relative z-10 text-white/60 text-base xl:text-lg max-w-2xl leading-relaxed mb-10'>
      Maktech is a full-stack IT company built around one idea: strategy only
      matters when execution is coordinated. We bring planning, technology, and
      delivery into a single working system so growth becomes repeatable, not
      accidental.
    </p>

    {/* CTA */}
    <a
      href='#contact'
      className='relative z-10 group inline-flex items-center gap-3 bg-orange-bg-cta hover:bg-[#d14608] text-white font-semibold rounded-full transition-all duration-200 hover:-translate-y-0.5 active:scale-95'
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
);

export default AboutHero;
