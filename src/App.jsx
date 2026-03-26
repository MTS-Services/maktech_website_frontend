/**
 * Root Application Component
 * 
 * This is the main App component that sets up routing for the entire application.
 * It uses React Router v6 with Router wrapper and routes imported from router.jsx.
 * 
 * Route Structure:
 * - / : Demo login page (entry point)
 * - /admin/* : Protected admin area with layout and nested routes
 *   - dashboard, emails, leads, orders, case-studies, blog, jobs, pricing
 */

import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react'
import gsap from 'gsap'
import AppRoutes from './route/router'
import ScrollToTop from './components/ScrollToTop'
import { setSmoothScrollInstance } from './utils/smoothScrollManager'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    // GSAP-powered Smooth Scroll Implementation
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    const scrollData = { value: window.scrollY };

    // GSAP animation for smooth interpolation
    const updateScroll = () => {
      window.scrollTo(0, scrollData.value);
      currentScroll = scrollData.value;
    };

    // Handle wheel events with GSAP animation
    const handleWheel = (e) => {
      e.preventDefault();
      targetScroll += e.deltaY * 0.8;
      targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight));
      
      // Use GSAP to animate scroll smoothly
      gsap.to(scrollData, {
        value: targetScroll,
        duration: 1.2,
        ease: "power2.out",
        onUpdate: updateScroll,
        overwrite: true, // Cancel previous animations
      });
    };

    // Handle touch events for mobile
    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;
      targetScroll += deltaY * 1.5;
      targetScroll = Math.max(0, Math.min(targetScroll, document.documentElement.scrollHeight - window.innerHeight));
      touchStartY = touchY;
      
      // Use GSAP for smooth touch scrolling
      gsap.to(scrollData, {
        value: targetScroll,
        duration: 0.8,
        ease: "power2.out",
        onUpdate: updateScroll,
        overwrite: true,
      });
    };

    // Smooth scroll API
    const smoothScroll = {
      scrollTo: (target, immediate = false) => {
        targetScroll = target;
        if (immediate) {
          scrollData.value = target;
          currentScroll = target;
          window.scrollTo(0, target);
          gsap.killTweensOf(scrollData);
        } else {
          gsap.to(scrollData, {
            value: target,
            duration: 1,
            ease: "power2.out",
            onUpdate: updateScroll,
            overwrite: true,
          });
        }
      },
      getCurrentScroll: () => currentScroll,
      getTargetScroll: () => targetScroll,
    };

    setSmoothScrollInstance(smoothScroll);

    // Add event listeners
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Cleanup on unmount
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      gsap.killTweensOf(scrollData);
      setSmoothScrollInstance(null);
    };
  }, [])

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ScrollToTop />
      <AppRoutes />
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme='light'
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '14px',
        }}
      />
    </Router>
  );
}

export default App;
