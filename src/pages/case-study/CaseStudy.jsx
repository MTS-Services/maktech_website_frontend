import { useEffect } from 'react';
import CaseStudyHero from './components/CaseStudyHero';
import CaseStudyGrid from './components/CaseStudyGrid';

const CaseStudy = () => {
  useEffect(() => {
    document.title = 'Case Studies – Maktech';
  }, []);

  return (
    <main
      id='case-study'
      aria-labelledby='case-study-heading'
      className='relative w-full'
    >
      <CaseStudyHero />
      <CaseStudyGrid />
    </main>
  );
};

export default CaseStudy;
