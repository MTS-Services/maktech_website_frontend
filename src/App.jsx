import { BrowserRouter as Router } from 'react-router-dom';
import { useEffect } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';
import AppRoutes from './route/router';
import ScrollToTop from './components/ScrollToTop';
import { setSmoothScrollInstance } from './utils/smoothScrollManager';
import { setLenisInstance } from './utils/lenisManager';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // data-lenis-prevent on inner scrollable containers (e.g. admin layout)
      // tells Lenis not to intercept scroll events on those elements
      eventsTarget: window,
    });

    // Expose raw instance so AdminLayout can call lenis.stop() / lenis.start()
    setLenisInstance(lenis);

    // One RAF loop drives both Lenis and GSAP — most efficient approach
    const rafCallback = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(rafCallback);
    gsap.ticker.lagSmoothing(0);

    // Recalculate scroll limit after ALL resources have loaded.
    // Prevents scroll jank caused by images expanding page height after
    // Lenis has already stored a shorter scroll limit on init.
    const handleLoad = () => lenis.resize();
    if (document.readyState === 'complete') {
      lenis.resize();
    } else {
      window.addEventListener('load', handleLoad);
    }

    setSmoothScrollInstance({
      scrollTo: (target, immediate = false) =>
        lenis.scrollTo(target, { immediate, duration: 1 }),
      getCurrentScroll: () => lenis.scroll,
      getTargetScroll: () => lenis.targetScroll,
    });

    return () => {
      window.removeEventListener('load', handleLoad);
      gsap.ticker.remove(rafCallback);
      lenis.destroy();
      setLenisInstance(null);
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
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        style={{ fontFamily: 'system-ui, -apple-system, sans-serif', fontSize: '14px' }}
      />
    </Router>
  );
}

export default App;
