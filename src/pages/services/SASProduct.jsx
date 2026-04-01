import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const SASProduct = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "SAS Product" },
        ]}
        title="Analytics Products That Teams Actually Use"
        description="We design and build SAS-based analytics products that turn data into decisions—clean UX, reliable pipelines, and clear stories."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We deliver analytics experiences that blend sharp data with simple, trustworthy UI."
        description="Our SAS Product engagements typically include:"
        bullets={[
          "Stakeholder discovery and KPI definition",
          "Data modeling, ETL/ELT, and quality checks",
          "Dashboard and report UX with role-based access",
          "Automated scheduling, alerts, and data refreshes",
          "APIs and integrations with enterprise systems",
          "Performance tuning, governance, and security",
          "Adoption playbooks, training, and documentation",
        ]}
        imageSrc="/services_image/Rectangle 6393.webp"
        imageAlt="Analytics dashboard visualization"
        ctaText="View Case Studies"
        ctaLink="/case-study"
        className="pb-12"
      />

      <ServiceInside
        badgeText="Inside SAS Product"
        servicesTitle="Our SAS Product services"
        cards={[
          {
            title: "Product Strategy",
            description:
              "Define audiences, KPIs, and data sources; blueprint the roadmap so every dashboard answers a real question.",
            image: "/services_image/uiUx/image_1.webp",
          },
          {
            title: "Data Foundations",
            description:
              "Model datasets, set up ETL/ELT, and harden data quality with validation so reports stay trustworthy.",
            image: "/services_image/uiUx/image_2.webp",
          },
          {
            title: "Dashboard UX",
            description:
              "Design role-based dashboards with crisp visuals, guided drilldowns, and accessible narratives for every user type.",
            image: "/services_image/uiUx/image_3.webp",
          },
          {
            title: "Automation & Alerts",
            description:
              "Schedule refreshes, trigger alerts, and automate report distribution so insights reach the right people fast.",
            image: "/services_image/uiUx/image_4.webp",
          },
          {
            title: "Integrations",
            description:
              "Connect SAS outputs with CRMs, data warehouses, and downstream apps via secure APIs and connectors.",
            image: "/services_image/uiUx/image_5.webp",
          },
          {
            title: "Enablement & Support",
            description:
              "Training, documentation, and ongoing support to drive adoption, refine KPIs, and keep quality high over time.",
            image: "/services_image/uiUx/image_6.webp",
          },
        ]}
        pricingCtaText="View Our Pricing"
        pricingCtaLink="/pricing"
      />

      <ServiceWhyBest
        badgeText="Why We are best"
        heading="Data clarity, governance, and UX in one product."
        paragraphs={[
          "We pair rigorous data validation with clear storytelling so dashboards stay trusted across the business.",
          "Every build includes governance, access controls, and performance tuning—ready for enterprise scale.",
          "We design for adoption first: role-specific views, guided drilldowns, and training to keep usage high.",
          "Post-launch, we monitor feedback, iterate on KPIs, and keep pipelines healthy as your data landscape grows.",
        ]}
      />

      <Testimonials className="py-16 xl:py-20 2xl:py-24" />
    </>
  );
};

export default SASProduct;
