import { useEffect } from 'react';
import AboutHero from './components/AboutHero';
import AboutShowcase from './components/AboutShowcase';
import AboutMission from './components/AboutMission';
import AboutTeam from './components/AboutTeam';
import Testimonials from '../../components/Testimonials';
import PricingFAQ from '../pricing/components/PricingFAQ';

const About = () => {
  useEffect(() => {
    document.title = 'About Us – Maktech';
  }, []);

  return (
    <main
      id='about'
      aria-labelledby='about-heading'
      className='relative w-full overflow-hidden'
    >
      <AboutHero />
      <AboutShowcase />
      <AboutMission />
      <AboutTeam />
      <Testimonials />
      <PricingFAQ />
    </main>
  );
};

export default About;
