import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const DigitalMarketing = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Digital Marketing" },
        ]}
        title="Outsmarting Your Competition"
        description="Traffic is meaningless without conversion. We deploy data-driven strategies that capture attention, build authority, and dominate your niche market."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We drive real business growth, not just impressions and empty clicks."
        description="Our Digital Marketing engagements typically include:"
        bullets={[
          "End-to-end Digital Marketing Strategy Process",
          "Market Research, Audience Profiling & Competitor Analysis",
          "SEO On-Page, Off-Page & Technical Optimization",
          "Paid Advertising Management (Google, Meta & LinkedIn Ads)",
          "Social Media Strategy, Content Planning & Execution",
          "Email Marketing Campaigns & Automation Flows",
          "Performance Tracking, Reporting & Continuous Optimization",
        ]}
        imageSrc="/services_image/digital/myriam-jessier-eveI7MOcSmw-unsplash.jpg"
        imageAlt="Digital marketing analytics"
        ctaText="View Case Studies"
        ctaLink="/case-study"
      />

      <ServiceInside
        badgeText="Inside Digital Marketing"
        servicesTitle="Our Digital Marketing services"
        cards={[
          {
            title: "Search Engine Optimization",
            description:
              "Advanced on-page and technical SEO to improve organic rankings, high-quality traffic, and search visibility.",
            image: "/services_image/uiUx/image_1.jpg",
          },
          {
            title: "Pay-Per-Click Advertising",
            description:
              "High-performance Google Ads and paid social campaigns optimized for maximum ROI through precise keyword targeting and bid management.",
            image: "/services_image/uiUx/image_2.jpg",
          },
          {
            title: "Social Media Strategy",
            description:
              "Data-driven social media plans across LinkedIn, Instagram, and Facebook to build brand authority and community engagement.",
            image: "/services_image/uiUx/image_3.jpg",
          },
          {
            title: "Content Marketing",
            description:
              "High-value content that educates and converts—blogs, whitepapers, newsletters—tailored to your audience segments.",
            image: "/services_image/uiUx/image_4.jpg",
          },
          {
            title: "Email Automation",
            description:
              "Automated email workflows and drip campaigns that nurture leads through the sales funnel and increase retention.",
            image: "/services_image/uiUx/image_5.jpg",
          },
          {
            title: "Analytics & Reporting",
            description:
              "Comprehensive performance tracking and transparent reports with key metrics and growth opportunities.",
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

export default DigitalMarketing;
