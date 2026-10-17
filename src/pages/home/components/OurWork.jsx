import { ALL_PROJECTS } from "../../case-study/data/projects";
import CubeFlow from "./CubeFlow";

const projects = [
  ALL_PROJECTS.find((p) => p.primaryCategory === "AI"),
  ALL_PROJECTS.find((p) => p.primaryCategory === "MERN"),
  ALL_PROJECTS.find((p) => p.primaryCategory === "Flutter"),
  ALL_PROJECTS.find((p) => p.primaryCategory === "Laravel"),
  ALL_PROJECTS.find((p) => p.primaryCategory === "UI/UX"),
].filter(Boolean);

const slides = projects.map((project) => ({
  title: project.title,
  description: project.subtitle,
  label: project.primaryCategory.toUpperCase(),
  image: project.coverImage,
  href: `/case-study/${project.slug}`,
}));

const OurWork = () => {
  return (
    <section className="w-full text-white pt-4 xl:pt-20 2xl:pt-24 relative overflow-x-clip">
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
        {/* ── SECTION HEADER ── */}
        <div className="flex flex-col items-center text-center">
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
      </div>

      {/* ── CUBE FLOW (scroll-driven 3D cubes: content left, image right) ── */}
      <div className="relative z-10 mx-auto w-full max-w-360">
        <CubeFlow slides={slides} />
      </div>
    </section>
  );
};

export default OurWork;
