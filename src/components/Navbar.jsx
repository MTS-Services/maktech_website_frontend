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

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className="navbar-container"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(20px)",
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
      <div className="navbar-links">
        {navLinks.map((link) => (
          <NavLink
            key={link.label}
            to={link.to}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "navbar-link-active" : ""}`
            }
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
      </div>

      {/* CTA Button */}
      <NavLink to="/contact" className="navbar-cta">
        Let's Talk
      </NavLink>
    </nav>
  );
};

export default Navbar;
