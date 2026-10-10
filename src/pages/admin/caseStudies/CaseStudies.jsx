import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdEdit,
  MdAdd,
  MdDelete,
  MdRemoveRedEye,
  MdArrowBack
} from 'react-icons/md';
import { toast } from 'react-toastify';
import apiClient from '../../../services/apiClient';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';
import Pagination from '../../../components/Pagination';
import { getPageRange } from '../../../utils/helpers';

// Category badge colours — text + bg so colour is never the sole indicator (WCAG 1.4.1)
const CATEGORY_STYLES = {
  'UI/UX': 'bg-pink-50 text-pink-700',
  'MERN': 'bg-green-50 text-green-700',
  'Laravel': 'bg-red-50 text-red-700',
  'Flutter': 'bg-blue-50 text-blue-700',
  'CMS': 'bg-amber-50 text-amber-700',
  'Digital Marketing': 'bg-purple-50 text-purple-700',
  'AI': 'bg-indigo-50 text-indigo-700',
};
const getCategoryStyle = (cat) =>
  CATEGORY_STYLES[cat] ?? 'bg-gray-100 text-gray-600';


const displayValue = (val) => {
  if (val === null || val === undefined || val === '') {
    return <span className="text-gray-400 text-xs italic font-normal">N/A</span>;
  }
  return val;
};

const PAGE_SIZE = 6;

// ─── Case Study Card ──────────────────────────────────────────────────────────
const CaseStudyCard = ({ study, onView, onEdit, onDelete }) => (
  <article className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col'>
    {/* Cover image — aspect-ratio wrapper prevents CLS */}
    <div className='aspect-video overflow-hidden bg-gray-100'>
      {study.coverImage ? (
        <img
          src={study.coverImage}
          alt={`${study.title} case study cover`}
          loading='lazy'
          decoding='async'
          className='w-full h-full object-cover transition-transform duration-500'
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
      )}
    </div>

    <div className='p-5 flex flex-col flex-1'>
      {/* Category badge */}
      <span
        className={`self-start inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryStyle(study.category)}`}
      >
        {study.category || 'Uncategorized'}
      </span>

      <h2 className='text-lg font-bold text-gray-900 leading-snug mb-2'>
        {study.title}
      </h2>
      <p className='text-base text-gray-500 leading-relaxed mb-4 line-clamp-3'>
        {study.description}
      </p>

      {/* Client + timeline inset box */}
      <div className='mt-auto rounded-lg bg-gray-50 px-4 py-3 mb-4 space-y-1'>
        <p className='text-sm text-gray-400'>
          Client:{' '}
          <span className='font-medium text-gray-700'>{study.client || <span className="text-gray-400 italic font-normal">N/A</span>}</span>
        </p>
        <p className='text-sm text-gray-600'>Timeline: {study.timeline || <span className="text-gray-400 italic">N/A</span>}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 mt-auto">
        <button
          type='button'
          onClick={() => onView(study)}
          className='inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors duration-150 cursor-pointer'
          aria-label={`View ${study.title}`}
        >
          <MdRemoveRedEye className='text-base' aria-hidden='true' />
          View
        </button>
        <button
          type='button'
          onClick={() => onEdit(study)}
          className='inline-flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600 transition-colors duration-150 cursor-pointer'
          aria-label={`Edit ${study.title}`}
        >
          <MdEdit className='text-base' aria-hidden='true' />
          Edit
        </button>
        <button
          type='button'
          onClick={() => onDelete(study)}
          className='inline-flex items-center gap-1 text-sm font-medium text-red-500 hover:text-red-600 transition-colors duration-150 cursor-pointer'
          aria-label={`Delete ${study.title}`}
        >
          <MdDelete className='text-base' aria-hidden='true' />
          Delete
        </button>
      </div>
    </div>
  </article>
);


const CaseStudyDetail = ({ study, onBack }) => (
  <div className='space-y-6 pb-8'>
    <button
      type='button'
      onClick={onBack}
      className='inline-flex cursor-pointer items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors duration-150 group'
    >
      <MdArrowBack className='text-base group-hover:-translate-x-0.5 transition-transform duration-150' aria-hidden='true' />
      Back to Case Studies
    </button>

    <div className='bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
      {study.coverImage && (
        <div className='w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-gray-100'>
          <img src={study.coverImage} alt={study.title} className='w-full h-full object-cover' />
        </div>
      )}
      
      <div className='p-6 sm:p-8 space-y-6'>
        <div>
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold mb-3 ${getCategoryStyle(study.category)}`}>
            {study.category || 'Uncategorized'}
          </span>
          <h1 className='text-2xl font-bold text-gray-900'>{displayValue(study.title)}</h1>
        </div>

        <dl className='grid grid-cols-1 sm:grid-cols-3 gap-6 bg-gray-50 rounded-lg p-5 border border-gray-100'>
          <div>
            <dt className='text-sm text-gray-500 mb-1'>Client</dt>
            <dd className='font-medium text-gray-900'>{displayValue(study.client)}</dd>
          </div>
          <div>
            <dt className='text-sm text-gray-500 mb-1'>Timeline</dt>
            <dd className='font-medium text-gray-900'>{displayValue(study.timeline)}</dd>
          </div>
          <div>
            <dt className='text-sm text-gray-500 mb-1'>Services</dt>
            <dd className='font-medium text-gray-900'>{displayValue(study.services)}</dd>
          </div>
          <div className='sm:col-span-3'>
            <dt className='text-sm text-gray-500 mb-1'>Tags</dt>
            <dd className='font-medium text-gray-900 flex flex-wrap gap-2'>
              {study.tags ? study.tags.split(',').map(tag => (
                <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-200 text-gray-800">
                  {tag.trim()}
                </span>
              )) : displayValue(study.tags)}
            </dd>
          </div>
        </dl>

        <div>
          <h2 className='text-lg font-bold text-gray-900 mb-2'>Description</h2>
          <p className='text-gray-700 whitespace-pre-wrap'>{displayValue(study.description)}</p>
        </div>

        {study.content && (
          <div>
            <h2 className='text-lg font-bold text-gray-900 mb-4'>Content Overview</h2>
            <div 
              className='tiptap-content max-w-none text-gray-800'
              dangerouslySetInnerHTML={{ __html: (() => { console.log('CONTENT:', study.content); return typeof study.content === 'object' && study.content !== null ? study.content.html : study.content; })() }} 
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

export default function CaseStudies() {
  const [studies, setStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [viewingStudy, setViewingStudy] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Case Studies – Maktech Admin';
  }, []);

  const fetchStudies = async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/api/v1/case-studies?page=${page}&limit=${PAGE_SIZE}&searchTerm=`);
      if (res.data.success) {
        setStudies(res.data.data);
        setTotalPages(res.data.meta.totalPages || 1);
        setTotalCount(res.data.meta.total || 0);
      }
    } catch (err) {
      console.error("Failed to fetch case studies", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudies();
  }, [page]);

  const confirmDelete = async () => {
    try {
      const res = await apiClient.delete(`/api/v1/case-studies/${deleteTarget.id}`);
      if (res.data.success) {
        toast.success('Case study deleted successfully!');
        setDeleteTarget(null);
        fetchStudies();
      }
    } catch (err) {
      toast.error('Failed to delete case study');
    }
  };

  const handlePage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));
  const pageRange = useMemo(() => getPageRange(page, totalPages), [page, totalPages]);
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);

  return (
    <div className='space-y-6 pb-8'>
      {viewingStudy ? (
        <CaseStudyDetail study={viewingStudy} onBack={() => setViewingStudy(null)} />
      ) : (
        <>
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
      <div className='relative'>
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl">
            <div className="w-8 h-8 border-2 border-orange-bg-cta border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {studies.length === 0 && !loading ? (
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center'>
            <p className='text-base text-gray-400'>No case studies found.</p>
          </div>
        ) : (
          <section
            aria-label='Case studies list'
            className='grid grid-cols-1 sm:grid-cols-2 gap-6'
          >
            {studies.map((study) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                onView={(study) => setViewingStudy(study)}
                onEdit={(study) => navigate(`/admin/case-studies/edit/${study.id}`, { state: { study } })}
                onDelete={(study) => setDeleteTarget(study)}
              />
            ))}
          </section>
        )}
      </div>

      {/* Pagination */}
      {!loading && studies.length > 0 && (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
          <div className='flex flex-col items-center gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm text-gray-400 shrink-0'>
              Showing <span className='font-semibold text-gray-700'>{rangeStart} to {rangeEnd}</span> of <span className='font-semibold text-gray-700'>{totalCount}</span> case studies
            </p>
            <nav aria-label='Pagination'>
              <Pagination page={page} totalPages={totalPages} pageRange={pageRange} onPage={handlePage} />
            </nav>
          </div>
        </div>
      )}

      {deleteTarget && (
        <ConfirmDeleteModal
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={confirmDelete}
          itemName={`case study "${deleteTarget.title}"`}
        />
      )}
        </>
      )}
    </div>
  );
}
