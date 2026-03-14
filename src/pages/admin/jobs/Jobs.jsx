import { useEffect, useMemo, useState } from 'react';
import {
  MdAdd,
  MdEdit,
  MdArrowBack,
  MdCheck,
  MdLocationOn,
  MdKeyboardArrowDown,
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

const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Remote',
  'Contract',
  'Internship',
];

// Badge colours — text + bg so colour is never the sole indicator (WCAG 1.4.1)
const TYPE_STYLES = {
  'Full-time': 'bg-green-50 text-green-700',
  'Part-time': 'bg-amber-50 text-amber-700',
  Remote: 'bg-blue-50 text-blue-700',
  Contract: 'bg-purple-50 text-purple-700',
  Internship: 'bg-orange-50 text-orange-700',
};
const getTypeStyle = (type) => TYPE_STYLES[type] ?? 'bg-gray-100 text-gray-600';

const LABEL_CLS = 'block text-sm font-medium text-gray-600 mb-1.5';
const INPUT_CLS =
  'w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent transition';
const REQUIRED_STAR = (
  <span className='text-red-500 ml-0.5' aria-hidden='true'>
    *
  </span>
);

const EMPTY_JOB = {
  title: '',
  subtitle: '',
  type: '',
  location: '',
  postedDate: '',
};

// ─── Shared form shell (DRY) ──────────────────────────────────────────────────
const JobFormShell = ({
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
        Back to Jobs
      </button>

      <div className='bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8'>
        <h1 className='text-xl font-bold text-gray-900 mb-6'>{heading}</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className='space-y-4 mb-6'>
            {/* Job Title */}
            <div>
              <label htmlFor='jf-title' className={LABEL_CLS}>
                Job Title{REQUIRED_STAR}
              </label>
              <input
                id='jf-title'
                name='title'
                type='text'
                value={form.title}
                onChange={handleChange}
                autoComplete='off'
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Job Subtitle */}
            <div>
              <label htmlFor='jf-subtitle' className={LABEL_CLS}>
                Job Subtitle{REQUIRED_STAR}
              </label>
              <input
                id='jf-subtitle'
                name='subtitle'
                type='text'
                value={form.subtitle}
                onChange={handleChange}
                autoComplete='off'
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Job Type — native select */}
            <div>
              <label htmlFor='jf-type' className={LABEL_CLS}>
                Job Type{REQUIRED_STAR}
              </label>
              <div className='relative'>
                <select
                  id='jf-type'
                  name='type'
                  value={form.type}
                  onChange={handleChange}
                  required
                  className={`${INPUT_CLS} appearance-none pr-10 cursor-pointer`}
                >
                  <option value='' disabled>
                    Select job type
                  </option>
                  {JOB_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <MdKeyboardArrowDown
                  className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-gray-400'
                  aria-hidden='true'
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label htmlFor='jf-location' className={LABEL_CLS}>
                Location{REQUIRED_STAR}
              </label>
              <input
                id='jf-location'
                name='location'
                type='text'
                value={form.location}
                onChange={handleChange}
                autoComplete='address-level2'
                required
                className={INPUT_CLS}
              />
            </div>

            {/* Posted Date */}
            <div>
              <label htmlFor='jf-date' className={LABEL_CLS}>
                Posted Date{REQUIRED_STAR}
              </label>
              <input
                id='jf-date'
                name='postedDate'
                type='date'
                value={form.postedDate}
                onChange={handleChange}
                required
                className={INPUT_CLS}
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

// Thin wrappers — keep JobFormShell DRY, each has single responsibility
const AddJobForm = ({ onCancel, onSubmit }) => (
  <JobFormShell
    heading='Add New Job'
    initialValues={EMPTY_JOB}
    submitLabel='Add Job Posting'
    onSubmit={onSubmit}
    onCancel={onCancel}
  />
);

const EditJobForm = ({ job, onCancel, onSubmit }) => (
  <JobFormShell
    heading='Edit Job Posting'
    initialValues={{
      title: job.title,
      subtitle: job.subtitle,
      type: job.type,
      location: job.location,
      postedDate: job.postedDate,
    }}
    submitLabel='Update Job Posting'
    onSubmit={onSubmit}
    onCancel={onCancel}
  />
);

// ─── Job row card ─────────────────────────────────────────────────────────────
const JobCard = ({ job, onEdit }) => (
  <article className='relative bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4'>
    <div className='pr-10'>
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

    {/* Edit icon — absolutely positioned at right-center for all screen sizes */}
    <button
      type='button'
      onClick={() => onEdit(job)}
      aria-label={`Edit ${job.title}`}
      className='absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-blue-400 hover:bg-blue-50 transition-colors duration-150'
    >
      <MdEdit className='text-lg' aria-hidden='true' />
    </button>
  </article>
);

// ─── Page component ───────────────────────────────────────────────────────────
export default function Jobs() {
  useEffect(() => {
    document.title = 'Jobs – Maktech Admin';
  }, []);

  const openPositions = useMemo(() => JOBS.length, []);

  const [editingJob, setEditingJob] = useState(null);
  const [addingJob, setAddingJob] = useState(false);

  const handleAddSubmit = () => {
    toast.success('Job posting added successfully!');
    setAddingJob(false);
  };

  const handleEditSubmit = () => {
    toast.success('Job posting updated successfully!');
    setEditingJob(null);
  };

  // State machine: edit > add > list
  if (editingJob)
    return (
      <EditJobForm
        job={editingJob}
        onCancel={() => setEditingJob(null)}
        onSubmit={handleEditSubmit}
      />
    );

  if (addingJob)
    return (
      <AddJobForm
        onCancel={() => setAddingJob(false)}
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
          onClick={() => setAddingJob(true)}
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
      {JOBS.length === 0 ? (
        <div className='bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center'>
          <p className='text-base text-gray-400'>No job postings found.</p>
        </div>
      ) : (
        <section aria-label='Job postings list' className='space-y-4'>
          {JOBS.map((job) => (
            <JobCard key={job.id} job={job} onEdit={setEditingJob} />
          ))}
        </section>
      )}
    </div>
  );
}
