import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services", hasDropdown: true },
  { label: "Pricing", to: "/pricing" },
  { label: "Case Study", to: "/case-study" },
  { label: "Company", to: "/company", hasDropdown: true },
];

const servicesMegaItems = [
  { title: "UI / UX design", path: "/services/ui-ux", slug: "ui-ux", featured: true },
  { title: "Flutter Development", path: "/services/flutter", slug: "flutter" },
  { title: "Shopify", path: "/services/shopify", slug: "shopify" },
  { title: "Graphic design", path: "/services/graphic-design", slug: "graphic-design" },
  { title: "Laravel Development", path: "/services/laravel", slug: "laravel" },
  { title: "WIX", path: "/services/wix", slug: "wix" },
  { title: "MERN Development", path: "/services/mern", slug: "mern" },
  { title: "WordPress", path: "/services/wordpress", slug: "wordpress" },
  { title: "Digital Marketing", path: "/services/digital-marketing", slug: "digital-marketing" },
  { title: "AI/ML", path: "/services/ai-ml", slug: "ai-ml" },
  { title: "SAS Product", path: "/services/sas-product", slug: "sas-product" },
];

const companyMegaItems = [
  { title: "Blogs", slug: "blogs", path: "/blogs" },
  { title: "Career", slug: "career", path: "/career" },
  { title: "Our team", slug: "our-team", path: "/our-team" },
  { title: "contact us", slug: "contact-us", path: "/contact" },
];

const navItemBaseClass =
  "inline-flex items-center gap-1 rounded-[8px] px-4 py-2 text-[15px] 2xl:text-[16px] font-medium text-white/70 transition-colors duration-200 hover:bg-white/8 hover:text-white xl:px-[14px] 2xl:px-4";

const navItemActiveClass = "text-white border border-[#ff6533]";

const NavItem = ({ link, onNavigate, delay }) => (
  <NavLink
    to={link.to}
    className={({ isActive }) =>
      `${navItemBaseClass} ${isActive ? navItemActiveClass : ""}`
    }
    onClick={onNavigate}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {link.label}
    {link.hasDropdown && (
      <svg
        className="shrink-0 opacity-60"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 3.5L5 6.5L8 3.5" />
      </svg>
    )}
  </NavLink>
);

const MegaMenuCard = ({ item, onNavigate }) => (
  <NavLink
    to={item.path}
    onClick={onNavigate}
    className="group flex min-h-16 items-start gap-2.5 border border-black/10 bg-[#3B3B3B33] px-3.5 py-3 text-black-bg no-underline transition duration-200 hover:-translate-y-px hover:border-orange-bg-cta hover:bg-orange-bg-cta hover:text-white "
  >
    <span
      aria-hidden="true"
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current/45 text-current transition-colors duration-200 group-hover:border-white/50"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7 17L17 7" />
        <path d="M9 7h8v8" />
      </svg>
    </span>

    <span className="flex min-w-0 flex-col">
      <span className="truncate text-[16px] font-bold leading-[1.2] text-current">
        {item.title}
      </span>
      <span className="mt-1 truncate text-[12px] leading-tight text-black-bg group-hover:text-white/90 ">
        Let&apos;s implement your skills toward to grow MAKTECH.
      </span>
    </span>
  </NavLink>
);

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isServicesMegaOpen, setIsServicesMegaOpen] = useState(false);
  const [isCompanyMegaOpen, setIsCompanyMegaOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1280);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const timer = setTimeout(() => setVisible(true), 300);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const openServicesMegaMenu = () => {
    if (!isMobile) {
      setIsServicesMegaOpen(true);
    }
  };

  const closeServicesMegaMenu = () => {
    setIsServicesMegaOpen(false);
  };

  const openCompanyMegaMenu = () => {
    if (!isMobile) {
      setIsCompanyMegaOpen(true);
    }
  };

  const closeCompanyMegaMenu = () => {
    setIsCompanyMegaOpen(false);
  };

  const handleServicesItemBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeServicesMegaMenu();
    }
  };

  const handleCompanyItemBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeCompanyMegaMenu();
    }
  };

  const handleNavigate = () => {
    setMenuOpen(false);
    closeServicesMegaMenu();
    closeCompanyMegaMenu();
  };

  const handleServicesLinkClick = (event) => {
    if (isMobile) {
      event.preventDefault();
      setIsServicesMegaOpen((prev) => !prev);
      setIsCompanyMegaOpen(false);
      return;
    }
    handleNavigate();
  };

  const handleCompanyLinkClick = (event) => {
    if (isMobile) {
      event.preventDefault();
      setIsCompanyMegaOpen((prev) => !prev);
      setIsServicesMegaOpen(false);
      return;
    }
    handleNavigate();
  };

  return (
    <nav
      className="fixed z-[1000] flex w-full items-center justify-between gap-0 bg-[rgba(28,28,28,0.95)] px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [backdrop-filter:blur(18px)] xl:w-[60%] xl:max-w-[1200px] xl:rounded-full xl:border xl:border-white/8 xl:bg-[rgba(28,28,28,0.82)] xl:px-5 xl:py-2.5 xl:shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,255,255,0.04)] 2xl:gap-2.5 2xl:px-[22px]"
      style={{
        opacity: visible ? 1 : 0,
        left: isMobile ? 0 : "50%",
        top: isMobile ? 0 : "auto",
        bottom: isMobile ? "auto" : "35px",
        transform: isMobile
          ? visible
            ? "translateY(0)"
            : "translateY(-20px)"
          : visible
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(20px)",
      }}
    >
      {/* Logo */}
      <NavLink to="/" className="mr-1 flex items-center no-underline">
        <img
          src="/maktech_logo_white.png"
          alt="maktech logo"
          className="h-6 w-auto xl:h-5.5 2xl:h-6"
        />
      </NavLink>

      {/* Navigation Links */}
      <div
        className="absolute left-0 right-0 top-full flex flex-col gap-0 overflow-hidden border-t border-white/6 bg-[rgba(28,28,28,0.98)] px-0 py-0 opacity-0 transition-all duration-300 [backdrop-filter:blur(18px)] xl:static xl:flex-row xl:items-center xl:justify-between xl:gap-0 xl:overflow-visible xl:border-none xl:bg-transparent xl:p-0 xl:opacity-100 xl:[backdrop-filter:none]"
        style={
          isMobile
            ? {
              maxHeight: menuOpen ? "620px" : "0px",
              opacity: menuOpen ? 1 : 0,
              pointerEvents: menuOpen ? "auto" : "none",
              padding: menuOpen ? "16px 20px" : "0 20px",
            }
            : {
              maxHeight: "none",
              pointerEvents: "auto",
            }
        }
      >
        {navLinks.map((link) => (
          link.to === "/services" ? (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={openServicesMegaMenu}
              onMouseLeave={closeServicesMegaMenu}
              onFocusCapture={openServicesMegaMenu}
              onBlurCapture={handleServicesItemBlur}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${navItemBaseClass} w-full justify-between xl:w-auto ${isActive ? navItemActiveClass : ""}`
                }
                onClick={handleServicesLinkClick}
                style={{ transitionDelay: isMobile && menuOpen ? "150ms" : "0ms" }}
              >
                {link.label}
                <svg
                  className={`shrink-0 opacity-60 transition duration-200 ${isServicesMegaOpen ? "rotate-180 opacity-100" : ""}`}
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3.5L5 6.5L8 3.5" />
                </svg>
              </NavLink>

              {/* Desktop mega menu: outer wrapper bridges the visual gap for hover continuity */}
              <div
                className={`absolute left-1/2 bottom-full hidden w-[min(860px,76vw)] -translate-x-1/2 xl:block ${isServicesMegaOpen ? "pointer-events-auto" : "pointer-events-none"
                  }`}
              >
                <div
                  className={`rounded-md border border-black/6 bg-[#d7d7d7] p-5.5 shadow-[0_18px_44px_rgba(0,0,0,0.24)] transition-all duration-200 ${isServicesMegaOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-2.5 opacity-0"
                    }`}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h3 className="m-0 text-[44px] font-bold leading-[1.08] tracking-[-0.02em] text-black-bg">
                        Want to grow with us?
                      </h3>
                      <p className="mt-2 text-[20px] leading-[1.22] text-black-bg">
                        Let&apos;s implement your skills toward to grow MAKTECH.
                      </p>
                    </div>

                    <NavLink
                      to="/contact"
                      className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-md bg-orange-bg-cta px-4 py-2.75 text-sm font-semibold text-white no-underline shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-px hover:bg-white hover:text-black"
                      onClick={handleNavigate}
                    >
                      <span
                        className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/24 transition-colors duration-200 group-hover:bg-black/10"
                        aria-hidden="true"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M7 17L17 7" />
                          <path d="M9 7h8v8" />
                        </svg>
                      </span>
                      Contact With Us
                    </NavLink>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {servicesMegaItems.map((item) => (
                      <MegaMenuCard
                        key={item.slug}
                        item={item}
                        onNavigate={handleNavigate}
                      />
                    ))}
                  </div>
                </div>
                {/* 16px transparent bridge keeps hover continuous while preserving visible gap */}
                <div className="h-4 w-full" />
              </div>

              <div
                className={`xl:hidden overflow-hidden transition-all duration-300 ${isServicesMegaOpen
                    ? "mt-2 max-h-[320px] opacity-100"
                    : "max-h-0 opacity-0"
                  }`}
              >
                <div className="space-y-1 rounded-md border border-white/10 bg-white/5 p-2">
                  <NavLink
                    to="/services"
                    className="block rounded-sm bg-white/10 px-3 py-2 text-[14px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-orange-bg-cta"
                    onClick={handleNavigate}
                  >
                    View all services
                  </NavLink>
                  {servicesMegaItems.map((item) => (
                    <NavLink
                      key={item.slug}
                      to={item.path}
                      className="block rounded-sm bg-white/5 px-3 py-2 text-[14px] text-white/90 no-underline transition-colors duration-200 hover:bg-orange-bg-cta hover:text-white"
                      onClick={handleNavigate}
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ) : link.to === "/company" ? (
            <div
              key={link.label}
              className="relative"
              onMouseEnter={openCompanyMegaMenu}
              onMouseLeave={closeCompanyMegaMenu}
              onFocusCapture={openCompanyMegaMenu}
              onBlurCapture={handleCompanyItemBlur}
            >
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `${navItemBaseClass} w-full justify-between xl:w-auto ${isActive ? navItemActiveClass : ""}`
                }
                onClick={handleCompanyLinkClick}
                style={{ transitionDelay: isMobile && menuOpen ? "150ms" : "0ms" }}
              >
                {link.label}
                <svg
                  className={`shrink-0 opacity-60 transition duration-200 ${isCompanyMegaOpen ? "rotate-180 opacity-100" : ""}`}
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 3.5L5 6.5L8 3.5" />
                </svg>
              </NavLink>

              <div
                className={`absolute left-1/2 bottom-full hidden w-[220px] -translate-x-1/2 xl:block ${isCompanyMegaOpen ? "pointer-events-auto" : "pointer-events-none"
                  }`}
              >
                <div
                  className={`rounded-md border border-black/6 bg-[#d7d7d7] p-2 shadow-[0_18px_44px_rgba(0,0,0,0.24)] transition-all duration-200 ${isCompanyMegaOpen
                      ? "visible translate-y-0 opacity-100"
                      : "invisible translate-y-2.5 opacity-0"
                    }`}
                >
                  <div className="flex flex-col gap-1">
                    {companyMegaItems.map((item) => (
                      <NavLink
                        key={item.slug}
                        to={item.path || `/company?section=${item.slug}`}
                        className="rounded-sm bg-[#c7c7c7] px-4 py-2.5 text-[16px] font-medium leading-none text-black-bg no-underline transition-colors duration-200 hover:bg-orange-bg-cta hover:text-white"
                        onClick={handleNavigate}
                      >
                        {item.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
                <div className="h-4 w-full" />
              </div>

              <div
                className={`xl:hidden overflow-hidden transition-all duration-300 ${isCompanyMegaOpen
                    ? "mt-2 max-h-[220px] opacity-100"
                    : "max-h-0 opacity-0"
                  }`}
              >
                <div className="space-y-1 rounded-md border border-white/10 bg-white/5 p-2">
                  <NavLink
                    to="/company"
                    className="block rounded-sm bg-white/10 px-3 py-2 text-[14px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-orange-bg-cta"
                    onClick={handleNavigate}
                  >
                    View company
                  </NavLink>
                  {companyMegaItems.map((item) => (
                    <NavLink
                      key={item.slug}
                      to={item.path || `/company?section=${item.slug}`}
                      className="block rounded-sm bg-white/5 px-3 py-2 text-[14px] text-white/90 no-underline transition-colors duration-200 hover:bg-orange-bg-cta hover:text-white"
                      onClick={handleNavigate}
                    >
                      {item.title}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <NavItem
              key={link.label}
              link={link}
              onNavigate={handleNavigate}
              delay={isMobile && menuOpen ? 50 + navLinks.indexOf(link) * 50 : 0}
            />
          )
        ))}

        {/* CTA inside dropdown for mobile/tablet */}
        <NavLink
          to="/contact"
          className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-orange-bg-cta px-4 py-3 text-[15px] font-semibold text-white no-underline transition duration-200 hover:bg-[#d14608] active:scale-[0.97] xl:hidden"
          onClick={() => setMenuOpen(false)}
          style={{ transitionDelay: isMobile && menuOpen ? "350ms" : "0ms" }}
        >
          Let&apos;s Talk
        </NavLink>
      </div>

      {/* CTA Button */}
      <NavLink
        to="/contact"
        className="hidden items-center rounded-full border border-white/10 bg-orange-bg-cta px-6 py-2.5 text-sm font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:bg-[#d14608] active:scale-[0.97] xl:inline-flex"
      >
        Let&apos;s Talk
      </NavLink>

      {/* Mobile Hamburger Menu */}
      <button
        className="inline-flex h-9 w-9 items-center justify-center border-none bg-transparent p-0 text-white/80 hover:text-white xl:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {menuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <>
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </>
          )}
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;