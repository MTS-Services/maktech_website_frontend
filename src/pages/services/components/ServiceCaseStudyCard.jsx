import OrbitGallery from './OrbitGallery'
import { createServiceCardSlide } from './serviceCardSlide'

const services = [
  {
    badge: 'CMS Development',
    title: 'Website & CMS\nDevelopment',
    results: 'Scalable digital infrastructure built for performance.',
    description:
      'We design and develop secure, high-speed, conversion-focused websites that act as growth foundations — not digital brochures.',
    build: [
      'Custom Websites',
      'WordPress Development',
      'Wix Platforms',
      'Shopify & eCommerce Solutions',
    ],
    image: '/services_image/Rectangle 6393.webp',
    href: '/services/wordpress',
  },
  {
    badge: 'UI/UX Design',
    title: 'UI/UX Design',
    results: 'We design behavioral systems not decorative interfaces.',
    description:
      'Digital interfaces influence behavior—quietly but consistently. We design experiences that reduce hesitation, clarify decisions, and guide action without forcing it.',
    build: [
      'End-to-end User Flow Architecture',
      'Conversion-Oriented Wireframing',
      'Interaction Logic Modeling',
      'Scalable UI Component Systems',
    ],
    image: '/services_image/uiUx/studio-republic-fotKKqWNMQ4-unsplash.webp',
    href: '/services/ui-ux',
  },
  {
    badge: 'MERN Stack',
    title: 'MERN Stack\nDevelopment',
    results: 'We engineer scalable digital products, not just lines of code.',
    description:
      'We engineer high-traffic applications using MERN. Built for speed, security, and absolute reliability, so your infrastructure never bottlenecks your growth.',
    build: [
      'MongoDB Database Architecture & Optimization',
      'Express.js REST API & Middleware Development',
      'React.js Component Systems & State Management',
      'Node.js Server-Side Logic & Performance Tuning',
    ],
    image: '/services_image/mern/fotis-fotopoulos-DuHKoV44prg-unsplash.webp',
    href: '/services/mern',
  },
  {
    badge: 'Flutter',
    title: 'Flutter App\nDevelopment',
    results:
      'We craft apps that perform beautifully, on every screen, every platform.',
    description:
      'Why compromise? Get the fluidity of native apps on both iOS and Android. High-performance, visually stunning, and built for market dominance.',
    build: [
      'Cross-Platform App Development',
      'Flutter Widget Architecture & Custom UI',
      'REST API & Firebase Backend Integration',
      'Play Store & App Store Deployment',
    ],
    image: '/services_image/flutter/william-hook-9e9PD9blAto-unsplash.webp',
    href: '/services/flutter',
  },
  {
    badge: 'Laravel',
    title: 'Laravel\nDevelopment',
    results:
      'We build robust backends that power products, not just process requests.',
    description:
      'Complex problems require elegant, secure solutions. We build scalable backend systems that protect your data and stabilize your operations at scale.',
    build: [
      'Database Design & Eloquent ORM Optimization',
      'RESTful API Development & Integrations',
      'Authentication, Authorization & Roles',
      'Queue Management, Caching & Performance',
    ],
    image: '/services_image/laravel/mohammad-rahmani-Y5yxdx2a4PI-unsplash.webp',
    href: '/services/laravel',
  },
  {
    badge: 'eCommerce',
    title: 'Shopify\nDevelopment',
    results:
      'We build online stores that convert visitors, not just display products.',
    description:
      "Your store should be a revenue engine. We design for the 'add to cart' moment, optimizing every pixel for frictionless, high-speed mobile checkouts.",
    build: [
      'Custom Shopify Theme Design & Development',
      'Product Catalog Setup & Collection Management',
      'Payment Gateway & Checkout Optimization',
      'SEO, Speed Optimization & Conversion Tuning',
    ],
    image: '/services_image/shopify/hookle-app-6Pa7l0unTAY-unsplash.webp',
    href: '/services/shopify',
  },
  {
    badge: 'Digital Marketing',
    title: 'Digital\nMarketing',
    results:
      'We drive real business growth, not just impressions and empty clicks.',
    description:
      'Traffic is meaningless without conversion. We deploy data-driven strategies that capture attention, build authority, and dominate your niche market.',
    build: [
      'Market Research & Competitor Analysis',
      'SEO On-Page, Off-Page & Technical',
      'Paid Ads (Google, Meta & LinkedIn)',
      'Social Media Strategy & Content Planning',
    ],
    image: '/services_image/digital/myriam-jessier-eveI7MOcSmw-unsplash.webp',
    href: '/services/digital-marketing',
  },
  {
    badge: 'Graphic Design',
    title: 'Graphic Design\n& Branding',
    results: 'We design visuals that stop the scroll, not just fill the space.',
    description:
      'Your identity is your first impression. We craft iconic, cohesive visual languages that make your brand impossible to ignore and easy to trust.',
    build: [
      'Brand Identity, Logo Design & Style Guides',
      'Social Media Creatives & Campaign Visuals',
      'Brochure, Flyer & Print Material Design',
      'Packaging Design & Product Visualization',
    ],
    image: '/services_image/graphicDesign/emily-bernal-BM3U_D2lygo-unsplash.webp',
    href: '/services/graphic-design',
  },
  {
    badge: 'AI / ML',
    title: 'AI & Machine\nLearning',
    results:
      'We turn data into intelligent workflows, not just models on a slide.',
    description:
      'We prototype, train, and deploy AI/ML solutions that connect to your product goals—clear outcomes over buzzwords.',
    build: [
      'Use-case Discovery, Data Audit & Metrics',
      'Model Training, Evaluation & Bias Checks',
      'MLOps Pipelines & Monitoring',
      'Inference APIs & Microservices at Scale',
    ],
    image: '/services_image/Rectangle 6393.webp',
    href: '/services/ai-ml',
  },
]

const slides = services.map(createServiceCardSlide)

// Based on the Framer "CMS Gallery" settings; the card is sized so a full
// service card reads clearly within the space left under the heading.
const GALLERY = { width: 40, height: 62, gap: 22, curve: 0.72, bend: 0.85, momentum: 0.65 }
// Intro orbit plays inside this section against the page's dark background
const INTRO = { mark: 'MAKTECH', background: '#1c1c1c', color: '#FF6533' }
const CAPTION = { color: '#FFFFFF' }

const ServiceCaseStudyCard = () => {
  return (
    <section className='relative flex h-screen min-h-155 w-full flex-col overflow-hidden'>
      <div className='flex shrink-0 justify-center px-5 pt-20 pb-6 sm:px-8 sm:pt-24 md:pb-8 xl:pt-12'>
        <div className='w-full container px-5 xl:px-8 2xl:px-12'>
          <p className='text-[20px] leading-[1.3] text-[#DBDBDB] md:text-[26px] lg:text-[32px]'>
            The team understood our vision from day one. The final product was
            clean, fast, and exactly what we needed to scale.
            <span className='text-[#838383] italic'>
              {' '}
              The team understood our vision from day one. The final product was
              clean, fast, and exactly what we needed to scale.
            </span>
          </p>
        </div>
      </div>

      <div className='relative min-h-0 flex-1'>
        <OrbitGallery
          slides={slides}
          gallery={GALLERY}
          intro={INTRO}
          caption={CAPTION}
          autoplay={38}
          holdOnHover
          ariaLabel='Our services. Drag horizontally or use left and right arrow keys.'
        />
      </div>
    </section>
  )
}

export default ServiceCaseStudyCard
