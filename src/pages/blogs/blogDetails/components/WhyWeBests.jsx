const WhyWeBests = () => {
  const features = [
    {
      id: 1,
      text: "You’re partnering with a company and its operating system not a set of disconnected individuals.",
    },
    {
      id: 2,
      text: "180+ professionals working from a structured office environment, which helps maintain continuity across phases.",
    },
    {
      id: 3,
      text: "Website development, applications, UI/UX, and marketing delivered under one coordinated framework.",
    },
    {
      id: 4,
      text: " Systems built with growth in mind so you’re not forced to rebuild as soon as traction appears.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:px-16 lg:px-24 xl:px-32 2xl:px-[348px]">
      <div className="relative z-10 flex flex-col items-start justify-between gap-12 lg:flex-row lg:gap-16">
        {/* Left Column: Badge */}
        <div className="flex w-full max-w-[287.5px] items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-[8px] bg-[#623A2C] p-[5.33px]">
            <div className="h-[18px] w-[18px] rounded-full bg-[radial-gradient(86.93%_86.93%_at_14.58%_10.42%,#FFBEA9_0%,#FA6332_100%)] shadow-[2.25px_3.375px_4.5px_rgba(68,18,0,0.36)]" />
          </div>
          <span
            className="text-[20px] leading-[1.3] text-[#565656] md:text-[24px]"
            style={{ fontFamily: "DM Sans", fontWeight: 400, lineHeight: "31.2px" }}
          >
            Why We are best
          </span>
        </div>

        {/* Right Column: Heading & Grid */}
        <div className="flex w-full max-w-[808px] flex-col gap-10">
          <h2
            className="text-[26px] font-medium leading-[1.3] text-[#2F2F2F] md:text-[32px]"
            style={{ fontFamily: "DM Sans", lineHeight: "41.6px" }}
          >
            The team understood our vision from day one. The final product was clean,
            fast, and exactly what we
          </h2>

          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-12 md:gap-y-10">
            {features.map((f) => (
              <p
                key={f.id}
                className="text-[18px] text-[#565656] md:text-lg"
                style={{ fontFamily: "DM Sans", fontWeight: 400, lineHeight: "31.2px" }}
              >
                {f.text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Blurred orange glows */}
      <div className="pointer-events-none absolute right-[-320px] top-[120px] h-[453px] w-[1227px] rotate-[-37deg] rounded-full bg-[rgba(255,101,51,0.35)] blur-[188.5px]" />
      <div className="pointer-events-none absolute left-[-860px] top-[340px] h-[453px] w-[1227px] rotate-[-37deg] rounded-full bg-[rgba(255,101,51,0.35)] blur-[188.5px]" />
    </section>
  );
};

export default WhyWeBests;
