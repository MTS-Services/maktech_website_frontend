import FeatureSection from '../../../components/FeatureSection'

const features = [
  {
    id: 1,
    title: "A Team of Experts",
    description:
      "A group of developers, designers, and strategists who bring precision, creativity, and technical depth to every project we take on.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "End-to-End Ownership",
    description:
      "We don't just deliver projects — we build digital foundations that scale with your business and support your long-term success.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v2m0 8v2m-4-6h8" />
        <path d="M9.5 9.5a3 3 0 0 1 5 2c0 1.5-1.5 2.5-2.5 3" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Built for Your Growth",
    description:
      "We don't just deliver projects — we build digital foundations that scale with your business and support your long-term success.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Fast Delivery, Zero Shortcuts",
    description:
      "Younger talent brings agility; senior leaders bring discipline — fast delivery without ever cutting corners.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const WhyChooseUs = () => {
  return (
    <FeatureSection
      badge={{ text: 'Why Choose Us' }}
      heading="Built as an Institution,"
      subheading="Not a Loose Network"
      description={[
        "At Maktech, 180+ full-time professionals operate as one structured team.",
        "Younger talent brings speed; senior leaders bring discipline. Roles are clear, processes are defined, and standards hold — no matter the scale."
      ]}
      ctaText="Read more"
      ctaLink="/case-study"
      features={features}
      backgroundStyle="dark"
      animatedLines
      backgroundImages={{
        blob: '/why_choice_us/Group_1261154808.webp'
      }}
    />
  );
};

export default WhyChooseUs;
