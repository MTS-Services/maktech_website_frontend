import { useEffect } from 'react';
import PricingHero from './components/PricingHero';
import PricingPlans from './components/PricingPlans';
import PricingWhyBest from './components/PricingWhyBest';
import FAQ from '../home/components/FAQ';

const Pricing = () => {
  useEffect(() => {
    document.title = 'Pricing – Maktech';
  }, []);

  return (
    <main
      id='pricing'
      aria-labelledby='pricing-heading'
      className='relative w-full overflow-hidden'
    >
      <PricingHero />
      <PricingWhyBest />
      <PricingPlans />
      <FAQ />
    </main>
  );
};

export default Pricing;
