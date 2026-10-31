import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const UIUX = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "UI/UX Design" },
        ]}
        title="UI/UX Design That Moves Users Not Just Screens"
        description="Digital interfaces influence behavior—quietly but consistently. We design experiences that reduce hesitation, clarify decisions, and guide action without forcing it."
        ctaLabel="Contact With Us"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We design behavioral systems not decorative interfaces."
        description="Our UI/UX engagements typically include:"
        bullets={[
          "End-to-end User Flow Architecture",
          "Conversion-Oriented Wireframing",
          "Interaction Logic Modeling",
          "Scalable UI Component Systems",
          "Usability Testing & Iterative Refinement",
          "Developer-Ready Design Documentation",
        ]}
        // imageSrc="/services_image/uiUx/studio-republic-fotKKqWNMQ4-unsplash.webp"
        imageSrc="https://cdn.maktechgroup.com/media/1793361536735-bf3ff693-e361-43dc-b72e-337c0745c6e8.jpg"
        imageAlt="UI/UX design collaboration"
        ctaText="View Case Studies"
        ctaLink="/case-study"
        className="pb-12"
      />

      <ServiceInside
        badgeText="Inside UIUX"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "UIUX design" },
        ]}
        servicesTitle="Our UIUX services"
        heading={"Our UIUX services"}
        description=""
        ctaText="Contact With US"
        ctaLink="/contact"
        cards={[
          {
            title: "Research",
            description:
              "Conducting in-depth user and market research to uncover behavioral patterns, identify core pain points, and translate insights into actionable design opportunities.",
            image: "https://cdn.maktechgroup.com/media/1792651350641-3aa79ea4-f9c6-41d1-bafa-133ef89741cf.png",
          },
          {
            title: "Strategy",
            description:
              "Defining product vision, aligning business objectives with user needs, and building a clear experience roadmap that guides every design decision.",
            image: "https://cdn.maktechgroup.com/media/1793418731714-be95ecd8-e645-4c0e-a45e-4d31e8dcb0e0.jpg",

          },
          {
            title: "Ideation",
            description:
              "Exploring creative concepts, mapping user journeys, and transforming complex problems into intuitive and engaging interaction solutions.",
            image: "https://cdn.maktechgroup.com/media/1792651352928-e32d2a86-6067-488f-9ff4-3f347f1d5cfe.png",
          },
          {
            title: "Wireframes",
            description:
              "Developing structured layouts and interaction flows that prioritize usability, clarity, and seamless navigation across all touchpoints.",
            image: "https://cdn.maktechgroup.com/media/1792651354037-eb0a6937-fc48-4f5d-97be-3c46cdf88b6f.png",
          },
          // {
          //   title: "Visual Design",
          //   description:
          //     "Crafting cohesive visual systems through typography, color, spacing, and components to create a compelling and consistent brand experience.",
          //   image: "/services_image/uiUx/image_5.webp",
          // },
          // {
          //   title: "Testing",
          //   description:
          //     "Evaluating usability through real user feedback, analyzing interaction data, and iterating strategically to refine and optimize the overall experience.",
          //   image: "/services_image/uiUx/image_6.webp",
          // },
        ]}
        pricingCtaText="View Our Pricing"
        pricingCtaLink="/pricing"
      />
      <ServiceWhyBest />
      <Testimonials className="py-16 xl:py-20 2xl:py-24" />
    </>
  );
};

export default UIUX;
