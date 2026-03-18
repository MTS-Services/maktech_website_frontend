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
        imageSrc="/services_image/mern/fotis-fotopoulos-DuHKoV44prg-unsplash.jpg"
        imageAlt="MERN development screens"
        ctaText="View Case Studies"
        ctaLink="/our_work"
      />

      <ServiceInside
        badgeText="Inside MERN"
        servicesTitle="Our MERN Stack services"
        cards={[
          {
            title: "Discovery & Planning",
            description:
              "Analyzing requirements, defining system architecture, and mapping data models aligned to business goals and long-term growth.",
            image: "/public/services_image/uiUx/image_1.jpg",
          },
          {
            title: "Database Design",
            description:
              "Designing efficient MongoDB schemas, indexes, and relationships for fast queries, reliable data integrity, and scalable throughput.",
            image: "/services_image/uiUx/image_2.jpg",
          },
          {
            title: "API Development",
            description:
              "Building secure, well-structured REST APIs with Express, handling business logic, middleware, authentication, and third-party integrations.",
            image: "/services_image/uiUx/image_3.jpg",
          },
          {
            title: "Frontend Development",
            description:
              "Crafting dynamic, component-driven React interfaces with clean state management, reusable UI systems, and smooth user experiences.",
            image: "/services_image/uiUx/image_4.jpg",
          },
          {
            title: "Backend Engineering",
            description:
              "Optimizing Node.js server logic, managing async operations, and ensuring performance and reliability under high traffic loads.",
            image: "/services_image/uiUx/image_5.jpg",
          },
          {
            title: "Deployment & Support",
            description:
              "Configuring cloud infrastructure, CI/CD pipelines, monitoring, and ongoing maintenance to keep your product performant and secure.",
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

export default MERN;
