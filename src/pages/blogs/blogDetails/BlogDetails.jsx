import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import apiClient from '../../../services/apiClient';
import BlogSection from '../components/BlogSection';
import ArticleHero from './components/ArticleHero';
import ArticlePage from './components/Articlepage';
import WhyWeBests from './components/WhyWeBests';

const BlogDetails = () => {
  const { slug } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryId = queryParams.get('id');

  const [blog, setBlog] = useState(location.state?.blog || null);
  const [loading, setLoading] = useState(!location.state?.blog && !!(slug || queryId));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug, queryId]);

  useEffect(() => {
    let isCancelled = false;

    if (location.state?.blog) {
      setBlog(location.state.blog);
      setLoading(false);
      return;
    }

    const targetIdOrSlug = queryId || slug;

    const fetchBlog = async () => {
      setLoading(true);
      try {
        if (targetIdOrSlug) {
          // 1. Try directly fetching by targetIdOrSlug
          try {
            const res = await apiClient.get(`/api/v1/blogs/${encodeURIComponent(targetIdOrSlug)}`);
            if (!isCancelled && res.data?.success && res.data.data) {
              setBlog(res.data.data);
              return;
            }
          } catch (err) {
            console.warn('Direct blog fetch failed:', err);
          }

          // 2. If queryId is different from targetIdOrSlug, try queryId
          if (queryId && queryId !== targetIdOrSlug) {
            try {
              const idRes = await apiClient.get(`/api/v1/blogs/${encodeURIComponent(queryId)}`);
              if (!isCancelled && idRes.data?.success && idRes.data.data) {
                setBlog(idRes.data.data);
                return;
              }
            } catch (err) {
              console.warn('Fetch by query id failed:', err);
            }
          }

          // 3. Fallback: Fetch blogs list and find by slug or id
          try {
            const listRes = await apiClient.get('/api/v1/blogs?limit=100');
            const items = listRes.data?.data;
            if (Array.isArray(items)) {
              const found = items.find(
                (item) =>
                  item.id === targetIdOrSlug ||
                  item.slug === targetIdOrSlug ||
                  (queryId && item.id === queryId) ||
                  (slug && item.slug === slug)
              );
              if (!isCancelled && found) {
                setBlog(found);
                return;
              }
            }
          } catch (listErr) {
            console.error('Blogs list fallback failed:', listErr);
          }
        } else {
          // No id or slug: attempt to fetch the latest published blog
          try {
            const listRes = await apiClient.get('/api/v1/blogs?limit=1');
            const items = listRes.data?.data;
            if (!isCancelled && Array.isArray(items) && items.length > 0) {
              setBlog(items[0]);
              return;
            }
          } catch (err) {
            console.warn('Default blog fetch failed:', err);
          }
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchBlog();

    return () => {
      isCancelled = true;
    };
  }, [slug, location.search, location.state?.blog]);

  useEffect(() => {
    if (blog?.title) {
      document.title = `${blog.title} – Maktech`;
    } else {
      document.title = 'Blog Details – Maktech';
    }
  }, [blog]);

  if (loading) {
    return (
      <main className="min-h-[70vh] flex items-center justify-center">
        <div className="w-9 h-9 border-2 border-orange-bg-cta border-t-transparent rounded-full animate-spin"></div>
      </main>
    );
  }

  return (
    <main
      id='about'
      aria-labelledby='about-heading'
      className='relative w-full overflow-hidden'
    >
      <ArticleHero blog={blog} />
      <ArticlePage blog={blog} />
      <WhyWeBests />
      <BlogSection />
    </main>
  );
};

export default BlogDetails;
