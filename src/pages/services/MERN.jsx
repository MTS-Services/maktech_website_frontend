import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const MERN = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "MERN Stack" },
        ]}
        title="Robust Systems That Don’t Break"
        description="We engineer high-traffic applications using MERN. Built for speed, security, and absolute reliability, so your infrastructure never bottlenecks your growth."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We engineer scalable digital products, not just lines of code."
        description="Our MERN engagements typically include:"
        bullets={[
          "End-to-end Full Stack Development Process",
          "MongoDB Database Architecture & Optimization",
          "Express.js REST API & Middleware Development",
          "React.js Component Systems & State Management",
          "Node.js Server-Side Logic & Performance Tuning",
          "JWT Authentication & Role-Based Access Control",
          "Cloud Deployment, CI/CD & Scalability Setup",
        ]}
        imageSrc="/services_image/mern/fotis-fotopoulos-DuHKoV44prg-unsplash.webp"
        imageAlt="MERN development screens"
        ctaText="View Case Studies"
        ctaLink="/case-study"
      />

      <ServiceInside
        badgeText="Inside MERN"
        servicesTitle="Our MERN Stack services"
        cards={[
          {
            title: "Discovery & Planning",
            description:
              "Analyzing requirements, defining system architecture, and mapping data models aligned to business goals and long-term growth.",
            image: "https://cdn.maktechgroup.com/media/1792651774049-0c0c7d69-1347-4911-9b3c-54c6d4d2d49e.png",
          },
          {
            title: "Database Design",
            description:
              "Designing efficient MongoDB schemas, indexes, and relationships for fast queries, reliable data integrity, and scalable throughput.",
            image: "https://cdn.maktechgroup.com/media/1792651776435-3f266ae5-aeb8-4a75-9838-1375edc3c117.png",
          },
          {
            title: "API Development",
            description:
              "Building secure, well-structured REST APIs with Express, handling business logic, middleware, authentication, and third-party integrations.",
            image: "https://cdn.maktechgroup.com/media/1792651777343-cd321e18-c192-4dfe-b326-03fc35522dbc.png",
          },
          {
            title: "Frontend Development",
            description:
              "Crafting dynamic, component-driven React interfaces with clean state management, reusable UI systems, and smooth user experiences.",
            image: "https://cdn.maktechgroup.com/media/1792651778467-47f4b5e3-8344-483c-b068-0886819ff1fc.png",
          },
          {
            title: "Backend Engineering",
            description:
              "Optimizing Node.js server logic, managing async operations, and ensuring performance and reliability under high traffic loads.",
            image: "https://cdn.maktechgroup.com/media/1792651779770-8cc55e16-b3d9-4f68-bd7f-4a2d0a8735a5.png",
          },
          {
            title: "Deployment & Support",
            description:
              "Configuring cloud infrastructure, CI/CD pipelines, monitoring, and ongoing maintenance to keep your product performant and secure.",
            image: "https://cdn.maktechgroup.com/media/1792651780757-640ff49d-0439-4f58-9e74-d1ff89855cd9.png",
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

export default MERN;
