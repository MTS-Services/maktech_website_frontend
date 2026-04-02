import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSmoothScrollInstance } from '../utils/smoothScrollManager';

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    // Reset smooth scroll to top
    const smoothScroll = getSmoothScrollInstance();
    if (smoothScroll && typeof smoothScroll.scrollTo === 'function') {
      smoothScroll.scrollTo(0, true); // Immediate scroll to top
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
