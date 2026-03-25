import Banner from "./components/Banner";
import AboutSection from "./components/AboutSection";
import WhatWeDo from "./components/WhatWeDo";
import OurWork from "./components/OurWork";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "../../components/Testimonials";
import FAQ from "../../components/FAQ";
import ContactUs from "../../components/ContactUs";
import DiagonalMarquee from "../../components/DiagonalMarquee";

const Home = () => {
  return (
    <div className="relative">
      <Banner />
      <DiagonalMarquee />
      <AboutSection />
      <WhatWeDo />
      <OurWork />
      <WhyChooseUs />
      <Testimonials className="py-16 xl:py-20 2xl:py-24" />
      <FAQ />
      <ContactUs />
    </div>
  );
};

export default Home;
