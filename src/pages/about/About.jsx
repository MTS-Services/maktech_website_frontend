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
      style={{
        backgroundImage: 'url(/home_banner_bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <AboutHero />
      <AboutStats />
    </main>
  );
};

export default About;
