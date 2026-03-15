import Banner from './components/Banner'
import AboutSection from './components/AboutSection'
import WhatWeDo from './components/WhatWeDo'
import OurWork from './components/OurWork'
import WhyChooseUs from './components/WhyChooseUs'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import ContactUs from './components/ContactUs'

const Home = () => {
  return (
    <div className="relative">
      <Banner />
      {/* Diagonal Marquee Static Image */}
      <div 
        className="hidden xl:block absolute left-0 right-0 pointer-events-none diagonal-marquee"
        style={{
          zIndex: 20,
          width: "100%",
        }}
      >
        <img 
          src="/marquee.png" 
          alt="Diagonal marquee decoration"
          className="w-full h-auto object-contain"
          style={{
            display: "block",
          }}
        />
      </div>
      <AboutSection />
      <WhatWeDo />
      <OurWork />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <ContactUs />
    </div>
  )
}

export default Home
