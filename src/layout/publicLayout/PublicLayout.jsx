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
import Navbar from "../../components/Navbar";
import AnimatedLines from "../../components/AnimatedLines";
import Footer from "../../components/Footer";

const PublicLayout = () => {
  return (
    <div className="relative min-h-screen bg-black-bg">
      {/* Animated vertical lines background - shown on all public pages */}
      <AnimatedLines />
      
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
