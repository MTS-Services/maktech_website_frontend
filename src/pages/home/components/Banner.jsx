import { useEffect, useState } from "react";
const bgImage = "/home_banner_bg.png";

const Banner = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener("resize", check);
    const timer = setTimeout(() => setVisible(true), 50);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      className="relative w-full h-screen flex items-start justify-center"
      style={
        !isMobile
          ? {
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {/* Content Container - Max Width */}
      <div
        className={
          isMobile
            ? "w-full px-5 z-10 mt-24"
            : "w-full max-w-[70%] mx-auto px-6 md:px-12 lg:px-24 z-10 xl:mt-42.5 lg:mt-52 2xl:mt-35"
        }
      >
        {/* Logo - only on desktop */}
        {!isMobile && (
          <div
            className={`flex items-center gap-2 mb-9 transition-all duration-500 ease-out xl:-ml-5 2xl:ml-0 ${
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
        )}

        {/* Heading */}
        <h1
          className={`relative font-bold mb-9 max-w-[1080px] transition-all duration-500 ease-out ${
            isMobile
              ? "text-[22px] leading-[1.35] text-white"
              : "text-white 2xl:leading-[1.1] text-2xl md:text-4xl lg:text-[33px] xl:text-[48px] 2xl:text-[68px] tracking-[0.5px] delay-250 xl:-ml-5 2xl:ml-0"
          } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
        >
          {isMobile ? (
            <>
              {/* Sketch annotation decorations */}
              <img
                src="/Sketch-annotation.svg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute select-none"
                style={{
                  top: "-80%",
                  right: "-5%",
                  width: "180px",
                  height: "auto",
                  opacity: 0.9,
                }}
              />
              We design, develop, and launch high performance{" "}
              <span className="text-[#676767]">
                software that turns ideas into impact.
              </span>
            </>
          ) : (
            <>
              Full-Stack IT Solutions That Drive
              <br />
              Business Growth at{" "}
              <span className="relative inline-block text-[#676767]">
                Every Stage
              </span>
            </>
          )}
        </h1>

        {/* CTA Button */}
        <button
          className={`group flex items-center justify-center gap-3 rounded-full font-semibold cursor-pointer text-white transition-all duration-500 ease-out hover:-translate-y-0.5 active:scale-95 ${
            isMobile
              ? "w-full text-base py-1"
              : "w-fit text-lg xl:-ml-5 2xl:ml-0"
          } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
          style={{
            background: "var(--color-orange-bg-cta)",
            padding: isMobile ? "16px 24px" : "13px 24px",
            transitionDelay: "450ms",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#d14608")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "var(--color-orange-bg-cta)")
          }
        >
          {isMobile ? "Contact Us" : "Contact With Us"}
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
