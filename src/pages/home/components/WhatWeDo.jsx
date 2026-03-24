import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: "UI/UX Design",
    description: "Interfaces Designed to Influence Behavior",
    link: "/services/ui-ux",
    icon: (
      <svg
        className="w-24 h-24"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="12" y="12" width="24" height="24" />
        <line x1="24" y1="12" x2="24" y2="36" />
        <line x1="12" y1="24" x2="36" y2="24" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "MERN STACK Development",
    description: "Web Infrastructure That Supports Real Growth",
    link: "/services/mern",
    icon: (
      <svg
        className="w-24 h-24"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="12" y="12" width="24" height="24" />
        <line x1="24" y1="12" x2="24" y2="36" />
        <line x1="12" y1="24" x2="36" y2="24" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Flutter App Development",
    description: "Applications Built for Practical, Everyday Use",
    link: "/services/flutter",
    icon: (
      <svg
        className="w-24 h-24"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="12" y="12" width="24" height="24" />
        <line x1="24" y1="12" x2="24" y2="36" />
        <line x1="12" y1="24" x2="36" y2="24" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "eCommerce Development",
    description: "Commerce Platforms Designed Around Revenue Logic",
    link: "/services/shopify",
    icon: (
      <svg
        className="w-24 h-24"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="12" y="12" width="24" height="24" />
        <line x1="24" y1="12" x2="24" y2="36" />
        <line x1="12" y1="24" x2="36" y2="24" />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "Marketing Linked Directly to Business Outcomes",
    link: "/services/digital-marketing",
    icon: (
      <svg
        className="w-24 h-24"
        viewBox="0 0 48 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="12" y="12" width="24" height="24" />
        <line x1="24" y1="12" x2="24" y2="36" />
        <line x1="12" y1="24" x2="36" y2="24" />
      </svg>
    ),
  },
];

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-[#1a1a1a] border border-[#101515] rounded-lg p-8 hover:bg-orange-bg-cta transition-all duration-300 group h-full flex flex-col justify-between">
      {/* Icon */}
      <div className="mb-6 text-white opacity-80 group-hover:opacity-100 transition-opacity">
        {service.icon}
      </div>

      {/* Title */}
      <h3 className="text-gray-bg-primary text-xl xl:text-2xl font-semibold mb-3">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 text-sm mb-6 leading-relaxed transition-colors duration-200 group-hover:text-gray-bg-primary">
        {service.description}
      </p>

      {/* Read More Button */}
      <Link to={service.link} className="flex cursor-pointer items-center gap-2 text-orange-bg-cta text-sm xl:text-base font-semibold hover:gap-3 transition-all duration-200 group-hover:text-gray-bg-primary">
        Read More
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

const ViewMoreCard = () => {
  return (
    <Link to="/services" className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 flex flex-col items-center justify-center text-orange-bg-cta transition-all duration-300 group cursor-pointer hover:bg-orange-bg-cta h-full">
      <div className="text-center">
        <h3 className="text-orange-bg-cta text-3xl xl:text-4xl font-medium mb-0 leading-tight">
          <span className="block underline  underline-offset-6 group-hover:text-gray-bg-primary">View More</span>
          <span className="block underline underline-offset-6 group-hover:text-gray-bg-primary">
            Services →
          </span>
        </h3>
      </div>
    </Link>
  );
};

const WhatWeDo = () => {
  return (
    <section className="w-full text-white py-4 xl:pt-20 2xl:pt-24 relative">
      <div className="container mx-auto px-5 xl:px-8 2xl:px-12">
        {/* Header */}
        <div className="mb-12 xl:mb-16">
          {/* Badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6"
            style={{
              background:
                "linear-gradient(90deg, rgba(46,34,30,0.98) 0%, rgba(38,30,28,0.92) 50%, rgba(28,22,20,0.88) 100%)",
              border: "1px solid rgba(255,255,255,0.03)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
            }}
          >
            <div className="relative flex items-center justify-center w-3.5 h-3.5">
              <span
                className="absolute w-full h-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255,101,51,0.95), rgba(255,101,51,0.6) 40%, rgba(255,101,51,0.25) 70%)",
                }}
              ></span>
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #ff8a5a, #ff6533)",
                }}
              ></span>
            </div>
            <span className="text-base font-medium text-white">What We Do</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 leading-tight xl:whitespace-nowrap">
            End-to-End Digital{" "}
            <span className="relative inline-block bg-linear-to-r from-white to-[#999999] bg-clip-text text-transparent">
              Solutions
              <img
                src="/Vector 511.png"
                alt=""
                aria-hidden="true"
                className="absolute bottom-1 left-0 w-full pointer-events-none"
              />
            </span>
          </h2>

          {/* Subheading */}
          <p className="text-gray-300 text-base xl:text-lg 2xl:text-xl 3xl:text-2xl">
            Strategy and Execution Built to Work Together.
          </p>
        </div>

        {/* Services Grid */}
        {/* Mobile: stacked | Tablet: 2 columns | Desktop: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-fr">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
          <div className="hidden md:block">
            <ViewMoreCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
