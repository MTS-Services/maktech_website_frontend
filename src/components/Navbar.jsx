// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";

// const navLinks = [
//   { label: "Home", to: "/" },
//   { label: "About Us", to: "/about" },
//   { label: "Services", to: "/services", hasDropdown: true },
//   { label: "Pricing", to: "/pricing" },
//   { label: "Case Study", to: "/case-study" },
//   { label: "Company", to: "/company", hasDropdown: true },
// ];

// const servicesMegaItems = [
//   { title: "UI / UX design", slug: "ui-ux-design", featured: true },
//   { title: "Flatter Development", slug: "flatter-development" },
//   { title: "Shopify", slug: "shopify" },
//   { title: "Graphic design", slug: "graphic-design" },
//   { title: "Laravel Development", slug: "laravel-development" },
//   { title: "WIX", slug: "wix" },
//   { title: "MERN Development", slug: "mern-development" },
//   { title: "WordPress", slug: "wordpress" },
//   { title: "Digital Marketing", slug: "digital-marketing" },
//   { title: "AI/ML", slug: "ai-ml" },
//   { title: "SAS Product", slug: "sas-product" },
// ];

// const navItemBaseClass =
//   "inline-flex items-center gap-1 rounded-[8px] px-4 py-2 text-[15px] 2xl:text-[16px] font-medium text-white/70 transition-colors duration-200 hover:bg-white/8 hover:text-white xl:px-[14px] 2xl:px-4";

// const navItemActiveClass = "text-white border border-[#ff6533]";

// const NavItem = ({ link, onNavigate, delay }) => (
//   <NavLink
//     to={link.to}
//     className={({ isActive }) =>
//       `${navItemBaseClass} ${isActive ? navItemActiveClass : ""}`
//     }
//     onClick={onNavigate}
//     style={{ transitionDelay: `${delay}ms` }}
//   >
//     {link.label}
//     {link.hasDropdown && (
//       <svg
//         className="shrink-0 opacity-60"
//         width="10"
//         height="10"
//         viewBox="0 0 10 10"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M2 3.5L5 6.5L8 3.5" />
//       </svg>
//     )}
//   </NavLink>
// );

// const MegaMenuCard = ({ item, onNavigate }) => (
//   <NavLink
//     to={`/services?category=${item.slug}`}
//     onClick={onNavigate}
//     className={`flex min-h-16 items-start gap-2.5 border px-3.5 py-3 no-underline transition duration-200 hover:-translate-y-px ${
//       item.featured
//         ? "border-white/20 bg-orange-bg-cta hover:bg-[#e65a2d]"
//         : "border-white/12 bg-black/12 hover:border-white/24 hover:bg-black/20"
//     }`}
//   >
//     <span
//       aria-hidden="true"
//       className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/45 text-white/90"
//     >
//       <svg
//         width="14"
//         height="14"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="1.8"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M7 17L17 7" />
//         <path d="M9 7h8v8" />
//       </svg>
//     </span>

//     <span className="flex min-w-0 flex-col">
//       <span className="truncate text-[16px] font-bold leading-[1.2] text-white">
//         {item.title}
//       </span>
//       <span className="mt-1 truncate text-[11px] leading-tight text-white/90">
//         Let&apos;s implement your skills toward to grow MAKTECH.
//       </span>
//     </span>
//   </NavLink>
// );

// const Navbar = () => {
//   const [visible, setVisible] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isServicesMegaOpen, setIsServicesMegaOpen] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => setIsMobile(window.innerWidth < 1280);
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     const timer = setTimeout(() => setVisible(true), 300);
//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener("resize", checkMobile);
//     };
//   }, []);

//   const openServicesMegaMenu = () => {
//     if (!isMobile) {
//       setIsServicesMegaOpen(true);
//     }
//   };

//   const closeServicesMegaMenu = () => {
//     setIsServicesMegaOpen(false);
//   };

//   const handleServicesItemBlur = (event) => {
//     if (!event.currentTarget.contains(event.relatedTarget)) {
//       closeServicesMegaMenu();
//     }
//   };

//   const handleNavigate = () => {
//     setMenuOpen(false);
//     closeServicesMegaMenu();
//   };

//   return (
//     <nav
//       className="fixed z-[1000] flex w-full items-center justify-between gap-0 bg-[rgba(28,28,28,0.95)] px-5 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.3)] transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] [backdrop-filter:blur(18px)] xl:w-[60%] xl:max-w-[1200px] xl:rounded-full xl:border xl:border-white/8 xl:bg-[rgba(28,28,28,0.82)] xl:px-5 xl:py-2.5 xl:shadow-[0_8px_32px_rgba(0,0,0,0.45),inset_0_0_0_1px_rgba(255,255,255,0.04)] 2xl:gap-2.5 2xl:px-[22px]"
//       style={{
//         opacity: visible ? 1 : 0,
//         left: isMobile ? 0 : "50%",
//         top: isMobile ? 0 : "auto",
//         bottom: isMobile ? "auto" : "35px",
//         transform: isMobile
//           ? visible
//             ? "translateY(0)"
//             : "translateY(-20px)"
//           : visible
//             ? "translateX(-50%) translateY(0)"
//             : "translateX(-50%) translateY(20px)",
//       }}
//     >
//       {/* Logo */}
//       <NavLink to="/" className="mr-1 flex items-center no-underline">
//         <img
//           src="/maktech_logo_white.png"
//           alt="maktech logo"
//           className="h-6 w-auto xl:h-5.5 2xl:h-6"
//         />
//       </NavLink>

//       {/* Navigation Links */}
//       <div
//         className="absolute left-0 right-0 top-full flex flex-col gap-0 overflow-hidden border-t border-white/6 bg-[rgba(28,28,28,0.98)] px-0 py-0 opacity-0 transition-all duration-300 [backdrop-filter:blur(18px)] xl:static xl:flex-row xl:items-center xl:justify-between xl:gap-0 xl:overflow-visible xl:border-none xl:bg-transparent xl:p-0 xl:opacity-100 xl:[backdrop-filter:none]"
//         style={
//           isMobile
//             ? {
//                 maxHeight: menuOpen ? "620px" : "0px",
//                 opacity: menuOpen ? 1 : 0,
//                 pointerEvents: menuOpen ? "auto" : "none",
//                 padding: menuOpen ? "16px 20px" : "0 20px",
//               }
//             : {
//                 maxHeight: "none",
//                 pointerEvents: "auto",
//               }
//         }
//       >
//         {navLinks.map((link) => (
//           link.to === "/services" ? (
//             <div
//               key={link.label}
//               className="relative"
//               onMouseEnter={openServicesMegaMenu}
//               onMouseLeave={closeServicesMegaMenu}
//               onFocusCapture={openServicesMegaMenu}
//               onBlurCapture={handleServicesItemBlur}
//             >
//               <NavLink
//                 to={link.to}
//                 className={({ isActive }) =>
//                   `${navItemBaseClass} w-full justify-between xl:w-auto ${isActive ? navItemActiveClass : ""}`
//                 }
//                 onClick={handleNavigate}
//                 style={{ transitionDelay: isMobile && menuOpen ? "150ms" : "0ms" }}
//               >
//                 {link.label}
//                 <svg
//                   className={`shrink-0 opacity-60 transition duration-200 ${isServicesMegaOpen ? "rotate-180 opacity-100" : ""}`}
//                   width="10"
//                   height="10"
//                   viewBox="0 0 10 10"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <path d="M2 3.5L5 6.5L8 3.5" />
//                 </svg>
//               </NavLink>

//               {/* Desktop mega menu opens on hover while preserving Services click navigation */}
//               <div
//                 className={`absolute left-1/2 bottom-[calc(100%+16px)] hidden w-[min(860px,76vw)] -translate-x-1/2 border border-black/6 bg-[#d7d7d7] p-5.5 shadow-[0_18px_44px_rgba(0,0,0,0.24)] transition-all duration-200 xl:block ${
//                   isServicesMegaOpen
//                     ? "pointer-events-auto visible translate-y-0 opacity-100"
//                     : "pointer-events-none invisible translate-y-2.5 opacity-0"
//                 }`}
//               >
//                 <div className="mb-4 flex items-start justify-between gap-3">
//                   <div>
//                     <h3 className="m-0 text-[44px] font-bold leading-[1.08] tracking-[-0.02em] text-white">
//                       Want to grow with us?
//                     </h3>
//                     <p className="mt-2 text-[28px] leading-[1.22] text-white/90">
//                       Let&apos;s implement your skills toward to grow MAKTECH.
//                     </p>
//                   </div>

//                   <NavLink
//                     to="/contact"
//                     className="inline-flex items-center gap-2.5 whitespace-nowrap rounded-md bg-orange-bg-cta px-4 py-2.75 text-sm font-semibold text-white no-underline shadow-[0_12px_24px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-px hover:bg-[#e65a2d]"
//                     onClick={handleNavigate}
//                   >
//                     <span
//                       className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/24"
//                       aria-hidden="true"
//                     >
//                       <svg
//                         width="14"
//                         height="14"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="1.8"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       >
//                         <path d="M7 17L17 7" />
//                         <path d="M9 7h8v8" />
//                       </svg>
//                     </span>
//                     Contact With Us
//                   </NavLink>
//                 </div>

//                 <div className="grid grid-cols-3 gap-4">
//                   {servicesMegaItems.map((item) => (
//                     <MegaMenuCard
//                       key={item.slug}
//                       item={item}
//                       onNavigate={handleNavigate}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <NavItem
//               key={link.label}
//               link={link}
//               onNavigate={handleNavigate}
//               delay={isMobile && menuOpen ? 50 + navLinks.indexOf(link) * 50 : 0}
//             />
//           )
//         ))}

//         {/* CTA inside dropdown for mobile/tablet */}
//         <NavLink
//           to="/contact"
//           className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-orange-bg-cta px-4 py-3 text-[15px] font-semibold text-white no-underline transition duration-200 hover:bg-[#d14608] active:scale-[0.97] xl:hidden"
//           onClick={() => setMenuOpen(false)}
//           style={{ transitionDelay: isMobile && menuOpen ? "350ms" : "0ms" }}
//         >
//           Let&apos;s Talk
//         </NavLink>
//       </div>

//       {/* CTA Button */}
//       <NavLink
//         to="/contact"
//         className="hidden items-center rounded-full border border-white/10 bg-orange-bg-cta px-6 py-2.5 text-sm font-semibold text-white no-underline transition duration-200 hover:-translate-y-px hover:bg-[#d14608] active:scale-[0.97] xl:inline-flex"
//       >
//         Let&apos;s Talk
//       </NavLink>

//       {/* Mobile Hamburger Menu */}
//       <button
//         className="inline-flex h-9 w-9 items-center justify-center border-none bg-transparent p-0 text-white/80 hover:text-white xl:hidden"
//         onClick={() => setMenuOpen(!menuOpen)}
//         aria-label="Toggle menu"
//       >
//         <svg
//           width="22"
//           height="22"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           {menuOpen ? (
//             <path d="M18 6L6 18M6 6l12 12" />
//           ) : (
//             <>
//               <path d="M4 6h16" />
//               <path d="M4 12h16" />
//               <path d="M4 18h16" />
//             </>
//           )}
//         </svg>
//       </button>
//     </nav>
//   );
// };

// export default Navbar;


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
  { title: "UI / UX design", slug: "ui-ux-design", featured: true },
  { title: "Flatter Development", slug: "flatter-development" },
  { title: "Shopify", slug: "shopify" },
  { title: "Graphic design", slug: "graphic-design" },
  { title: "Laravel Development", slug: "laravel-development" },
  { title: "WIX", slug: "wix" },
  { title: "MERN Development", slug: "mern-development" },
  { title: "WordPress", slug: "wordpress" },
  { title: "Digital Marketing", slug: "digital-marketing" },
  { title: "AI/ML", slug: "ai-ml" },
  { title: "SAS Product", slug: "sas-product" },
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
    to={`/services?category=${item.slug}`}
    onClick={onNavigate}
    className="group flex min-h-16 items-start gap-2.5 border border-black/10 bg-[#3B3B3B33] px-3.5 py-3 text-black-bg no-underline transition duration-200 hover:-translate-y-px hover:border-orange-bg-cta hover:bg-orange-bg-cta hover:text-white"
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

  const handleServicesItemBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      closeServicesMegaMenu();
    }
  };

  const handleNavigate = () => {
    setMenuOpen(false);
    closeServicesMegaMenu();
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
                onClick={handleNavigate}
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
                className={`absolute left-1/2 bottom-full hidden w-[min(860px,76vw)] -translate-x-1/2 xl:block ${
                  isServicesMegaOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                <div
                  className={`border border-black/6 bg-[#d7d7d7] p-5.5 shadow-[0_18px_44px_rgba(0,0,0,0.24)] transition-all duration-200 ${
                    isServicesMegaOpen
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