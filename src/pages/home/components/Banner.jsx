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
      className="relative w-full h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Content Container - Max Width */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 z-10">
        {/* Logo */}
        <div
          className={`flex items-center gap-2 mb-9 transition-all duration-500 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{ transitionDelay: "100ms" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <polygon points="4,4 20,12 4,20" fill="#e8500a" />
            <polygon points="13,4 20,8 13,12" fill="white" opacity="0.7" />
          </svg>
          <span className="text-white font-bold text-lg tracking-tight">
            maktech
          </span>
        </div>

        {/* Heading */}
        <h1
          className={`text-white font-extrabold leading-tight mb-9 transition-all duration-500 ease-out ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            fontSize: "clamp(28px, 3.8vw, 46px)",
            letterSpacing: "-1.5px",
            transitionDelay: "250ms",
            maxWidth: "560px",
          }}
        >
          Full–Stack IT Solutions That Drive
          <br />
          Business Growth at{" "}
          <span className="relative inline-block text-[#7a7a7a]">
            Every Stage
            <span
              className="absolute left-0 bottom-[-4px] w-full h-[2px] rounded-full"
              style={{ background: "#e8500a" }}
            />
          </span>
        </h1>

        {/* CTA Button */}
        <button
          className={`group flex items-center gap-3 w-fit rounded-full font-semibold text-sm text-white transition-all duration-500 ease-out hover:-translate-y-0.5 active:scale-95 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
          style={{
            background: "#e8500a",
            padding: "13px 24px",
            transitionDelay: "450ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#d14608")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#e8500a")}
        >
          Contact With Us
          <span
            className="w-7 h-7 flex items-center justify-center rounded-full flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.18)" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="white"
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
