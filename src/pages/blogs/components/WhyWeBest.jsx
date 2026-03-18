
const WhyWeBest = () => {
  const features = [
    {
      id: 1,
      text: "We put your users first. Every button, color, and layout is strategically placed to enhance usability and ensure your visitors have a smooth, intuitive journey from start to finish.",
    },
    {
      id: 2,
      text: "Quality is in the details. Our design team ensures every pixel is aligned and every element is polished, giving your website a premium, professional look that builds instant trust.",
    },
    {
      id: 3,
      text: "A beautiful site is useless if it's slow. We optimize our development process to ensure your website loads lightning-fast, reducing bounce rates and keeping your audience engaged.",
    },
    {
      id: 4,
      text: "We focus on your ROI. Beyond just aesthetics, we design for conversions—helping you turn casual browsers into loyal customers through clear calls to action and optimized flows.",
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
            <div className="p-3  bg-[#DAB8AC] rounded-xl">
              <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-[inset_-2px_-2px_6px_rgba(0,0,0,0.3),2px_2px_5px_rgba(251,146,60,0.4)]">
                <div className="absolute top-1 left-1.5 w-1.5 h-1.5 bg-white/40 rounded-full blur-[1px]"></div>
              </div>
            </div>
            <span className="text-2xl text-gray-700 font-normal tracking-tight">
              Why We are best
            </span>
          </div>

          {/* Right Column: Heading & Grid */}
          <div className="lg:w-[75%]">
            {/* Main Heading */}
            <h2 className="text-xl sm:text-3xl font-medium text-[#383838] leading-[1.2] mb-12 max-w-[800px]">
              We craft high-performance digital experiences, blending UX and design to keep your brand ahead.
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              {features.map((f) => (
                <p 
                  key={f.id} 
                  className="text-base text-[#383838] leading-[1.6] font-normal"
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

export default WhyWeBest;