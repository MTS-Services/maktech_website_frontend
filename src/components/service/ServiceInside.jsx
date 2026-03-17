import { Link } from "react-router-dom";

const defaultCards = [
  {
    title: "Research",
    description:
      "Conducting in-depth user and market research to uncover behavioral patterns, identify core pain points, and translate insights into actionable design opportunities.",
    image: "https://placehold.co/392x224",
  },
  {
    title: "Strategy",
    description:
      "Defining product vision, aligning business objectives with user needs, and building a clear experience roadmap that guides every design decision.",
    image: "https://placehold.co/392x224",
  },
  {
    title: "Ideation",
    description:
      "Exploring creative concepts, mapping user journeys, and transforming complex problems into intuitive and engaging interaction solutions.",
    image: "https://placehold.co/392x224",
  },
  {
    title: "Wireframes",
    description:
      "Developing structured layouts and interaction flows that prioritize usability, clarity, and seamless navigation across all touchpoints.",
    image: "https://placehold.co/392x224",
  },
  {
    title: "Visual Design",
    description:
      "Crafting cohesive visual systems through typography, color, spacing, and components to create a compelling and consistent brand experience.",
    image: "https://placehold.co/392x224",
  },
  {
    title: "Testing",
    description:
      "Evaluating usability through real user feedback, analyzing interaction data, and iterating strategically to refine and optimize the overall experience.",
    image: "https://placehold.co/392x224",
  },
];

const ServiceInside = ({
  badgeText = "Inside UIUX",
  servicesTitle = "Our UIUX services",
  cards = defaultCards,
  pricingCtaText = "View Our Pricing",
  pricingCtaLink = "/pricing",
}) => {
  const renderLines = (text) =>
    text.split("\n").map((line, idx) => (
      <span key={`${line}-${idx}`}>
        {line}
        {idx !== text.split("\n").length - 1 && <br />}
      </span>
    ));

  return (
    <section className="relative overflow-hidden text-white py-16 sm:py-20 md:py-24">
      {/* Orange corner glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-56 bottom-0 h-[520px] w-[520px] rounded-full opacity-60 blur-[160px]"
        style={{ background: "rgba(255,101,51,0.35)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-56 top-0 h-[520px] w-[520px] rounded-full opacity-60 blur-[160px]"
        style={{ background: "rgba(255,101,51,0.32)" }}
      />

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 flex flex-col gap-16">
        {/* Grid section */}
        <div className="flex flex-col items-center gap-10">
          <div className="w-full max-w-6xl flex flex-col gap-6">
            <div
              className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-white shadow-sm w-fit border"
              style={{
                background:
                  "linear-gradient(93deg, rgba(255, 101, 51, 0) 0%, #1C1C1C 100%)",
                borderColor: "rgba(255, 255, 255, 0.25)",
              }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#623a2c] p-1.25">
                <span
                  className="h-[18px] w-[18px] rounded-full"
                  style={{
                    background:
                      "radial-gradient(ellipse 86.93% 86.93% at 14.58% 10.42%, #ffbea9 0%, #fa6332 100%)",
                    boxShadow: "2.25px 3.375px 4.5px rgba(68,18,0,0.36)",
                  }}
                />
              </span>
              <span className="text-[18px] font-normal">{badgeText}</span>
            </div>

            <h2 className="text-[40px] sm:text-[44px] md:text-[48px] font-medium text-white">
              {servicesTitle}
            </h2>
          </div>

          <div className="w-full container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-4 bg-black-bg rounded-lg p-4"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-64 object-cover rounded-lg"
                  loading="lazy"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl text-[#e3e3e3] font-medium">
                    {card.title}
                  </h3>
                  <p className="text-base text-[#bebebe] leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <Link
            to={pricingCtaLink}
            className="inline-flex items-center gap-3 rounded-lg bg-[#ff6533] px-6 py-3 text-base font-medium text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5"
          >
            {pricingCtaText}
            <span className="flex h-6 w-6 items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 3l4 3-4 3" />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServiceInside;
