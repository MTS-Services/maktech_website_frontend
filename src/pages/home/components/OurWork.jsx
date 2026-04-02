import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ALL_PROJECTS } from "../../case-study/data/projects";

gsap.registerPlugin(ScrollTrigger);

// Select featured projects: 1 UI/UX, 1 MERN, 1 Laravel
const projects = [
  ALL_PROJECTS.find(p => p.primaryCategory === 'UI/UX'), // First UI/UX project
  ALL_PROJECTS.find(p => p.primaryCategory === 'MERN'), // First MERN project
  ALL_PROJECTS.find(p => p.primaryCategory === 'CMS'), // First CMS project
].filter(Boolean); // Remove any null values

const OurWork = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const mobileImagesRef = useRef([]);

  useGSAP(() => {
    // Mobile animations
    if (window.innerWidth < 1024) {
      const firstImage = mobileImagesRef.current[0];
      if (firstImage) {
        const firstImageHeight = firstImage.offsetHeight;
        const overlapDistance = firstImageHeight * 0.25; // 25% overlap
        
        mobileImagesRef.current.forEach((img, index) => {
          if (index > 0) { // Skip the first image
            gsap.fromTo(img,
              {
                y: 100,
                opacity: 0.5,
              },
              {
                y: -overlapDistance,
                opacity: 1,
                scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 50%",
                  end: "center 30%",
                  scrub: 1,
                },
              }
            );
          }
        });
      }
      return; // Skip desktop animations on mobile
    }

    // Desktop animations
    cardsRef.current.forEach((card, index) => {
      // 1. Shake animation when card enters view
      // gsap.fromTo(card, 
      //   {
      //     x: 0,
      //     rotation: 0,
      //   },
      //   {
      //     x: -8,
      //     rotation: -1,
      //     duration: 0.1,
      //     ease: "power2.inOut",
      //     scrollTrigger: {
      //       trigger: card,
      //       start: "top 80%",
      //       end: "top 8%",
      //       toggleActions: "play none none none",
      //     },
      //     onComplete: () => {
      //       gsap.to(card, {
      //         x: 8,
      //         rotation: 1,
      //         duration: 0.1,
      //         yoyo: true,
      //         repeat: 3,
      //         ease: "power2.inOut",
      //         onComplete: () => {
      //           gsap.to(card, {
      //             x: 0,
      //             rotation: 0,
      //             duration: 0.1,
      //             ease: "power2.out"
      //           });
      //         }
      //       });
      //     }
      //   }
      // );

      // 2. Pin animation
      ScrollTrigger.create({
        trigger: card,
        start: "top 8%",
        endTrigger: containerRef.current,
        end: `bottom bottom`,
        pin: true,
        pinSpacing: false,
      });

      // 3. Rotate the incoming card from right to center (skip first card)
      if (index > 0) {
        gsap.fromTo(card,
          {
            rotation: 10, // Starts tilted to the right
            scale: 0.95, // Starts slightly smaller
            transformOrigin: "top center",
          },
          {
            rotation: 0, // Rotates to center
            scale: 1,    // Scales to full size
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: card,
              start: "top 80%", // Starts when card enters the screen
              end: "top 8%",    // Ends when card hits its pinned position
              scrub: true,      // Smooth scroll-linked animation
            },
          }
        );
      }

      // 4. Rotate previous card to the left when this card scrolls up
      if (index > 0) {
        gsap.to(cardsRef.current[index - 1], {
          rotation: -5, // Adjust degrees for more/less tilt
          scale: 0.96,  // Shrinks slightly for a 3D depth effect
          transformOrigin: "top center", // Rotates from the pinned top
          scrollTrigger: {
            trigger: card,
            start: "top 80%", // Starts when the NEW card enters the screen
            end: "top 8%",    // Ends when the NEW card hits its pinned position
            scrub: true,      // Smoothly links the rotation to your scroll wheel
          },
        });
      }
    });
  }, { scope: containerRef }); 

  return (
    <section className="w-full text-white py-4 xl:pt-20 2xl:pt-24 relative overflow-x-clip ">
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
      
      <div className="container mx-auto px-5 xl:px-8 2xl:px-12 relative z-10" ref={containerRef}>
        
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
              ></span>
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #ff8a5a, #ff6533)",
                }}
              ></span>
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

        {/* Mobile Layout */}
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

          <div className="flex gap-4 w-full">
            {projects.slice(1).map((project, index) => (
              <Link
                key={project.id}
                to={`/case-study/${project.slug}`}
                ref={(el) => (mobileImagesRef.current[index + 1] = el)}
                className="relative rounded-2xl overflow-hidden group cursor-pointer w-[48%]"
              >
                <div className="w-full bg-[#1c1614] aspect-[3/4]">
                  <img
                    src={project.coverImage}
                    alt={project.title}
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
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 2).map((tag) => (
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
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-col items-center w-full relative">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/case-study/${project.slug}`}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`w-full max-w-6xl relative rounded-lg overflow-hidden group cursor-pointer  ${
                index === projects.length - 1 ? "mb-0" : "mb-[50vh]"
              }`}
              style={{
                zIndex: index + 10,
                top: `${index * 10}px`
              }}
            >
              <div className="aspect-[4/3] md:aspect-[16/10] w-full bg-[#1c1614]">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 "
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

        <div className="w-full h-[0vh] mt-[10vh] flex flex-col items-center justify-center text-center px-4">
        </div>

      </div>
    </section>
  );
};

export default OurWork;

