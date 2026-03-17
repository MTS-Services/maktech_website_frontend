import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const GraphicDesign = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Graphic Design" },
        ]}
        title="Visuals That Demand Attention"
        description="Your identity is your first impression. We craft iconic, cohesive visual languages that make your brand impossible to ignore and easy to trust."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We design visuals that stop the scroll, not just fill the space."
        description="Our Graphic Design engagements typically include:"
        bullets={[
          "End-to-end Visual Design & Branding Process",
          "Brand Identity, Logo Design & Style Guide Creation",
          "Social Media Creatives & Campaign Visuals",
          "Brochure, Flyer & Print Material Design",
          "Packaging Design & Product Visualization",
          "Pitch Deck, Presentation & Report Design",
          "Brand Consistency Audit & Asset Management",
        ]}
        imageSrc="/services_image/graphicDesign/emily-bernal-BM3U_D2lygo-unsplash.jpg"
        imageAlt="Graphic design workspace"
        ctaText="View Case Studies"
        ctaLink="/our_work"
        className="pb-12"
      />

      <ServiceInside
        badgeText="Inside Graphic Design"
        servicesTitle="Our Visual Brand services"
        cards={[
          {
            title: "Memorable Logos",
            description:
              "We design a unique logo that stands out and stays clear on everything from business cards to billboards.",
            image: "/services_image/uiUx/image_1.jpg",
          },
          {
            title: "Professional Look",
            description:
              "We choose the right fonts and colors that make your business look established and trustworthy.",
            image: "/services_image/uiUx/image_2.jpg",
          },
          {
            title: "Brand Rules",
            description:
              "We give you a simple \"Cheat Sheet\" so anyone on your team can keep your brand looking consistent.",
            image: "/services_image/uiUx/image_3.jpg",
          },
          {
            title: "Ready-to-Use Files",
            description:
              "You get every file format you need for print, web, and social media without the headache.",
            image: "/services_image/uiUx/image_4.jpg",
          },
          {
            title: "Custom Graphics",
            description:
              "We create icons and patterns that belong only to you, making your brand instantly recognizable.",
            image: "/services_image/uiUx/image_5.jpg",
          },
          {
            title: "Marketing Materials",
            description:
              "From flyers to digital decks, we make sure all your business materials look premium.",
            image: "/services_image/uiUx/image_6.jpg",
          },
        ]}
        pricingCtaText="View Our Pricing"
        pricingCtaLink="/pricing"
      />
      <ServiceWhyBest />
      <Testimonials className="py-16 xl:py-20 2xl:py-24" />
    </>
  );
};

export default GraphicDesign;
