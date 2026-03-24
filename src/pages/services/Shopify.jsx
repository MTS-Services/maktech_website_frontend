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
        imageSrc="/services_image/shopify/hookle-app-6Pa7l0unTAY-unsplash.jpg"
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
            image: "/services_image/uiUx/image_1.jpg",
          },
          {
            title: "App Development",
            description:
              "Custom Shopify applications with specialized features and automated workflows beyond the public app store.",
            image: "/services_image/uiUx/image_2.jpg",
          },
          {
            title: "Store Migration",
            description:
              "Seamless migration from WooCommerce or Magento to Shopify with zero data loss and preserved SEO rankings.",
            image: "/services_image/uiUx/image_3.jpg",
          },
          {
            title: "Liquid Optimization",
            description:
              "Deep code audits to clean up Liquid files, reduce response times, and boost site performance.",
            image: "/services_image/uiUx/image_4.jpg",
          },
          {
            title: "API & Integration",
            description:
              "Integration with ERP/CRM and inventory systems plus real-time synchronization across your business.",
            image: "/services_image/uiUx/image_5.jpg",
          },
          {
            title: "Checkout Customization",
            description:
              "Advanced checkout scripts and custom logic for Shopify Plus to enhance purchase experience and increase AOV.",
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

export default Shopify;
