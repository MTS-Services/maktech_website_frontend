import { useEffect, useState, useRef } from "react";

// Custom hook to animate numbers
const AnimatedCounter = ({ target, duration = 2000, suffix = "+" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }, // Triggers when 10% of the element is in view
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime = null;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // easeOutQuart easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
};

const AboutSection = () => {
  const stats = [
    { target: 7500, label: "Clients Worldwide", suffix: "+" },
    { target: 11000, label: "Projects Delivered", suffix: "+" },
    { target: 180, label: "In-House Professionals", suffix: "+" },
    { target: 6, label: "Years in Operation", suffix: "+" },
  ];

  return (
    <section className="hidden md:block w-full bg-white text-black py-24 relative z-10">
      <div className="max-w-[70%] mx-auto px-6 md:px-12 lg:px-24">
        {/* Top Content (Image + Text) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 xl:gap-24 mb-20">
          {/* Image Side */}
          <div className="w-full lg:w-[45%]">
            {/* Using a placeholder from Unsplash that matches the "people working" vibe */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
              alt="Team working in office"
              className="w-full h-auto object-cover rounded-sm shadow-sm"
            />
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-[55%] flex flex-col items-start gap-6">
            {/* Badge */}
            <div className="flex items-center gap-2 bg-[#ecd8d3] px-3 py-1.5 border border-[#e1cac4] rounded-md font-medium text-xl text-[#666666]">
              <div className="relative flex items-center justify-center w-3.5 h-3.5">
                <span className="absolute w-full h-full bg-orange-bg-cta rounded-full opacity-40"></span>
                <span className="w-2 h-2 bg-orange-bg-cta rounded-full"></span>
              </div>
              Who We are
            </div>

            {/* Heading */}
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-medium leading-none tracking-tight bg-linear-to-r from-(--color-white-bg-primary-start) to-white-bg-primary-end bg-clip-text text-transparent inline-block">
              More Than a Team We&apos;re <br className="hidden xl:block" />
              Your Tech{" "}
              <span className="relative inline-block pb-1 text-[#888888]">
                Partner
                <img
                  src="/Vector 511.png"
                  alt=""
                  aria-hidden="true"
                  className="absolute bottom-4 left-0 w-[110%] max-w-none pointer-events-none"
                />
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-[#676767] text-xl leading-relaxed max-w-lg mt-2">
              A group of designers, developers, and problem-solvers focused on
              long-term digital success. A group of designers, developers,
            </p>

            {/* CTA Button */}
            <button className="mt-4 bg-orange-bg-cta hover:bg-[#d14608] text-white px-6 py-2.5 rounded text-sm font-medium flex items-center gap-2 transition-colors duration-300 cursor-pointer">
              Learn More
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Bottom Content (Stats) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 mt-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <h3 className="text-3xl lg:text-[40px] font-bold text-black-bg tracking-tight">
                <AnimatedCounter target={stat.target} suffix={stat.suffix} />
              </h3>
              <p className="text-[#888888] text-[13px] font-medium mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
