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
      <Testimonials className="pt-16 xl:pt-20 2xl:pt-24" />
      <FAQ />
      <ContactUs />
    </div>
  );
};

export default Home;
