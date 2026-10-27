import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const Shopify = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Shopify & E-commerce" },
        ]}
        title="Stores That Sell Themselves"
        description="Your store should be a revenue engine. We design for the 'add to cart' moment, optimizing every pixel for frictionless, high-speed mobile checkouts."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We build online stores that convert visitors, not just display products."
        description="Our Shopify & E-commerce engagements typically include:"
        bullets={[
          "End-to-end E-commerce Development Process",
          "Custom Shopify Theme Design & Development",
          "Product Catalog Setup & Collection Management",
          "Payment Gateway & Checkout Optimization",
          "Third-Party App Integration & Automation",
          "SEO, Speed Optimization & Conversion Tuning",
          "Post-Launch Support, Analytics & Scale Strategy",
        ]}
        imageSrc="/services_image/shopify/hookle-app-6Pa7l0unTAY-unsplash.webp"
        imageAlt="Shopify store on laptop"
        ctaText="View Case Studies"
        ctaLink="/case-study"
      />

      <ServiceInside
        badgeText="Inside SHOPIFY Development"
        servicesTitle="Our SHOPIFY Development services"
        cards={[
          {
            title: "Custom Theme Dev",
            description:
              "High-converting, bespoke Shopify themes built from scratch using Liquid for fast, unique, lightweight stores.",
            image: "https://cdn.maktechgroup.com/media/1793092726498-1a28ea17-753b-4fbd-b637-2d01422fc7cf.png",
          },
          {
            title: "App Development",
            description:
              "Custom Shopify applications with specialized features and automated workflows beyond the public app store.",
            image: "https://cdn.maktechgroup.com/media/1793092837978-c8b49de6-f861-4094-b725-7d1d810e3695.png",
          },
          {
            title: "Store Migration",
            description:
              "Seamless migration from WooCommerce or Magento to Shopify with zero data loss and preserved SEO rankings.",
            image: "https://cdn.maktechgroup.com/media/1793094474706-da93dbb7-212e-4230-a8dc-98114d4a224a.png",
          },
          {
            title: "Liquid Optimization",
            description:
              "Deep code audits to clean up Liquid files, reduce response times, and boost site performance.",
            image: "https://cdn.maktechgroup.com/media/1793094492159-c0f613af-1ec0-44f2-b6ed-ce72c3ee40c4.png",
          },
          {
            title: "API & Integration",
            description:
              "Integration with ERP/CRM and inventory systems plus real-time synchronization across your business.",
            image: "https://cdn.maktechgroup.com/media/1793094497886-1710b7a3-578e-4eb0-a6bb-77bb68297add.png",
          },
          {
            title: "Checkout Customization",
            description:
              "Advanced checkout scripts and custom logic for Shopify Plus to enhance purchase experience and increase AOV.",
            image: "https://cdn.maktechgroup.com/media/1793094503753-5eedb43d-d00b-4b10-8416-5eee4d6c4517.png",
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

export default Shopify;
