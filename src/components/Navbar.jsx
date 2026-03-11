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

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 425);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const timer = setTimeout(() => setVisible(true), 300);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <nav
      className="navbar-container"
      style={{
        opacity: visible ? 1 : 0,
        transform: isMobile
          ? visible ? "translateY(0)" : "translateY(-20px)"
          : visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
      }}
    >
      {/* Logo */}
      <NavLink to="/" className="navbar-logo">
        <img
          src="/maktech_logo_white.png"
          alt="maktech logo"
          className="navbar-logo-img"
        />
      </NavLink>

      {/* Navigation Links */}
      <div className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "navbar-link-active" : ""}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
            {link.hasDropdown && (
              <svg
                className="navbar-dropdown-icon"
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
        ))}
        {/* CTA inside dropdown for mobile/tablet */}
        <NavLink
          to="/contact"
          className="navbar-cta navbar-cta-mobile"
          onClick={() => setMenuOpen(false)}
        >
          Let's Talk
        </NavLink>
      </div>

      {/* CTA Button */}
      <NavLink to="/contact" className="navbar-cta">
        Let's Talk
      </NavLink>

      {/* Mobile Hamburger Menu */}
      <button
        className="navbar-hamburger"
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
