import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdEdit,
  MdArrowBack,
  MdCheck,
  MdKeyboardArrowDown,
  MdAdd,
  MdOpenInNew,
} from 'react-icons/md';
import { toast } from 'react-toastify';



// ─── Static case study data ───────────────────────────────────────────────────
const CASE_STUDIES = [
  {
    id: 1,
    title: 'E-commerce Platform for Fashion Retailer',
    category: 'Web Development',
    description:
      'Built a complete e-commerce solution with payment gateway integration and inventory management.',
    client: 'Fashion House BD',
    result:
      '300% increase in online sales, 50% reduction in order processing time',
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=80',
  },
  {
    id: 2,
    title: 'Digital Marketing Campaign Success',
    category: 'Digital Marketing',
    description:
      'Comprehensive digital marketing strategy including SEO, social media, and paid advertising.',
    client: 'Tech Solutions Ltd',
    result: '200% increase in website traffic, 150% growth in lead generation',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&q=80',
  },
  {
    id: 3,
    title: 'Mobile Banking App Development',
    category: 'Mobile App',
    description:
      'Secure mobile banking application with biometric authentication and real-time transactions.',
    client: 'Digital Bank BD',
    result: '100,000+ downloads in first 3 months, 4.8-star rating',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80',
  },
  {
    id: 4,
    title: 'Brand Identity & Logo Design',
    category: 'Branding',
    description:
      'Complete brand identity package including logo, color palette, and brand guidelines.',
    client: 'Green Valley Foods',
    result: '95% brand recognition increase, successful market repositioning',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80',
  },
];

// Category badge colours — text + bg so colour is never the sole indicator (WCAG 1.4.1)
const CATEGORY_STYLES = {
  'Web Development': 'bg-blue-50 text-blue-700',
  'Digital Marketing': 'bg-purple-50 text-purple-700',
  'Mobile App': 'bg-green-50 text-green-700',
  Branding: 'bg-amber-50 text-amber-700',
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




// ─── Case Study Card ──────────────────────────────────────────────────────────
const CaseStudyCard = ({ study, onEdit }) => (
  <article className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col'>
    {/* Cover image — aspect-ratio wrapper prevents CLS */}
    <div className='aspect-video overflow-hidden'>
      <img
        src={study.image}
        alt={`${study.title} case study cover`}
        loading='lazy'
        decoding='async'
        className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
      />
    </div>

    <div className='p-5 flex flex-col flex-1'>
      {/* Category badge */}
      <span
        className={`self-start inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryStyle(study.category)}`}
      >
        {study.category}
      </span>

      <h2 className='text-lg font-bold text-gray-900 leading-snug mb-2'>
        {study.title}
      </h2>
      <p className='text-base text-gray-500 leading-relaxed mb-4'>
        {study.description}
      </p>

      {/* Client + result inset box */}
      <div className='mt-auto rounded-lg bg-gray-50 px-4 py-3 mb-4 space-y-1'>
        <p className='text-sm text-gray-400'>
          Client:{' '}
          <span className='font-medium text-gray-700'>{study.client}</span>
        </p>
        <p className='text-sm text-gray-600'>{study.result}</p>
      </div>

      {/* Edit action — button, not <a>, so keyboard/screen-reader works without href */}
      <button
        type='button'
        onClick={() => onEdit(study)}
        className='inline-flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-150 cursor-pointer'
        aria-label={`Edit ${study.title}`}
      >
        <MdEdit className='text-base' aria-hidden='true' />
        Edit Case Study
      </button>
    </div>
  </article>
);

export default function CaseStudies() {
  useEffect(() => {
    document.title = 'Case Studies – Maktech Admin';
  }, []);

  const navigate = useNavigate();

  return (
    <div className='space-y-6 pb-8'>
      {/* Page Header */}
      <div className='flex items-start justify-between gap-4'>
        <div>
          <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
            Case Studies
          </h1>
          <p className='text-base text-gray-500 mt-1'>
            Manage your portfolio and showcase your best work
          </p>
        </div>
        <button
          type='button'
          onClick={() => navigate('/admin/case-studies/create')}
          className='group inline-flex shrink-0 cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
        >
          <MdAdd
            className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
            aria-hidden='true'
          />
          <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
            Create Case Study
          </span>
        </button>
      </div>

      {/* Case studies grid */}
      {CASE_STUDIES.length === 0 ? (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center'>
          <p className='text-base text-gray-400'>No case studies found.</p>
        </div>
      ) : (
        <section
          aria-label='Case studies list'
          className='grid grid-cols-1 sm:grid-cols-2 gap-6'
        >
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard
              key={study.id}
              study={study}
              onEdit={(study) => navigate(`/admin/case-studies/edit/${study.id}`, { state: { study } })}
            />
          ))}
        </section>
      )}
    </div>
  );
}
