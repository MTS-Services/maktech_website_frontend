/**
 * Public Layout Component
 *
 * Shared layout wrapper for all public-facing pages.
 * Provides a consistent structure with:
 * - Persistent floating Navbar (bottom-center of viewport)
 * - Dynamic content area via React Router's Outlet
 *
 * Layout Structure:
 * ┌──────────────────────────────┐
 * │                              │
 * │        Page Content          │
 * │         (Outlet)             │
 * │                              │
 * │   ┌──────────────────────┐   │
 * │   │    Floating Navbar   │   │
 * │   └──────────────────────┘   │
 * └──────────────────────────────┘
 */

import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import AnimatedLines from "../../components/AnimatedLines";
import Footer from "../../components/Footer";

const PublicLayout = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";

  return (
    <div className="relative min-h-screen overflow-hidden bg-black-bg">
      {/* Animated vertical lines background - shown on all public pages */}
      <AnimatedLines />

      {/* Shared top banner background for all public pages except home */}
      {!isHomePage && (
        <>
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-cover bg-top opacity-95"
            style={{ backgroundImage: "url(/common_banner_bg.png)" }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-[720px]"
            aria-hidden="true"
          />
        </>
      )}
      
      {/* Page content */}
      <div className="relative z-10">
        <Outlet />
      </div>
      
      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
      
      {/* Floating navbar */}
      <Navbar />
    </div>
  );
};

export default PublicLayout;
