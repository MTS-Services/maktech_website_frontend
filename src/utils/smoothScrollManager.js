/**
 * GSAP-based Smooth Scroll Manager
 * Provides smooth scrolling functionality using GSAP animations
 */

let smoothScrollInstance = null;

export const setSmoothScrollInstance = (instance) => {
  smoothScrollInstance = instance;
};

export const getSmoothScrollInstance = () => smoothScrollInstance;

export const scrollToTop = (immediate = false) => {
  if (smoothScrollInstance && smoothScrollInstance.scrollTo) {
    smoothScrollInstance.scrollTo(0, immediate);
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: immediate ? 'auto' : 'smooth' });
  }
};
