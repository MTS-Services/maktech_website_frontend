import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdLocationOn,
  MdRemoveRedEye
} from 'react-icons/md';
import { toast } from 'react-toastify';
import apiClient from '../../../services/apiClient';
import Pagination from '../../../components/Pagination';
import { getPageRange } from '../../../utils/helpers';
import ConfirmDeleteModal from '../../../components/ConfirmDeleteModal';

const PAGE_SIZE = 10;

// ─── Job row card ─────────────────────────────────────────────────────────────
const TYPE_STYLES = {
  'Full-time': 'bg-green-50 text-green-700',
  'Part-time': 'bg-amber-50 text-amber-700',
  'Remote': 'bg-blue-50 text-blue-700',
  'Contract': 'bg-purple-50 text-purple-700',
  'Internship': 'bg-orange-50 text-orange-700',
};

// Use substring matching since the API returns "Full-time role"
const getTypeStyle = (type) => {
  if (!type) return 'bg-gray-100 text-gray-600';
  for (const [key, style] of Object.entries(TYPE_STYLES)) {
    if (type.toLowerCase().includes(key.toLowerCase())) return style;
  }
  return 'bg-gray-100 text-gray-600';
};

const JobCard = ({ job, onEdit, onDelete }) => {
  const jobType = job.jobTypes?.[0]?.title || 'Full-time';
  const location = job.department || 'Remote';
  const postedDate = job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A';

  return (
    <article className='relative bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
      <div className='flex-1 min-w-0'>
        {/* Title + type badge inline */}
        <div className='flex flex-wrap items-center gap-2 mb-1'>
          <h2 className='text-base font-bold text-gray-900 truncate'>{job.title}</h2>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getTypeStyle(jobType)}`}
          >
            {jobType}
          </span>
        </div>

        <p className='text-base text-gray-500 mb-2 line-clamp-1'>{job.description}</p>

        {/* Location + posted date */}
        <p className='flex flex-wrap items-center gap-1 text-sm text-gray-400'>
          <MdLocationOn
            className='text-base text-red-400 shrink-0'
            aria-hidden='true'
          />
          <span>{location}</span>
          <span className='mx-1'>·</span>
          <span>Posted {postedDate}</span>
        </p>
      </div>

      {/* Action Buttons */}
      <div className='flex items-center gap-2 mt-4 sm:mt-0 shrink-0'>
        <a
          href={`/careers/${job.id}`}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={`View ${job.title}`}
          className='p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 transition-colors duration-150 cursor-pointer'
        >
          <MdRemoveRedEye className='text-lg' aria-hidden='true' />
        </a>
        <button
          type='button'
          onClick={() => onEdit(job)}
          aria-label={`Edit ${job.title}`}
          className='p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors duration-150 cursor-pointer'
        >
          <MdEdit className='text-lg' aria-hidden='true' />
        </button>
        <button
          type='button'
          onClick={() => onDelete(job)}
          aria-label={`Delete ${job.title}`}
          className='p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-150 cursor-pointer'
        >
          <MdDelete className='text-lg' aria-hidden='true' />
        </button>
      </div>
    </article>
  );
};

// ─── Page component ───────────────────────────────────────────────────────────
export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Jobs – Maktech Admin';
  }, []);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await apiClient.get(`/api/v1/jobs?page=${page}&limit=${PAGE_SIZE}`);
      if (res.data.success) {
        setJobs(res.data.data);
        setTotalPages(res.data.meta.totalPages);
        setTotalCount(res.data.meta.total);
      }
    } catch (err) {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = (job) => {
    setDeleteTarget(job);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      const res = await apiClient.delete(`/api/v1/jobs/${deleteTarget.id}`);
      if (res.data.success) {
        toast.success('Job posting deleted successfully!');
        setDeleteTarget(null);
        fetchJobs();
      }
    } catch (err) {
      toast.error('Failed to delete job posting');
    }
  };

  const handlePage = (p) => setPage(Math.max(1, Math.min(totalPages, p)));
  const pageRange = useMemo(() => getPageRange(page, totalPages), [page, totalPages]);
  const rangeStart = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(page * PAGE_SIZE, totalCount);

  return (
    <div className='space-y-6 pb-8'>
      {/* Page Header */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
              Jobs
            </h1>
            <span className='inline-flex items-center justify-center min-w-[1.75rem] h-7 px-1.5 rounded-full bg-orange-bg-cta text-white text-sm font-bold leading-none'>
              {totalCount}
            </span>
          </div>
          <p className='text-base text-gray-500 mt-1'>
            Manage hiring and career opportunities
          </p>
        </div>

        <button
          type='button'
          onClick={() => navigate('/admin/jobs/create')}
          className='group inline-flex cursor-pointer items-center gap-2 overflow-hidden px-5 py-2.5 text-sm font-semibold text-white bg-orange-bg-cta rounded-lg hover:bg-[#e5501a] hover:shadow-[0_4px_14px_rgba(255,101,51,0.35)] transition-all duration-200 active:scale-[0.97]'
        >
          <MdAdd
            className='text-lg shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1'
            aria-hidden='true'
          />
          <span className='inline-block -translate-x-1 transition-transform duration-300 ease-out delay-100 group-hover:translate-x-0'>
            Add New Job
          </span>
        </button>
      </div>

      {/* Jobs list */}
      <div className='relative'>
        {loading ? (
          <div className="bg-white/50 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-2xl h-64">
            <div className="w-8 h-8 border-2 border-orange-bg-cta border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center'>
            <p className='text-base text-gray-400'>No job postings found.</p>
          </div>
        ) : (
          <section aria-label='Job postings list' className='space-y-4'>
            {jobs.map((job) => (
              <JobCard 
                key={job.id} 
                job={job} 
                onEdit={(job) => navigate(`/admin/jobs/edit/${job.id}`, { state: { job } })} 
                onDelete={handleDelete}
              />
            ))}
          </section>
        )}
      </div>

      {/* Pagination */}
      {!loading && jobs.length > 0 && (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden'>
          <div className='flex flex-col items-center gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm text-gray-400 shrink-0'>
              Showing <span className='font-semibold text-gray-700'>{rangeStart} to {rangeEnd}</span> of <span className='font-semibold text-gray-700'>{totalCount}</span> jobs
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
          itemName={`job "${deleteTarget.title}"`}
        />
      )}
    </div>
  );
}
