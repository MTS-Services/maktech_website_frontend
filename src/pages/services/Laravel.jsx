import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const Laravel = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Laravel Development" },
        ]}
        title="Backends Built for Resilience"
        description="Complex problems require elegant, secure solutions. We build scalable backend systems that protect your data and stabilize your operations at scale."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We build robust backends that power products, not just process requests."
        description="Our Laravel engagements typically include:"
        bullets={[
          "Database Design & Eloquent ORM Optimization",
          "RESTful API Development & Third-Party Integrations",
          "Authentication, Authorization & Role Management",
          "Queue Management, Caching & Performance Tuning",
          "Admin Panel Development with Filament or Nova",
          "Server Configuration, Deployment & Ongoing Support",
        ]}
        imageSrc="/services_image/laravel/mohammad-rahmani-Y5yxdx2a4PI-unsplash.jpg"
        imageAlt="Laravel backend development"
        ctaText="View Case Studies"
        ctaLink="/our_work"
      />

      <ServiceInside
        badgeText="Inside LARAVEL Development"
        servicesTitle="Our LARAVEL Development services"
        cards={[
          {
            title: "Custom Web Apps",
            description:
              "We build robust, secure, and enterprise-grade web applications tailored to your business logic using the world's leading PHP framework.",
            image: "/services_image/uiUx/image_1.jpg",
          },
          {
            title: "Restful API Development",
            description:
              "We create scalable RESTful APIs that ensure seamless data communication between your web app and mobile platforms.",
            image: "/services_image/uiUx/image_2.jpg",
          },
          {
            title: "E-commerce Solutions",
            description:
              "High-performance online stores with secure payments, smooth user journeys, and maximized digital sales.",
            image: "/services_image/uiUx/image_3.jpg",
          },
          {
            title: "CRM & Dashboard",
            description:
              "Custom admin panels and CRM systems to manage data efficiently with real-time analytics.",
            image: "/services_image/uiUx/image_4.jpg",
          },
          {
            title: "Extension & Integration",
            description:
              "Extend platforms with custom Laravel packages and integrate third-party services like AWS, Stripe, or Twilio.",
            image: "/services_image/uiUx/image_5.jpg",
          },
          {
            title: "Migration & Upgradation",
            description:
              "Migrate legacy PHP systems to Laravel or upgrade your current app to the latest version for better security and speed.",
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

export default Laravel;
