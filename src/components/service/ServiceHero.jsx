import { Link } from "react-router-dom";

const ServiceHero = ({
  breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Service" },
  ],
  title = "Robust Systems That Don't Break",
  description = "We engineer high-traffic applications using MERN. Built for speed, security, and absolute reliability, so your infrastructure never bottlenecks your growth.",
  ctaLabel = "Let's Discuss",
  ctaLink = "#",
  //   backgroundClass = "bg-[#0f1115]",
}) => {
  return (
    <section className={`relative overflow-hidden `}>
      <div className="absolute inset-0 " aria-hidden="true" />
      <div className="relative flex items-center justify-center px-5 py-18 sm:px-8 md:py-24 lg:py-28">
        <div className="w-full max-w-5xl text-center text-white">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs sm:text-sm text-white/80 bg-white/5 backdrop-blur-sm">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              const isLink = crumb.href && !isLast;

              return (
                <span
                  key={`${crumb.label}-${index}`}
                  className="inline-flex items-center gap-2"
                >
                  {isLink ? (
                    <Link
                      to={crumb.href}
                      className="hover:text-white transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className={isLast ? "font-semibold text-white" : ""}>
                      {crumb.label}
                    </span>
                  )}
                  {!isLast && (
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                      className="text-white/60"
                    >
                      <path
                        d="M4.5 2.5L7.5 6L4.5 9.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              );
            })}
          </div>

          <h1 className="font-semibold leading-tight tracking-tight text-2xl md:text-[26px] lg:text-[33px] xl:text-[48px] 2xl:text-[64px]">
            {title}
          </h1>

          <p className="mt-4 text-sm  text-white/80 sm:text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              to={ctaLink}
              className="group inline-flex items-center gap-3 rounded-full bg-orange-bg-cta px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span>{ctaLabel}</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black group-hover:translate-x-0.5 transition-transform">
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
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
