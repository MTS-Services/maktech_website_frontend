import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    image: "/our_work/Frame 2147226474.png",
    title: "Makai AI — Brand Identity",
    tags: ["Branding", "AI"],
  },
  {
    id: 2,
    image: "/our_work/image 7.png",
    title: "Makai AI — Visual Design",
    tags: ["UI/UX Design", "Branding"],
  },
  {
    id: 3,
    image: "/our_work/image 8.png",
    title: "Makai AI — Color System",
    tags: ["Branding", "Design"],
  },
  {
    id: 4,
    image: "/our_work/image 9.png",
    title: "Makai AI — Web Platform",
    tags: ["UI/UX Design", "SAS"],
  },
];

const OurWork = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top 15%",
        endTrigger: containerRef.current,
        end: `bottom bottom`,
        pin: true,
        pinSpacing: false,
      });
    });
  }, { scope: containerRef }); 

  return (
    // সেকশনের এক্সট্রা প্যাডিং রিমুভ করে দিয়েছি
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
                src="/Vector 511.png"
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

        <div className="flex flex-col items-center w-full relative">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[index] = el)}
              // প্রতিটি কার্ডের মাঝে স্ক্রল গ্যাপ
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
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
            </div>
          ))}
        </div>

        {/* ম্যাজিক স্পেসার (Dummy Footer): 
          এটি স্ক্রল করার জায়গা তৈরি করবে। যখন আপনি অরিজিনাল Footer বানাবেন, তখন এই div টি মুছে দেবেন। 
        */}
        <div className="w-full h-[85vh] mt-[20vh] flex flex-col items-center justify-center text-center px-4">
          {/* <p className="text-gray-400 text-xl font-medium">Your Footer Goes Here</p>
          <p className="text-gray-600 text-sm mt-2">
            (এই জায়গাটি দেওয়া হয়েছে যাতে শেষের কার্ডটি স্ক্রল করে উপরে ওঠার সুযোগ পায়)
          </p> */}
        </div>

      </div>
    </section>
  );
};

export default OurWork;