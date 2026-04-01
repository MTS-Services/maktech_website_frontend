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
            image: "/services_image/uiUx/image_1.webp",
          },
          {
            title: "Custom Widget Dev",
            description:
              "Specialized, reusable Flutter widgets for unique UI and highly interactive, functional experiences.",
            image: "/services_image/uiUx/image_2.webp",
          },
          {
            title: "Firebase Integration",
            description:
              "Robust backend solutions with Firebase: real-time databases, cloud storage, and secure auth.",
            image: "/services_image/uiUx/image_3.webp",
          },
          {
            title: "State Management",
            description:
              "Advanced architectures like Bloc, Provider, or Riverpod to keep your app fast and scalable under heavy load.",
            image: "/services_image/uiUx/image_4.webp",
          },
          {
            title: "App Optimization",
            description:
              "Performance audits to improve 60fps animations, reduce app size, and speed up execution.",
            image: "/services_image/uiUx/image_5.webp",
          },
          {
            title: "API & Third-Party",
            description:
              "Secure RESTful APIs and third-party integrations like payments, maps, auth, and social logins.",
            image: "/services_image/uiUx/image_6.webp",
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
