
import BlogHeroCard from './components/BlogHeroCard';
import BlogSection from './components/BlogSection';
import HeroSection from './components/HeroSection';
import WhyWeBest from './components/WhyWeBest';

const Blogs = () => {
    return (
        <div>
           <HeroSection/> 
           <BlogHeroCard/> 
           <BlogSection/>
           <WhyWeBest/>
        </div>
    );
};

export default Blogs;