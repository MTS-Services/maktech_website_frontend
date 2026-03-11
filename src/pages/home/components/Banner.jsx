import { useEffect, useState } from "react";
const bgImage = "/home_banner_bg.png";

const Banner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className="relative w-full h-screen flex items-start justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content Container - Max Width */}
      <div className="w-full max-w-[70%] mx-auto px-6 md:px-12 lg:px-24 z-10 xl:mt-42.5 2xl:mt-35">
        {/* Logo */}
        <div
          className={`flex items-center gap-2 mb-9 transition-all duration-500 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <img
            src="/maktech_logo_white.png"
            alt="maktech logo"
            className="h-6 w-auto"
          />
        </div>
        {/* Heading */}

        <h1
          className={`text-white font-bold 2xl:leading-[1.1] mb-9 text-2xl md:text-4xl lg:text-5xl xl:text-[48px] 2xl:text-[68px] tracking-[0.5px] delay-250 max-w-[1080px] transition-all duration-500 ease-out xl:-ml-5 2xl:ml-0 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          Full-Stack IT Solutions That Drive
          <br />
          Business Growth at{" "}
          <span className="relative inline-block text-[#676767]">
            Every Stage
          </span>
        </h1>

        {/* CTA Button */}
        <button
          className={`group flex items-center gap-3 w-fit rounded-full font-semibold text-lg cursor-pointer text-white transition-all duration-500 ease-out hover:-translate-y-0.5 active:scale-95 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            background: "var(--color-orange-bg-cta)",
            padding: "13px 24px",
            transitionDelay: "450ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#d14608")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--color-orange-bg-cta)")
          }
        >
          Contact With Us
          <span
            className="w-7 h-7 flex items-center justify-center rounded-full shrink-0"
            style={{ background: "var(--color-white-bg-cta)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Banner;
