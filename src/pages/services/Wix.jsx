import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const Wix = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "WIX Development" },
        ]}
        title="Premium Sites, Rapid Deployment"
        description="Professionalism shouldn’t take months. We leverage WIX to build visually striking, high-ranking sites that give you total control without the technical headache."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We turn Wix into a powerful web presence, not just a drag-and-drop page."
        description="Our Wix engagements typically include:"
        bullets={[
          "End-to-end Wix Website Development Process",
          "Custom Template Design & Brand Alignment",
          "Wix Editor X & Studio Advanced Customization",
          "Dynamic Pages & Wix CMS Content Modeling",
          "Third-Party Tool & API Integration via Velo",
          "SEO Setup, Speed Tuning & Mobile Optimization",
          "Launch Preparation, Training & Ongoing Maintenance",
        ]}
        imageSrc="/services_image/wix/harshit-katiyar-5sLNGV2EFRM-unsplash.webp"
        imageAlt="Wix development screen"
        ctaText="View Case Studies"
        ctaLink="/case-study"
      />

      <ServiceInside
        badgeText="Inside WIX Development"
        servicesTitle="Our WIX Development services"
        cards={[
          {
            title: "Velo Advanced Coding",
            description:
              "We use Velo by Wix to write custom JavaScript, enabling complex web applications and dynamic interactions beyond standard templates.",
            image: "https://cdn.maktechgroup.com/media/1793095010330-0a8721d1-c0fa-43e7-b28e-53e0a79a91f6.png",
          },
          {
            title: "Custom Database Design",
            description:
              "Architect internal collections/databases for large content, enabling dynamic pages and sophisticated filtering systems.",
            image: "https://cdn.maktechgroup.com/media/1793095030696-250438be-1ab4-4874-a9cd-fec270426303.png",
          },
          {
            title: "E-commerce Solutions",
            description:
              "High-performance online stores with custom product builders, secure payments, and automated tax/shipping calculations.",
            image: "https://cdn.maktechgroup.com/media/1793095040205-f1f6290f-d80e-4b01-9587-7331e11ff120.png",
          },
          {
            title: "Booking & Reservations",
            description:
              "Advanced Wix Bookings systems with custom scheduling logic, staff management, and automated client notifications.",
            image: "https://cdn.maktechgroup.com/media/1793095055036-94c5ae3a-9c24-4a68-adb3-0943b6f330d7.png",
          },
          {
            title: "Third-Party API Sync",
            description:
              "Connect Wix sites to external tools like CRM, marketing automation, and accounting software via custom API integrations.",
            image: "https://cdn.maktechgroup.com/media/1793095074766-0c5c0c02-de1d-40cc-904e-6cc83280d35f.png",
          },
          {
            title: "Performance Tuning",
            description:
              "Optimize page speed by managing heavy assets, streamlining Wix code, and meeting Google Core Web Vitals standards.",
            image: "https://cdn.maktechgroup.com/media/1793095083145-e77e34ee-aa7d-4b23-bc0f-16bd50e85a8c.png",
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

export default Wix;
