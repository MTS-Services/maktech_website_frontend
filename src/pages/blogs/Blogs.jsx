
import BlogHeroCard from './components/BlogHeroCard';
import BlogSection from './components/BlogSection';
import HeroSection from './components/HeroSection';
import WhyWeBest from './components/WhyWeBest';

const Blogs = () => {
    return (
        <main
            id='about'
            aria-labelledby='about-heading'
            className='relative w-full overflow-hidden'>
           <HeroSection/> 
           <BlogHeroCard/> 
           <BlogSection/>
           <WhyWeBest/>
        </main>
    );
};

export default Blogs;