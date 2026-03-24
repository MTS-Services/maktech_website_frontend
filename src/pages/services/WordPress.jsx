import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const WordPress = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "WordPress Development" },
        ]}
        title="We Build WordPress Sites That Work as Hard as You Do."
        description="From sleek business websites to complex custom platforms, we design and develop WordPress solutions that are fast, secure, and built to grow with your business."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We turn WordPress into a powerful business engine, not just a blogging platform."
        description="Our WordPress engagements typically include:"
        bullets={[
          "End-to-end WordPress Website Development Process",
          "Custom Theme Design & Development",
          "Plugin Development & Third-Party Integration",
          "WooCommerce Setup & E-commerce Configuration",
          "Headless WordPress & REST API Development",
          "Speed Optimization, SEO & Security Hardening",
          "Migration, Maintenance & Ongoing Support",
        ]}
        imageSrc="/services_image/Rectangle 6393.jpg"
        imageAlt="WordPress development graphic"
        ctaText="View Case Studies"
        ctaLink="/case-study"
        className="pb-12"
      />

      <ServiceInside
        badgeText="Inside WordPress Development"
        servicesTitle="Our WordPress Development services"
        cards={[
          {
            title: "Discovery & Planning",
            description:
              "Understanding your goals, audience, and content needs to define a clear site structure, feature roadmap, and development strategy before any work begins.",
            image: "/services_image/uiUx/image_1.jpg",
          },
          {
            title: "Custom Theme Development",
            description:
              "Building fully custom WordPress themes from scratch—pixel-perfect, mobile-responsive, and aligned with your brand identity without relying on bloated page builders.",
            image: "/services_image/uiUx/image_2.jpg",
          },
          {
            title: "Plugin Development & Integration",
            description:
              "Creating custom plugins or integrating third-party tools to extend your site's functionality, automate workflows, and connect seamlessly with your existing tech stack.",
            image: "/services_image/uiUx/image_3.jpg",
          },
          {
            title: "WooCommerce & E-commerce",
            description:
              "Setting up and customizing WooCommerce stores with optimized product pages, secure payment gateways, and conversion-focused checkout experiences.",
            image: "/services_image/uiUx/image_4.jpg",
          },
          {
            title: "Performance & Security",
            description:
              "Optimizing site speed, implementing caching strategies, hardening security layers, and ensuring your WordPress site stays fast, safe, and fully protected at all times.",
            image: "/services_image/uiUx/image_5.jpg",
          },
          {
            title: "Launch & Ongoing Support",
            description:
              "Handling deployment, DNS configuration, post-launch testing, and providing continuous maintenance so your site runs smoothly long after go-live.",
            image: "/services_image/uiUx/image_6.jpg",
          },
        ]}
        pricingCtaText="View Our Pricing"
        pricingCtaLink="/pricing"
      />

      <ServiceWhyBest
        badgeText="Why We are best"
        heading="Clean Code. Fast Sites. Built to Scale."
        paragraphs={[
          "We don't just install a theme and call it done—we engineer WordPress solutions with clean, custom code that performs beautifully and stands the test of time.",
          "Every site we build is optimized for speed, security, and SEO from the ground up—so your business ranks higher, loads faster, and converts better from day one.",
          "From simple business websites to complex multi-functional platforms, we tailor every solution to your exact needs without unnecessary plugins or technical shortcuts.",
          "From discovery to deployment and long-term support, we're your WordPress partner—dedicated to keeping your site sharp, secure, and always growing.",
        ]}
      />

      <Testimonials className="py-16 xl:py-20 2xl:py-24" />
    </>
  );
};

export default WordPress;
