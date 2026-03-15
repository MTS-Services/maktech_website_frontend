import { useEffect } from 'react';
import AboutHero from './components/AboutHero';

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
    </main>
  );
};

export default About;
