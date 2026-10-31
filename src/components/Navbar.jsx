import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

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
  { title: "SaaS Product", path: "/services/sas-product", slug: "sas-product" },
  {
    title: "AI Video",
    // No dedicated AI Video page yet — point at the contact form until one exists
    path: "/services/ai-video",
    slug: "ai-video",
    description: "AI-powered video for ads & social.",
  },
];

const companyMegaItems = [
  { title: "Blogs", slug: "blogs", path: "/blogs" },
  { title: "Career", slug: "career", path: "/career" },
  { title: "Our team", slug: "our-team", path: "/our-team" },
  { title: "Training & Programme", slug: "training-programme", href: "https://maktechinstitute.com/" },
  { title: "Gallery", slug: "gallery", path: "/gallery" },
  { title: "contact us", slug: "contact-us", path: "/contact" },
];

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/maktechgroup/", Icon: FaInstagram },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/maktechgroup", Icon: FaLinkedinIn },
  { label: "Facebook", href: "https://www.facebook.com/maktechgroup", Icon: FaFacebook },
  { label: "X (Twitter)", href: "https://x.com/MakTechSolution", Icon: FaXTwitter },
];

const navItemBaseClass =
  "inline-flex items-center gap-1 whitespace-nowrap rounded-[8px] px-4 py-2 text-[15px] 2xl:text-[16px] font-medium text-white/70 transition-colors duration-200 hover:bg-white/8 hover:text-white lg:px-[14px] 2xl:px-4";

const navItemActiveClass = "text-white border border-[#ff6533]";

const NavItem = ({ link, onNavigate }) => (
  <NavLink
    to={link.to}
    className={({ isActive }) =>
      `${navItemBaseClass} ${isActive ? navItemActiveClass : ""}`
    }
    onClick={onNavigate}
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
    className="group flex min-h-16 items-start gap-2.5 rounded-md border border-white/10 bg-white/[0.06] px-3.5 py-3 text-white no-underline transition duration-200 hover:-translate-y-px hover:border-orange-bg-cta hover:bg-orange-bg-cta hover:text-white"
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
      <span className="mt-1 truncate text-[12px] leading-tight text-white/60 group-hover:text-white/90">
        {item.description ?? "Let's implement your skills toward to grow MAKTECH."}
      </span>
    </span>
  </NavLink>
);

// One row of the fullscreen mobile menu: number + large label, with an
// optional expandable sub-list (Services / Company).
const MobileNavRow = ({ link, index, menuOpen, items, expanded, onToggle, onNavigate }) => {
  const number = String(index + 1).padStart(2, "0");
  // Staggered reveal: each row slides up, fades and unblurs in order
  const revealStyle = {
    transitionDelay: menuOpen ? `${140 + index * 65}ms` : "0ms",
  };
  const revealClass = `transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
    menuOpen ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[6px]"
  }`;

  const rowInner = (
    <>
      <span className="text-[12px] sm:text-[13px] font-medium text-orange-bg-cta tabular-nums pt-1">{number}</span>
      <span className="flex-1 text-[20px] sm:text-[24px] leading-snug font-semibold tracking-[-0.01em] text-white transition-colors duration-200 group-hover:text-orange-bg-cta">
        {link.label}
      </span>
      {items && (
        <svg
          className={`shrink-0 text-white/60 transition-transform duration-300 self-center ${expanded ? "rotate-180" : ""}`}
          width="16"
          height="16"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 3.5L5 6.5L8 3.5" />
        </svg>
      )}
    </>
  );

  return (
    <div className={`border-b border-white/10 ${revealClass}`} style={revealStyle}>
      {items ? (
        <button
          type="button"
          onClick={onToggle}
          className="group flex w-full items-start gap-3.5 py-3 sm:py-3.5 text-left"
          aria-expanded={expanded}
        >
          {rowInner}
        </button>
      ) : (
        <NavLink
          to={link.to}
          onClick={onNavigate}
          className="group flex w-full items-start gap-3.5 py-3 sm:py-3.5"
        >
          {rowInner}
        </NavLink>
      )}

      {items && (
        <div
          className={`overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${
            expanded ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 gap-1 pb-4 pl-9 sm:grid-cols-2">
            <NavLink
              to={link.to}
              onClick={onNavigate}
              className="col-span-full rounded-md bg-white/10 px-3 py-2 text-[14px] font-semibold text-white no-underline transition-colors duration-200 hover:bg-orange-bg-cta"
            >
              View all {link.label.toLowerCase()}
            </NavLink>
            {items.map((item) => {
              const itemClass =
                "rounded-md bg-white/5 px-3 py-2 text-[14px] text-white/80 no-underline transition-colors duration-200 hover:bg-orange-bg-cta hover:text-white";
              return item.href ? (
                <a
                  key={item.slug}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onNavigate}
                  className={itemClass}
                >
                  {item.title}
                </a>
              ) : (
                <NavLink
                  key={item.slug}
                  to={item.path}
                  onClick={onNavigate}
                  className={itemClass}
                >
                  {item.title}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isServicesMegaOpen, setIsServicesMegaOpen] = useState(false);
  const [isCompanyMegaOpen, setIsCompanyMegaOpen] = useState(false);
  // Which row is expanded inside the fullscreen mobile menu
  const [mobileExpanded, setMobileExpanded] = useState(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const timer = setTimeout(() => setVisible(true), 300);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Lock page scroll while the fullscreen menu is open
  useEffect(() => {
    const locked = menuOpen && isMobile;
    document.body.style.overflow = locked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, isMobile]);

  // Close the menu when the viewport grows into the desktop pill
  useEffect(() => {
    if (!isMobile && menuOpen) setMenuOpen(false);
  }, [isMobile, menuOpen]);

  const openServicesMegaMenu = () => {
    if (!isMobile) setIsServicesMegaOpen(true);
  };
  const closeServicesMegaMenu = () => setIsServicesMegaOpen(false);
  const openCompanyMegaMenu = () => {
    if (!isMobile) setIsCompanyMegaOpen(true);
  };
  const closeCompanyMegaMenu = () => setIsCompanyMegaOpen(false);

  const handleServicesItemBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) closeServicesMegaMenu();
  };
  const handleCompanyItemBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) closeCompanyMegaMenu();
  };

  const handleNavigate = () => {
    setMenuOpen(false);
    setMobileExpanded(null);
    closeServicesMegaMenu();
    closeCompanyMegaMenu();
  };

  const toggleMobileRow = (label) =>
    setMobileExpanded((prev) => (prev === label ? null : label));

  return (
    <>
      <nav
        className="fixed z-[1000] flex w-full items-center justify-between gap-0 px-5 py-4 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:w-[90%] xl:w-[60%] xl:min-w-216 lg:max-w-[1200px] lg:px-5 lg:py-2.5 2xl:gap-2.5 2xl:px-[22px]"
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
        {/* Backdrop lives on its own layer: a backdrop-filter on <nav> itself would stop the mega menus from blurring the page behind them */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(28,28,28,0.95)] shadow-[0_2px_8px_rgba(0,0,0,0.3)] [backdrop-filter:blur(18px)] lg:rounded-full lg:border lg:border-white/8 lg:bg-[rgba(28,28,28,0.82)] lg:shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,255,255,0.04)]"
        />

        {/* Logo */}
        <NavLink to="/" className="mr-1 flex items-center no-underline" onClick={handleNavigate}>
          <img
            src="/maktech_logo_white.webp"
            alt="maktech logo"
            className="h-6 w-auto lg:h-5.5 2xl:h-6"
          />
        </NavLink>

        {/* Desktop / laptop navigation (pill) */}
        <div className="hidden items-center justify-between gap-0 lg:flex lg:flex-row">
          {navLinks.map((link) =>
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
                    `${navItemBaseClass} ${isActive ? navItemActiveClass : ""}`
                  }
                  onClick={handleNavigate}
                >
                  {link.label}
                  <svg
                    className={`shrink-0 opacity-60 transition-all duration-300 ease-out ${isServicesMegaOpen ? "rotate-180 opacity-100" : "rotate-0"}`}
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

                {/* Desktop mega menu */}
                <div
                  className={`absolute left-1/2 bottom-full hidden w-[min(560px,88vw)] -translate-x-1/2 lg:block xl:w-[min(860px,76vw)] ${isServicesMegaOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                >
                  <div
                    className={`rounded-xl border border-white/15 bg-[rgba(28,28,28,0.45)] p-5.5 shadow-[0_18px_44px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] [backdrop-filter:blur(24px)_saturate(160%)] transition-all duration-200 ${isServicesMegaOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-2.5 opacity-0"
                      }`}
                  >
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="m-0 text-[44px] font-bold leading-[1.08] tracking-[-0.02em] text-white">
                          Want to grow with us?
                        </h3>
                        <p className="mt-2 text-[20px] leading-[1.22] text-white/70">
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

                    <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
                      {servicesMegaItems.map((item) => (
                        <MegaMenuCard key={item.slug} item={item} onNavigate={handleNavigate} />
                      ))}
                    </div>
                  </div>
                  {/* transparent bridge keeps hover continuous */}
                  <div className="h-4 w-full" />
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
                <button
                  type="button"
                  className={`${navItemBaseClass} border-none bg-transparent text-left`}
                >
                  {link.label}
                  <svg
                    className={`shrink-0 opacity-60 transition-all duration-300 ease-out ${isCompanyMegaOpen ? "rotate-180 opacity-100" : "rotate-0"}`}
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
                </button>

                <div
                  className={`absolute left-1/2 bottom-full hidden w-[220px] -translate-x-1/2 lg:block ${isCompanyMegaOpen ? "pointer-events-auto" : "pointer-events-none"
                    }`}
                >
                  <div
                    className={`rounded-xl border border-white/15 bg-[rgba(28,28,28,0.45)] p-2 shadow-[0_18px_44px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.08)] [backdrop-filter:blur(24px)_saturate(160%)] transition-all duration-200 ${isCompanyMegaOpen
                        ? "visible translate-y-0 opacity-100"
                        : "invisible translate-y-2.5 opacity-0"
                      }`}
                  >
                    <div className="flex flex-col gap-1">
                      {companyMegaItems.map((item) => {
                        const itemClass =
                          "rounded-md bg-white/[0.06] px-4 py-2.5 text-[16px] font-medium leading-none text-white no-underline transition-colors duration-200 hover:bg-orange-bg-cta hover:text-white";
                        return item.href ? (
                          <a
                            key={item.slug}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={handleNavigate}
                            className={itemClass}
                          >
                            {item.title}
                          </a>
                        ) : (
                          <NavLink
                            key={item.slug}
                            to={item.path || `/company?section=${item.slug}`}
                            className={itemClass}
                            onClick={handleNavigate}
                          >
                            {item.title}
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                  <div className="h-4 w-full" />
                </div>
              </div>
            ) : (
              <NavItem key={link.label} link={link} onNavigate={handleNavigate} />
            )
          )}
        </div>

        {/* Desktop CTA */}
        <NavLink
          to="/contact"
          className="hidden items-center whitespace-nowrap rounded-full border border-white/10 bg-orange-bg-cta px-6 py-2.5 text-sm font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:bg-[#d14608] active:scale-[0.97] lg:inline-flex"
        >
          Let&apos;s Talk
        </NavLink>

        {/* Mobile / tablet toggle: Menu <-> Close with an animated icon */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-white transition-colors duration-200 hover:border-white/40 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span className="relative block h-4 overflow-hidden text-[13px] font-semibold tracking-[0.08em]">
            <span
              className={`block h-4 leading-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "-translate-y-4" : "translate-y-0"}`}
            >
              MENU
            </span>
            <span
              className={`block h-4 leading-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "-translate-y-4" : "translate-y-0"}`}
            >
              CLOSE
            </span>
          </span>
          <span className="relative h-4 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"}`}
            />
            <span
              className={`absolute left-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${menuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </nav>

      {/* Fullscreen mobile / tablet menu */}
      <div
        className={`fixed inset-0 z-[990] bg-[#141414] transition-[opacity,visibility] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!menuOpen}
      >
        {/* faint brand glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-orange-bg-cta/20 blur-[120px]"
        />
        <div className="flex h-full flex-col overflow-y-auto px-6 pt-24 pb-10 sm:px-8">
          <nav aria-label="Mobile" className="flex flex-col">
            {navLinks.map((link, index) => (
              <MobileNavRow
                key={link.label}
                link={link}
                index={index}
                menuOpen={menuOpen}
                items={
                  link.to === "/services"
                    ? servicesMegaItems
                    : link.to === "/company"
                      ? companyMegaItems
                      : null
                }
                expanded={mobileExpanded === link.label}
                onToggle={() => toggleMobileRow(link.label)}
                onNavigate={handleNavigate}
              />
            ))}
          </nav>

          {/* Bottom: CTA, contact and socials */}
          <div
            className={`mt-auto pt-8 transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              menuOpen ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: menuOpen ? "560ms" : "0ms" }}
          >
            <NavLink
              to="/contact"
              onClick={handleNavigate}
              className="group flex w-full items-center justify-center gap-3 rounded-full bg-orange-bg-cta px-6 py-4 text-[16px] font-semibold text-white no-underline transition-all duration-200 hover:bg-[#d14608] active:scale-[0.98]"
            >
              Let&apos;s Talk
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:translate-x-1">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4" />
                </svg>
              </span>
            </NavLink>

            <div className="mt-6 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <a
                href="mailto:info@maktechgroup.com"
                className="text-[15px] text-white/70 transition-colors duration-200 hover:text-white"
              >
                info@maktechgroup.com
              </a>
              <div className="flex items-center gap-3">
                {socials.map(({ label, href, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition-colors duration-200 hover:bg-orange-bg-cta"
                  >
                    <Icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
