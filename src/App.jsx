// /**
//  * Root Application Component
//  *
//  * This is the main App component that sets up routing for the entire application.
//  * It uses React Router v6 with Router wrapper and routes imported from router.jsx.
//  *
//  * Route Structure:
//  * - / : Demo login page (entry point)
//  * - /admin/* : Protected admin area with layout and nested routes
//  *   - dashboard, emails, leads, orders, case-studies, blog, jobs, pricing
//  */

// import { BrowserRouter as Router } from 'react-router-dom';
// import { useEffect } from 'react';
// import gsap from 'gsap';
// import AppRoutes from './route/router';
// import ScrollToTop from './components/ScrollToTop';
// import { setSmoothScrollInstance } from './utils/smoothScrollManager';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   useEffect(() => {
//     // GSAP-powered Smooth Scroll Implementation
//     let currentScroll = window.scrollY;
//     let targetScroll = window.scrollY;
//     const scrollData = { value: window.scrollY };

//     // GSAP animation for smooth interpolation
//     const updateScroll = () => {
//       window.scrollTo(0, scrollData.value);
//       currentScroll = scrollData.value;
//     };

//     // Handle wheel events with GSAP animation
//     const handleWheel = (e) => {
//       // If the wheel event originates inside a scrollable child element
//       // (e.g. the admin layout's overflow-y-auto container), let the
//       // browser handle it natively instead of intercepting it.
//       let el = e.target;
//       while (el && el !== document.body) {
//         const { overflow, overflowY } = window.getComputedStyle(el);
//         if (
//           /auto|scroll/.test(overflow + overflowY) &&
//           el.scrollHeight > el.clientHeight
//         ) {
//           return;
//         }
//         el = el.parentElement;
//       }

//       e.preventDefault();
//       targetScroll += e.deltaY * 0.8;
//       targetScroll = Math.max(
//         0,
//         Math.min(
//           targetScroll,
//           document.documentElement.scrollHeight - window.innerHeight,
//         ),
//       );

//       // Use GSAP to animate scroll smoothly
//       gsap.to(scrollData, {
//         value: targetScroll,
//         duration: 1.2,
//         ease: 'power2.out',
//         onUpdate: updateScroll,
//         overwrite: true, // Cancel previous animations
//       });
//     };

//     // Handle touch events for mobile
//     let touchStartY = 0;
//     const handleTouchStart = (e) => {
//       touchStartY = e.touches[0].clientY;
//     };

//     const handleTouchMove = (e) => {
//       const touchY = e.touches[0].clientY;
//       const deltaY = touchStartY - touchY;
//       targetScroll += deltaY * 1.5;
//       targetScroll = Math.max(
//         0,
//         Math.min(
//           targetScroll,
//           document.documentElement.scrollHeight - window.innerHeight,
//         ),
//       );
//       touchStartY = touchY;

//       // Use GSAP for smooth touch scrolling
//       gsap.to(scrollData, {
//         value: targetScroll,
//         duration: 0.8,
//         ease: 'power2.out',
//         onUpdate: updateScroll,
//         overwrite: true,
//       });
//     };

//     // Smooth scroll API
//     const smoothScroll = {
//       scrollTo: (target, immediate = false) => {
//         targetScroll = target;
//         if (immediate) {
//           scrollData.value = target;
//           currentScroll = target;
//           window.scrollTo(0, target);
//           gsap.killTweensOf(scrollData);
//         } else {
//           gsap.to(scrollData, {
//             value: target,
//             duration: 1,
//             ease: 'power2.out',
//             onUpdate: updateScroll,
//             overwrite: true,
//           });
//         }
//       },
//       getCurrentScroll: () => currentScroll,
//       getTargetScroll: () => targetScroll,
//     };

//     setSmoothScrollInstance(smoothScroll);

//     // Add event listeners
//     window.addEventListener('wheel', handleWheel, { passive: false });
//     window.addEventListener('touchstart', handleTouchStart, { passive: true });
//     window.addEventListener('touchmove', handleTouchMove, { passive: true });

//     // Cleanup on unmount
//     return () => {
//       window.removeEventListener('wheel', handleWheel);
//       window.removeEventListener('touchstart', handleTouchStart);
//       window.removeEventListener('touchmove', handleTouchMove);
//       gsap.killTweensOf(scrollData);
//       setSmoothScrollInstance(null);
//     };
//   }, []);

//   return (
//     <Router
//       future={{
//         v7_startTransition: true,
//         v7_relativeSplatPath: true,
//       }}
//     >
//       <ScrollToTop />
//       <AppRoutes />
//       <ToastContainer
//         position='bottom-right'
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme='light'
//         style={{
//           fontFamily: 'system-ui, -apple-system, sans-serif',
//           fontSize: '14px',
//         }}
//       />
//     </Router>
//   );
// }

// export default App;


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

// import { BrowserRouter as Router } from 'react-router-dom';
// import { useEffect } from 'react';
// import gsap from 'gsap';
// import Lenis from 'lenis';
// import AppRoutes from './route/router';
// import ScrollToTop from './components/ScrollToTop';
// import { setSmoothScrollInstance } from './utils/smoothScrollManager';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function App() {
//   useEffect(() => {
//     // Lenis smooth scroll — uses transform: translateY() internally
//     // which only triggers GPU compositing, NOT layout or paint.
//     // This is why it's smooth even with heavy sections like ServiceInside.
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       smoothWheel: true,
//       // Allow inner scrollable containers (e.g. admin sidebar) to scroll natively
//       eventsTarget: window,
//     });

//     // Sync Lenis into GSAP's RAF ticker.
//     // This is the most efficient approach — one single RAF loop drives both.
//     const rafCallback = (time) => {
//       lenis.raf(time * 1000);
//     };
//     gsap.ticker.add(rafCallback);
//     gsap.ticker.lagSmoothing(0);

//     // Expose smooth scroll API for programmatic scrolling
//     // (same interface as before so nothing else needs to change)
//     setSmoothScrollInstance({
//       scrollTo: (target, immediate = false) => {
//         lenis.scrollTo(target, { immediate, duration: 1 });
//       },
//       getCurrentScroll: () => lenis.scroll,
//       getTargetScroll: () => lenis.targetScroll,
//     });

//     return () => {
//       gsap.ticker.remove(rafCallback);
//       lenis.destroy();
//       setSmoothScrollInstance(null);
//     };
//   }, []);

//   return (
//     <Router
//       future={{
//         v7_startTransition: true,
//         v7_relativeSplatPath: true,
//       }}
//     >
//       <ScrollToTop />
//       <AppRoutes />
//       <ToastContainer
//         position='bottom-right'
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         pauseOnHover
//         draggable
//         theme='light'
//         style={{
//           fontFamily: 'system-ui, -apple-system, sans-serif',
//           fontSize: '14px',
//         }}
//       />
//     </Router>
//   );
// }

// export default App;


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

import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import AppRoutes from './route/router';
import ScrollToTop from './components/ScrollToTop';
import { setSmoothScrollInstance } from './utils/smoothScrollManager';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      eventsTarget: window,
    });

    // Sync Lenis into GSAP's RAF ticker — one single loop drives both
    const rafCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // FIX: On first load, Lenis calculates page height during init.
    // If images (especially in ServiceInside) haven't finished loading yet,
    // Lenis stores the WRONG scroll limit. When those images finish loading
    // and expand the page height, Lenis recalculates mid-scroll — causing
    // the first-time-only jank. Calling lenis.resize() on window 'load'
    // (which fires after ALL resources including images are ready) gives
    // Lenis the correct page height before the user can scroll to those sections.
    const handleLoad = () => {
      lenis.resize();
    };

    if (document.readyState === 'complete') {
      // Page already fully loaded (e.g. cached visit) — resize immediately
      lenis.resize();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Expose smooth scroll API for programmatic scrolling
    setSmoothScrollInstance({
      scrollTo: (target, immediate = false) => {
        lenis.scrollTo(target, { immediate, duration: 1 });
      },
      getCurrentScroll: () => lenis.scroll,
      getTargetScroll: () => lenis.targetScroll,
    });

    return () => {
      window.removeEventListener('load', handleLoad);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      setSmoothScrollInstance(null);
    };
  }, []);

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