import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";

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
        imageSrc="/services_image/uiux-showcase.jpg"
        imageAlt="UI/UX design collaboration"
        ctaText="View Case Studies"
        ctaLink="/our_work"
        className="pb-12"
      />
    </>
  );
};

export default UIUX;
