

  import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ALL_PROJECTS } from "../../case-study/data/projects";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  ALL_PROJECTS.find((p) => p.primaryCategory === "AI"),
  ALL_PROJECTS.find((p) => p.primaryCategory === "MERN"),
  ALL_PROJECTS.find((p) => p.primaryCategory === "Flutter"),
  ALL_PROJECTS.find((p) => p.primaryCategory === "Laravel"),
  ALL_PROJECTS.find((p) => p.primaryCategory === "UI/UX"),
].filter(Boolean);

const OurWork = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileImagesRef = useRef([]);

  const mobileRowRefs = useRef([]);
  useGSAP(
    () => {
      // ── MOBILE ANIMATIONS ──────────────────────────────────────────────
        if (window.innerWidth < 1024) {
          const firstImage = mobileImagesRef.current[0];
          if (firstImage) {
            const firstImageHeight = firstImage.offsetHeight;
            const overlapDistance = firstImageHeight * 0.25; // 25% overlap

            // Arrange mobile cards into rows and create a single timeline
            // per row so left+right cards move together and stay aligned.
            const rows = 2; // we have 4 remaining projects -> 2 rows
            for (let i = 0; i < rows; i++) {
              const leftIdx = 1 + i * 2;
              const rightIdx = leftIdx + 1;
              const leftEl = mobileImagesRef.current[leftIdx];
              const rightEl = mobileImagesRef.current[rightIdx];
              const rowEl = mobileRowRefs.current[i];
              if (!rowEl) continue;

              const moveUp = Math.min(100, 40 + i * 20);
              gsap.fromTo(
                [leftEl, rightEl],
                { y: 80, opacity: 0.6 },
                {
                  y: -moveUp,
                  opacity: 1,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: rowEl,
                    start: 'top 90%',
                    end: 'bottom 20%',
                    scrub: true,
                  },
                }
              );
            }
          }
          return; // Skip desktop animations on mobile
      }

      // ── DESKTOP ANIMATIONS ─────────────────────────────────────────────

      // Step 1: Set every card to a clean initial state BEFORE any ScrollTrigger
      cardsRef.current.forEach((card) => {
        gsap.set(card, {
          rotation: 0,
          scale: 1,
          y: 0,
          opacity: 1,
          transformOrigin: "top center",
        });
      });

      // Step 2: Pin each card
      cardsRef.current.forEach((card) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top 8%",
          endTrigger: containerRef.current,
          end: "bottom bottom",
          pin: true,
          pinSpacing: false,
        });
      });

      // Step 3: Entrance animations — each card's timeline drives BOTH
      // the incoming card AND the previous card simultaneously.
      // No overwrite, no immediateRender flags — scrub handles both directions.
      cardsRef.current.forEach((card, index) => {
        if (index === 0) return; // First card has no entrance animation

        const prevCard = cardsRef.current[index - 1];
        const incomingStartRotation = index % 2 === 0 ? -10 : 10;
        const prevTargetRotation = index % 2 === 0 ? 5 : -5;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "top 8%",
            scrub: 1,
            // NO overwrite, NO anticipatePin here
          },
        });

        // Previous card tilts away
        if (prevCard) {
          tl.fromTo(
            prevCard,
            {
              rotation: 0,
              scale: 1,
              transformOrigin: "top center",
            },
            {
              rotation: prevTargetRotation,
              scale: 0.96,
              transformOrigin: "top center",
              ease: "none",
            },
            0,
          );
        }

        // Current card slides in from the side
        tl.fromTo(
          card,
          {
            rotation: incomingStartRotation,
            scale: 0.95,
            transformOrigin: "top center",
          },
          {
            rotation: 0,
            scale: 1,
            transformOrigin: "top center",
            ease: "none",
          },
          0,
        );
      });

      // Step 4: Exit animation — last card pinned, previous cards fade up cleanly.
      // Using fromTo so scroll-up reverses perfectly back to the stacked state.
      const lastCard = cardsRef.current[cardsRef.current.length - 1];
      const prevCards = cardsRef.current.slice(0, -1);

      if (lastCard && prevCards.length > 0) {
        // Each card gets its OWN ScrollTrigger so reverse is independent
        prevCards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              y: 0,
              opacity: 1,
              scale: 0.96, // already tilted state from entrance
            },
            {
              y: -50,
              opacity: 0,
              scale: 0.9,
              ease: "power2.inOut",
              scrollTrigger: {
                trigger: lastCard,
                start: "top 9%",
                end: `+=${250 + i * 40}`, // stagger by offset, not gsap stagger
                scrub: 1,
              },
            },
          );
        });
      }
    },
    { scope: containerRef },
  );

  return (
    <section className="w-full text-white py-4 xl:pt-20 2xl:pt-24 relative overflow-x-clip">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute hidden xl:block"
        style={{
          width: "1227px",
          height: "453px",
          bottom: "-220px",
          right: "-350px",
          background: "rgba(255, 101, 51, 0.35)",
          borderRadius: "50%",
          filter: "blur(180px)",
          transform: "rotate(27.49deg)",
          zIndex: 0,
        }}
      />

      <div
        className="container mx-auto px-5 xl:px-8 2xl:px-12 relative z-10"
        ref={containerRef}
      >
        {/* ── SECTION HEADER ── */}
        <div className="mb-12 xl:mb-16 flex flex-col items-center text-center">
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6"
            style={{
              background:
                "linear-gradient(90deg, rgba(46,34,30,0.98) 0%, rgba(38,30,28,0.92) 50%, rgba(28,22,20,0.88) 100%)",
              border: "1px solid rgba(255,255,255,0.03)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
            }}
          >
            <div className="relative flex items-center justify-center w-3.5 h-3.5">
              <span
                className="absolute w-full h-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255,101,51,0.95), rgba(255,101,51,0.6) 40%, rgba(255,101,51,0.25) 70%)",
                }}
              />
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: "linear-gradient(180deg, #ff8a5a, #ff6533)" }}
              />
            </div>
            <span className="text-base font-medium text-white">Our Work</span>
          </div>

          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 leading-tight">
            Real Problems.{" "}
            <span className="relative inline-block">
              Real Results.
              <img
                src="/Vector 511.webp"
                alt=""
                aria-hidden="true"
                className="absolute bottom-1 left-0 w-full pointer-events-none"
              />
            </span>
          </h2>

          <p className="text-gray-300 text-base xl:text-lg 2xl:text-xl max-w-xl">
            Explore how we&apos;ve helped startups and enterprises turn
            challenges into scalable solutions.
          </p>
        </div>

        {/* ── MOBILE LAYOUT ── */}
        <div className="flex flex-col items-center w-full relative lg:hidden">
          <div className="w-full mb-4">
            <Link
              to={`/case-study/${projects[0].slug}`}
              ref={(el) => (mobileImagesRef.current[0] = el)}
              className="relative rounded-2xl overflow-hidden group cursor-pointer block"
            >
              <div className="w-full bg-[#1c1614] aspect-[4/3]">
                <img
                  src={projects[0].coverImage}
                  alt={projects[0].title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>
              <div
                className="absolute bottom-0 left-0 right-0 px-4 py-4 flex flex-col gap-1.5"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
                }}
              >
                <h3 className="text-white font-semibold text-base leading-snug">
                  {projects[0].title}
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {projects[0].tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-white/80 bg-white/10 border border-white/15 px-2 py-0.5 rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>

          {/* Two rows with synchronized left/right cards so they stay aligned */}
          <div className="flex flex-col gap-4 w-full">
            {[0, 1].map((rowIdx) => {
              const left = projects[1 + rowIdx * 2];
              const right = projects[1 + rowIdx * 2 + 1];
              const leftRefIndex = 1 + rowIdx * 2;
              const rightRefIndex = leftRefIndex + 1;
              return (
                <div
                  key={`row-${rowIdx}`}
                  ref={(el) => (mobileRowRefs.current[rowIdx] = el)}
                  className="flex gap-4 w-full items-start"
                >
                  <Link
                    className="relative rounded-2xl overflow-hidden group cursor-pointer w-1/2 h-56"
                    to={`/case-study/${left?.slug}`}
                    ref={(el) => (mobileImagesRef.current[leftRefIndex] = el)}
                  >
                    <div className="w-full h-full bg-[#1c1614]">
                      <img
                        src={left?.coverImage}
                        alt={left?.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-4 flex flex-col gap-1.5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)" }}>
                      <h3 className="text-white font-semibold text-base leading-snug">{left?.title}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {left?.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs font-medium text-white/80 bg-white/10 border border-white/15 px-2 py-0.5 rounded-full backdrop-blur-sm">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>

                  <Link
                    className="relative rounded-2xl overflow-hidden group cursor-pointer w-1/2 h-56"
                    to={`/case-study/${right?.slug}`}
                    ref={(el) => (mobileImagesRef.current[rightRefIndex] = el)}
                  >
                    <div className="w-full h-full bg-[#1c1614]">
                      <img
                        src={right?.coverImage}
                        alt={right?.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-4 flex flex-col gap-1.5" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)" }}>
                      <h3 className="text-white font-semibold text-base leading-snug">{right?.title}</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {right?.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-xs font-medium text-white/80 bg-white/10 border border-white/15 px-2 py-0.5 rounded-full backdrop-blur-sm">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── DESKTOP LAYOUT ── */}
        <div className="hidden lg:flex flex-col items-center w-full relative">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/case-study/${project.slug}`}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`w-full max-w-6xl relative rounded-lg overflow-hidden group cursor-pointer ${
                index === projects.length - 1 ? "mb-[15vh]" : "mb-[50vh]"
              }`}
              style={{
                zIndex: index + 10,
                top: `${index * 10}px`,
              }}
            >
              <div className="aspect-[4/3] md:aspect-[16/10] w-full bg-[#1c1614]">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500"
                />
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 px-5 py-6 flex flex-col gap-2"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
                }}
              >
                <h3 className="text-white font-semibold text-xl xl:text-2xl leading-snug">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="w-full h-[0vh] mt-[0vh]" />
      </div>
    </section>
  );
};

export default OurWork;