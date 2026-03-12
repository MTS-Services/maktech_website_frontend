import Banner from './components/Banner'
import AboutSection from './components/AboutSection'
import WhatWeDo from './components/WhatWeDo'
import OurWork from './components/OurWork'

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
          src="/public/marquee.png" 
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
    </div>
  )
}

export default Home
