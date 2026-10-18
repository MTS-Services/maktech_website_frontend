import { useEffect, useMemo, useRef, useState } from 'react'
import CurveFlowCarousel from './CurveFlowCarousel'
import {
  LANDSCAPE_RATIO,
  PORTRAIT_RATIO,
  createServiceCardSlide,
} from './serviceCardSlide'

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

// Cards drift slowly and stop while hovered so they can be read and clicked
const DRIVE = { holdOnHover: true }

const ServiceCaseStudyCard = () => {
  const linePositions = [12, 30, 50, 68, 88]
  const stageRef = useRef(null)
  const [stageWidth, setStageWidth] = useState(1440)

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setStageWidth(entry.contentRect.width)
    })
    observer.observe(stageRef.current)
    return () => observer.disconnect()
  }, [])

  // Stacked portrait cards on phones/tablets, the original two-column card
  // above. `share` is the fraction of the width the centred card takes; the
  // flat zone matches it so the centred card is never bent, only neighbours.
  const portrait = stageWidth < 900
  const share = portrait ? 0.8 : stageWidth < 1280 ? 0.8 : 0.64
  const ratio = portrait ? PORTRAIT_RATIO : LANDSCAPE_RATIO
  const designHeight = portrait ? 600 : 640

  const frame = useMemo(
    () => ({
      ratio,
      heightPct: portrait ? 86 : 66,
      heightCap: Math.round(Math.min(designHeight, (stageWidth * share) / ratio)),
      spacing: portrait ? 14 : 24,
      corner: 8,
      anchor: 50,
      offset: 0, // centred: equal gap above and below
    }),
    [ratio, portrait, designHeight, stageWidth, share],
  )
  const curve = useMemo(
    () => ({ flatPct: Math.round(share * 100), edgeScale: 1.5 }),
    [share],
  )

  return (
    <section className='relative overflow-hidden'>
      <div className='pointer-events-none absolute inset-0 z-0'>
        {linePositions.map((position, index) => (
          <div
            key={index}
            className='absolute top-0 bottom-0 w-px bg-linear-to-b from-transparent via-black/20 to-transparent'
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

      <div
        ref={stageRef}
        className='relative z-10 h-[clamp(620px,100svh,880px)] w-full'
      >
        <CurveFlowCarousel
          slides={slides}
          frame={frame}
          curve={curve}
          drive={DRIVE}
          ariaLabel='Our services'
        />
      </div>
    </section>
  )
}

export default ServiceCaseStudyCard
