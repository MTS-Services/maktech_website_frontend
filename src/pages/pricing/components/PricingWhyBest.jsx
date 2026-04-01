import FeatureSection from '../../../components/FeatureSection';
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

const PricingWhyBest = () => (
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
    backgroundImages={{ blob: '/why_choice_us/Group_1261154808.webp' }}
  />
);

export default PricingWhyBest;
