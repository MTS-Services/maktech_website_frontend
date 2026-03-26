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
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Navbar from "../../components/Navbar";
import AnimatedLines from "../../components/AnimatedLines";
import Footer from "../../components/Footer";

const PublicLayout = () => {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const leftBannerRef = useRef(null);
  const rightBannerRef = useRef(null);
  const isFirstRender = useRef(true);

  // Animate background banners on page navigation
  useEffect(() => {
    if (isHomePage) return; // Skip animation on home page

    // Initial positions: banners hidden outside viewport
    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(leftBannerRef.current, { x: -window.innerWidth });
      gsap.set(rightBannerRef.current, { x: window.innerWidth });
      
      // Slide in animation
      gsap.to(leftBannerRef.current, {
        x: 0,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.3,
      });
      gsap.to(rightBannerRef.current, {
        x: 0,
        duration: 1.4,
        ease: "power2.out",
        delay: 0.3,
      });
      return;
    }

    // On page change: slide out then slide in
    const tl = gsap.timeline();
    
    // Slide out
    tl.to([leftBannerRef.current, rightBannerRef.current], {
      opacity: 0,
      duration: 0.5,
      ease: "power2.in",
    })
    // Reset positions outside
    .set(leftBannerRef.current, { x: -window.innerWidth, opacity: 1 })
    .set(rightBannerRef.current, { x: window.innerWidth, opacity: 1 })
    // Slide in
    .to([leftBannerRef.current, rightBannerRef.current], {
      x: 0,
      duration: 1.4,
      ease: "power2.out",
    });
  }, [pathname, isHomePage]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black-bg">
      {/* Animated vertical lines background - shown on all public pages */}
      <AnimatedLines />

      {/* Shared top banner backgrounds for all public pages except home */}
      {!isHomePage && (
        <>
          {/* Left Banner */}
          <div
            ref={leftBannerRef}
            className="pointer-events-none absolute left-0 top-0 h-[920px] w-[45%] hidden md:block"
            aria-hidden="true"
          >
            <div
              className="h-full w-full bg-cover bg-left-top opacity-95"
              style={{ backgroundImage: "url(/common_banner_bg.png)" }}
            />
          </div>

          {/* Right Banner */}
          <div
            ref={rightBannerRef}
            className="pointer-events-none absolute right-0 top-0 h-[920px] w-[45%] hidden md:block"
            aria-hidden="true"
          >
            <div
              className="h-full w-full bg-cover bg-right-top opacity-95"
              style={{ backgroundImage: "url(/common_banner_bg.png)" }}
            />
          </div>
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
