import { useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumb';
import FeatureSection from '../../components/FeatureSection';
import {
  FaFileInvoiceDollar,
  FaLayerGroup,
  FaChartLine,
  FaCreditCard,
} from 'react-icons/fa';

const RATE_FEATURES = [
  {
    id: 1,
    title: 'Transparent Pricing',
    description:
      'No hidden fees or surprise costs. We provide detailed quotes upfront so you know exactly what you are paying for from start to finish.',
    icon: (
      <FaFileInvoiceDollar
        className='w-5 h-5 text-orange-bg-cta'
        aria-hidden='true'
      />
    ),
  },
  {
    id: 2,
    title: 'Scalable Packages',
    description:
      'Whether you are a startup or an enterprise, we offer flexible service tiers that grow with your business and budget.',
    icon: (
      <FaLayerGroup className='w-5 h-5 text-orange-bg-cta' aria-hidden='true' />
    ),
  },
  {
    id: 3,
    title: 'High Value-to-Cost',
    description:
      'Get premium, agency-quality UI/UX design at competitive rates. We optimize our workflow to deliver top-tier results efficiently.',
    icon: (
      <FaChartLine className='w-5 h-5 text-orange-bg-cta' aria-hidden='true' />
    ),
  },
  {
    id: 4,
    title: 'Flexible Payments',
    description:
      'We offer milestone-based payment plans, allowing you to pay as the project progresses and ensuring your peace of mind.',
    icon: (
      <FaCreditCard className='w-5 h-5 text-orange-bg-cta' aria-hidden='true' />
    ),
  },
];

const PricingHero = () => (
  <div className='relative flex flex-col items-center justify-center min-h-screen px-5 pt-28 pb-16 text-center overflow-hidden'>
    {/* Breadcrumb */}
    <div className='mb-10 relative z-10'>
      <Breadcrumb label='Pricing' />
    </div>

    {/* Heading */}
    <h1 className='relative z-10 text-white font-bold leading-tight tracking-tight text-[clamp(2rem,5.5vw,4.5rem)] max-w-4xl mb-6'>
      Designing Experiences That Drive
      <wbr />
      Growth
    </h1>

    {/* Subheading */}
    <p className='relative z-10 text-white/60 text-base xl:text-lg max-w-xl leading-relaxed mb-10'>
      We&apos;re a digital-first team helping businesses build meaningful
      products through strategy, design, and technology.
    </p>

    {/* CTA */}
    <a
      href='/contact'
      className='relative z-10 group inline-flex items-center gap-3 overflow-hidden bg-orange-bg-cta hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.45)] text-white font-semibold rounded-full transition-all duration-200 active:scale-[0.97]'
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
    </a>
  </div>
);

const Pricing = () => {
  useEffect(() => {
    document.title = 'Pricing – Maktech';
  }, []);

  return (
    <main
      id='pricing'
      aria-labelledby='pricing-heading'
      className='relative w-full overflow-hidden'
    >
      <PricingHero />
      <FeatureSection
        badge={{
          text: 'Why Our Rates are the Best',
          light: true,
        }}
        heading=''
        description={[]}
        ctaText={null}
        ctaLink='#'
        features={RATE_FEATURES}
        iconBg={false}
        animatedLines={true}
        animateCards={true}
        backgroundStyle='dark'
        backgroundImages={{ blob: '/why_choice_us/Group_1261154808.png' }}
      />
    </main>
  );
};

export default Pricing;
