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

const whyChooseFeatures = [
  {
    id: 1,
    title: '01. Dedicated In-House Experts',
    description:
      'Our team of 180+ experts works together to build quality digital solutions for your business.',
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
    id: 2,
    title: '02. All Digital Services in One Place',
    description:
      'From websites and software to AI and digital marketing, we handle all your digital needs.',
    icon: (
      <svg {...iconProps}>
        <rect x='3' y='3' width='7' height='7' rx='1' />
        <rect x='14' y='3' width='7' height='7' rx='1' />
        <rect x='14' y='14' width='7' height='7' rx='1' />
        <rect x='3' y='14' width='7' height='7' rx='1' />
      </svg>
    ),
  },
  {
    id: 3,
    title: '03. Focused on Your Business Goals',
    description:
      'We understand your needs and build solutions that help your business grow.',
    icon: (
      <svg {...iconProps}>
        <circle cx='12' cy='12' r='10' />
        <circle cx='12' cy='12' r='6' />
        <circle cx='12' cy='12' r='2' />
      </svg>
    ),
  },
  {
    id: 4,
    title: '04. Support Beyond Project Delivery',
    description:
      "We're here to help even after launch, with ongoing support whenever your business needs it.",
    icon: (
      <svg {...iconProps}>
        <path d='M3 18v-6a9 9 0 0 1 18 0v6' />
        <path d='M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z' />
      </svg>
    ),
  },
];

const WhyWeBest = () => {
  return (
    <FeatureSection
      badge={{ text: 'Why Choose maktech' }}
      heading={
        <span className='text-white xl:text-[#2F2F2F]'>
          Your Trusted Technology Partner
          <br />
          for Long-Term Growth.
        </span>
      }
      description={[
        <span key='description' className='xl:text-[#888888]'>
          We help businesses turn ideas into powerful digital solutions through
          professional website development, custom software, AI automation, and
          result-focused marketing.
        </span>,
      ]}
      ctaText='Schedule a Free Consultation'
      ctaLink='/contact'
      features={whyChooseFeatures}
      backgroundStyle='dark'
      animatedLines={true}
    />
  );
};

export default WhyWeBest;
