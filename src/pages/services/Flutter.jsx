import ServiceHero from "../../components/service/ServiceHero";
import ServiceShowcase from "../../components/service/ServiceShowcase";
import ServiceInside from "../../components/service/ServiceInside";
import ServiceWhyBest from "../../components/service/ServiceWhyBest";
import Testimonials from "../../components/Testimonials";

const Flutter = () => {
  return (
    <>
      <ServiceHero
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" },
          { label: "Flutter App Development" },
        ]}
        title="One Codebase, Infinite Impact"
        description="Why compromise? Get the fluidity of native apps on both iOS and Android. High-performance, visually stunning, and built for market dominance."
        ctaLabel="Let's Discuss"
        ctaLink="/contact"
      />

      <ServiceShowcase
        badgeText="What We Build"
        title="We craft apps that perform beautifully, on every screen, every platform."
        description="Our Flutter engagements typically include:"
        bullets={[
          "End-to-end Cross-Platform App Development Process",
          "UI/UX Wireframing & Prototype Design",
          "Flutter Widget Architecture & Custom UI Components",
          "REST API & Firebase Backend Integration",
          "State Management with Riverpod or Bloc",
          "Push Notifications, Deep Linking & Offline Support",
          "Play Store & App Store Deployment & Launch",
        ]}
        imageSrc="/services_image/flutter/william-hook-9e9PD9blAto-unsplash.webp"
        imageAlt="Flutter app showcase"
        ctaText="View Case Studies"
        ctaLink="/case-study"
      />

      <ServiceInside
        badgeText="Inside Flutter App Development"
        servicesTitle="Our Flutter App Development services"
        cards={[
          {
            title: "Cross-Platform Apps",
            description:
              "We build high-performance applications that run seamlessly on both iOS and Android using a single, efficient codebase.",
            image: "https://cdn.maktechgroup.com/media/1793091023389-d83fa1a0-0d2b-426f-b49c-34c35e4c3996.png",
          },
          {
            title: "Custom Widget Dev",
            description:
              "Specialized, reusable Flutter widgets for unique UI and highly interactive, functional experiences.",
            image: "https://cdn.maktechgroup.com/media/1793091486184-f786cd3b-3991-4aab-95e1-882f3cf37191.png",
          },
          {
            title: "Firebase Integration",
            description:
              "Robust backend solutions with Firebase: real-time databases, cloud storage, and secure auth.",
            image: "https://cdn.maktechgroup.com/media/1793091406585-7524bcf3-4b8e-4641-83d2-02fcd80d50cd.png",
          },
          {
            title: "State Management",
            description:
              "Advanced architectures like Bloc, Provider, or Riverpod to keep your app fast and scalable under heavy load.",
            image: "https://cdn.maktechgroup.com/media/1793091347969-d8904e52-cd03-4b71-8e06-aee978cdab3a.png",
          },
          {
            title: "App Optimization",
            description:
              "Performance audits to improve 60fps animations, reduce app size, and speed up execution.",
            image: "https://cdn.maktechgroup.com/media/1793091313240-6913fddc-5ec1-4c1a-9624-0c32f1999eee.png",
          },
          {
            title: "API & Third-Party",
            description:
              "Secure RESTful APIs and third-party integrations like payments, maps, auth, and social logins.",
            image: "https://cdn.maktechgroup.com/media/1793091080247-eaa8ad01-3af5-49b9-9f68-4bd9a5ee24a3.png",
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

export default Flutter;
