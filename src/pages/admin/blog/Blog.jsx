import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdRemoveRedEye,
  MdArrowBack
} from 'react-icons/md';
import { toast } from 'react-toastify';
import apiClient from '../../../services/apiClient';
import Pagination from '../../../components/Pagination';
import { getPageRange } from '../../../utils/helpers';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';


// ─── Static blog post data ────────────────────────────────────────────────────
const POSTS = [
  {
    id: 1,
    title: '10 Essential Web Design Trends for 2026',
    category: 'Web Design',
    excerpt:
      'The web design landscape is constantly evolving. In this comprehensive guide, we explore the top 10 trends that will dominate web design in 2026, from AI-powered personalization to immersive 3D experiences...',
    author: 'Mukabbir vai',
    date: '2026-01-20',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80',
  },
  {
    id: 2,
    title: 'How to Choose the Right Digital Marketing Strategy',
    category: 'Digital Marketing',
    excerpt:
      'Digital marketing can be overwhelming with so many channels and strategies available. This guide will help you understand which digital marketing strategies work best for your business goals...',
    author: 'Marketing Team',
    date: '2026-01-15',
    image:
      'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80',
  },
  {
    id: 3,
    title: 'The Future of Mobile App Development',
    category: 'Mobile Development',
    excerpt:
      'Mobile apps continue to transform how businesses interact with customers. Explore the latest technologies and frameworks that are shaping the future of mobile app development...',
    author: 'Development Team',
    date: '2026-01-10',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&q=80',
  },
];

const CATEGORIES = [
  'Web Design',
  'Digital Marketing',
  'Mobile Development',
  'SEO',
  'Branding',
  'E-commerce',
  'Technology',
];

// Badge colours — both bg + text so colour is never the sole indicator (WCAG 1.4.1)
const CATEGORY_STYLES = {
  'Web Design': 'bg-pink-50 text-pink-700',
  'Digital Marketing': 'bg-purple-50 text-purple-700',
  'Mobile Development': 'bg-indigo-50 text-indigo-700',
  SEO: 'bg-green-50 text-green-700',
  Branding: 'bg-amber-50 text-amber-700',
  'E-commerce': 'bg-blue-50 text-blue-700',
  Technology: 'bg-cyan-50 text-cyan-700',
};
const getCategoryStyle = (cat) =>
  CATEGORY_STYLES[cat] ?? 'bg-gray-100 text-gray-600';



// ─── Blog post row card ───────────────────────────────────────────────────────
const displayValue = (val) => val || <span className="text-gray-400 italic">Not specified</span>;

const BlogDetail = ({ blog, onBack }) => {
  const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
  <div className='space-y-6 pb-8'>
    <button
      type='button'
      onClick={onBack}
      className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150 group'
    >
      <MdArrowBack className='text-base group-hover:-translate-x-0.5 transition-transform duration-150' aria-hidden='true' />
      Back to Blogs
    </button>

    <div className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
      {blog.coverImage && (
        <div className='w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100'>
          <img src={blog.coverImage} alt={blog.title} className='w-full h-full object-cover' />
        </div>
      )}
      
      <div className='p-6 sm:p-8 space-y-6'>
        <div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryStyle(blog.category)}`}>
            {blog.category || 'Uncategorized'}
          </span>
          <h1 className='text-2xl font-bold text-gray-900'>{displayValue(blog.title)}</h1>
        </div>

        <dl className='grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 rounded-lg p-5 border border-gray-100'>
          <div>
            <dt className='text-sm text-gray-500 mb-1'>Posted By</dt>
            <dd className='font-medium text-gray-900'>{displayValue(blog.postedBy)}</dd>
          </div>
          <div>
            <dt className='text-sm text-gray-500 mb-1'>Date</dt>
            <dd className='font-medium text-gray-900'>{displayValue(blog.date)}</dd>
          </div>
        </dl>

        {blog.keyTakeaways && (
        <div>
          <h2 className='text-lg font-bold text-gray-900 mb-2'>Key Takeaways</h2>
          <ul className='list-disc pl-5 text-gray-700 whitespace-pre-wrap space-y-1'>
            {blog.keyTakeaways.split('\n').filter(Boolean).map((pt, i) => (
               <li key={i}>{pt.replace(/^[•\-\*]\s*/, '').trim()}</li>
            ))}
          </ul>
        </div>
        )}

        {blog.blogContent && (
        <div>
          <h2 className='text-lg font-bold text-gray-900 mb-2'>Intro Content</h2>
          <p className='text-gray-700 whitespace-pre-wrap'>{stripHtml(blog.blogContent)}</p>
        </div>
        )}

        {blog.content && (
          <div>
            <h2 className='text-lg font-bold text-gray-900 mb-4'>Main Content Overview</h2>
            <div 
              className='tiptap-content max-w-none text-gray-800'
              dangerouslySetInnerHTML={{ __html: typeof blog.content === 'object' && blog.content !== null ? blog.content.html : blog.content }} 
            />
          </div>
        )}
      </div>
    </div>
  </div>
  );
};

const PostCard = ({ post, onView, onEdit, onDelete }) => {
  const stripHtml = (html) => {
    if (!html) return '';
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  return (
  <article className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
    <div className='flex gap-4 p-4 sm:p-5'>
      {/* Thumbnail */}
      {post.coverImage && (
        <div className='w-32 sm:w-40 shrink-0 rounded-xl overflow-hidden aspect-[4/3]'>
          <img
            src={post.coverImage}
            alt={`${post.title} thumbnail`}
            loading='lazy'
            decoding='async'
            className='w-full h-full object-cover'
          />
        </div>
      )}

      {/* Content */}
      <div className='flex flex-col flex-1 min-w-0'>
        <span
          className={`self-start inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${getCategoryStyle(post.category)}`}
        >
          {post.category || 'Uncategorized'}
        </span>

        <h2 className='text-base sm:text-lg font-bold text-gray-900 leading-snug mb-1.5'>
          {post.title}
        </h2>

        <p className='text-base text-gray-500 leading-relaxed mb-3 line-clamp-3'>
          {stripHtml(post.blogContent)}
        </p>

        {/* Author + date */}
        <p className='text-sm text-gray-400 mb-3'>
          By <span className='font-medium text-gray-600'>{post.postedBy}</span>
          <span className='mx-2'>A</span>
          {post.date}
        </p>

        <div className="flex items-center gap-4 mt-auto">
          <button
            type='button'
            onClick={() => onView(post)}
            aria-label={`View ${post.title}`}
            className='inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-150 cursor-pointer'
          >
            <MdRemoveRedEye className='text-base' aria-hidden='true' />
            View
          </button>
          <button
            type='button'
            onClick={() => onEdit(post)}
            aria-label={`Edit ${post.title}`}
            className='inline-flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-150 cursor-pointer'
          >
            <MdEdit className='text-base' aria-hidden='true' />
            Edit
          </button>
          <button
            type='button'
            onClick={() => onDelete(post)}
            aria-label={`Delete ${post.title}`}
            className='inline-flex items-center gap-1.5 text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-150 cursor-pointer'
          >
            <MdDelete className='text-base' aria-hidden='true' />
            Delete
          </button>
        </div>
      </div>
    </div>
  </article>
  );
};

const PAGE_SIZE = 10;
export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [viewingBlog, setViewingBlog] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Blog - Maktech Admin';
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/api/v1/blogs?page=${page}&limit=${PAGE_SIZE}&searchTerm=`);
      if (res.data.success) {
        setPosts(res.data.data);
        setTotalPages(res.data.meta?.totalPages || 1);
        setTotalCount(res.data.meta?.total || res.data.data.length);
      }
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleDelete = (post) => {
    setDeleteTarget(post);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await apiClient.delete(`/api/v1/blogs/${deleteTarget.id}`);
      if (res.data.success) {
        toast.success('Blog post deleted successfully!');
        setDeleteTarget(null);
        fetchPosts();
      }
    } catch (err) {
      toast.error('Failed to delete blog post');
    }
  };

  const handlePage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));
  const pageRange = useMemo(() => getPageRange(page, totalPages), [page, totalPages]);
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);


  return (
    <div className='space-y-6 pb-8'>
      {viewingBlog ? (
        <BlogDetail blog={viewingBlog} onBack={() => setViewingBlog(null)} />
      ) : (
        <>
      {/* Page Header */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
              Blog
            </h1>
            <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-bg-cta text-white text-sm font-bold leading-none'>
              {totalCount}
            </span>
          </div>
          <p className='text-base text-gray-500 mt-1'>
            Manage your content and marketing articles
          </p>
        </div>

        <button
          type='button'
          onClick={() => navigate('/admin/blog/create')}
          className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
        >
          <MdAdd
            className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
            aria-hidden='true'
          />
          <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
            Add New Blog Post
          </span>
        </button>
      </div>

      {/* Post list */}
      {loading ? (
        <div className="bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl h-64">
          <div className="w-8 h-8 border-2 border-orange-bg-cta border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : posts.length === 0 ? (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center'>
          <p className='text-base text-gray-400'>No blog posts found.</p>
        </div>
      ) : (
        <section aria-label='Blog posts list' className='space-y-4'>
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onView={(post) => setViewingBlog(post)}
              onEdit={(post) => navigate(`/admin/blog/edit/${post.id}`, { state: { study: post } })} 
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          itemName={`blog "${deleteTarget.title}"`}
        />
      )}
        </>
      )}
    </div>
  );
}
