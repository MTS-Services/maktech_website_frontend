import BlogSection from "../components/BlogSection";
import ArticleHero from "./components/ArticleHero";
import ArticlePage from "./components/Articlepage";
import WhyWeBests from "./components/WhyWeBests";

const BlogDetails = () => {
    return (
        <div>
            <ArticleHero />
            <ArticlePage/> 
            <WhyWeBests/>
            <BlogSection/>
        </div>
    );
};

export default BlogDetails;
