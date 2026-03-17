/**
 * PricingPlans — Tabbed pricing cards section.
 * Tabs filter plans by service category; Standard plan is highlighted.
 */
import { useState, useId } from 'react';
import { FaCheck } from 'react-icons/fa';

const TABS = [
  'UI/UX',
  'MERN',
  'Laravel',
  'Flutter',
  'CMS',
  'Digital Marketing',
  'AI',
];

/* ─── Plan data ─────────────────────────────────────────────────────────────── */
const PLANS = {
  'UI/UX': [
    {
      id: 'basic',
      name: 'Basic',
      price: '$1,500',
      subtitle: 'Optimized for budget',
      popular: false,
      features: [
        'Up to 5 screen designs',
        'Wireframes & user flows',
        'Responsive layouts',
        '2 rounds of revisions',
        'Figma source files',
        '7-day turnaround',
        'Email support',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$3,000',
      subtitle: 'Best for growing teams',
      popular: true,
      features: [
        'Up to 15 screen designs',
        'Full UI kit & style guide',
        'Interactive prototype',
        '5 rounds of revisions',
        'Figma + dev handoff docs',
        '14-day turnaround',
        'Priority support',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: '$5,500',
      subtitle: 'Enterprise-grade design',
      popular: false,
      features: [
        'Unlimited screen designs',
        'Custom design system',
        'Full interactive prototype',
        'Unlimited revisions',
        'Dev-ready specs & assets',
        '21-day turnaround',
        'Dedicated manager',
      ],
    },
  ],
  MERN: [
    {
      id: 'basic',
      name: 'Basic',
      price: '$2,000',
      subtitle: 'Optimized for budget',
      popular: false,
      features: [
        'Single-page application',
        'Up to 5 REST endpoints',
        'MongoDB integration',
        'JWT authentication',
        'Basic React UI',
        '2-week delivery',
        'Email support',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$4,500',
      subtitle: 'Full-stack application',
      popular: true,
      features: [
        'Multi-page React app',
        'Up to 20 REST endpoints',
        'MongoDB + Redis cache',
        'Role-based access control',
        'WebSocket real-time',
        '4-week delivery',
        'Priority support',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: '$9,000',
      subtitle: 'Scalable enterprise app',
      popular: false,
      features: [
        'Microservices architecture',
        'Unlimited endpoints',
        'Multi-database support',
        'OAuth2 + MFA',
        'GraphQL + REST API',
        '8-week delivery',
        'Dedicated team',
      ],
    },
  ],
  Laravel: [
    {
      id: 'basic',
      name: 'Basic',
      price: '$1,800',
      subtitle: 'Optimized for budget',
      popular: false,
      features: [
        'Up to 5 Eloquent models',
        'Blade templating',
        'MySQL database',
        'Basic Laravel auth',
        'REST API setup',
        '2-week delivery',
        'Email support',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$4,000',
      subtitle: 'Production-ready app',
      popular: true,
      features: [
        'Up to 20 Eloquent models',
        'Livewire + Alpine.js UI',
        'MySQL + Redis',
        'Roles & permissions',
        'Queue & job processing',
        '4-week delivery',
        'Priority support',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: '$8,500',
      subtitle: 'Enterprise PHP solution',
      popular: false,
      features: [
        'Unlimited models & routes',
        'Laravel Octane optimized',
        'Multi-database + search',
        'SSO + MFA integration',
        'Microservices support',
        '8-week delivery',
        'Dedicated team',
      ],
    },
  ],
  Flutter: [
    {
      id: 'basic',
      name: 'Basic',
      price: '$2,500',
      subtitle: 'Optimized for budget',
      popular: false,
      features: [
        'iOS & Android app',
        'Up to 5 screens',
        'Firebase integration',
        'Basic authentication',
        'Push notifications',
        '3-week delivery',
        'Email support',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$5,000',
      subtitle: 'Polished mobile app',
      popular: true,
      features: [
        'iOS, Android & Web',
        'Up to 15 screens',
        'Firebase + REST API',
        'Social authentication',
        'In-app payments',
        '5-week delivery',
        'Priority support',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: '$10,000',
      subtitle: 'Enterprise mobile solution',
      popular: false,
      features: [
        'iOS, Android, Web & Desktop',
        'Unlimited screens',
        'Custom backend integration',
        'Offline sync & caching',
        'CI/CD pipeline',
        '8-week delivery',
        'Dedicated team',
      ],
    },
  ],
  CMS: [
    {
      id: 'basic',
      name: 'Basic',
      price: '$800',
      subtitle: 'Optimized for budget',
      popular: false,
      features: [
        'WordPress setup',
        'Up to 5 pages',
        'Theme customization',
        'Essential plugins (SEO, forms)',
        'Mobile responsive',
        '1-week delivery',
        'Email support',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$2,000',
      subtitle: 'Business-ready CMS',
      popular: true,
      features: [
        'Custom WordPress theme',
        'Up to 15 pages',
        'WooCommerce integration',
        'SEO & performance setup',
        'Custom post types',
        '3-week delivery',
        'Priority support',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: '$4,500',
      subtitle: 'Headless enterprise CMS',
      popular: false,
      features: [
        'Headless CMS (Strapi/Sanity)',
        'Unlimited pages & content',
        'Custom plugin development',
        'Advanced SEO implementation',
        'CDN & performance tuning',
        '6-week delivery',
        'Dedicated team',
      ],
    },
  ],
  'Digital Marketing': [
    {
      id: 'basic',
      name: 'Basic',
      price: '$500/mo',
      subtitle: 'Optimized for budget',
      popular: false,
      features: [
        'SEO audit & roadmap',
        'Social media setup',
        '5 posts per month',
        'Google Analytics setup',
        'Monthly performance report',
        '1-week onboarding',
        'Email support',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$1,200/mo',
      subtitle: 'Growth-focused marketing',
      popular: true,
      features: [
        'Full on-page SEO',
        'Social media management',
        '15 posts per month',
        'Google & Meta Ads',
        'Bi-weekly strategy calls',
        '1-week onboarding',
        'Priority support',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: '$2,500/mo',
      subtitle: 'Enterprise digital marketing',
      popular: false,
      features: [
        'Technical SEO + link building',
        'Full social media suite',
        'Unlimited posts & content',
        'Multi-channel ad management',
        'Weekly reporting & strategy',
        '1-week onboarding',
        'Dedicated manager',
      ],
    },
  ],
  AI: [
    {
      id: 'basic',
      name: 'Basic',
      price: '$3,000',
      subtitle: 'Optimized for budget',
      popular: false,
      features: [
        'AI chatbot integration',
        'OpenAI / Gemini API',
        'Up to 2 AI use cases',
        'Basic NLP pipeline',
        'API documentation',
        '3-week delivery',
        'Email support',
      ],
    },
    {
      id: 'standard',
      name: 'Standard',
      price: '$6,500',
      subtitle: 'Custom AI integration',
      popular: true,
      features: [
        'Custom AI model fine-tuning',
        'RAG pipeline setup',
        'Up to 5 AI use cases',
        'Vector database integration',
        'Analytics dashboard',
        '6-week delivery',
        'Priority support',
      ],
    },
    {
      id: 'business',
      name: 'Business',
      price: '$15,000',
      subtitle: 'Enterprise AI solution',
      popular: false,
      features: [
        'Custom LLM development',
        'MLOps pipeline & monitoring',
        'Unlimited AI use cases',
        'On-premise deployment',
        'Continuous model training',
        '10-week delivery',
        'Dedicated AI team',
      ],
    },
  ],
};

/* ─── Plan card ─────────────────────────────────────────────────────────────── */
const PlanCard = ({ plan }) => (
  <article
    aria-label={`${plan.name} plan${plan.popular ? ', most popular' : ''}`}
    className={`relative rounded-2xl p-6 flex flex-col gap-5 border transition-all duration-300 hover:-translate-y-1 ${
      plan.popular
        ? 'border-orange-bg-cta bg-[#1e1e1e] shadow-[0_0_48px_-8px_rgba(255,101,51,0.3)]'
        : 'border-white/10 bg-[#1e1e1e] hover:border-white/20'
    }`}
  >
    {plan.popular && (
      <div className='absolute -top-3.5 left-5 z-10'>
        <span className='bg-orange-bg-cta text-white text-xs font-semibold px-3 py-1 rounded-md whitespace-nowrap tracking-wide'>
          Most popular
        </span>
      </div>
    )}

    {/* Plan name + price */}
    <div className='flex items-center justify-between pt-1'>
      <span className='bg-[#2a2a2a] text-white/90 text-sm font-medium px-3.5 py-1.5 rounded-lg'>
        {plan.name}
      </span>
      <span className='text-white font-bold text-2xl xl:text-3xl tracking-tight'>
        {plan.price}
      </span>
    </div>

    {/* Subtitle with left orange accent */}
    <p className='border-l-2 border-orange-bg-cta pl-3 text-white-bg-secondary text-base leading-snug'>
      {plan.subtitle}
    </p>

    <hr className='border-white/10' />

    {/* Feature list */}
    <ul
      className='flex flex-col gap-3 flex-1'
      aria-label={`${plan.name} plan features`}
    >
      {plan.features.map((feature, i) => (
        <li key={i} className='flex items-center gap-2.5 text-sm text-white/80'>
          <FaCheck
            className='shrink-0 text-orange-bg-cta'
            size={11}
            aria-hidden='true'
          />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    {/* CTA */}
    <a
      href='/contact'
      className={`mt-2 block w-full text-center py-3 rounded-xl font-semibold text-base transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-bg-cta ${
        plan.popular
          ? 'bg-orange-bg-cta text-white hover:bg-[#e5501a] hover:shadow-[0_4px_20px_rgba(255,101,51,0.4)]'
          : 'border border-orange-bg-cta text-orange-bg-cta hover:bg-orange-bg-cta hover:text-white'
      }`}
      aria-label={`Get started with the ${plan.name} plan`}
    >
      Get Started
    </a>
  </article>
);

/* ─── Section ───────────────────────────────────────────────────────────────── */
const PricingPlans = () => {
  const [activeTab, setActiveTab] = useState('UI/UX');
  const uid = useId();

  // Roving tabindex keyboard navigation (WAI-ARIA tabs pattern)
  const handleKeyDown = (e, idx) => {
    if (e.key === 'ArrowRight') setActiveTab(TABS[(idx + 1) % TABS.length]);
    else if (e.key === 'ArrowLeft')
      setActiveTab(TABS[(idx - 1 + TABS.length) % TABS.length]);
  };

  return (
    <section
      aria-labelledby={`${uid}-heading`}
      className='relative w-full overflow-hidden bg-[#111111] py-16 xl:py-20 2xl:py-24'
    >
      {/* Visually hidden heading for SEO / screen readers */}
      <h2 id={`${uid}-heading`} className='sr-only'>
        Service Pricing Plans
      </h2>

      {/* Ambient glow – top left */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute left-0 top-0 z-0'
        style={{
          width: '600px',
          height: '600px',
          background:
            'radial-gradient(ellipse at top left, rgba(255,101,51,0.18) 0%, transparent 65%)',
        }}
      />

      {/* Ambient glow – top right */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute right-0 top-0 z-0'
        style={{
          width: '500px',
          height: '500px',
          background:
            'radial-gradient(ellipse at top right, rgba(255,101,51,0.12) 0%, transparent 65%)',
        }}
      />

      {/* Scoped animated vertical lines (not global AnimatedLines which is fixed) */}
      <div
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 z-0 overflow-hidden'
      >
        {[12, 30, 50, 70, 88].map((pos, i) => (
          <div
            key={i}
            className='absolute top-0 bottom-0 w-px'
            style={{
              left: `${pos}%`,
              background:
                'linear-gradient(to bottom, transparent, rgba(255,101,51,0.10) 40%, rgba(255,101,51,0.05) 60%, transparent)',
            }}
          >
            <div
              className='absolute w-0.5 h-16 rounded-full'
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                background:
                  'linear-gradient(to bottom, transparent, #ff6533 50%, transparent)',
                opacity: 0.35,
                animation: `lineDrop ${7 + i * 1.5}s linear infinite`,
                animationDelay: `${i * 1.4}s`,
              }}
            />
            <div
              className='absolute w-0.5 h-10 rounded-full'
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                background:
                  'linear-gradient(to bottom, transparent, #ff6533 50%, transparent)',
                opacity: 0.2,
                animation: `lineDrop ${9 + i * 1.2}s linear infinite`,
                animationDelay: `${i * 1.4 + 3.5}s`,
              }}
            />
          </div>
        ))}
      </div>

      <div className='container mx-auto px-5 xl:px-8 2xl:px-12 relative z-10'>
        {/* Tab switcher */}
        <div className='flex justify-start xl:justify-center mb-12 overflow-x-auto scrollbar-none'>
          <div
            role='tablist'
            aria-label='Select service category'
            className='inline-flex items-center gap-1 bg-[#1a1a1a] border border-white/10 rounded-2xl p-1.5 min-w-max'
          >
            {TABS.map((tab, i) => (
              <button
                key={tab}
                role='tab'
                id={`${uid}-tab-${i}`}
                aria-selected={activeTab === tab}
                aria-controls={`${uid}-panel`}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-orange-bg-cta ${
                  activeTab === tab
                    ? 'bg-orange-bg-cta text-white shadow-sm'
                    : 'text-white/60 hover:text-white/90 hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Stable tabpanel container (keeps id for ARIA) */}
        <div
          id={`${uid}-panel`}
          role='tabpanel'
          aria-labelledby={`${uid}-tab-${TABS.indexOf(activeTab)}`}
        >
          {/* key remount triggers fadeSlideUp on tab switch */}
          <div
            key={activeTab}
            className='grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 pt-6 max-w-5xl mx-auto'
            style={{
              animation: 'fadeSlideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both',
            }}
          >
            {PLANS[activeTab].map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
