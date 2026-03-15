import { useEffect } from 'react';
import AboutHero from './components/AboutHero';
import AboutStats from './components/AboutStats';

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
      <AboutStats />
    </main>
  );
};

export default About;
