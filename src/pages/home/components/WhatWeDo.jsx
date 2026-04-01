import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    title: "UI/UX Design",
    description: "Interfaces Designed to Influence Behavior",
    link: "/services/ui-ux",
  },
  {
    id: 2,
    title: "MERN STACK Development",
    description: "Web Infrastructure That Supports Real Growth",
    link: "/services/mern",
  },
  {
    id: 3,
    title: "Flutter App Development",
    description: "Applications Built for Practical, Everyday Use",
    link: "/services/flutter",
  },
  {
    id: 4,
    title: "eCommerce Development",
    description: "Commerce Platforms Designed Around Revenue Logic",
    link: "/services/shopify",
  },
  {
    id: 5,
    title: "Digital Marketing",
    description: "Marketing Linked Directly to Business Outcomes",
    link: "/services/digital-marketing",
  },
];

const ServiceCard = ({ service }) => {
  return (
    <div className="group rounded-lg border border-white/10 bg-[#101515] p-6 backdrop-blur-sm transition-all duration-300 hover:border-orange-bg-cta hover:bg-orange-bg-cta md:p-8">
      {/* Icon with hover effect */}
      <div className="mb-6 relative h-16 w-16">
        {/* Default Icon - visible when not hovering */}
        <div className="absolute inset-0 text-white/60 opacity-80 transition-all duration-500 ease-out group-hover:opacity-0 group-hover:scale-75 group-hover:rotate-12">
          <svg
            width="64"
            height="64"
            viewBox="0 0 32 32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="4" y="4" width="10" height="10" />
            <rect x="18" y="4" width="10" height="10" />
            <rect x="4" y="18" width="10" height="10" />
            <rect x="18" y="18" width="10" height="10" />
          </svg>
        </div>
        {/* Hover Icon - visible when hovering */}
        <div className="absolute inset-0 opacity-0 scale-75 -rotate-12 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-80 group-hover:rotate-0">
          <img 
            src="/services_image/service/Frame 2147225682.svg" 
            alt="" 
            className="w-16 h-16 drop-shadow-lg"
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="mb-3 text-lg font-semibold text-white group-hover:text-white transition-colors md:text-xl">
        {service.title}
      </h3>

      {/* Description */}
      <p className="mb-6 text-sm text-white/60 group-hover:text-white/90 leading-relaxed transition-colors md:text-base">
        {service.description}
      </p>

      {/* Read More Link */}
      <Link
        to={service.link}
        className="inline-flex items-center gap-2 text-orange-bg-cta group-hover:text-white font-medium transition-all duration-200 hover:gap-3 group"
      >
        Read More
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-transform group-hover:translate-x-1"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
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
                src="/Vector 511.webp"
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
