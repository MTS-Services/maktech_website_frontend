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

const ProjectCard = ({ project }) => {
  return (
    <div className="relative rounded-lg overflow-hidden group cursor-pointer">
      {/* Image */}
      <div className="aspect-[4/3] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Bottom overlay - always visible */}
      <div
        className="absolute bottom-0 left-0 right-0 px-5 py-4 flex flex-col gap-2"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)",
        }}
      >
        <h3 className="text-white font-semibold text-base xl:text-lg leading-snug">
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
  );
};

const OurWork = () => {
  return (
    <section className="w-full text-white py-4 xl:pt-20 2xl:pt-24 relative overflow-hidden">
      {/* Bottom-right glow — only on laptop/desktop (xl+) */}
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
      <div className="container mx-auto px-5 xl:px-8 2xl:px-12 relative z-10">
        {/* Header */}
        <div className="mb-12 xl:mb-16">
          {/* Badge */}
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

          {/* Heading */}
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

          {/* Subheading */}
          <p className="text-gray-300 text-base xl:text-lg 2xl:text-xl max-w-xl">
            Explore how we&apos;ve helped startups and enterprises turn
            challenges into scalable solutions.
          </p>
        </div>

        {/* Grid — 1 col mobile, 2 col tablet+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurWork;
