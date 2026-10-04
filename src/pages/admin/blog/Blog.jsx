import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAdd,
  MdEdit,
  MdDelete
} from 'react-icons/md';
import { toast } from 'react-toastify';

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
const PostCard = ({ post, onEdit, onDelete }) => (
  <article className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
    <div className='flex gap-4 p-4 sm:p-5'>
      {/* Thumbnail — fixed width + aspect ratio wrapper prevents CLS */}
      <div className='w-32 sm:w-40 shrink-0 rounded-xl overflow-hidden aspect-4/3'>
        <img
          src={post.image}
          alt={`${post.title} thumbnail`}
          loading='lazy'
          decoding='async'
          className='w-full h-full object-cover'
        />
      </div>

      {/* Content */}
      <div className='flex flex-col flex-1 min-w-0'>
        <span
          className={`self-start inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2 ${getCategoryStyle(post.category)}`}
        >
          {post.category}
        </span>

        <h2 className='text-base sm:text-lg font-bold text-gray-900 leading-snug mb-1.5'>
          {post.title}
        </h2>

        <p className='text-base text-gray-500 leading-relaxed mb-3 line-clamp-3'>
          {post.excerpt}
        </p>

        {/* Author + date */}
        <p className='text-sm text-gray-400 mb-3'>
          By <span className='font-medium text-gray-600'>{post.author}</span>
          <span className='mx-2'>·</span>
          {post.date}
        </p>

        <div className="flex items-center gap-4 mt-auto">
          <button
            type='button'
            onClick={() => onEdit(post)}
            aria-label={`Edit ${post.title}`}
            className='inline-flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-150 cursor-pointer'
          >
            <MdEdit className='text-base' aria-hidden='true' />
            Edit Blog Post
          </button>
          <button
            type='button'
            onClick={() => onDelete(post.id)}
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

export default function Blog() {
  const [posts, setPosts] = useState(POSTS);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Blog – Maktech Admin';
  }, []);

  const totalPosts = useMemo(() => posts.length, [posts]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setPosts(posts.filter(p => p.id !== id));
      toast.success('Blog post deleted successfully!');
    }
  };

  return (
    <div className='space-y-6 pb-8'>
      {/* Page Header */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
              Blog
            </h1>
            <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-bg-cta text-white text-sm font-bold leading-none'>
              {totalPosts}
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
      {posts.length === 0 ? (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center'>
          <p className='text-base text-gray-400'>No blog posts found.</p>
        </div>
      ) : (
        <section aria-label='Blog posts list' className='space-y-4'>
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onEdit={(post) => navigate(`/admin/blog/edit/${post.id}`, { state: { study: post } })} 
              onDelete={handleDelete}
            />
          ))}
        </section>
      )}
    </div>
  );
}
