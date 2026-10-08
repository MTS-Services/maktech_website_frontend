import { useLocation, Navigate } from "react-router-dom";
import BlogSection from "../components/BlogSection";
import ArticleHero from "./components/ArticleHero";
import ArticlePage from "./components/Articlepage";
import WhyWeBests from "./components/WhyWeBests";

const BlogDetails = () => {
    const { state } = useLocation();
    const blog = state?.blog;

    if (!blog) return <Navigate to="/blogs" replace />;

    return (
        <main
            id='about'
            aria-labelledby='about-heading'
            className='relative w-full overflow-hidden'>
            <ArticleHero blog={blog} />
            <ArticlePage blog={blog} /> 
            <WhyWeBests/>
            <BlogSection/>
        </main>
    );
};

export default BlogDetails;
