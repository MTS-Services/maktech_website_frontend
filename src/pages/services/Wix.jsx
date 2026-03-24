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
        imageSrc="/services_image/wix/harshit-katiyar-5sLNGV2EFRM-unsplash.jpg"
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
            image: "/services_image/uiUx/image_1.jpg",
          },
          {
            title: "Custom Database Design",
            description:
              "Architect internal collections/databases for large content, enabling dynamic pages and sophisticated filtering systems.",
            image: "/services_image/uiUx/image_2.jpg",
          },
          {
            title: "E-commerce Solutions",
            description:
              "High-performance online stores with custom product builders, secure payments, and automated tax/shipping calculations.",
            image: "/services_image/uiUx/image_3.jpg",
          },
          {
            title: "Booking & Reservations",
            description:
              "Advanced Wix Bookings systems with custom scheduling logic, staff management, and automated client notifications.",
            image: "/services_image/uiUx/image_4.jpg",
          },
          {
            title: "Third-Party API Sync",
            description:
              "Connect Wix sites to external tools like CRM, marketing automation, and accounting software via custom API integrations.",
            image: "/services_image/uiUx/image_5.jpg",
          },
          {
            title: "Performance Tuning",
            description:
              "Optimize page speed by managing heavy assets, streamlining Wix code, and meeting Google Core Web Vitals standards.",
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

export default Wix;
