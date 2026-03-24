import { Link } from "react-router-dom";

const ServiceShowcase = ({
  badgeText = "What We Build",
  title = "We engineer scalable digital products, not just lines of code.",
  description = "Our MERN engagements typically include:",
  bullets = [
    "End-to-end Full Stack Development Process",
    "MongoDB Database Architecture & Optimization",
    "Express.js REST API & Middleware Development",
    "React.js Component Systems & State Management",
    "Node.js Server-Side Logic & Performance Tuning",
    "JWT Authentication & Role-Based Access Control",
    "Cloud Deployment, CI/CD & Scalability Setup",
  ],
  imageSrc = "/services_image/mern-showcase.jpg",
  imageAlt = "Service showcase",
  ctaText = "View Case Studies",
  ctaLink = "/case-study",
  className = "",
}) => {
  const linePositions = [12, 30, 50, 68, 88];

  return (
    <section
      className={`relative overflow-hidden bg-white py-14 sm:py-16 md:py-20 ${className}`}
    >
      {/* Soft peach background similar to home WhyChooseUs */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(70% 55% at 100% 0%, rgba(255, 182, 146, 0.32), rgba(255, 182, 146, 0) 60%), radial-gradient(70% 55% at 0% 100%, rgba(255, 182, 146, 0.28), rgba(255, 182, 146, 0) 60%), #ffffff",
        }}
      />

      <div className="pointer-events-none absolute inset-0 z-1">
        {linePositions.map((position, index) => (
          <div
            key={index}
            className="absolute -top-15 bottom-0 w-px bg-linear-to-b from-transparent via-black/20 to-transparent"
            style={{ left: `${position}%` }}
          >
            <div
              className="absolute w-0.5 h-12 rounded-full opacity-60 animate-dropFall"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.1), #FF6533)",
                animationDelay: `${index * 2}s`,
              }}
            />
            <div
              className="absolute w-0.5 h-10 rounded-full opacity-45 animate-dropFall"
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                background:
                  "linear-gradient(to bottom, rgba(255,255,255,0.1), #FF6533)",
                animationDelay: `${index * 2 + 4}s`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Glow blobs — anchored bottom-left and top-right like WhyChooseUs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -bottom-52 h-[520px] w-[520px] rounded-full opacity-70 blur-[140px]"
        style={{ background: "rgba(255, 101, 51, 0.35)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-44 -top-40 h-[520px] w-[520px] rounded-full opacity-70 blur-[140px]"
        style={{ background: "rgba(255, 101, 51, 0.32)" }}
      />

      <div className="container relative z-10 mx-auto grid items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-14 xl:gap-16">
        {/* Image */}
        <div className="flex justify-center">
          <div className="overflow-hidden rounded-xl shadow-[0_25px_50px_rgba(0,0,0,0.18)] ring-1 ring-black/5 max-w-xl w-full bg-white/60 backdrop-blur-sm">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-5 text-[#2f2f2f]">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#e5cac3] bg-[#f0ddd8] px-3 py-1.5 text-base font-medium text-[#5a443d] shadow-sm w-fit">
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute h-full w-full rounded-full bg-orange-bg-cta/30" />
              <span className="h-2 w-2 rounded-full bg-linear-to-b from-[#ff8a5a] to-orange-bg-cta" />
            </span>
            {badgeText}
          </div>

          <h2 className="text-2xl leading-tight font-semibold sm:text-3xl md:text-[32px] lg:text-[36px] xl:text-[48px] 2xl:[48px] md:leading-tight text-[#2D2D2D]">
            {title}
          </h2>

          <p className="text-sm md:text-base lg:text-lg xl:text-xl  text-[#616161]">{description}</p>

          <ul className="space-y-2 text-sm md:text-base lg:text-lg text-[#616161]">
            {bullets.map((item, idx) => (
              <li key={idx} className="flex gap-2">
                <span
                  className="mt-2.5 inline-block h-1.5 w-1.5 rounded-full bg-orange-bg-cta"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="pt-2">
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-2 rounded-xl bg-orange-bg-cta px-5 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5"
            >
              {ctaText}
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h10M9 4l4 4-4 4" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceShowcase;
