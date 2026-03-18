import BlogSection from "../components/BlogSection";
import ArticleHero from "./components/ArticleHero";
import ArticlePage from "./components/Articlepage";
import WhyWeBests from "./components/WhyWeBests";

const BlogDetails = () => {
    return (
        <main
            id='about'
            aria-labelledby='about-heading'
            className='relative w-full overflow-hidden'>
            <ArticleHero />
            <ArticlePage/> 
            <WhyWeBests/>
            <BlogSection/>
        </main>
    );
};

export default BlogDetails;
