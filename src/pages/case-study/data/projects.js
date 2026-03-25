// Shared project data — used by CaseStudyGrid (cards) and CaseStudyDetailPage (detail view)
// High-quality images from Unsplash
const imgUiux1 = "/uiux1.png";
const imgUiux2 = "/uiux2.png";
const imgUiux3 = "/uiux3.png";
const imgUiux4 = "/uiux5.png";

const imgMern1 = "/mern1.jpg";
const imgMern2 = "/mern2.jpg";
const imgMern3 = "/mern3.jpg";
const imgMern4 = "/mern4.jpg";

const imgLaravel1 =
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80";
const imgLaravel2 =
  "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&q=80";
const imgLaravel3 =
  "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80";
const imgLaravel4 =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80";

const imgFlutter1 =
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&q=80";
const imgFlutter2 =
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&q=80";
const imgFlutter3 =
  "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=1200&q=80";
const imgFlutter4 =
  "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=1200&q=80";

const imgCms1 =
  "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80";
const imgCms2 =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80";
const imgCms3 =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=80";
const imgCms4 =
  "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80";
const imgCms5 =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80";
const imgCms6 =
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80";

const imgDigital1 =
  "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=1200&q=80";
const imgDigital2 =
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&q=80";
const imgDigital3 =
  "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&q=80";

const imgAi1 =
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80";
const imgAi2 =
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80";
const imgAi3 =
  "https://images.unsplash.com/photo-1655635949384-f737c5133dfe?w=1200&q=80";

export const ALL_PROJECTS = [
  // ============================================
  // UI/UX PROJECTS (4)
  // ============================================
  {
    id: 1,
    slug: "fintech-mobile-banking-app",
    title: "FinTech Mobile Banking App",
    subtitle:
      "Complete UI/UX redesign of a mobile banking app focusing on accessibility and user trust.",
    coverImage: imgUiux1,
    galleryImages: [imgUiux1, imgUiux2, imgUiux3],
    tags: ["UI/UX", "Mobile", "FinTech"],
    categories: ["UI/UX"],
    primaryCategory: "UI/UX",
    problem: {
      heading:
        "The existing banking app had poor usability and low customer satisfaction scores:",
      points: [
        "Complex navigation requiring 6+ taps to complete basic transactions",
        "Outdated visual design undermining user trust",
        "Accessibility issues affecting 15% of user base",
        "High drop-off rates during onboarding (68%)",
        "No dark mode or customization options",
      ],
    },
    solution: {
      heading:
        "A comprehensive UX audit and redesign prioritizing simplicity and accessibility.",
      points: [
        "Streamlined navigation reducing transaction steps by 60%",
        "Modern, trust-building visual language with security indicators",
        "WCAG AA compliant design with screen reader support",
        "Progressive onboarding cutting drop-off to 22%",
        "Dark mode, large text options, and personalized dashboard",
      ],
    },
    whyBest: {
      heading:
        "The redesigned app achieved industry-leading user satisfaction scores.",
      points: [
        "NPS score increased from 32 to 78",
        "App Store rating improved from 3.2 to 4.7 stars",
        "Transaction completion rate up 85%",
        "Customer support calls reduced by 40%",
        'Won "Best Banking App UX" award 2024',
      ],
    },
  },
  {
    id: 2,
    slug: "healthcare-patient-portal",
    title: "Healthcare Patient Portal",
    subtitle:
      "User-centered design for a healthcare platform enabling seamless appointment booking and medical records access.",
    coverImage: imgUiux2,
    galleryImages: [imgUiux2, imgUiux3, imgUiux4],
    tags: ["UI/UX", "Healthcare", "Web"],
    categories: ["UI/UX"],
    primaryCategory: "UI/UX",
    problem: {
      heading:
        "Patients struggled with the existing portal, leading to high call center volume:",
      points: [
        "Confusing appointment booking flow with multiple dead ends",
        "Medical records buried in complex menu structures",
        "No mobile-responsive design for on-the-go access",
        "Prescription refill requests requiring phone calls",
        "Poor information architecture causing user frustration",
      ],
    },
    solution: {
      heading:
        "A patient-first redesign focusing on clarity, speed, and mobile accessibility.",
      points: [
        "One-click appointment booking with calendar sync",
        "Dashboard view of medical records, prescriptions, and results",
        "Fully responsive mobile-first design",
        "In-app prescription refill with pharmacy integration",
        "Clear visual hierarchy and plain-language labeling",
      ],
    },
    whyBest: {
      heading:
        "This portal empowers patients and reduces administrative burden.",
      points: [
        "Call center volume decreased by 52%",
        "Appointment no-shows reduced by 35%",
        "Patient satisfaction rating: 4.6/5",
        "Mobile usage increased from 18% to 64%",
        "HIPAA compliant with SOC 2 Type II certification",
      ],
    },
  },
  {
    id: 3,
    slug: "elearning-platform-redesign",
    title: "E-Learning Platform Redesign",
    subtitle:
      "Complete UI/UX overhaul of an online learning platform to improve engagement and course completion rates.",
    coverImage: imgUiux3,
    galleryImages: [imgUiux3, imgUiux4, imgUiux1],
    tags: ["UI/UX", "EdTech", "Web"],
    categories: ["UI/UX"],
    primaryCategory: "UI/UX",
    problem: {
      heading:
        "Low course completion rates and poor student engagement indicated serious UX issues:",
      points: [
        "Course navigation was confusing with no progress indicators",
        "Video player lacked essential features (speed control, transcripts)",
        "No gamification or motivational elements",
        "Search and discovery made finding relevant courses difficult",
        "Discussion forums were hidden and rarely used",
      ],
    },
    solution: {
      heading:
        "A learner-centric redesign incorporating gamification and intuitive navigation.",
      points: [
        "Visual progress tracking with completion badges and certificates",
        "Enhanced video player with speed control, transcripts, and note-taking",
        "XP points, streaks, and leaderboards for motivation",
        "AI-powered course recommendations and smart search",
        "Integrated discussion threads visible alongside course content",
      ],
    },
    whyBest: {
      heading:
        "The redesign dramatically improved learning outcomes and platform metrics.",
      points: [
        "Course completion rate jumped from 23% to 67%",
        "Daily active users increased by 140%",
        "Average session time doubled from 18 to 37 minutes",
        "Discussion participation up 320%",
        "Received multiple EdTech design awards",
      ],
    },
  },
  {
    id: 4,
    slug: "restaurant-ordering-system",
    title: "Restaurant Ordering System",
    subtitle:
      "Intuitive UI/UX design for a contactless restaurant ordering and payment system.",
    coverImage: imgUiux4,
    galleryImages: [imgUiux4, imgUiux1, imgUiux2],
    tags: ["UI/UX", "Mobile", "Food Tech"],
    categories: ["UI/UX"],
    primaryCategory: "UI/UX",
    problem: {
      heading:
        "Restaurants needed a contactless ordering solution that customers would actually use:",
      points: [
        "Existing QR code ordering systems had poor UI and high abandonment",
        "Menu navigation was cumbersome on mobile devices",
        "No visual representation of dishes frustrating customers",
        "Payment integration was buggy and untrusted",
        "No customization options for dietary preferences",
      ],
    },
    solution: {
      heading:
        "A delightful ordering experience designed for speed and visual appeal.",
      points: [
        "Instant QR code scan to mobile-optimized menu in under 2 seconds",
        "High-quality food photography with zoom and ingredient details",
        "Swipeable menu categories with smart search and filters",
        "One-tap payment with Apple Pay, Google Pay, and card support",
        "Dietary tags, allergen warnings, and customization options",
      ],
    },
    whyBest: {
      heading:
        "This system became the preferred ordering method for 80% of diners.",
      points: [
        "Order completion rate: 92% (vs. 34% with previous system)",
        "Average order value increased by 28%",
        "Table turnover time reduced by 15 minutes",
        "Customer satisfaction rating: 4.8/5",
        "Deployed in 200+ restaurants within 6 months",
      ],
    },
  },

  // ============================================
  // MERN STACK PROJECTS (4)
  // ============================================
  {
    id: 5,
    slug: "project-management-saas",
    title: "Project Management SaaS",
    subtitle:
      "Full-stack MERN application for team collaboration, task tracking, and project analytics.",
    coverImage: imgMern1,
    galleryImages: [imgMern1, imgMern2, imgMern3],
    tags: ["MERN", "SaaS", "Productivity"],
    categories: ["MERN"],
    primaryCategory: "MERN",
    problem: {
      heading:
        "Teams were using fragmented tools for project management, causing inefficiency:",
      points: [
        "No single source of truth for project status and deadlines",
        "Manual reporting consuming hours of manager time weekly",
        "Poor visibility into team workload and capacity",
        "File sharing scattered across email and cloud drives",
        "No real-time collaboration or notification system",
      ],
    },
    solution: {
      heading:
        "A unified MERN stack platform combining tasks, files, chat, and analytics.",
      points: [
        "Kanban boards, Gantt charts, and list views in one interface",
        "Automated report generation with customizable dashboards",
        "Real-time workload visualization and resource allocation",
        "Integrated file storage with version control",
        "WebSocket-powered real-time updates and notifications",
      ],
    },
    whyBest: {
      heading:
        "This platform eliminated tool sprawl and boosted team productivity.",
      points: [
        "Replaced an average of 4.3 tools per team",
        "Project delivery time reduced by 32%",
        "Manager reporting time cut from 8 hours to 30 minutes/week",
        "Scales to 100,000+ users with MongoDB Atlas and Redis caching",
        "SOC 2 compliant with enterprise-grade security",
      ],
    },
  },
  {
    id: 6,
    slug: "social-media-analytics-dashboard",
    title: "Social Media Analytics Dashboard",
    subtitle:
      "MERN-powered analytics platform aggregating insights from multiple social media channels.",
    coverImage: imgMern2,
    galleryImages: [imgMern2, imgMern3, imgMern4],
    tags: ["MERN", "Analytics", "Social Media"],
    categories: ["MERN"],
    primaryCategory: "MERN",
    problem: {
      heading:
        "Social media managers lacked unified insights across platforms:",
      points: [
        "Logging into 5+ platforms daily to gather metrics",
        "Manual data export and spreadsheet compilation",
        "No historical trend analysis or forecasting",
        "Difficult to identify top-performing content",
        "Reporting to stakeholders was time-consuming and error-prone",
      ],
    },
    solution: {
      heading:
        "An all-in-one dashboard pulling data from all major social platforms via API.",
      points: [
        "OAuth integration with Facebook, Instagram, Twitter, LinkedIn, TikTok",
        "Unified metrics dashboard with engagement, reach, and growth KPIs",
        "Historical trend charts with period-over-period comparisons",
        "AI-powered content recommendations based on past performance",
        "One-click PDF and CSV export for stakeholder reports",
      ],
    },
    whyBest: {
      heading:
        "This dashboard saves hours weekly and delivers actionable insights.",
      points: [
        "Reporting time reduced from 3 hours to 5 minutes",
        "Engagement rates improved 45% using AI recommendations",
        "Real-time alerts for viral content and negative sentiment",
        "Used by 2,000+ agencies and brands",
        "Integration with 12 social platforms and growing",
      ],
    },
  },
  {
    id: 7,
    slug: "online-exam-proctoring-system",
    title: "Online Exam Proctoring System",
    subtitle:
      "Secure MERN application for administering and proctoring online exams with AI monitoring.",
    coverImage: imgMern3,
    galleryImages: [imgMern3, imgMern4, imgMern1],
    tags: ["MERN", "EdTech", "AI"],
    categories: ["MERN"],
    primaryCategory: "MERN",
    problem: {
      heading:
        "Educational institutions needed secure remote exam solutions during the shift to online learning:",
      points: [
        "Traditional proctoring was impossible for remote students",
        "Existing tools were expensive and difficult to set up",
        "No way to prevent cheating or monitor exam integrity",
        "Students reported privacy concerns with invasive monitoring",
        "Educators lacked analytics on exam performance and difficulty",
      ],
    },
    solution: {
      heading:
        "A privacy-conscious proctoring system using AI and behavioral analytics.",
      points: [
        "Browser lockdown preventing tab switching and external apps",
        "AI webcam monitoring detecting unusual behavior patterns",
        "Randomized question pools and time limits per question",
        "Privacy-first approach with on-device processing and consent",
        "Instructor dashboard with flagged incidents and performance analytics",
      ],
    },
    whyBest: {
      heading:
        "This system balances security, privacy, and ease of use better than competitors.",
      points: [
        "Deployed for 50,000+ students across 40 institutions",
        "Cheating incidents reduced by 87% compared to unproctored exams",
        "Privacy rating: 4.5/5 from student surveys",
        "Setup time for instructors: under 10 minutes",
        "FERPA and GDPR compliant data handling",
      ],
    },
  },
  {
    id: 8,
    slug: "event-ticketing-platform",
    title: "Event Ticketing Platform",
    subtitle:
      "End-to-end MERN ticketing system with QR code validation, seat selection, and payment processing.",
    coverImage: imgMern4,
    galleryImages: [imgMern4, imgMern1, imgMern2],
    tags: ["MERN", "Events", "E-commerce"],
    categories: ["MERN"],
    primaryCategory: "MERN",
    problem: {
      heading:
        "Event organizers were paying high fees to ticketing platforms and lacked control:",
      points: [
        "Commission fees ranging from 10-20% per ticket",
        "No customization of ticketing flow or branding",
        "Limited analytics on attendee demographics",
        "Difficult to handle refunds and ticket transfers",
        "No integration with event management tools",
      ],
    },
    solution: {
      heading:
        "A white-label ticketing platform giving organizers full control and lower fees.",
      points: [
        "Custom branding, domains, and checkout experience",
        "Interactive seat map with real-time availability",
        "Stripe and PayPal integration with 2% flat fee",
        "QR code tickets with mobile wallet integration",
        "Built-in email marketing and attendee CRM",
      ],
    },
    whyBest: {
      heading:
        "This platform empowers organizers to own their ticketing experience.",
      points: [
        "Organizers save an average of $12,000 per event vs. competitors",
        "Used for 500+ events selling 1M+ tickets",
        "Load-tested to handle 10,000 concurrent buyers",
        "Mobile check-in app for instant QR validation",
        "Analytics dashboard with revenue forecasting",
      ],
    },
  },

  // ============================================
  // LARAVEL PROJECTS (4)
  // ============================================
  {
    id: 9,
    slug: "enterprise-crm-system",
    title: "Enterprise CRM System",
    subtitle:
      "Scalable Laravel-based CRM for managing leads, customers, and sales pipelines across enterprise teams.",
    coverImage: imgLaravel1,
    galleryImages: [imgLaravel1, imgLaravel2, imgLaravel3],
    tags: ["Laravel", "CRM", "Enterprise"],
    categories: ["Laravel"],
    primaryCategory: "Laravel",
    problem: {
      heading:
        "Sales teams were drowning in spreadsheets with no centralized customer data:",
      points: [
        "Customer information scattered across email, spreadsheets, and notes",
        "No visibility into sales pipeline or deal stages",
        "Manual follow-up reminders leading to missed opportunities",
        "Reporting required hours of manual data aggregation",
        "No integration with email or calendar systems",
      ],
    },
    solution: {
      heading:
        "A comprehensive Laravel CRM with automation, reporting, and integrations.",
      points: [
        "Centralized customer database with full interaction history",
        "Visual pipeline view with drag-and-drop deal stages",
        "Automated email sequences and task reminders",
        "Real-time dashboards with sales forecasting",
        "Two-way sync with Gmail, Outlook, and Calendar",
      ],
    },
    whyBest: {
      heading:
        "This CRM transformed sales operations and accelerated deal velocity.",
      points: [
        "Sales cycle shortened by 28%",
        "Lead response time improved from 4 hours to 15 minutes",
        "Deal win rate increased from 18% to 31%",
        "Supports 5,000+ users with role-based permissions",
        "Mobile app for sales reps in the field",
      ],
    },
  },
  {
    id: 10,
    slug: "inventory-management-system",
    title: "Inventory Management System",
    subtitle:
      "Laravel warehouse and inventory tracking system with barcode scanning and supplier management.",
    coverImage: imgLaravel2,
    galleryImages: [imgLaravel2, imgLaravel3, imgLaravel4],
    tags: ["Laravel", "Inventory", "Logistics"],
    categories: ["Laravel"],
    primaryCategory: "Laravel",
    problem: {
      heading:
        "Warehouses were losing money due to poor inventory tracking and stock-outs:",
      points: [
        "Manual stock counts were inaccurate and time-consuming",
        "No real-time visibility into inventory levels across locations",
        "Frequent stock-outs and overstocking issues",
        "Purchase orders managed via email and phone calls",
        "No audit trail for inventory movements",
      ],
    },
    solution: {
      heading:
        "A Laravel-based system digitizing inventory from receiving to fulfillment.",
      points: [
        "Barcode and QR code scanning for instant item lookup",
        "Real-time inventory tracking across multiple warehouses",
        "Automated reorder points triggering purchase orders",
        "Supplier portal for PO management and invoicing",
        "Complete audit trail with user permissions and timestamps",
      ],
    },
    whyBest: {
      heading:
        "This system eliminated inventory headaches and improved cash flow.",
      points: [
        "Stock accuracy improved from 78% to 99.2%",
        "Stock-outs reduced by 85%",
        "Inventory carrying costs down 22%",
        "Stock count time reduced from 2 days to 3 hours",
        "Integrated with QuickBooks and Xero for accounting",
      ],
    },
  },
  {
    id: 11,
    slug: "learning-management-system",
    title: "Learning Management System",
    subtitle:
      "Full-featured Laravel LMS for creating, delivering, and tracking online courses and certifications.",
    coverImage: imgLaravel3,
    galleryImages: [imgLaravel3, imgLaravel4, imgLaravel1],
    tags: ["Laravel", "EdTech", "LMS"],
    categories: ["Laravel"],
    primaryCategory: "Laravel",
    problem: {
      heading:
        "Training departments lacked a modern platform for employee development:",
      points: [
        "Legacy LMS was clunky and rarely used by employees",
        "No way to create courses without technical knowledge",
        "Compliance training tracking was manual and error-prone",
        "No mobile access for remote or field employees",
        "Reporting was limited and not customizable",
      ],
    },
    solution: {
      heading:
        "An intuitive Laravel LMS with drag-and-drop course builder and mobile apps.",
      points: [
        "WYSIWYG course builder supporting video, quizzes, and SCORM",
        "Automated certification and compliance tracking",
        "Native iOS and Android apps for learning on-the-go",
        "Advanced analytics showing completion rates and skill gaps",
        "White-label options for customer training portals",
      ],
    },
    whyBest: {
      heading:
        "This LMS made corporate training engaging and measurably effective.",
      points: [
        "Course completion rates increased from 34% to 81%",
        "Time to create courses reduced by 70%",
        "Compliance reporting automated saving 40 hours/month",
        "Mobile usage represents 55% of all learning activity",
        "Used by Fortune 500 companies and SMBs alike",
      ],
    },
  },
  {
    id: 12,
    slug: "multi-vendor-marketplace",
    title: "Multi-Vendor Marketplace",
    subtitle:
      "Laravel-powered marketplace platform connecting multiple sellers with buyers, featuring vendor dashboards and commission management.",
    coverImage: imgLaravel4,
    galleryImages: [imgLaravel4, imgLaravel1, imgLaravel2],
    tags: ["Laravel", "E-commerce", "Marketplace"],
    categories: ["Laravel"],
    primaryCategory: "Laravel",
    problem: {
      heading:
        "Launching a marketplace required expensive custom development or limiting platforms:",
      points: [
        "Existing solutions lacked vendor management features",
        "No flexible commission structures or payout automation",
        "Poor vendor onboarding experience leading to drop-offs",
        "Limited product categorization and search capabilities",
        "No dispute resolution or review moderation tools",
      ],
    },
    solution: {
      heading:
        "A complete marketplace system with vendor portals, automated payouts, and admin controls.",
      points: [
        "Self-service vendor registration and product listing",
        "Flexible commission rules (flat, percentage, tiered)",
        "Automated weekly/monthly payouts via Stripe Connect",
        "Advanced product search with filters and facets",
        "Built-in messaging, reviews, and dispute resolution",
      ],
    },
    whyBest: {
      heading: "This marketplace platform enabled rapid launch and scaling.",
      points: [
        "From signup to first sale in under 48 hours",
        "Supports 10,000+ vendors with individual dashboards",
        "GMV of $50M+ processed in first year",
        "Vendor satisfaction rating: 4.6/5",
        "Multi-currency and multi-language support",
      ],
    },
  },

  // ============================================
  // FLUTTER PROJECTS (4)
  // ============================================
  {
    id: 13,
    slug: "fitness-tracking-app",
    title: "Fitness Tracking App",
    subtitle:
      "Cross-platform Flutter app for workout tracking, nutrition logging, and fitness goal achievement.",
    coverImage: imgFlutter1,
    galleryImages: [imgFlutter1, imgFlutter2, imgFlutter3],
    tags: ["Flutter", "Mobile", "Health"],
    categories: ["Flutter"],
    primaryCategory: "Flutter",
    problem: {
      heading:
        "Fitness apps were either too complex or lacked essential tracking features:",
      points: [
        "Competing apps required extensive manual data entry",
        "No integration with wearables or health platforms",
        "Meal tracking was tedious without barcode scanning",
        "No personalized workout recommendations",
        "Social features were missing, reducing motivation",
      ],
    },
    solution: {
      heading:
        "An intuitive Flutter app combining automation with social motivation.",
      points: [
        "Auto-sync with Apple Health, Google Fit, and popular wearables",
        "Barcode scanner for instant nutrition data lookup",
        "AI workout generator based on goals and available equipment",
        "Social feed for sharing progress and challenging friends",
        "Offline-first architecture with background sync",
      ],
    },
    whyBest: {
      heading: "This app achieved exceptional retention and user engagement.",
      points: [
        "30-day retention rate: 68% (industry average: 12%)",
        "Average 4.5 workouts logged per week per active user",
        "App Store and Play Store rating: 4.7/5",
        "Works seamlessly on both iOS and Android from single codebase",
        "Supports 15 languages with 500K+ downloads",
      ],
    },
  },
  {
    id: 14,
    slug: "delivery-driver-app",
    title: "Delivery Driver App",
    subtitle:
      "Flutter-based driver app with real-time route optimization, order management, and earnings tracking.",
    coverImage: imgFlutter2,
    galleryImages: [imgFlutter2, imgFlutter3, imgFlutter4],
    tags: ["Flutter", "Logistics", "Mobile"],
    categories: ["Flutter"],
    primaryCategory: "Flutter",
    problem: {
      heading:
        "Delivery drivers struggled with inefficient routing and poor communication:",
      points: [
        "Manual route planning wasting fuel and time",
        "No real-time updates on new orders or changes",
        "Difficult to track earnings and tips",
        "Poor GPS navigation within the app",
        "No proof of delivery capture",
      ],
    },
    solution: {
      heading:
        "A driver-centric Flutter app optimizing routes and streamlining deliveries.",
      points: [
        "AI-powered route optimization for multi-stop deliveries",
        "Push notifications for new orders with one-tap acceptance",
        "Live earnings dashboard with daily and weekly breakdowns",
        "Integrated maps with turn-by-turn navigation",
        "Photo and signature capture for proof of delivery",
      ],
    },
    whyBest: {
      heading:
        "This app increased driver efficiency and satisfaction dramatically.",
      points: [
        "Deliveries per hour increased by 37%",
        "Driver earnings up an average of $120/week",
        "Customer satisfaction improved due to faster deliveries",
        "Battery-optimized to last full shifts",
        "Used by 10,000+ drivers across multiple delivery platforms",
      ],
    },
  },
  {
    id: 15,
    slug: "language-learning-app",
    title: "Language Learning App",
    subtitle:
      "Gamified Flutter language learning app with speech recognition, AI tutoring, and spaced repetition.",
    coverImage: imgFlutter3,
    galleryImages: [imgFlutter3, imgFlutter4, imgFlutter1],
    tags: ["Flutter", "EdTech", "AI"],
    categories: ["Flutter"],
    primaryCategory: "Flutter",
    problem: {
      heading:
        "Existing language apps were boring and lacked practical conversation practice:",
      points: [
        "Repetitive exercises with no real-world application",
        "No speaking practice or pronunciation feedback",
        "Learning pace was too slow or too fast for individuals",
        "Limited languages and no dialect support",
        "High subscription costs with low completion rates",
      ],
    },
    solution: {
      heading:
        "An engaging Flutter app combining gamification with AI conversation partners.",
      points: [
        "Interactive story-based learning with branching scenarios",
        "Speech recognition for pronunciation practice and feedback",
        "AI chatbot for realistic conversation practice",
        "Adaptive spaced repetition algorithm for optimal memory retention",
        "Supports 25 languages with regional dialect options",
      ],
    },
    whyBest: {
      heading: "This app makes language learning addictive and effective.",
      points: [
        "Users average 23 minutes daily (vs. 8 minutes for competitors)",
        "Fluency achievement in 50% less time based on CEFR assessments",
        "App Store Editor's Choice award",
        "6-month retention rate: 45% (industry average: 5%)",
        "Featured in 40+ countries on app stores",
      ],
    },
  },
  {
    id: 16,
    slug: "personal-finance-manager",
    title: "Personal Finance Manager",
    subtitle:
      "Flutter personal finance app with bank sync, budget tracking, and investment portfolio monitoring.",
    coverImage: imgFlutter4,
    galleryImages: [imgFlutter4, imgFlutter1, imgFlutter2],
    tags: ["Flutter", "FinTech", "Mobile"],
    categories: ["Flutter"],
    primaryCategory: "Flutter",
    problem: {
      heading:
        "People lacked visibility into their finances and struggled with budgeting:",
      points: [
        "Manual expense tracking was too time-consuming",
        "No consolidated view of accounts across multiple banks",
        "Budget creation was complex and not actionable",
        "Investment tracking required separate apps",
        "No financial insights or recommendations",
      ],
    },
    solution: {
      heading:
        "An all-in-one Flutter finance app connecting to banks, budgets, and investments.",
      points: [
        "Plaid integration auto-syncing with 10,000+ financial institutions",
        "AI-powered expense categorization and merchant recognition",
        "Smart budgets with rollover and custom category creation",
        "Investment portfolio aggregation with performance tracking",
        "Actionable insights and savings recommendations",
      ],
    },
    whyBest: {
      heading:
        "This app empowers users to take control of their financial future.",
      points: [
        "Users save an average of $420/month after 90 days",
        "Bank-level security with 256-bit encryption and biometric auth",
        'Featured by Apple as "App of the Day"',
        "Net Promoter Score: 72 (exceptional for finance apps)",
        "Available on iOS, Android, and web from single codebase",
      ],
    },
  },

  // ============================================
  // CMS PROJECTS (6)
  // ============================================
  {
    id: 17,
    slug: "news-publishing-platform",
    title: "News Publishing Platform",
    subtitle:
      "Enterprise CMS for digital newsrooms with multi-channel publishing, paywall, and analytics.",
    coverImage: imgCms1,
    galleryImages: [imgCms1, imgCms2, imgCms3],
    tags: ["CMS", "Publishing", "Media"],
    categories: ["CMS"],
    primaryCategory: "CMS",
    problem: {
      heading:
        "News organizations struggled with legacy CMS systems that slowed publishing:",
      points: [
        "Slow editorial workflow requiring IT for publishing",
        "No support for multimedia or interactive content",
        "Poor mobile and amp article rendering",
        "Limited paywall and subscription management",
        "No real-time analytics for editors",
      ],
    },
    solution: {
      heading:
        "A modern headless CMS built for fast-paced newsrooms and digital-first publishing.",
      points: [
        "Drag-and-drop editor with live preview and scheduling",
        "Support for video, podcasts, interactive graphics, and live blogs",
        "Automatic AMP and mobile-optimized article generation",
        "Flexible paywall with metered and hard paywalls",
        "Real-time engagement analytics on editorial dashboard",
      ],
    },
    whyBest: {
      heading:
        "This CMS modernized newsrooms and drove digital subscription growth.",
      points: [
        "Article publishing time reduced from 30 minutes to 3 minutes",
        "Page load speed improved by 60%",
        "Digital subscription conversions up 110%",
        "Supports 5 million+ monthly readers per instance",
        "Used by 20+ regional and national news organizations",
      ],
    },
  },
  {
    id: 18,
    slug: "nonprofit-website-builder",
    title: "Nonprofit Website Builder",
    subtitle:
      "User-friendly CMS tailored for nonprofits with donation forms, volunteer management, and event registration.",
    coverImage: imgCms2,
    galleryImages: [imgCms2, imgCms3, imgCms4],
    tags: ["CMS", "Nonprofit", "Web"],
    categories: ["CMS"],
    primaryCategory: "CMS",
    problem: {
      heading:
        "Nonprofits lacked affordable, easy-to-use tools to build and manage websites:",
      points: [
        "Hiring developers was too expensive for small budgets",
        "Generic website builders lacked nonprofit-specific features",
        "Donation collection required third-party integrations",
        "No volunteer or event management capabilities",
        "Sites were not optimized for donor conversion",
      ],
    },
    solution: {
      heading:
        "A purpose-built CMS with templates, donation tools, and volunteer coordination.",
      points: [
        "Pre-designed nonprofit templates deployable in minutes",
        "Integrated Stripe and PayPal for one-click donations",
        "Volunteer portal for signup, shift scheduling, and hour tracking",
        "Event registration with ticket sales and attendee management",
        "SEO and social sharing optimized for awareness campaigns",
      ],
    },
    whyBest: {
      heading:
        "This platform empowered nonprofits to establish professional online presence.",
      points: [
        "Average donation conversion rate: 12% (industry average: 2-3%)",
        "Used by 1,200+ nonprofits worldwide",
        "Fundraising increased an average of 85% in first year",
        "No technical knowledge required for setup and management",
        "Special pricing for small nonprofits at $0/month",
      ],
    },
  },
  {
    id: 19,
    slug: "recipe-food-blog-cms",
    title: "Recipe & Food Blog CMS",
    subtitle:
      "Specialized CMS for food bloggers with recipe cards, nutrition calculators, and Pinterest optimization.",
    coverImage: imgCms3,
    galleryImages: [imgCms3, imgCms4, imgCms5],
    tags: ["CMS", "Food", "Blogging"],
    categories: ["CMS"],
    primaryCategory: "CMS",
    problem: {
      heading:
        "Food bloggers struggled with generic CMS platforms lacking recipe-specific features:",
      points: [
        "Recipe formatting was manual and time-consuming",
        "No schema markup or SEO optimization for recipes",
        "Image galleries were not mobile-friendly",
        "Nutrition information required manual calculation",
        "Pinterest and social sharing was poorly implemented",
      ],
    },
    solution: {
      heading:
        "A food blog CMS with structured recipe cards, automatic nutrition, and social optimization.",
      points: [
        "Structured recipe editor with Schema.org markup built-in",
        "Automatic nutrition calculator based on ingredients",
        "Responsive image galleries with lazy loading",
        "One-click Pinterest Pin creation with recipe overlay",
        "Email newsletter integration for recipe subscriptions",
      ],
    },
    whyBest: {
      heading:
        "This CMS helped food bloggers rank higher and grow their audience.",
      points: [
        "SEO traffic increased average 160% after migration",
        "Recipe pages rank in top 3 for 65% of target keywords",
        "Pinterest traffic up 3x with auto-optimized pins",
        "Mobile page speed score: 95/100",
        "Used by 5,000+ food bloggers and recipe sites",
      ],
    },
  },
  {
    id: 20,
    slug: "hotel-booking-website",
    title: "Hotel Booking Website",
    subtitle:
      "Full-featured CMS for hotels with room management, booking engine, and channel manager integration.",
    coverImage: imgCms4,
    galleryImages: [imgCms4, imgCms5, imgCms6],
    tags: ["CMS", "Hospitality", "E-commerce"],
    categories: ["CMS"],
    primaryCategory: "CMS",
    problem: {
      heading:
        "Hotels were paying high commissions to OTAs and lacked direct booking websites:",
      points: [
        "Existing solutions were expensive or lacked booking engines",
        "OTA commissions ranged from 15-25% per booking",
        "No real-time inventory sync across channels",
        "Poor mobile booking experience losing conversions",
        "Limited content management for hotel information",
      ],
    },
    solution: {
      heading:
        "A hotel-focused CMS with commission-free booking and channel management.",
      points: [
        "Beautiful hotel templates with photo galleries and amenity pages",
        "Built-in booking engine with real-time availability and pricing",
        "Channel manager syncing inventory to Booking.com, Expedia, etc.",
        "Mobile-optimized checkout with saved payment methods",
        "Multi-property support for hotel chains and groups",
      ],
    },
    whyBest: {
      heading:
        "This CMS helped hotels increase direct bookings and reduce OTA dependency.",
      points: [
        "Direct bookings increased from 12% to 38% of total",
        "Average savings of $85,000/year in OTA commissions",
        "Mobile booking conversion rate: 8.2% (industry avg: 2.1%)",
        "Channel manager reduced overbookings to near-zero",
        "Deployed for independent hotels and chains up to 50 properties",
      ],
    },
  },
  {
    id: 21,
    slug: "church-ministry-website",
    title: "Church & Ministry Website",
    subtitle:
      "Faith-based CMS with sermon management, online giving, small group coordination, and event calendars.",
    coverImage: imgCms5,
    galleryImages: [imgCms5, imgCms6, imgCms1],
    tags: ["CMS", "Nonprofit", "Community"],
    categories: ["CMS"],
    primaryCategory: "CMS",
    problem: {
      heading:
        "Churches needed websites to engage their congregation but lacked technical resources:",
      points: [
        "Generic website builders did not meet ministry-specific needs",
        "Sermon audio and video hosting was expensive",
        "Online giving required complex third-party integrations",
        "No small group management or volunteer coordination",
        "Updating content required technical knowledge",
      ],
    },
    solution: {
      heading:
        "A ministry-focused CMS with sermon libraries, giving, and community management.",
      points: [
        "Sermon management with podcast RSS feed generation",
        "Unlimited video hosting with automatic transcoding",
        "Integrated online giving with recurring donation options",
        "Small group directory with signup and leader communication",
        "Event calendar with RSVP and childcare requests",
      ],
    },
    whyBest: {
      heading:
        "This CMS helped churches thrive online and engage their communities.",
      points: [
        "Online engagement increased 210% on average",
        "Digital giving grew to represent 45% of total contributions",
        "Sermon podcast subscribers grew 3x in first year",
        "Used by 3,500+ churches worldwide",
        "Ministry templates deployable in under 1 hour",
      ],
    },
  },
  {
    id: 22,
    slug: "portfolio-showcase-platform",
    title: "Portfolio Showcase Platform",
    subtitle:
      "CMS designed for creatives to build stunning portfolio websites with client proofing and project management.",
    coverImage: imgCms6,
    galleryImages: [imgCms6, imgCms1, imgCms2],
    tags: ["CMS", "Portfolio", "Creative"],
    categories: ["CMS"],
    primaryCategory: "CMS",
    problem: {
      heading:
        "Designers and photographers needed portfolio sites that showcased work beautifully:",
      points: [
        "Generic portfolio builders produced cookie-cutter sites",
        "Image quality was compromised by aggressive compression",
        "No client proofing or feedback workflow",
        "Limited customization without coding knowledge",
        "Sites were not optimized for visual impact",
      ],
    },
    solution: {
      heading:
        "A visual-first CMS with high-quality image rendering and client collaboration tools.",
      points: [
        "Stunning portfolio templates optimized for visual work",
        "Smart image optimization preserving quality while reducing size",
        "Client proofing galleries with commenting and selection",
        "Drag-and-drop customization with no code required",
        "Full-screen galleries with smooth transitions",
      ],
    },
    whyBest: {
      heading:
        "This platform helped creatives win more clients with impressive portfolios.",
      points: [
        "Portfolio sites scored 95+ on Google PageSpeed",
        "Client inquiry rates increased 140% on average",
        "Used by 15,000+ photographers, designers, and agencies",
        "Custom domain and white-label options",
        "Mobile-responsiveness that maintains visual impact",
      ],
    },
  },

  // ============================================
  // DIGITAL MARKETING PROJECTS (3)
  // ============================================
  {
    id: 23,
    slug: "saas-lead-generation-campaign",
    title: "SaaS Lead Generation Campaign",
    subtitle:
      "Multi-channel digital marketing campaign generating 10,000+ qualified leads for B2B SaaS company.",
    coverImage: imgDigital1,
    galleryImages: [imgDigital1, imgDigital2, imgDigital3],
    tags: ["Digital Marketing", "PPC", "Content"],
    categories: ["Digital Marketing"],
    primaryCategory: "Digital Marketing",
    problem: {
      heading:
        "The SaaS company had a great product but struggled to generate qualified leads:",
      points: [
        "Paid ads attracted tire-kickers, not qualified buyers",
        "Content marketing had no clear conversion path",
        "Sales team spent time on unqualified prospects",
        "CAC (Customer Acquisition Cost) was unsustainably high",
        "No clear attribution model for marketing spend",
      ],
    },
    solution: {
      heading:
        "A full-funnel campaign combining paid ads, content, and marketing automation.",
      points: [
        "Google and LinkedIn ads targeting decision-makers by job title",
        "Gated whitepapers and case studies as lead magnets",
        "Lead scoring system qualifying prospects before sales handoff",
        "Retargeting campaigns nurturing warm leads",
        "Multi-touch attribution tracking every touchpoint to conversion",
      ],
    },
    whyBest: {
      heading: "This campaign delivered qualified pipeline and measurable ROI.",
      points: [
        "10,000+ qualified leads in 12 months",
        "CAC reduced from $850 to $320",
        "Lead-to-customer conversion rate: 8.2%",
        "ROAS (Return on Ad Spend): 5.7x",
        "Sales cycle shortened by 35% with better lead quality",
      ],
    },
  },
  {
    id: 24,
    slug: "ecommerce-conversion-optimization",
    title: "E-commerce Conversion Optimization",
    subtitle:
      "Comprehensive CRO program increasing online store revenue by 180% through testing and personalization.",
    coverImage: imgDigital2,
    galleryImages: [imgDigital2, imgDigital3, imgDigital1],
    tags: ["Digital Marketing", "CRO", "E-commerce"],
    categories: ["Digital Marketing"],
    primaryCategory: "Digital Marketing",
    problem: {
      heading:
        "The e-commerce site had traffic but poor conversion rates and high cart abandonment:",
      points: [
        "Checkout process had 7 steps causing 78% abandonment",
        "Product pages lacked social proof and urgency",
        "Site speed was slow leading to high bounce rates",
        "No personalization or product recommendations",
        "Email cart recovery was generic and ineffective",
      ],
    },
    solution: {
      heading:
        "A data-driven CRO program testing every element of the customer journey.",
      points: [
        "Simplified checkout to 3 steps with guest option",
        "Added reviews, trust badges, and scarcity indicators",
        "Page speed optimization reducing load time by 60%",
        "AI-powered product recommendations increasing AOV",
        "Personalized cart recovery emails with dynamic discounts",
      ],
    },
    whyBest: {
      heading:
        "This optimization program delivered immediate and sustained revenue growth.",
      points: [
        "Conversion rate improved from 1.2% to 3.8%",
        "Cart abandonment reduced from 78% to 45%",
        "Average order value increased 32%",
        "Overall revenue growth: 180% in 9 months",
        "67 A/B tests run with comprehensive documentation",
      ],
    },
  },
  {
    id: 25,
    slug: "local-business-seo-domination",
    title: "Local Business SEO Domination",
    subtitle:
      "Local SEO strategy achieving #1 rankings and 5x increase in foot traffic for multi-location business.",
    coverImage: imgDigital3,
    galleryImages: [imgDigital3, imgDigital1, imgDigital2],
    tags: ["Digital Marketing", "Local SEO", "GMB"],
    categories: ["Digital Marketing"],
    primaryCategory: "Digital Marketing",
    problem: {
      heading:
        "The local business was invisible online and losing customers to competitors:",
      points: [
        "Not ranking in local map pack for any target keywords",
        "Google Business Profile was incomplete and unoptimized",
        "Inconsistent NAP (name, address, phone) across directories",
        "Few online reviews compared to competitors",
        "Website was not locally optimized",
      ],
    },
    solution: {
      heading:
        "A comprehensive local SEO campaign targeting map pack rankings and reviews.",
      points: [
        "Optimized Google Business Profiles for all 8 locations",
        "NAP citations built on 100+ local directories",
        "Review generation campaign increasing reviews 10x",
        "Location-specific landing pages with local keywords",
        "Local backlink building from community organizations",
      ],
    },
    whyBest: {
      heading:
        "This local SEO program made the business the dominant player in their market.",
      points: [
        "Achieved #1 map pack ranking for 45+ local keywords",
        "Google Business Profile views increased 650%",
        "Direction requests (foot traffic) up 5x",
        "Online reviews grew from 23 to 380+ (4.8-star average)",
        "Revenue from local search increased $420,000 annually",
      ],
    },
  },

  // ============================================
  // AI PROJECTS (3)
  // ============================================
  {
    id: 26,
    slug: "customer-support-ai-chatbot",
    title: "Customer Support AI Chatbot",
    subtitle:
      "GPT-powered chatbot handling 80% of customer support queries with human handoff for complex issues.",
    coverImage: imgAi1,
    galleryImages: [imgAi1, imgAi2, imgAi3],
    tags: ["AI", "Chatbot", "Customer Support"],
    categories: ["AI"],
    primaryCategory: "AI",
    problem: {
      heading:
        "Customer support team was overwhelmed with repetitive questions:",
      points: [
        "Average response time was 6 hours during peak periods",
        "Support agents spent 70% of time answering basic questions",
        "No 24/7 support availability",
        "Customer satisfaction declining due to slow responses",
        "Scaling support team was expensive",
      ],
    },
    solution: {
      heading:
        "An AI chatbot trained on support docs, FAQs, and past tickets to provide instant answers.",
      points: [
        "GPT-4 based chatbot with retrieval-augmented generation",
        "Trained on 10,000+ past support conversations",
        "Natural language understanding for intent detection",
        "Seamless handoff to human agents for complex issues",
        "Available 24/7 across website, app, and social channels",
      ],
    },
    whyBest: {
      heading:
        "This AI chatbot transformed customer support economics and satisfaction.",
      points: [
        "80% of queries resolved by AI without human intervention",
        "Average response time reduced to under 30 seconds",
        "CSAT (Customer Satisfaction) score improved from 72 to 91",
        "Support costs reduced by 60%",
        "Handles 50,000+ conversations monthly",
      ],
    },
  },
  {
    id: 27,
    slug: "ai-content-generation-tool",
    title: "AI Content Generation Tool",
    subtitle:
      "AI-powered platform helping marketers generate blog posts, social media, and ad copy 10x faster.",
    coverImage: imgAi2,
    galleryImages: [imgAi2, imgAi3, imgAi1],
    tags: ["AI", "Content", "Marketing"],
    categories: ["AI"],
    primaryCategory: "AI",
    problem: {
      heading:
        "Content creation was time-consuming and expensive for marketing teams:",
      points: [
        "Writing blog posts took 6-8 hours per article",
        "Social media content creation was repetitive and draining",
        "Ad copy testing required weeks of manual writing",
        "Hiring freelance writers was costly and inconsistent",
        "No efficient way to repurpose content across channels",
      ],
    },
    solution: {
      heading:
        "An AI content tool generating high-quality, on-brand content in minutes.",
      points: [
        "Blog post generator creating SEO-optimized articles from outlines",
        "Social media caption generator with hashtag suggestions",
        "Ad copy variations for A/B testing at scale",
        "Brand voice training ensuring consistency",
        "One-click content repurposing across formats",
      ],
    },
    whyBest: {
      heading:
        "This tool made content production 10x faster without sacrificing quality.",
      points: [
        "Blog post creation time reduced from 6 hours to 30 minutes",
        "Content output increased 400% with same team size",
        "Used by 20,000+ marketers and content creators",
        "Average rating: 4.6/5 for content quality",
        "ROI: Customers save average of $8,000/month in content costs",
      ],
    },
  },
  {
    id: 28,
    slug: "predictive-analytics-platform",
    title: "Predictive Analytics Platform",
    subtitle:
      "Machine learning platform forecasting sales, churn, and customer behavior for data-driven decision making.",
    coverImage: imgAi3,
    galleryImages: [imgAi3, imgAi1, imgAi2],
    tags: ["AI", "Analytics", "Machine Learning"],
    categories: ["AI"],
    primaryCategory: "AI",
    problem: {
      heading:
        "Businesses made decisions based on gut feeling rather than predictive data:",
      points: [
        "No visibility into future sales or revenue trends",
        "Customer churn happened without warning",
        "Inventory planning was reactive, not predictive",
        "Marketing spend allocation was guesswork",
        "Building in-house ML capabilities was too expensive",
      ],
    },
    solution: {
      heading:
        "A no-code ML platform enabling businesses to forecast key metrics.",
      points: [
        "Sales forecasting with 92% accuracy using historical data",
        "Churn prediction identifying at-risk customers",
        "Demand forecasting optimizing inventory levels",
        "Customer lifetime value prediction for marketing ROI",
        "AutoML automatically selecting best models for each use case",
      ],
    },
    whyBest: {
      heading:
        "This platform democratized advanced analytics for businesses of all sizes.",
      points: [
        "Forecast accuracy consistently above 90%",
        "Churn prevention saved clients average of $240,000 annually",
        "No data science expertise required to use",
        "Integrates with 50+ data sources and business tools",
        "Enterprise clients include Fortune 500 companies",
      ],
    },
  },
];

export const getProjectBySlug = (slug) =>
  ALL_PROJECTS.find((p) => p.slug === slug) ?? null;
