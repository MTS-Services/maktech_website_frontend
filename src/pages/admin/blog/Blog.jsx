import { useEffect, useMemo, useState } from 'react';
import {
  MdAdd,
  MdEdit,
  MdArrowBack,
  MdCheck,
  MdKeyboardArrowDown,
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

const LABEL_CLS = 'block text-sm font-medium text-gray-600 mb-1.5';
const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition';
const REQUIRED_STAR = (
  <span className='text-red-500 ml-0.5' aria-hidden='true'>
    *
  </span>
);

const EMPTY_POST = {
  title: '',
  category: '',
  image: '',
  author: '',
  date: '',
  excerpt: '',
};

// ─── Shared form shell (DRY) ─────────────────────────────────────────────────
const BlogFormShell = ({
  heading,
  initialValues,
  submitLabel,
  onSubmit,
  onCancel,
}) => {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className='space-y-6 pb-8'>
      {/* Back nav */}
      <button
        type='button'
        onClick={onCancel}
        className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150 group'
      >
        <MdArrowBack
          className='text-base group-hover:-translate-x-0.5 transition-transform duration-150'
          aria-hidden='true'
        />
        Back to Blog
      </button>

      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-xl font-bold text-gray-900 mb-6'>{heading}</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className='space-y-4 mb-6'>
            {/* Title */}
            <div>
              <label htmlFor='bf-title' className={LABEL_CLS}>
                Title{REQUIRED_STAR}
              </label>
              <input
                id='bf-title'
                name='title'
                type='text'
                value={form.title}
                onChange={handleChange}
                autoComplete='off'
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Category — native select, DRY: options from CATEGORIES constant */}
            <div>
              <label htmlFor='bf-category' className={LABEL_CLS}>
                Category{REQUIRED_STAR}
              </label>
              <div className='relative'>
                <select
                  id='bf-category'
                  name='category'
                  value={form.category}
                  onChange={handleChange}
                  required
                  className={`${INPUT_CLS} appearance-none pr-10 cursor-pointer`}
                >
                  <option value='' disabled>
                    Select a category
                  </option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <MdKeyboardArrowDown
                  className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400'
                  aria-hidden='true'
                />
              </div>
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor='bf-image' className={LABEL_CLS}>
                Image URL{REQUIRED_STAR}
              </label>
              <input
                id='bf-image'
                name='image'
                type='url'
                value={form.image}
                onChange={handleChange}
                autoComplete='off'
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Author */}
            <div>
              <label htmlFor='bf-author' className={LABEL_CLS}>
                Author{REQUIRED_STAR}
              </label>
              <input
                id='bf-author'
                name='author'
                type='text'
                value={form.author}
                onChange={handleChange}
                autoComplete='name'
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Date */}
            <div>
              <label htmlFor='bf-date' className={LABEL_CLS}>
                Publish Date{REQUIRED_STAR}
              </label>
              <input
                id='bf-date'
                name='date'
                type='date'
                value={form.date}
                onChange={handleChange}
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Blog Content */}
            <div>
              <label htmlFor='bf-excerpt' className={LABEL_CLS}>
                Blog Content{REQUIRED_STAR}
              </label>
              <textarea
                id='bf-excerpt'
                name='excerpt'
                value={form.excerpt}
                onChange={handleChange}
                rows={4}
                autoComplete='off'
                required
                className={`${INPUT_CLS} resize-none`}
              />
            </div>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:flex-wrap'>
            <button
              type='submit'
              className='group inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
            >
              <MdCheck
                className='text-base shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
                aria-hidden='true'
              />
              <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
                {submitLabel}
              </span>
            </button>
            <button
              type='button'
              onClick={onCancel}
              className='w-full sm:w-auto inline-flex cursor-pointer items-center justify-center px-5 py-2.5 text-sm font-semibold text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all duration-200 active:scale-[0.97]'
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Thin wrappers — single responsibility, keep BlogFormShell DRY
const AddBlogForm = ({ onCancel, onSubmit }) => (
  <BlogFormShell
    heading='Add New Blog Post'
    initialValues={EMPTY_POST}
    submitLabel='Publish Post'
    onSubmit={onSubmit}
    onCancel={onCancel}
  />
);

const EditBlogForm = ({ post, onCancel, onSubmit }) => (
  <BlogFormShell
    heading='Edit Blog Post'
    initialValues={{
      title: post.title,
      category: post.category,
      image: post.image,
      author: post.author,
      date: post.date,
      excerpt: post.excerpt,
    }}
    submitLabel='Update Post'
    onSubmit={onSubmit}
    onCancel={onCancel}
  />
);

// ─── Blog post row card ───────────────────────────────────────────────────────
const PostCard = ({ post, onEdit }) => (
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

        <button
          type='button'
          onClick={() => onEdit(post)}
          aria-label={`Edit ${post.title}`}
          className='inline-flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-150'
        >
          <MdEdit className='text-base' aria-hidden='true' />
          Edit Blog Post
        </button>
      </div>
    </div>
  </article>
);

// ─── Page component ───────────────────────────────────────────────────────────
export default function Blog() {
  useEffect(() => {
    document.title = 'Blog – Maktech Admin';
  }, []);

  const totalPosts = useMemo(() => POSTS.length, []);

  const [editingPost, setEditingPost] = useState(null);
  const [addingPost, setAddingPost] = useState(false);

  const handleAddSubmit = () => {
    toast.success('Blog post published successfully!');
    setAddingPost(false);
  };

  const handleEditSubmit = () => {
    toast.success('Blog post updated successfully!');
    setEditingPost(null);
  };

  // State machine: edit > add > list
  if (editingPost)
    return (
      <EditBlogForm
        post={editingPost}
        onCancel={() => setEditingPost(null)}
        onSubmit={handleEditSubmit}
      />
    );

  if (addingPost)
    return (
      <AddBlogForm
        onCancel={() => setAddingPost(false)}
        onSubmit={handleAddSubmit}
      />
    );

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
          onClick={() => setAddingPost(true)}
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
      {POSTS.length === 0 ? (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center'>
          <p className='text-base text-gray-400'>No blog posts found.</p>
        </div>
      ) : (
        <section aria-label='Blog posts list' className='space-y-4'>
          {POSTS.map((post) => (
            <PostCard key={post.id} post={post} onEdit={setEditingPost} />
          ))}
        </section>
      )}
    </div>
  );
}
