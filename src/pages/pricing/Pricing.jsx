import { useEffect } from 'react';
import PricingHero from './components/PricingHero';
import PricingWhyBest from './components/PricingWhyBest';

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
    </main>
  );
};

export default Pricing;
