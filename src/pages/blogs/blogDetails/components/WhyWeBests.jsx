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
    <section
      className="min-h-[500px] flex items-center px-6 py-16 md:py-24"
      style={{
        background:
          "radial-gradient(70% 55% at 100% 0%, rgba(255, 182, 146, 0.32), rgba(255, 182, 146, 0) 60%), radial-gradient(70% 55% at 0% 100%, rgba(255, 182, 146, 0.28), rgba(255, 182, 146, 0) 60%), #ffffff",
      }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          {/* Left Column: Badge */}
          <div className="lg:w-[25%] flex items-center gap-3">
            <div className="p-3  bg-[#623A2C] rounded-xl">
              <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.3),2px_2px_5px_rgba(251,146,60,0.4)]">
                <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white/40 rounded-full blur-[1px]"></div>
              </div>
            </div>
            <span className="text-[17px] text-gray-700 font-normal tracking-tight">
              Why We are best
            </span>
          </div>

          {/* Right Column: Heading & Grid */}
          <div className="lg:w-[75%]">
            {/* Main Heading */}
            <h2 className="text-3xl font-medium text-[#383838] leading-[1.2] mb-12 max-w-[800px]">
              The team understood our vision from day one. The final product was
              clean, fast, and exactly what we{" "}
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {features.map((f) => (
                <p
                  key={f.id}
                  className="text-base  text-[#383838] leading-[1.6] font-normal"
                >
                  {f.text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWeBests;
