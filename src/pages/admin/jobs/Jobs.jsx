import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MdAdd,
  MdEdit,
  MdDelete,
  MdLocationOn
} from 'react-icons/md';
import { toast } from 'react-toastify';

// ─── Static job data ──────────────────────────────────────────────────────────
const JOBS = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    subtitle:
      'Join our development team to build cutting-edge web applications',
    type: 'Full-time',
    location: 'Dhaka, Bangladesh',
    postedDate: '2026-01-20',
  },
  {
    id: 2,
    title: 'Digital Marketing Specialist',
    subtitle: 'Lead digital marketing campaigns for our growing client base',
    type: 'Full-time',
    location: 'Dhaka, Bangladesh',
    postedDate: '2026-01-18',
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    subtitle: 'Create beautiful and intuitive user experiences',
    type: 'Full-time',
    location: 'Remote',
    postedDate: '2026-01-15',
  },
];



// ─── Job row card ─────────────────────────────────────────────────────────────
const TYPE_STYLES = {
  'Full-time': 'bg-green-50 text-green-700',
  'Part-time': 'bg-amber-50 text-amber-700',
  Remote: 'bg-blue-50 text-blue-700',
  Contract: 'bg-purple-50 text-purple-700',
  Internship: 'bg-orange-50 text-orange-700',
};
const getTypeStyle = (type) => TYPE_STYLES[type] ?? 'bg-gray-100 text-gray-600';

// ─── Job row card ─────────────────────────────────────────────────────────────
const JobCard = ({ job, onEdit, onDelete }) => (
  <article className='relative bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between'>
    <div>
      {/* Title + type badge inline */}
      <div className='flex flex-wrap items-center gap-2 mb-1'>
        <h2 className='text-base font-bold text-gray-900'>{job.title}</h2>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${getTypeStyle(job.type)}`}
        >
          {job.type}
        </span>
      </div>

      <p className='text-base text-gray-500 mb-2'>{job.subtitle}</p>

      {/* Location + posted date */}
      <p className='flex flex-wrap items-center gap-1 text-sm text-gray-400'>
        <MdLocationOn
          className='text-base text-red-400 shrink-0'
          aria-hidden='true'
        />
        <span>{job.location}</span>
        <span className='mx-1'>·</span>
        <span>Posted {job.postedDate}</span>
      </p>
    </div>

    {/* Action Buttons */}
    <div className='flex items-center gap-2 mt-4 sm:mt-0'>
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
        onClick={() => onDelete(job.id)}
        aria-label={`Delete ${job.title}`}
        className='p-2 rounded-lg text-red-500 hover:bg-red-50 transition-colors duration-150 cursor-pointer'
      >
        <MdDelete className='text-lg' aria-hidden='true' />
      </button>
    </div>
  </article>
);

// ─── Page component ───────────────────────────────────────────────────────────
export default function Jobs() {
  const [jobs, setJobs] = useState(JOBS);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Jobs – Maktech Admin';
  }, []);

  const openPositions = useMemo(() => jobs.length, [jobs]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setJobs(jobs.filter(j => j.id !== id));
      toast.success('Job posting deleted successfully!');
    }
  };

  return (
    <div className='space-y-6 pb-8'>
      {/* Page Header */}
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900 leading-tight'>
              Jobs
            </h1>
            <span className='inline-flex items-center justify-center w-7 h-7 rounded-full bg-orange-bg-cta text-white text-sm font-bold leading-none'>
              {openPositions}
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
      {jobs.length === 0 ? (
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
  );
}
