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
        imageSrc="/services_image/laravel/mohammad-rahmani-Y5yxdx2a4PI-unsplash.webp"
        imageAlt="Laravel backend development"
        ctaText="View Case Studies"
        ctaLink="/case-study"
      />

      <ServiceInside
        badgeText="Inside LARAVEL Development"
        servicesTitle="Our LARAVEL Development services"
        cards={[
          {
            title: "Custom Web Apps",
            description:
              "We build robust, secure, and enterprise-grade web applications tailored to your business logic using the world's leading PHP framework.",
            image: "https://cdn.maktechgroup.com/media/1793091851706-67a057a0-3758-418d-b563-7d36923b4a2c.png",
          },
          {
            title: "Restful API Development",
            description:
              "We create scalable RESTful APIs that ensure seamless data communication between your web app and mobile platforms.",
            image: "https://cdn.maktechgroup.com/media/1793091963461-65372577-e160-4751-a195-93219d0a7b59.png",
          },
          {
            title: "E-commerce Solutions",
            description:
              "High-performance online stores with secure payments, smooth user journeys, and maximized digital sales.",
            image: "https://cdn.maktechgroup.com/media/1793091784658-c272b730-e582-4769-b4a7-c867126c1e9f.png",
          },
          {
            title: "CRM & Dashboard",
            description:
              "Custom admin panels and CRM systems to manage data efficiently with real-time analytics.",
            image: "https://cdn.maktechgroup.com/media/1793091891427-9a935ad8-1198-45b6-9f1b-54fa0019d38b.png",
          },
          {
            title: "Extension & Integration",
            description:
              "Extend platforms with custom Laravel packages and integrate third-party services like AWS, Stripe, or Twilio.",
            image: "https://cdn.maktechgroup.com/media/1793092138346-e22ccd67-c5d0-4204-8061-e1b3afefa0ad.png",
          },
          {
            title: "Migration & Upgradation",
            description:
              "Migrate legacy PHP systems to Laravel or upgrade your current app to the latest version for better security and speed.",
            image: "https://cdn.maktechgroup.com/media/1793091756870-c75f0144-0764-480b-aa60-6082b32b26fa.png",
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
