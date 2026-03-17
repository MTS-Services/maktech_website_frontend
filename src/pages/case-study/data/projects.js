// Shared project data — used by CaseStudyGrid (cards) and CaseStudyDetailPage (detail view)

const imgDesktop831 = '/our_work/image 7.png';
const imgMar1 = '/our_work/image 8.png';
const imgMockup182 = '/our_work/image 9.png';
const img01WebShowcase = '/our_work/Frame 2147226474.png';
const imgMockupImage11 = '/about1.png';
const imgDesktop512 = '/about2.png';
const imgDigiMarketing = '/about3.png';
const imgAI = '/about4.png';

export const ALL_PROJECTS = [
  {
    id: 1,
    slug: 'maktech-website-redesign',
    title: 'Maktech Website Redesign',
    subtitle:
      "A complete brand refresh and website redesign to reflect Maktech's new identity as a cutting-edge digital agency.",
    coverImage: imgDesktop831,
    galleryImages: [imgDesktop831, imgMar1, imgMockup182],
    tags: ['UI/UX', 'Graphic', 'Laravel'],
    categories: ['UI/UX', 'Laravel'],
    primaryCategory: 'Laravel',
    problem: {
      heading:
        "The existing website lacked cohesion and failed to communicate the brand's value effectively:",
      points: [
        "Outdated visual language that didn't reflect modern design standards",
        'Poor navigation structure leading to high bounce rates',
        'No clear call-to-action or conversion funnel',
        'Not optimized for mobile or tablet devices',
        'Content hierarchy was confusing and unengaging',
      ],
    },
    solution: {
      heading:
        'A full redesign was undertaken to create a modern, conversion-focused website with a strong visual identity.',
      points: [
        'New design system with consistent typography, colors, and components',
        'Restructured navigation with clear information hierarchy',
        'Responsive layout optimized for all screen sizes',
        'Animated sections to improve engagement and storytelling',
        'Performance-optimized build with Vite and lazy-loaded routes',
      ],
    },
    whyBest: {
      heading:
        'The redesigned Maktech website stands out as a benchmark for agency websites.',
      points: [
        'Pixel-perfect implementation from Figma designs',
        'Fast load times with optimized assets',
        'SEO-friendly structure and semantic HTML',
        'Accessible design following WCAG AA standards',
        'Modular component architecture for easy future updates',
      ],
    },
  },
  {
    id: 2,
    slug: 'flexible-freelance-platform',
    title: 'Flexible Freelance Platform',
    subtitle:
      'A MERN stack marketplace connecting skilled freelancers with businesses looking for top-tier digital talent.',
    coverImage: imgMar1,
    galleryImages: [imgMar1, imgDesktop831, img01WebShowcase],
    tags: ['UI/UX', 'Graphic', 'MERN'],
    categories: ['UI/UX', 'MERN'],
    primaryCategory: 'MERN',
    problem: {
      heading:
        'Existing freelance platforms were too complex and offered poor experiences for both clients and freelancers:',
      points: [
        'Difficult onboarding process for new freelancers',
        'No transparent pricing or project scoping tools',
        'Poor communication tools between clients and freelancers',
        'Limited filtering and discovery for finding talent',
        'No built-in milestone or payment tracking',
      ],
    },
    solution: {
      heading:
        'A streamlined MERN stack platform was built with a focus on simplicity and trust.',
      points: [
        'Simple 3-step onboarding for freelancers and clients',
        'Built-in project scoping wizard with budget estimator',
        'Real-time messaging and file sharing',
        'Advanced search with skill, rate, and availability filters',
        'Milestone-based payment system with escrow protection',
      ],
    },
    whyBest: {
      heading:
        'This platform redefines freelance hiring with transparency and ease of use.',
      points: [
        'End-to-end project management in one dashboard',
        'Verified freelancer profiles with portfolio showcase',
        'Dispute resolution and rating system',
        'Mobile-first responsive design',
        'Scalable Node.js backend with MongoDB Atlas',
      ],
    },
  },
  {
    id: 3,
    slug: 'ecommerce-dashboard',
    title: 'E-commerce Dashboard',
    subtitle:
      'A powerful Laravel-based analytics and management dashboard for e-commerce store owners.',
    coverImage: imgMockup182,
    galleryImages: [imgMockup182, imgDesktop512, imgDesktop831],
    tags: ['UI/UX', 'Graphic', 'Laravel'],
    categories: ['UI/UX', 'Laravel'],
    primaryCategory: 'Laravel',
    problem: {
      heading:
        'E-commerce store owners struggled to manage their business without real-time insights:',
      points: [
        'No centralized view of sales, orders, and inventory',
        'Manual reporting was time-consuming and error-prone',
        'Difficult to track customer behavior and buying patterns',
        'No alerts for low stock or pending orders',
        'Disconnected tools requiring multiple logins',
      ],
    },
    solution: {
      heading:
        'A comprehensive Laravel dashboard was built to unify all e-commerce operations.',
      points: [
        'Real-time sales and revenue charts with date filtering',
        'Order management with status tracking and notifications',
        'Inventory alerts for low stock and restocking reminders',
        'Customer analytics with purchase history and LTV',
        'Role-based access control for team members',
      ],
    },
    whyBest: {
      heading:
        'This dashboard gives e-commerce owners complete visibility and control.',
      points: [
        'Single-screen overview of all key business metrics',
        'Fast data loading with Laravel query optimization',
        'Export reports to PDF and Excel',
        'Multi-store support from one dashboard',
        'Fully customizable widgets and layouts',
      ],
    },
  },
  {
    id: 4,
    slug: 'corporate-portfolio',
    title: 'Corporate Portfolio',
    subtitle:
      'A sleek MERN-powered portfolio website for showcasing corporate projects, team, and services.',
    coverImage: img01WebShowcase,
    galleryImages: [img01WebShowcase, imgMar1, imgMockupImage11],
    tags: ['UI/UX', 'Graphic', 'MERN'],
    categories: ['UI/UX', 'MERN'],
    primaryCategory: 'MERN',
    problem: {
      heading:
        "The client's existing portfolio was static, outdated, and failed to attract new business:",
      points: [
        'No dynamic content management — every update required a developer',
        'Poor visual presentation of past projects',
        'No integrated contact or enquiry system',
        'Slow load times due to unoptimized assets',
        'Not ranking on search engines due to poor SEO',
      ],
    },
    solution: {
      heading:
        'A MERN stack portfolio with a headless CMS was built for maximum flexibility.',
      points: [
        'Admin panel for non-technical content updates',
        'Dynamic project showcase with filtering and lightbox',
        'Integrated contact form with email notifications',
        'Image compression and lazy loading for performance',
        'Server-side rendering for improved SEO',
      ],
    },
    whyBest: {
      heading:
        'This portfolio site drives real business results and is easy to maintain.',
      points: [
        'Modern design that impresses potential clients',
        'SEO-optimized with structured data markup',
        'Content updates in minutes, not days',
        'Fast page loads under 2 seconds globally',
        'Testimonials and case study sections for credibility',
      ],
    },
  },
  {
    id: 5,
    slug: 'real-estate-showcase',
    title: 'Real Estate Showcase',
    subtitle:
      'A CMS-driven real estate website allowing agencies to list, filter, and showcase properties beautifully.',
    coverImage: imgMockupImage11,
    galleryImages: [imgMockupImage11, imgDesktop512, imgMockup182],
    tags: ['UI/UX', 'Graphic', 'CMS'],
    categories: ['UI/UX', 'CMS'],
    primaryCategory: 'CMS',
    problem: {
      heading:
        'Real estate agencies were losing leads due to poor online property presentation:',
      points: [
        'No high-quality image galleries or virtual tour support',
        'Property listings were hard to filter and search',
        'Mobile experience was broken and unusable',
        'Lead capture forms had low conversion rates',
        'No integration with maps or location data',
      ],
    },
    solution: {
      heading:
        'A feature-rich CMS website was built to showcase properties and capture qualified leads.',
      points: [
        'Full-screen image galleries with zoom and swipe support',
        'Advanced property search with price, location, and type filters',
        'Fully responsive mobile-first layout',
        'Optimized lead forms with instant agent notification',
        'Integrated Google Maps with property markers',
      ],
    },
    whyBest: {
      heading:
        'This real estate website converts visitors into enquiries more effectively than competitors.',
      points: [
        'Visually stunning property cards with hover effects',
        'One-click enquiry from listing pages',
        'SEO-optimized property pages for local search',
        'Fast CMS updates for new listings without developer help',
        'Analytics dashboard for tracking listing performance',
      ],
    },
  },
  {
    id: 6,
    slug: 'property-discovery-app',
    title: 'Property Discovery App',
    subtitle:
      'A Flutter mobile app for discovering and comparing properties with an intuitive map-first interface.',
    coverImage: imgDesktop512,
    galleryImages: [imgDesktop512, imgMockupImage11, imgMar1],
    tags: ['UI/UX', 'Graphic', 'Flutter'],
    categories: ['UI/UX', 'Flutter'],
    primaryCategory: 'Flutter',
    problem: {
      heading:
        'Property seekers found it difficult to discover and compare properties on existing mobile apps:',
      points: [
        'Cluttered interfaces overwhelming users with too much data',
        'Map-based search was slow and inaccurate',
        'No comparison tool to evaluate multiple properties',
        'Poor offline support for viewing saved properties',
        'Notifications for new listings were unreliable',
      ],
    },
    solution: {
      heading:
        'A Flutter app was built with a map-first approach and streamlined UX.',
      points: [
        'Interactive map as the primary search interface',
        'Side-by-side property comparison with swipe gestures',
        'Offline-first architecture with local caching',
        'Push notifications for new listings matching saved searches',
        'Clean card-based UI with essential details at a glance',
      ],
    },
    whyBest: {
      heading:
        'This app delivers the smoothest property discovery experience on mobile.',
      points: [
        'Flutter cross-platform — runs natively on iOS and Android',
        'Map-first design reduces search time by 40%',
        'Comparison feature unique among competitors',
        'Sub-second load times with smart caching',
        'Intuitive gestures requiring no onboarding tutorial',
      ],
    },
  },
  {
    id: 7,
    slug: 'seo-growth-campaign',
    title: 'SEO Growth Campaign',
    subtitle:
      'A full-funnel digital marketing strategy that tripled organic traffic and doubled lead generation for a B2B SaaS company.',
    coverImage: imgDigiMarketing,
    galleryImages: [imgDigiMarketing, imgMar1, imgMockup182],
    tags: ['SEO', 'Content', 'Digital Marketing'],
    categories: ['Digital Marketing'],
    primaryCategory: 'Digital Marketing',
    problem: {
      heading:
        'The client had strong product-market fit but zero online visibility:',
      points: [
        'Domain authority below 10 with almost no backlinks',
        'Blog content was thin, unoptimized, and rarely updated',
        'No structured keyword strategy or content calendar',
        'Paid ads were the only traffic source — expensive and unsustainable',
        'Competitors dominated first-page rankings for core keywords',
      ],
    },
    solution: {
      heading:
        'A comprehensive SEO and content marketing program was launched to build sustainable organic growth.',
      points: [
        'Full technical SEO audit and site speed optimization',
        'Keyword cluster strategy targeting 120+ high-intent terms',
        'Content calendar with 16 long-form articles per month',
        'Link-building outreach securing 40+ high-DA backlinks',
        'Email nurture sequences to convert organic visitors',
      ],
    },
    whyBest: {
      heading:
        'This campaign delivered measurable ROI with compounding long-term results.',
      points: [
        '3x organic traffic increase within 6 months',
        'Page 1 rankings for 35 target keywords',
        '2x improvement in qualified lead volume',
        '60% reduction in cost-per-lead vs. paid channels',
        'Fully documented playbook for the client to continue in-house',
      ],
    },
  },
  {
    id: 8,
    slug: 'ai-document-assistant',
    title: 'AI Document Assistant',
    subtitle:
      'An AI-powered SaaS tool that lets teams upload, query, and summarize documents using natural language.',
    coverImage: imgAI,
    galleryImages: [imgAI, imgDesktop512, img01WebShowcase],
    tags: ['AI', 'NLP', 'SaaS'],
    categories: ['AI'],
    primaryCategory: 'AI',
    problem: {
      heading:
        'Knowledge workers were drowning in documents with no efficient way to extract insights:',
      points: [
        'Teams spent hours manually searching through PDFs and reports',
        'Critical information buried in 100+ page documents',
        'No way to query multiple documents simultaneously',
        'Onboarding new employees required weeks of document review',
        'Existing search tools returned irrelevant keyword matches',
      ],
    },
    solution: {
      heading:
        'An AI assistant was built using retrieval-augmented generation (RAG) to make documents instantly queryable.',
      points: [
        'Drag-and-drop upload supporting PDF, DOCX, and TXT formats',
        'Vector embeddings for semantic search across all documents',
        'Natural language Q&A with cited source passages',
        'Auto-generated summaries for any uploaded file',
        'Role-based access so teams only see permitted documents',
      ],
    },
    whyBest: {
      heading:
        'This AI assistant fundamentally changes how teams interact with their knowledge base.',
      points: [
        'Answers in seconds vs. hours of manual searching',
        'Accurate citations prevent hallucinations and build trust',
        'Works across 50+ document types and languages',
        'SOC 2 compliant data handling for enterprise customers',
        'Custom fine-tuning available for domain-specific terminology',
      ],
    },
  },
];

export const getProjectBySlug = (slug) =>
  ALL_PROJECTS.find((p) => p.slug === slug) ?? null;
