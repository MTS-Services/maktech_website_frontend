import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLenisInstance } from "../utils/lenisManager";

const ScrollToTop = () => {
  const { pathname, search, hash } = useLocation();

  useLayoutEffect(() => {
    const resetToTop = () => {
      // Reset native window scroll.
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Force Lenis-managed scroll position.
      const lenis = getLenisInstance();
      if (lenis && typeof lenis.scrollTo === "function") {
        lenis.scrollTo(0, { immediate: true, force: true });
      }

      // Reset custom scroll containers (e.g., admin content area).
      const scopedScrollContainers = document.querySelectorAll("[data-lenis-prevent]");
      scopedScrollContainers.forEach((container) => {
        container.scrollTop = 0;
      });
    };

    resetToTop();
    requestAnimationFrame(resetToTop);

    const timeoutId = setTimeout(resetToTop, 0);
    return () => clearTimeout(timeoutId);
  }, [pathname, search, hash]);

  return null;
};

export default ScrollToTop;
