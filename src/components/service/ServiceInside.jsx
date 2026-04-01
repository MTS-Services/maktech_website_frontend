// import { Link } from "react-router-dom";

// const defaultCards = [
//   {
//     title: "Research",
//     description:
//       "Conducting in-depth user and market research to uncover behavioral patterns, identify core pain points, and translate insights into actionable design opportunities.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Strategy",
//     description:
//       "Defining product vision, aligning business objectives with user needs, and building a clear experience roadmap that guides every design decision.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Ideation",
//     description:
//       "Exploring creative concepts, mapping user journeys, and transforming complex problems into intuitive and engaging interaction solutions.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Wireframes",
//     description:
//       "Developing structured layouts and interaction flows that prioritize usability, clarity, and seamless navigation across all touchpoints.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Visual Design",
//     description:
//       "Crafting cohesive visual systems through typography, color, spacing, and components to create a compelling and consistent brand experience.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Testing",
//     description:
//       "Evaluating usability through real user feedback, analyzing interaction data, and iterating strategically to refine and optimize the overall experience.",
//     image: "https://placehold.co/392x224",
//   },
// ];

// const ServiceInside = ({
//   badgeText = "Inside UIUX",
//   servicesTitle = "Our UIUX services",
//   cards = defaultCards,
//   pricingCtaText = "View Our Pricing",
//   pricingCtaLink = "/pricing",
// }) => {
//   return (
//     <section className="relative overflow-hidden text-white py-16 sm:py-20 md:py-24">
//       {/* Orange corner glows - NO BLUR for smooth scrolling */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -left-56 bottom-0 h-[520px] w-[520px] rounded-full opacity-20"
//         style={{
//           background: "radial-gradient(circle, rgba(255,101,51,0.6) 0%, rgba(255,101,51,0.3) 40%, transparent 70%)",
//         }}
//       />
//       <div
//         aria-hidden="true"
//         className="pointer-events-none absolute -right-56 top-0 h-[520px] w-[520px] rounded-full opacity-20"
//         style={{
//           background: "radial-gradient(circle, rgba(255,101,51,0.5) 0%, rgba(255,101,51,0.25) 40%, transparent 70%)",
//         }}
//       />

//       <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 flex flex-col gap-16">
//         {/* Grid section */}
//         <div className="flex flex-col items-start gap-10">
//           <div className="w-full max-w-6xl flex flex-col gap-4 text-left">
//             <div
//               className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-white shadow-sm w-fit border"
//               style={{
//                 background:
//                   "linear-gradient(93deg, rgba(255, 101, 51, 0) 0%, #1C1C1C 100%)",
//                 borderColor: "rgba(255, 255, 255, 0.25)",
//               }}
//             >
//               <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#623a2c] p-1.25">
//                 <span
//                   className="h-[18px] w-[18px] rounded-full"
//                   style={{
//                     background:
//                       "radial-gradient(ellipse 86.93% 86.93% at 14.58% 10.42%, #ffbea9 0%, #fa6332 100%)",
//                     boxShadow: "2.25px 3.375px 4.5px rgba(68,18,0,0.36)",
//                   }}
//                 />
//               </span>
//               <span className="text-[18px] font-normal">{badgeText}</span>
//             </div>

//             <h2 className="text-[40px] sm:text-[44px] md:text-[48px] font-medium text-white">
//               {servicesTitle}
//             </h2>
//           </div>

//           <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {cards.map((card) => (
//               <div
//                 key={card.title}
//                 className="flex flex-col gap-4 bg-black-bg rounded-lg p-4"
//               >
//                 <div className="w-full aspect-[392/224] rounded-lg overflow-hidden bg-[#2a2a2a]">
//                   <img
//                     src={card.image}
//                     alt={card.title}
//                     className="w-full h-full object-cover"
//                     width="392"
//                     height="224"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <h3 className="text-xl text-[#e3e3e3] font-medium">
//                     {card.title}
//                   </h3>
//                   <p className="text-base text-[#bebebe] leading-relaxed">
//                     {card.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <Link
//             to={pricingCtaLink}
//             className="inline-flex items-center gap-3 rounded-lg bg-[#ff6533] px-6 py-3 text-base font-medium text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 self-start"
//           >
//             {pricingCtaText}
//             <span className="flex h-6 w-6 items-center justify-center">
//               <svg
//                 width="12"
//                 height="12"
//                 viewBox="0 0 12 12"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M5 3l4 3-4 3" />
//               </svg>
//             </span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceInside;

// import { Link } from "react-router-dom";

// const defaultCards = [
//   {
//     title: "Research",
//     description:
//       "Conducting in-depth user and market research to uncover behavioral patterns, identify core pain points, and translate insights into actionable design opportunities.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Strategy",
//     description:
//       "Defining product vision, aligning business objectives with user needs, and building a clear experience roadmap that guides every design decision.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Ideation",
//     description:
//       "Exploring creative concepts, mapping user journeys, and transforming complex problems into intuitive and engaging interaction solutions.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Wireframes",
//     description:
//       "Developing structured layouts and interaction flows that prioritize usability, clarity, and seamless navigation across all touchpoints.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Visual Design",
//     description:
//       "Crafting cohesive visual systems through typography, color, spacing, and components to create a compelling and consistent brand experience.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Testing",
//     description:
//       "Evaluating usability through real user feedback, analyzing interaction data, and iterating strategically to refine and optimize the overall experience.",
//     image: "https://placehold.co/392x224",
//   },
// ];

// const ServiceInside = ({
//   badgeText = "Inside UIUX",
//   servicesTitle = "Our UIUX services",
//   cards = defaultCards,
//   pricingCtaText = "View Our Pricing",
//   pricingCtaLink = "/pricing",
// }) => {
//   return (
//     // FIX 1: Removed overflow-hidden from section entirely.
//     // overflow-hidden on a large section forces clip recalculation
//     // for every child on each GSAP scroll tick — very expensive.
//     <section className="relative text-white py-16 sm:py-20 md:py-24">
//       {/* FIX 2: Blobs now live in their own overflow-hidden wrapper.
//           This scopes clipping ONLY to this small div, not the entire section.
//           translateZ(0) promotes each blob to its own GPU composite layer. */}
//       <div
//         className="pointer-events-none absolute inset-0 overflow-hidden"
//         aria-hidden="true"
//       >
//         <div
//           className="absolute -left-56 bottom-0 h-[520px] w-[520px] rounded-full opacity-20"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(255,101,51,0.6) 0%, rgba(255,101,51,0.3) 40%, transparent 70%)",
//             transform: "translateZ(0)",
//           }}
//         />
//         <div
//           className="absolute -right-56 top-0 h-[520px] w-[520px] rounded-full opacity-20"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(255,101,51,0.5) 0%, rgba(255,101,51,0.25) 40%, transparent 70%)",
//             transform: "translateZ(0)",
//           }}
//         />
//       </div>

//       <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 flex flex-col gap-16">
//         <div className="flex flex-col items-start gap-10">
//           <div className="w-full max-w-6xl flex flex-col gap-4 text-left">
//             <div
//               className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-white shadow-sm w-fit border"
//               style={{
//                 background:
//                   "linear-gradient(93deg, rgba(255, 101, 51, 0) 0%, #1C1C1C 100%)",
//                 borderColor: "rgba(255, 255, 255, 0.25)",
//               }}
//             >
//               <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#623a2c] p-1.25">
//                 <span
//                   className="h-[18px] w-[18px] rounded-full"
//                   style={{
//                     background:
//                       "radial-gradient(ellipse 86.93% 86.93% at 14.58% 10.42%, #ffbea9 0%, #fa6332 100%)",
//                     boxShadow: "2.25px 3.375px 4.5px rgba(68,18,0,0.36)",
//                   }}
//                 />
//               </span>
//               <span className="text-[18px] font-normal">{badgeText}</span>
//             </div>

//             <h2 className="text-[40px] sm:text-[44px] md:text-[48px] font-medium text-white">
//               {servicesTitle}
//             </h2>
//           </div>

//           {/* FIX 3: CSS containment on the grid.
//               contain: layout paint tells the browser this grid's
//               layout and paint are independent from the rest of the page.
//               No layout recalc outside this box triggered by scroll. */}
//           <div
//             className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//             style={{ contain: "layout paint" }}
//           >
//             {cards.map((card, index) => (
//               <div
//                 key={card.title}
//                 className="flex flex-col gap-4 bg-black-bg rounded-lg p-4"
//               >
//                 {/* FIX 4: Replaced overflow-hidden on the image wrapper
//                     with clip-path. Each overflow-hidden creates a stacking
//                     context — 6 entering the viewport at once = stutter.
//                     clip-path achieves the same rounded crop without
//                     creating a stacking context. */}
//                 <div
//                   className="w-full aspect-[392/180] bg-[#2a2a2a]"
//                   style={{ clipPath: "inset(0 round 8px)" }}
//                 >
//                 {/* <div
//                   className="w-full h-[224px] bg-[#2a2a2a]" // ← fixed height
//                   style={{ clipPath: "inset(0 round 8px)" }}
//                 > */}
//                   {/* FIX 5: lazy load bottom 3 cards, async decode all.
//                       Top 3 are likely already visible on entry so eager is fine.
//                       decoding=async moves image decode off the main thread. */}
//                   <img
//                     src={card.image}
//                     alt={card.title}
//                     className="w-full h-full object-cover"
//                     width="392"
//                     height="224"
//                     loading={index < 3 ? "eager" : "lazy"}
//                     decoding="async"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <h3 className="text-xl text-[#e3e3e3] font-medium">
//                     {card.title}
//                   </h3>
//                   <p className="text-base text-[#bebebe] leading-relaxed">
//                     {card.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <Link
//             to={pricingCtaLink}
//             className="inline-flex items-center gap-3 rounded-lg bg-[#ff6533] px-6 py-3 text-base font-medium text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 self-start"
//           >
//             {pricingCtaText}
//             <span className="flex h-6 w-6 items-center justify-center">
//               <svg
//                 width="12"
//                 height="12"
//                 viewBox="0 0 12 12"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M5 3l4 3-4 3" />
//               </svg>
//             </span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceInside;


// Laggy but fixed image height

// import { Link } from "react-router-dom";

// const defaultCards = [
//   {
//     title: "Research",
//     description:
//       "Conducting in-depth user and market research to uncover behavioral patterns, identify core pain points, and translate insights into actionable design opportunities.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Strategy",
//     description:
//       "Defining product vision, aligning business objectives with user needs, and building a clear experience roadmap that guides every design decision.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Ideation",
//     description:
//       "Exploring creative concepts, mapping user journeys, and transforming complex problems into intuitive and engaging interaction solutions.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Wireframes",
//     description:
//       "Developing structured layouts and interaction flows that prioritize usability, clarity, and seamless navigation across all touchpoints.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Visual Design",
//     description:
//       "Crafting cohesive visual systems through typography, color, spacing, and components to create a compelling and consistent brand experience.",
//     image: "https://placehold.co/392x224",
//   },
//   {
//     title: "Testing",
//     description:
//       "Evaluating usability through real user feedback, analyzing interaction data, and iterating strategically to refine and optimize the overall experience.",
//     image: "https://placehold.co/392x224",
//   },
// ];

// const ServiceInside = ({
//   badgeText = "Inside UIUX",
//   servicesTitle = "Our UIUX services",
//   cards = defaultCards,
//   pricingCtaText = "View Our Pricing",
//   pricingCtaLink = "/pricing",
// }) => {
//   return (
//     // No overflow-hidden on section — forces clip recalc on every scroll tick
//     <section className="relative text-white py-16 sm:py-20 md:py-24">

//       {/* Blobs in their own overflow-hidden wrapper — scopes clipping
//           only to this div, not the entire section */}
//       <div
//         className="pointer-events-none absolute inset-0 overflow-hidden"
//         aria-hidden="true"
//       >
//         <div
//           className="absolute -left-56 bottom-0 h-[520px] w-[520px] rounded-full opacity-20"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(255,101,51,0.6) 0%, rgba(255,101,51,0.3) 40%, transparent 70%)",
//             transform: "translateZ(0)",
//           }}
//         />
//         <div
//           className="absolute -right-56 top-0 h-[520px] w-[520px] rounded-full opacity-20"
//           style={{
//             background:
//               "radial-gradient(circle, rgba(255,101,51,0.5) 0%, rgba(255,101,51,0.25) 40%, transparent 70%)",
//             transform: "translateZ(0)",
//           }}
//         />
//       </div>

//       <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 flex flex-col gap-16">
//         <div className="flex flex-col items-start gap-10">
//           <div className="w-full max-w-6xl flex flex-col gap-4 text-left">
//             <div
//               className="inline-flex items-center gap-3 rounded-lg px-3 py-2 text-white shadow-sm w-fit border"
//               style={{
//                 background:
//                   "linear-gradient(93deg, rgba(255, 101, 51, 0) 0%, #1C1C1C 100%)",
//                 borderColor: "rgba(255, 255, 255, 0.25)",
//               }}
//             >
//               <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#623a2c] p-1.25">
//                 <span
//                   className="h-[18px] w-[18px] rounded-full"
//                   style={{
//                     background:
//                       "radial-gradient(ellipse 86.93% 86.93% at 14.58% 10.42%, #ffbea9 0%, #fa6332 100%)",
//                     boxShadow: "2.25px 3.375px 4.5px rgba(68,18,0,0.36)",
//                   }}
//                 />
//               </span>
//               <span className="text-[18px] font-normal">{badgeText}</span>
//             </div>

//             <h2 className="text-[40px] sm:text-[44px] md:text-[48px] font-medium text-white">
//               {servicesTitle}
//             </h2>
//           </div>

//           {/* contain: layout paint — browser treats this grid as fully
//               independent from the rest of the page during scroll */}
//           <div
//             className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
//             style={{ contain: "layout paint" }}
//           >
//             {cards.map((card, index) => (
//               <div
//                 key={card.title}
//                 className="flex flex-col gap-4 bg-black-bg rounded-lg p-4"
//               >
//                 {/* overflow:clip = clips image overflow WITHOUT creating
//                     a stacking context (unlike overflow:hidden).
//                     6x overflow:hidden stacking contexts entering the
//                     viewport simultaneously was causing the stutter.
//                     borderRadius handles the rounded corners. */}
//                 <div
//                   className="w-full h-[224px] bg-[#2a2a2a]"
//                   style={{
//                     borderRadius: "8px",
//                     overflow: "clip",
//                   }}
//                 >
//                   <img
//                     src={card.image}
//                     alt={card.title}
//                     className="w-full h-full object-cover"
//                     width="392"
//                     height="224"
//                     loading={index < 3 ? "eager" : "lazy"}
//                     decoding="async"
//                   />
//                 </div>
//                 <div className="flex flex-col gap-2">
//                   <h3 className="text-xl text-[#e3e3e3] font-medium">
//                     {card.title}
//                   </h3>
//                   <p className="text-base text-[#bebebe] leading-relaxed">
//                     {card.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <Link
//             to={pricingCtaLink}
//             className="inline-flex items-center gap-3 rounded-lg bg-[#ff6533] px-6 py-3 text-base font-medium text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 self-start"
//           >
//             {pricingCtaText}
//             <span className="flex h-6 w-6 items-center justify-center">
//               <svg
//                 width="12"
//                 height="12"
//                 viewBox="0 0 12 12"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.5"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <path d="M5 3l4 3-4 3" />
//               </svg>
//             </span>
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceInside;



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
  return (
    // Force GPU layer creation for entire section
    <section 
      className="relative text-white py-16 sm:py-20 md:py-24"
      style={{ 
        isolation: "isolate",
        transform: "translateZ(0)",
      }}
    >

      {/* Simplified blobs with optimized rendering */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -left-56 bottom-0 h-[520px] w-[520px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(255,101,51,0.8) 0%, transparent 70%)",
            transform: "translateZ(0)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute -right-56 top-0 h-[520px] w-[520px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(255,101,51,0.7) 0%, transparent 70%)",
            transform: "translateZ(0)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-10 xl:px-12 flex flex-col gap-16">
        <div className="flex flex-col items-start gap-10">
          <div className="w-full max-w-6xl flex flex-col gap-4 text-left">
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

          {/* contain: layout — grid is isolated from page layout.
              will-change: opacity forces GPU layer creation for ALL cards
              immediately when section enters viewport, not incrementally. */}
          <div
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{
              contain: "layout",
              willChange: "opacity",
            }}
          >
            {cards.map((card) => (
              <div
                key={card.title}
                className="flex flex-col gap-4 bg-black-bg rounded-lg p-4"
              >
                {/* Image container with static GPU layer */}
                <div
                  className="w-full h-[224px] bg-[#2a2a2a] rounded-lg overflow-hidden"
                >
                  {/* Optimized image loading - all eager, pre-decoded */}
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                    width="392"
                    height="224"
                    loading="eager"
                    decoding="sync"
                    style={{ 
                      imageRendering: "auto",
                      transform: "translateZ(0)",
                    }}
                  />
                </div>
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
            className="inline-flex items-center gap-3 rounded-lg bg-[#ff6533] px-6 py-3 text-base font-medium text-white shadow-md transition-transform duration-200 hover:-translate-y-0.5 self-start"
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