import { Link } from 'react-router-dom';
import AnimatedServiceCard, { RevealItem } from '../../../components/AnimatedServiceCard';
import useRevealOnce from '../../../hooks/useRevealOnce';

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

const ViewMoreCard = () => {
  return (
    <Link to="/services" className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 flex flex-col items-center justify-center text-orange-bg-cta transition-[transform,border-color,background-color,box-shadow] duration-1100 ease-[cubic-bezier(0.22,1,0.36,1)] group cursor-pointer hover:-translate-y-1.5 hover:border-orange-bg-cta hover:bg-orange-bg-cta hover:shadow-[0_26px_55px_-14px_rgba(255,255,255,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 h-full">
      <div className="text-center">
        <h3 className="text-orange-bg-cta text-3xl xl:text-4xl font-medium mb-0 leading-tight">
          <span className="block underline  underline-offset-6 transition-colors duration-500 group-hover:text-gray-bg-primary">View More</span>
          <span className="block underline underline-offset-6 transition-colors duration-500 group-hover:text-gray-bg-primary">
            Services →
          </span>
        </h3>
      </div>
    </Link>
  );
};

const WhatWeDo = () => {
  const [gridRef, revealed] = useRevealOnce();

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
        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <AnimatedServiceCard
              key={service.id}
              service={service}
              index={index}
              revealed={revealed}
            />
          ))}
          <RevealItem index={services.length} revealed={revealed} className="hidden md:block">
            <ViewMoreCard />
          </RevealItem>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
