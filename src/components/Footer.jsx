import { useState } from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="relative bg-[#111111] overflow-hidden">
      {/* Top CTA Section */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="bg-black rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-white text-2xl md:text-4xl font-bold mb-3">
              Want to grow with us?
            </h2>
            <p className="text-gray-400 text-sm md:text-base mb-6">
              Let&apos;s implement your skills toward
              <br />
              to grow MAKTECH.
            </p>
            <NavLink
              to="/contact"
              className="inline-block bg-orange-bg-cta hover:bg-[#d14608] text-white px-8 py-3 rounded-full text-base font-medium transition-all duration-200"
            >
              Contact Now
            </NavLink>
          </div>
        </div>
      </div>

      {/* Footer Content with Hover Effect */}
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Large Background Text (visible on hover) */}
        <div
          className={`absolute inset-0 xl:flex items-end justify-center pb-8 pointer-events-none transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"
            }`}
          style={{ display: isHovered ? "flex" : "none" }}
        >
          <div className="text-[180px] 2xl:text-[220px] font-bold text-orange-bg-cta/40 select-none whitespace-nowrap leading-none">
            maktech
          </div>
        </div>

        {/* Desktop Footer Content */}
        <div className="hidden md:block relative z-10 max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1 - Logo & Social Card */}
            <div className="bg-[#2a2a2a] border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-1">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 2L12 22L15 14L22 12L2 2Z"
                      fill="#ff6533"
                      stroke="#ff6533"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-white text-xl font-bold">maktech</span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center gap-3 mb-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-white/5 flex items-center justify-center transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-white/5 flex items-center justify-center transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-white/5 flex items-center justify-center transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-white/5 flex items-center justify-center transition-all duration-200"
                  aria-label="Instagram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>

              {/* Tagline */}
              <p className="text-gray-400 text-sm leading-relaxed">
                Let&apos;s turn your idea into a powerful digital solution—starting
                today.
              </p>
            </div>

            {/* Column 2 - Quick Link */}
            <div>
              <h3 className="text-white text-base font-normal mb-4">
                Quick Link
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Case Study&apos;s
                  </a>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Contact
                  </NavLink>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Label here
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    Label here
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3 - Contacts */}
            <div>
              <h3 className="text-white text-base font-normal mb-4">
                Label here
              </h3>
              <ul className="space-y-3">
                <li className="text-gray-400 text-sm italic">
                  Maktech.corporate@gmail.com
                </li>
                <li className="text-gray-400 text-sm">
                  +88 01234567685
                </li>
                <li className="text-gray-400 text-sm">
                  ul. Generała Ziętka Jerzego 54, Mysłowice 41-412
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Footer Content (Accordion) */}
        <div className="md:hidden relative z-10 px-4 py-8">
          {/* Logo & Social Card */}
          <div className="bg-[#2a2a2a] border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 2L12 22L15 14L22 12L2 2Z"
                    fill="#ff6533"
                    stroke="#ff6533"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-white text-xl font-bold">maktech</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mb-6">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-white/5 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-white/5 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-white/5 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-[#3a3a3a] hover:bg-[#4a4a4a] border border-white/5 flex items-center justify-center transition-all duration-200"
                aria-label="Instagram"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
            </div>

            {/* Tagline */}
            <p className="text-gray-400 text-sm leading-relaxed">
              Let&apos;s turn your idea into a powerful digital solution—starting
              today.
            </p>
          </div>

          {/* Quick Link Accordion */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection("quicklink")}
              className="w-full flex items-center justify-between py-4 text-white text-base font-normal"
            >
              Quick Link
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${openSection === "quicklink" ? "rotate-180" : ""
                  }`}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {openSection === "quicklink" && (
              <div className="pb-4 space-y-3">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Case Study&apos;s
                </a>
                <NavLink
                  to="/contact"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact
                </NavLink>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Label here
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Label here
                </a>
              </div>
            )}
          </div>

          {/* Company Accordion */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection("company")}
              className="w-full flex items-center justify-between py-4 text-white text-base font-normal"
            >
              Company
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${openSection === "company" ? "rotate-180" : ""
                  }`}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {openSection === "company" && (
              <div className="pb-4 space-y-3">
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Label Name
                </a>
                <a
                  href="#"
                  className="block text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Label Name
                </a>
              </div>
            )}
          </div>

          {/* Contacts Accordion */}
          <div className="border-b border-white/10">
            <button
              onClick={() => toggleSection("contacts")}
              className="w-full flex items-center justify-between py-4 text-white text-base font-normal"
            >
              Contacts
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-transform duration-200 ${openSection === "contacts" ? "rotate-180" : ""
                  }`}
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            {openSection === "contacts" && (
              <div className="pb-4 space-y-3">
                <p className="text-gray-400 text-sm italic">
                  Maktech.corporate@gmail.com
                </p>
                <p className="text-gray-400 text-sm">+88 01234567685</p>
                <p className="text-gray-400 text-sm">
                  ul. Generała Ziętka Jerzego 54, Mysłowice 41-412
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Copyright Section with Orange Gradient */}
        <div className="relative border-t border-white/10 overflow-hidden">
          {/* Orange Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-t from-orange-bg-cta/40 via-orange-bg-cta/20 to-transparent pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 py-4 z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">©2026 Maktech</p>
              <div className="flex items-center gap-6">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Label here
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  Label here
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
