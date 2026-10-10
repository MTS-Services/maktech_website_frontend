import { useState, useEffect } from "react";
import { useLocation, useParams, Navigate } from "react-router-dom";
import apiClient from "../../../services/apiClient";
import PageLoader from "../../../components/PageLoader";
import BlogSection from "../components/BlogSection";
import ArticleHero from "./components/ArticleHero";
import ArticlePage from "./components/Articlepage";
import WhyWeBests from "./components/WhyWeBests";

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchBlog = async () => {
                try {
                    const response = await apiClient.get(`/api/v1/blogs/${id}`);
                    setBlog(response.data.data);
                } catch (err) {
                    console.error("Failed to fetch blog:", err);
                    setError(true);
                } finally {
                    setLoading(false);
                }
            };
            fetchBlog();
        }
    }, [id]);

    if (error) return <Navigate to="/blogs" replace />;
    if (loading) return <PageLoader />;
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