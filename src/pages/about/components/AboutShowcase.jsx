import AnimatedLines from '../../../components/AnimatedLines';
import { useEffect, useRef, useState } from 'react';

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

const AboutShowcase = () => (
  <section
    aria-label='About Maktech'
    className='relative w-full bg-black-bg h-screen px-4 sm:px-6 lg:px-10 xl:px-14 2xl:px-16 overflow-hidden flex items-center py-16'
  >
    {/* Animated vertical lines — same as hero */}
    <AnimatedLines />

    <div className='relative z-10 h-full max-w-360 mx-auto'>
      <div className='h-full flex flex-col lg:flex-row gap-4 xl:gap-5'>
        {/* ─── Left Column ─── */}
        <div className='w-full lg:w-[57%] flex flex-col gap-4 xl:gap-5'>
          {/* Person photo + Happy clients badge */}
          <div className='flex gap-4 xl:gap-5 lg:h-[38%]'>
            <div className='w-[34%] aspect-3/4 lg:aspect-auto lg:h-full shrink-0 rounded-2xl overflow-visible relative z-10'>
              <img
                src='/about1.png'
                alt='Maktech team member'
                width={280}
                height={370}
                className='w-full h-[122%] object-cover rounded-2xl rounded-bl-[60px] rounded-tr-[60px] object-top mt-16'
                loading='lazy'
              />
            </div>
            <div className='flex-1 flex items-center'>
              <img
                src='/about2.png'
                alt='Over 5000 happy clients — a digital-first team'
                width={300}
                height={56}
                className='w-[95%] ml-4 h-full object-contain mt-46 '
                loading='lazy'
              />
            </div>
          </div>

          {/* Office workspace photo */}
          <div className='w-full flex-1 min-h-52 rounded-[20px] overflow-hidden'>
            <img
              src='/about3.png'
              alt='Maktech team collaborating in a modern workspace'
              width={600}
              height={400}
              className='w-full h-full '
              loading='lazy'
            />
          </div>
        </div>

        {/* ─── Right Column ─── */}
        <div className='w-full lg:w-[43%] flex flex-col gap-4 xl:gap-5'>
          {/* Geometric cubes + title */}
          <div className='lg:h-[42%]'>
            <img
              src='/about4.png'
              alt='Designing digital systems for sustainable growth'
              width={400}
              height={280}
              className='w-[95%] h-[70%] ml-4 mt-20  '
              loading='lazy'
            />
          </div>

          {/* Testimonial card */}
          <div className='flex-1 min-h-48 rounded-2xl overflow-hidden'>
            <img
              src='/about5.png'
              alt='Five-star testimonial from a Product Manager at a SaaS Startup'
              width={400}
              height={250}
              className='w-full h-full '
              loading='lazy'
            />
          </div>

          {/* Stats bar */}
          <div className='lg:h-[18%] min-h-20 rounded-2xl flex items-center justify-center'>
            {/* <img
              src='/about6.png'
              alt='300 plus happy clients and 2500 plus projects completed'
              width={400}
              height={80}
              className='w-[180%] h-full mt-14 -ml-20'
              loading='lazy'
            /> */}
            <div className='w-[110%] h-full -ml-20 mt-48 overflow-visible flex items-center justify-center bg-[#2a2a2a] rounded-2xl px-8 py-6'>
              <div className='flex-1 flex flex-col items-center'>
                <span className='text-white text-4xl xl:text-5xl font-bold tracking-tight'>
                  <AnimatedCounter target={300} suffix='+' />
                </span>
                <span className='text-white/50 text-base font-medium mt-2'>
                  Happy Client
                </span>
              </div>
              <div className='w-px h-12 border-l border-dashed border-white/30' />
              <div className='flex-1 flex flex-col items-center'>
                <span className='text-white text-4xl xl:text-5xl font-bold tracking-tight'>
                  <AnimatedCounter target={2500} suffix='+' />
                </span>
                <span className='text-white/50 text-base font-medium mt-2'>
                  Project Completed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutShowcase;
