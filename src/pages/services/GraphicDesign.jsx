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
        imageSrc="/services_image/graphicDesign/emily-bernal-BM3U_D2lygo-unsplash.webp"
        imageAlt="Graphic design workspace"
        ctaText="View Case Studies"
        ctaLink="/case-study"
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
            // image: "/services_image/uiUx/image_1.webp",
            image: "https://cdn.maktechgroup.com/media/1793358383416-ec489843-8a4d-46aa-b80f-d4d0cf19a79d.jpg",
          },
          {
            title: "Professional Look",
            description:
              "We choose the right fonts and colors that make your business look established and trustworthy.",
            // image: "/services_image/uiUx/image_2.webp",
            image: "https://cdn.maktechgroup.com/media/1793358382401-234eb68c-15d4-4a01-8795-c52cfb078e25.jpg",
          },
          {
            title: "Brand Rules",
            description:
              'We give you a simple "Cheat Sheet" so anyone on your team can keep your brand looking consistent.',
            // image: "/services_image/uiUx/image_3.webp",
            image: "https://cdn.maktechgroup.com/media/1793358383416-ec489843-8a4d-46aa-b80f-d4d0cf19a79d.jpg",
          },
          {
            title: "Ready-to-Use Files",
            description:
              "You get every file format you need for print, web, and social media without the headache.",
            // image: "/services_image/uiUx/image_4.webp",
            image: "https://cdn.maktechgroup.com/media/1793358384405-da7fce9a-0d1a-4d17-8ae4-759275c66f90.jpg",
          },
          {
            title: "Custom Graphics",
            description:
              "We create icons and patterns that belong only to you, making your brand instantly recognizable.",
            // image: "/services_image/uiUx/image_5.webp",
            image: "https://cdn.maktechgroup.com/media/1793358385298-30568bb9-dd9e-469b-bbae-af45b681a17d.jpg",
          },
          {
            title: "Marketing Materials",
            description:
              "From flyers to digital decks, we make sure all your business materials look premium.",
            // image: "/services_image/uiUx/image_6.webp",
            image: "https://cdn.maktechgroup.com/media/1793358386298-ffa869fc-d7a2-4147-8254-59187d4a0d34.jpg",
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
