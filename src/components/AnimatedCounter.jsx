import { useEffect, useRef, useState } from 'react';

/**
 * Counts up to `target` once the element enters the viewport.
 * Uses easeOutQuart for a natural deceleration feel.
 * Properly cancels the rAF loop on unmount to prevent memory leaks.
 */
const AnimatedCounter = ({
  target,
  duration = 2000,
  suffix = '+',
  'aria-label': ariaLabel,
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);
  const rafId = useRef(null);

  // Start animation when element scrolls into view
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Run the counting animation
  useEffect(() => {
    if (!hasStarted) return;
    let startTime = null;

    const tick = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        rafId.current = requestAnimationFrame(tick);
      }
    };

    rafId.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId.current);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref} aria-label={ariaLabel ?? `${target}${suffix}`}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
