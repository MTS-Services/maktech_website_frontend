import { useEffect, useRef, useState } from 'react';

// ─── Animated counter — fires once when scrolled into view ─────────────────
const AnimatedCounter = ({ target, duration = 2000, suffix = '+' }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

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

  useEffect(() => {
    if (!hasStarted) return;
    let startTime = null;
    const tick = (now) => {
      if (!startTime) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutQuart for smooth deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [hasStarted, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const STATS = [
  { target: 7500, label: 'Clients Worldwide', suffix: '+' },
  { target: 11000, label: 'Projects Delivered', suffix: '+' },
  { target: 180, label: 'In-House Professionals', suffix: '+' },
  { target: 6, label: 'Years in Operation', suffix: '+' },
];

const AboutStats = () => (
  <div className='border-t border-white/10 px-5 py-12 xl:px-16'>
    <div className='container mx-auto grid grid-cols-2 xl:grid-cols-4 gap-8 xl:gap-4'>
      {STATS.map(({ target, label, suffix }) => (
        <div key={label} className='flex flex-col gap-1'>
          <span className='text-white text-4xl xl:text-5xl font-bold tracking-tight'>
            <AnimatedCounter target={target} suffix={suffix} />
          </span>
          <span className='text-white/50 text-base font-medium mt-1'>
            {label}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default AboutStats;
