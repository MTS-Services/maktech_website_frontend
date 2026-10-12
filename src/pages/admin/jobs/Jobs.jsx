import { useEffect, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdLocationOn,
  MdRemoveRedEye,
  MdArrowForward,
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

const JobCard = ({ job, onToggleStatus, isToggling, onEdit, onDelete, onViewApplicants }) => {
  const jobType = job.jobTypes?.[0]?.title || 'Full-time';
  const location = job.department || 'Remote';
  const postedDate = job.createdAt ? new Date(job.createdAt).toLocaleDateString() : 'N/A';
  const applicantCount = job._count?.applications ?? job.applicantCount ?? 0;

  return (
    <article className='relative bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-gray-200 transition-all'>
      <div className='flex-1 min-w-0'>
        {/* Title + type badge + active badge inline */}
        <div className='flex flex-wrap items-center gap-2.5 mb-2'>
          <h2 className='text-lg font-bold text-gray-900 truncate'>{job.title}</h2>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getTypeStyle(jobType)}`}
          >
            {jobType}
          </span>
          {job.isActive ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-500 border border-gray-200">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
              Inactive
            </span>
          )}
        </div>

        <p className='text-base text-gray-500 mb-2.5 line-clamp-1'>{job.description}</p>

        {/* Location + posted date */}
        <p className='flex flex-wrap items-center gap-1.5 text-sm text-gray-400'>
          <MdLocationOn
            className='text-base text-red-400 shrink-0'
            aria-hidden='true'
          />
          <span>{location}</span>
          <span className='mx-1'>·</span>
          <span>Posted {postedDate}</span>
        </p>
      </div>

      {/* Right Column: Actions & Applicants Info (Matches red marked spot) */}
      <div className='flex flex-col sm:items-end justify-between gap-3 shrink-0 self-stretch sm:self-center'>
        {/* Top Row: Active Toggle & Management Action Buttons */}
        <div className='flex items-center gap-2 sm:gap-3'>
          {/* Active / Inactive Toggle Switch */}
          <div className='flex items-center gap-2 pr-3 border-r border-gray-200'>
            <button
              type='button'
              role='switch'
              aria-checked={job.isActive}
              disabled={isToggling}
              onClick={() => onToggleStatus(job)}
              title={job.isActive ? 'Click to deactivate job' : 'Click to activate job'}
              aria-label={`Toggle active status for ${job.title}`}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#ff6533]/50 ${
                job.isActive ? 'bg-[#ff6533]' : 'bg-gray-300'
              } ${isToggling ? 'opacity-50 cursor-wait' : ''}`}
            >
              <span
                aria-hidden='true'
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                  job.isActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <a
            href={`/careers/${job.id}`}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`View ${job.title}`}
            title='View Public Job Details'
            className='p-2 rounded-lg text-emerald-500 hover:bg-emerald-50 transition-colors duration-150 cursor-pointer'
          >
            <MdRemoveRedEye className='text-xl' aria-hidden='true' />
          </a>
          <button
            type='button'
            onClick={() => onEdit(job)}
            aria-label={`Edit ${job.title}`}
            title='Edit Job Posting'
            className='p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors duration-150 cursor-pointer'
          >
            <MdEdit className='text-xl' aria-hidden='true' />
          </button>
          <button
            type='button'
            onClick={() => onDelete(job)}
            aria-label={`Delete ${job.title}`}
            title='Delete Job Posting'
            className='p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-150 cursor-pointer'
          >
            <MdDelete className='text-xl' aria-hidden='true' />
          </button>
        </div>

        {/* Bottom Area (RED RECTANGLE SPOT): Applicants Count & Show All Button */}
        <div className='flex items-center gap-2 pt-0.5'>
          <button
            type='button'
            onClick={() => onViewApplicants && onViewApplicants(job)}
            className='inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-50 hover:bg-orange-100 text-[#ff6533] border border-orange-200/80 transition-all duration-200 hover:shadow-xs group cursor-pointer'
            title={`View all applicants for ${job.title}`}
            aria-label={`View ${applicantCount} applicants for ${job.title}`}
          >
            <span className='inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-[#ff6533] text-white text-[11px] font-bold shadow-2xs'>
              {applicantCount}
            </span>
            <span className='text-gray-700 font-medium'>Applicants</span>
            <span className='w-1 h-1 rounded-full bg-orange-300' />
            <span className='text-[#ff6533] font-bold group-hover:underline inline-flex items-center gap-1'>
              Show All
              <MdArrowForward className='text-xs transition-transform group-hover:translate-x-0.5' />
            </span>
          </button>
        </div>
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
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [togglingId, setTogglingId] = useState(null);
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
        setTotalPages(res.data.meta?.totalPages || 1);
        setTotalCount(res.data.meta?.total || 0);
      }

      // Fetch all jobs to compute overall active/inactive counts across all pages
      try {
        const allRes = await apiClient.get('/api/v1/jobs?limit=1000');
        if (allRes.data.success && Array.isArray(allRes.data.data)) {
          const allList = allRes.data.data;
          const active = allList.filter(j => j.isActive !== false).length;
          setActiveCount(active);
          setInactiveCount(allList.length - active);
        }
      } catch (err) {
        console.warn('Failed to fetch full stats:', err);
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

  const handleToggleStatus = async (job) => {
    const newStatus = !job.isActive;
    setTogglingId(job.id);

    // Optimistic update
    setJobs((prev) =>
      prev.map((j) => (j.id === job.id ? { ...j, isActive: newStatus } : j))
    );
    setActiveCount((prev) => (newStatus ? prev + 1 : Math.max(0, prev - 1)));
    setInactiveCount((prev) => (newStatus ? Math.max(0, prev - 1) : prev + 1));

    try {
      const res = await apiClient.patch(`/api/v1/jobs/${job.id}`, {
        isActive: newStatus,
      });

      if (res.data?.success) {
        toast.success(`Job marked as ${newStatus ? 'Active' : 'Inactive'}!`);
      } else {
        throw new Error(res.data?.message || 'Update failed');
      }
    } catch (err) {
      // Revert on error
      setJobs((prev) =>
        prev.map((j) => (j.id === job.id ? { ...j, isActive: job.isActive } : j))
      );
      setActiveCount((prev) => (newStatus ? Math.max(0, prev - 1) : prev + 1));
      setInactiveCount((prev) => (newStatus ? prev + 1 : Math.max(0, prev - 1)));
      toast.error('Failed to update job status');
    } finally {
      setTogglingId(null);
    }
  };

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
            <span className='inline-flex items-center justify-center min-w-[1.75rem] h-7 px-2 rounded-full bg-orange-bg-cta text-white text-sm font-bold leading-none'>
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

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
        {/* Open / Active Positions Card */}
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:border-gray-200 transition-all'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-gray-500'>Open Positions</p>
            <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700'>
              Live
            </span>
          </div>
          <p className='text-3xl sm:text-4xl font-bold text-gray-900 mt-3'>
            {activeCount}
          </p>
          <p className='text-xs text-gray-400 mt-1.5'>
            Currently active on careers page
          </p>
        </div>

        {/* Total Positions Card */}
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:border-gray-200 transition-all'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-gray-500'>Total Positions</p>
            <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700'>
              All
            </span>
          </div>
          <p className='text-3xl sm:text-4xl font-bold text-gray-900 mt-3'>
            {totalCount}
          </p>
          <p className='text-xs text-gray-400 mt-1.5'>
            Total career postings created
          </p>
        </div>

        {/* Inactive / Draft Card */}
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col justify-between hover:border-gray-200 transition-all'>
          <div className='flex items-center justify-between'>
            <p className='text-sm font-medium text-gray-500'>Inactive Positions</p>
            <span className='inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600'>
              Paused
            </span>
          </div>
          <p className='text-3xl sm:text-4xl font-bold text-gray-400 mt-3'>
            {inactiveCount}
          </p>
          <p className='text-xs text-gray-400 mt-1.5'>
            Hidden from public applications
          </p>
        </div>
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
                onToggleStatus={handleToggleStatus}
                isToggling={togglingId === job.id}
                onEdit={(job) => navigate(`/admin/jobs/edit/${job.id}`, { state: { job } })} 
                onDelete={handleDelete}
                onViewApplicants={(job) => navigate(`/admin/jobs/${job.id}/applicants`, { state: { job } })}
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
