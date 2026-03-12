const features = [
  {
    id: 1,
    title: "A Team of Experts",
    description:
      "A group of developers, designers, and strategists who bring precision, creativity, and technical depth to every project we take on.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "End-to-End Ownership",
    description:
      "We don't just deliver projects — we build digital foundations that scale with your business and support your long-term success.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2m-4-6h8" />
        <path d="M9.5 9.5a3 3 0 0 1 5 2c0 1.5-1.5 2.5-2.5 3" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Built for Your Growth",
    description:
      "We don't just deliver projects — we build digital foundations that scale with your business and support your long-term success.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Fast Delivery, Zero Shortcuts",
    description:
      "Younger talent brings agility; senior leaders bring discipline — fast delivery without ever cutting corners.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const FeatureCard = ({ feature }) => (
  <div className="bg-[#1e1e1e] xl:bg-[#1e1e1e] rounded-xl p-6 flex flex-col gap-4 border border-white/5">
    {/* Orange icon box */}
    <div className="w-11 h-11 rounded-lg bg-orange-bg-cta flex items-center justify-center shrink-0">
      {feature.icon}
    </div>
    <div className="flex flex-col gap-2">
      <h3 className="text-white font-semibold text-base xl:text-xl leading-snug">
        {feature.title}
      </h3>
      <p className="text-[#a0a0a0] text-sm md:text-base leading-relaxed">
        {feature.description}
      </p>
    </div>
  </div>
);

const   WhyChooseUs = () => {
  return (
    <section className="w-full relative overflow-hidden py-16 xl:py-20 2xl:py-24 bg-[#111111] xl:bg-white">
      {/* Background blob image — desktop only */}
      <div className="hidden xl:block absolute inset-0 z-0">
        <img
          src="/why_choice_us/Group_1261154808.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Left-bottom glow — desktop only */}
      <div
        aria-hidden="true"
        className="hidden xl:block pointer-events-none absolute z-0"
        style={{
          width: "500px",
          height: "500px",
          bottom: "-150px",
          left: "-100px",
          background: "rgba(255, 101, 51, 0.35)",
          borderRadius: "50%",
          filter: "blur(120px)",
        }}
      />

      {/* Right top-to-bottom glow — desktop only */}
      <div
        aria-hidden="true"
        className="hidden xl:block pointer-events-none absolute z-0"
        style={{
          width: "450px",
          height: "600px",
          top: "-80px",
          right: "-100px",
          background: "rgba(255, 101, 51, 0.30)",
          borderRadius: "50%",
          filter: "blur(130px)",
        }}
      />

      <div className="max-w-full xl:max-w-[65%] mx-auto px-5 xl:px-8 2xl:px-12 relative z-10">

        {/* ── Mobile / Tablet: stacked layout ── */}
        <div className="xl:hidden">
          {/* Text block */}
          <div className="mb-12">
            {/* Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6"
              style={{
                background: "linear-gradient(90deg, rgba(46,34,30,0.98) 0%, rgba(38,30,28,0.92) 50%, rgba(28,22,20,0.88) 100%)",
                border: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              <div className="relative flex items-center justify-center w-3.5 h-3.5">
                <span className="absolute w-full h-full rounded-full"
                  style={{ background: "radial-gradient(circle at 35% 30%, rgba(255,101,51,0.95), rgba(255,101,51,0.6) 40%, rgba(255,101,51,0.25) 70%)" }}
                />
                <span className="w-2 h-2 rounded-full" style={{ background: "linear-gradient(180deg, #ff8a5a, #ff6533)" }} />
              </div>
              <span className="text-base font-medium text-white">Why Choose Us</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight mb-4 bg-gradient-to-br from-[#2F2F2F] to-[#BFBDBD] bg-clip-text text-transparent">
              Built as an Institution,{" "}
              Not a Loose Network
            </h2>

            {/* Description */}
            <p className="text-[#AAAAAA] text-sm leading-relaxed mb-3">
              At Maktech, 180+ full-time professionals operate as one structured team.
            </p>
            <p className="text-[#AAAAAA] text-sm leading-relaxed mb-8">
              Younger talent brings speed; senior leaders bring discipline. Roles are clear,
              processes are defined, and standards hold — no matter the scale.
            </p>

            {/* CTA */}
            <button className="flex items-center gap-2 bg-[#ff6533] hover:bg-[#d14608] text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors duration-200 cursor-pointer">
              Read more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Cards — 1 col mobile, 2 col tablet */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.id} feature={f} />
            ))}
          </div>
        </div>

        {/* ── Desktop: side-by-side layout ── */}
        <div className="hidden xl:flex items-center gap-16 2xl:gap-20">
          {/* Left: Text */}
          <div className="w-[45%] shrink-0 flex flex-col gap-5">
            {/* Badge */}
            <div className="flex items-center gap-2 bg-[#f0ddd8] px-3 py-1.5 border border-[#e5cac3] rounded-md w-fit">
              <div className="relative flex items-center justify-center w-3.5 h-3.5">
                <span className="absolute w-full h-full bg-[#ff6533] rounded-full opacity-30" />
                <span className="w-2 h-2 bg-[#ff6533] rounded-full" />
              </div>
              <span className="text-base font-medium text-[#555]">Why Choose Us</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight bg-gradient-to-br from-[#2F2F2F] to-[#BFBDBD] bg-clip-text text-transparent">
              Built as an Institution,
              <br />
              Not a Loose Network
            </h2>

            {/* Divider line */}
            <div className="w-20 h-0.5 bg-[#ff6533] rounded-full" />

            {/* Description */}
            <p className="text-[#555] text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
              At Maktech, 180+ full-time professionals operate as one structured team.
            </p>
            <p className="text-[#555] text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed">
              Younger talent brings speed; senior leaders bring discipline. Roles are clear,
              processes are defined, and standards hold — no matter the scale.
            </p>

            {/* CTA */}
            <button className="flex items-center gap-2 bg-[#ff6533] hover:bg-[#d14608] text-white px-6 py-3 rounded-md text-base font-semibold transition-colors duration-200 cursor-pointer w-fit mt-2">
              Read more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Right: 2×2 feature cards */}
          <div className="flex-1 grid grid-cols-2 gap-4">
            {features.map((f) => (
              <FeatureCard key={f.id} feature={f} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
