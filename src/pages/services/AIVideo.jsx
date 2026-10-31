import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const AIVideo = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "AI Video" },
        ]}
        title="AI-Powered Videos That Convert and Scale"
        description="We create AI-generated video content for ads, product stories, and social media—faster, smarter, and at a fraction of the traditional cost."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="From script to final cut—AI handles the heavy lifting."
        description="Our AI Video production engagements typically include:"
        bullets={[
          "Brand and audience discovery to align video tone and messaging",
          "AI script writing and storyboarding for ads and social content",
          "AI avatar and voiceover generation in multiple languages",
          "Automated video editing, captions, and motion graphics",
          "Platform-optimized exports for YouTube, Instagram, TikTok, and more",
          "A/B variant production for performance testing at scale",
          "Post-launch analytics and iteration based on engagement data",
        ]}
        imageSrc="/services_image/Rectangle 6393.webp"
        imageAlt="AI Video production workspace"
        ctaText="View Case Studies"
        ctaLink="/case-study"
        className="pb-12"
      />

      <ServiceInside
        badgeText="Inside AI Video"
        servicesTitle="Our AI Video services"
        cards={[
          {
            title: "Strategy & Scripting",
            description:
              "Define your video goals, target audience, and key message—then generate compelling AI-assisted scripts ready for production.",
            image: "/services_image/Rectangle 6393.webp",
          },
          {
            title: "AI Avatar & Voiceover",
            description:
              "Create realistic AI presenters and natural-sounding voiceovers in multiple languages without camera crews or studio costs.",
            image: "/services_image/Rectangle 6393.webp",
          },
          {
            title: "Automated Editing",
            description:
              "AI-powered editing pipelines handle cuts, transitions, captions, and music to produce polished videos at speed.",
            image: "/services_image/Rectangle 6393.webp",
          },
          {
            title: "Motion Graphics",
            description:
              "Dynamic on-brand animations and lower-thirds that elevate production quality and reinforce brand identity throughout.",
            image: "/services_image/Rectangle 6393.webp",
          },
          {
            title: "Multi-Platform Export",
            description:
              "Automatically resize and reformat videos for every platform—YouTube, Reels, TikTok, LinkedIn—in one workflow.",
            image: "/services_image/Rectangle 6393.webp",
          },
          {
            title: "Performance Iteration",
            description:
              "Track engagement metrics, generate A/B variants, and iterate on content to continuously improve results over time.",
            image: "/services_image/Rectangle 6393.webp",
          },
        ]}
        pricingCtaText="View Our Pricing"
        pricingCtaLink="/pricing"
      />

      <ServiceWhyBest
        badgeText="Why We are best"
        heading="Studio-quality video output, AI-speed delivery."
        paragraphs={[
          "We combine AI tools with creative strategy—every video is built around your brand goals, not just generated output.",
          "Our production pipeline cuts turnaround time dramatically while maintaining consistent quality across all formats.",
          "Multi-language support and platform-specific optimization ensure your content reaches the right audience everywhere.",
          "We don't just deliver videos—we track performance and iterate, so your content keeps improving after launch.",
        ]}
      />

      <Testimonials className="py-16 xl:py-20 2xl:py-24" />
    </>
  );
};

export default AIVideo;

