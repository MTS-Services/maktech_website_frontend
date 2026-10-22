import FeatureSection from '../../../components/FeatureSection';

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'white',
  strokeWidth: '1.8',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'w-6 h-6',
};

const RATE_FEATURES = [
  {
    id: 1,
    title: '01. Clear Pricing, No Hidden Costs',
    description:
      "Know what you're paying for with clear estimates and agreed project costs.",
    icon: (
      <svg {...iconProps}>
        <path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
        <path d='M14 2v6h6' />
        <path d='M9 15l2 2 4-4' />
      </svg>
    ),
  },
  {
    id: 2,
    title: '02. Quality Within Your Budget',
    description:
      'Get professional digital solutions that fit your needs and budget without compromising quality.',
    icon: (
      <svg {...iconProps}>
        <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' />
      </svg>
    ),
  },
  {
    id: 3,
    title: '03. Expert Team, Better Value',
    description:
      'Our in-house experts work together to save time, reduce costs, and deliver quality work.',
    icon: (
      <svg {...iconProps}>
        <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
        <circle cx='9' cy='7' r='4' />
        <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
        <path d='M16 3.13a4 4 0 0 1 0 7.75' />
      </svg>
    ),
  },
  {
    id: 4,
    title: '04. Flexible Plans for Every Business',
    description:
      'From small websites to complex software, our pricing fits your project needs and goals.',
    icon: (
      <svg {...iconProps}>
        <rect x='3' y='3' width='7' height='7' rx='1' />
        <rect x='14' y='3' width='7' height='7' rx='1' />
        <rect x='14' y='14' width='7' height='7' rx='1' />
        <rect x='3' y='14' width='7' height='7' rx='1' />
      </svg>
    ),
  },
];

const PricingWhyBest = () => (
  <FeatureSection
    badge={{ text: 'Why Our Pricing Works' }}
    heading={
      <span className='text-white xl:text-[#2F2F2F]'>
        The Right Digital Solutions
        <br />
        at the Right Price.
      </span>
    }
    description={[
      <span key='description' className='xl:text-[#888888]'>
        Our flexible pricing for website development, software solutions, and
        digital marketing helps businesses invest confidently in quality
        services built for performance, efficiency, and long-term growth.
      </span>,
    ]}
    ctaText='Schedule a Free Consultation'
    ctaLink='/contact'
    features={RATE_FEATURES}
    backgroundStyle='dark'
    animatedLines={true}
  />
);

export default PricingWhyBest;
