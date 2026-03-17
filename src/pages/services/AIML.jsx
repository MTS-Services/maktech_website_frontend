import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const AIML = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "AI/ML" },
        ]}
        title="AI That Ships Fast and Learns Faster"
        description="We prototype, train, and deploy AI/ML solutions that connect to your product goals—clear outcomes over buzzwords."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We turn data into intelligent workflows, not just models on a slide."
        description="Our AI/ML engagements typically include:"
        bullets={[
          "Use-case discovery, data audit, and success metrics",
          "Feature engineering, experimentation, and rapid prototyping",
          "Model training, evaluation, and bias checks",
          "MLOps pipelines for versioning, CI/CD, and monitoring",
          "API endpoints and microservices for inference at scale",
          "Analytics dashboards and human-in-the-loop tooling",
          "Post-launch monitoring, drift detection, and retraining cycles",
        ]}
        imageSrc="/services_image/Rectangle 6393.jpg"
        imageAlt="AI and machine learning workspace"
        ctaText="View Case Studies"
        ctaLink="/our_work"
        className="pb-12"
      />

      <ServiceInside
        badgeText="Inside AI/ML"
        servicesTitle="Our AI/ML services"
        cards={[
          {
            title: "Discovery & Feasibility",
            description:
              "Identify high-ROI AI use cases, define data needs, and map success metrics before a single line of code.",
            image: "/services_image/uiUx/image_1.jpg",
          },
          {
            title: "Data Pipelines",
            description:
              "Ingest, clean, and label data with reproducible pipelines and quality checks to keep models reliable.",
            image: "/services_image/uiUx/image_2.jpg",
          },
          {
            title: "Model Development",
            description:
              "Train and evaluate models (LLMs, CV, tabular) with tight feedback loops to prove value quickly.",
            image: "/services_image/uiUx/image_3.jpg",
          },
          {
            title: "MLOps & Deployment",
            description:
              "Ship inference services with CI/CD, observability, and rollback plans so production stays stable.",
            image: "/services_image/uiUx/image_4.jpg",
          },
          {
            title: "Human-in-the-Loop",
            description:
              "Build review tools and guardrails to keep humans in control where accuracy and safety matter most.",
            image: "/services_image/uiUx/image_5.jpg",
          },
          {
            title: "Monitoring & Iteration",
            description:
              "Track drift, performance, and costs; retrain and fine-tune so the system improves over time.",
            image: "/services_image/uiUx/image_6.jpg",
          },
        ]}
        pricingCtaText="View Our Pricing"
        pricingCtaLink="/pricing"
      />

      <ServiceWhyBest
        badgeText="Why We are best"
        heading="Measurable AI outcomes, production-ready from day one."
        paragraphs={[
          "We start with business goals, not algorithms—every model ships with clear success metrics and traceable impact.",
          "Our MLOps approach bakes in observability, cost controls, and rollback safety, keeping production stable.",
          "Human-centered guardrails ensure models stay trustworthy, explainable, and aligned with user expectations.",
          "We stay with you after launch—monitoring drift, iterating on data, and tuning models as your product scales.",
        ]}
      />

      <Testimonials className="py-16 xl:py-20 2xl:py-24" />
    </>
  );
};

export default AIML;
