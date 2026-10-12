import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  MdArrowBack,
  MdEmail,
  MdPhone,
  MdLocationOn,
  MdCalendarToday,
  MdAccessTime,
  MdFileDownload,
  MdOpenInNew,
  MdCheckCircle,
  MdStar,
  MdSave,
  MdContentCopy,
} from 'react-icons/md';
import { toast } from 'react-toastify';
import apiClient from '../../../services/apiClient';
import {
  updateApplicantStatusInStorage,
  updateApplicantNotesInStorage,
} from './data/demoApplicants';

const getFullFileUrl = (url) => {
  if (!url) return '#';
  if (url.startsWith('http')) return url;
  const backendBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  return `${backendBase}${url.startsWith('/') ? '' : '/'}${url}`;
};

const STATUS_CONFIG = {
  PENDING: {
    label: 'Pending Review',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    dot: 'bg-amber-500',
  },
  REVIEWING: {
    label: 'Under Review',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    dot: 'bg-blue-500',
  },
  SHORTLISTED: {
    label: 'Shortlisted',
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    dot: 'bg-purple-500',
  },
  INTERVIEW: {
    label: 'Interview',
    bg: 'bg-indigo-50',
    text: 'text-indigo-700',
    border: 'border-indigo-200',
    dot: 'bg-indigo-500',
  },
  HIRED: {
    label: 'Hired',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    dot: 'bg-emerald-500',
  },
  REJECTED: {
    label: 'Rejected',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
    dot: 'bg-rose-500',
  },
};

export default function ApplicantDetailPage() {
  const { jobId, applicantId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [applicant, setApplicant] = useState(location.state?.applicant || null);
  const [loading, setLoading] = useState(!location.state?.applicant);
  const [notes, setNotes] = useState(location.state?.applicant?.recruiterNotes || '');
  const [currentStatus, setCurrentStatus] = useState(location.state?.applicant?.status || 'PENDING');

  useEffect(() => {
    let isCancelled = false;

    const fetchApplicant = async () => {
      try {
        const res = await apiClient.get(`/api/v1/jobs/applicants/${applicantId}`);
        if (!isCancelled && res.data?.data) {
          const app = res.data.data;
          const normalized = {
            id: app.id,
            jobId: app.jobId,
            jobTitle: app.job?.title || 'Job Position',
            applicantName: app.applicantName,
            applicantEmail: app.applicantEmail,
            applicantPhone: app.applicantPhone || 'N/A',
            location: app.location || 'Dhaka, Bangladesh',
            avatar: app.avatar || null,
            appliedAt: app.createdAt,
            status: app.status || 'PENDING',
            resumeUrl: app.resumeUrl,
            resumeName: app.resumeUrl ? app.resumeUrl.split('/').pop() : null,
            resumeSize: app.resumeUrl ? 'PDF' : null,
            recruiterNotes: app.recruiterNotes || '',
            answers: (app.answers || []).map((ans) => ({
              questionId: ans.questionId,
              questionTitle: ans.question?.title || 'Question',
              type: ans.question?.type ? ans.question.type.toLowerCase().replace(/ /g, '_') : 'short_answer',
              value: ans.answerData,
            })),
          };
          setApplicant(normalized);
          setNotes(normalized.recruiterNotes || '');
          setCurrentStatus(normalized.status || 'PENDING');
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Could not fetch applicant from API:', err);
      }

      if (!isCancelled) {
        setLoading(false);
      }
    };

    if (!applicant || !applicant.answers || applicant.answers.length === 0) {
      fetchApplicant();
    } else {
      setLoading(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [applicantId, applicant]);

  const handleStatusSelect = async (newStatus) => {
    setCurrentStatus(newStatus);
    try {
      await apiClient.patch(`/api/v1/jobs/applicants/${applicantId}/status`, {
        status: newStatus,
      });
    } catch (err) {
      updateApplicantStatusInStorage(applicantId, newStatus);
    }
    toast.success(`Applicant status updated to ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
  };

  const handleSaveNotes = async () => {
    try {
      await apiClient.patch(`/api/v1/jobs/applicants/${applicantId}/notes`, {
        recruiterNotes: notes,
      });
    } catch (err) {
      updateApplicantNotesInStorage(applicantId, notes);
    }
    toast.success('Recruiter notes saved successfully');
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    toast.success(`${fieldName} copied to clipboard`);
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-[50vh]'>
        <div className='w-9 h-9 border-2 border-[#ff6533] border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (!applicant) {
    return (
      <div className='p-12 text-center bg-white rounded-2xl border border-gray-100'>
        <h2 className='text-lg font-bold text-gray-800 mb-2'>Applicant Not Found</h2>
        <p className='text-sm text-gray-500 mb-6'>
          Could not find applicant records for ID: {applicantId}
        </p>
        <button
          type='button'
          onClick={() => navigate(`/admin/jobs/${jobId}/applicants`)}
          className='px-5 py-2.5 rounded-xl text-sm font-semibold bg-[#ff6533] text-white'
        >
          Back to Applicants List
        </button>
      </div>
    );
  }

  const statusInfo = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.PENDING;

  return (
    <div className='w-full pb-10 space-y-6'>
      {/* ─── Back Button & Status Action Bar ─── */}
      <div className='flex items-center justify-between'>
        <button
          type="button"
          onClick={() => navigate(`/admin/jobs/${jobId}/applicants`)}
          className="flex items-center text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium cursor-pointer"
        >
          <MdArrowBack size={16} className="mr-1.5" /> Back to Applicants
        </button>

        {/* Status Dropdown */}
        <div className='flex items-center gap-2'>
          <span className='text-xs font-medium text-gray-400'>Status:</span>
          <select
            value={currentStatus}
            onChange={(e) => handleStatusSelect(e.target.value)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border} focus:outline-none focus:ring-2 focus:ring-[#ff6533]/40 cursor-pointer shadow-2xs`}
          >
            {Object.entries(STATUS_CONFIG).map(([key, cfg]) => (
              <option key={key} value={key}>
                {cfg.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ─── Applicant Profile Card ─── */}
      <div className='p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
        <div className='flex items-center gap-4.5'>
          {applicant.avatar ? (
            <img
              src={applicant.avatar}
              alt={applicant.applicantName}
              className='w-18 h-18 rounded-2xl object-cover border-2 border-white shadow-md'
            />
          ) : (
            <div className='w-18 h-18 rounded-2xl bg-[#ff6533] text-white text-2xl font-bold flex items-center justify-center shadow-md'>
              {applicant.applicantName
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2)
                .toUpperCase()}
            </div>
          )}

          <div>
            <div className='flex items-center gap-2.5'>
              <h1 className='text-2xl font-bold text-gray-900'>{applicant.applicantName}</h1>
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-semibold border ${statusInfo.bg} ${statusInfo.text} ${statusInfo.border}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                {statusInfo.label}
              </span>
            </div>

            <p className='text-sm text-gray-500 mt-0.5'>
              Applied for <span className='font-semibold text-gray-800'>{applicant.jobTitle}</span> •{' '}
              {new Date(applicant.appliedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>

            <div className='flex flex-wrap items-center gap-y-1 gap-x-3 text-xs sm:text-sm text-gray-500 mt-2'>
              <span className='flex items-center gap-1 hover:text-gray-800'>
                <MdEmail className='text-gray-400' />
                <a href={`mailto:${applicant.applicantEmail}`} className='hover:underline'>
                  {applicant.applicantEmail}
                </a>
              </span>
              <span className='text-gray-300'>•</span>
              <span className='flex items-center gap-1 hover:text-gray-800'>
                <MdPhone className='text-gray-400' />
                <a href={`tel:${applicant.applicantPhone}`} className='hover:underline'>
                  {applicant.applicantPhone}
                </a>
              </span>
              {applicant.location && (
                <>
                  <span className='text-gray-300'>•</span>
                  <span className='flex items-center gap-1'>
                    <MdLocationOn className='text-red-400' />
                    {applicant.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className='flex flex-wrap items-center gap-2.5 w-full md:w-auto'>
          {(applicant.resumeUrl || applicant.resumeName) && (
            <a
              href={getFullFileUrl(applicant.resumeUrl)}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-[#ff6533] hover:text-[#ff6533] shadow-2xs hover:shadow-xs transition-all'
            >
              <MdFileDownload className='text-base text-[#ff6533]' />
              <span>Resume ({applicant.resumeSize || 'PDF'})</span>
            </a>
          )}

          {applicant.portfolioUrl && (
            <a
              href={applicant.portfolioUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:border-gray-400 shadow-2xs hover:shadow-xs transition-all'
            >
              <MdOpenInNew className='text-sm text-gray-400' />
              <span>Portfolio</span>
            </a>
          )}

          <a
            href={`mailto:${applicant.applicantEmail}?subject=Regarding your application for ${applicant.jobTitle} at Maktech`}
            className='inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#ff6533] hover:bg-[#e5501a] text-white shadow-xs hover:shadow-sm transition-all'
          >
            <MdEmail className='text-base' />
            <span>Send Email</span>
          </a>
        </div>
      </div>

      {/* ─── Submitted Form Responses Section ─── */}
      <div className='bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-7'>
        <div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-100'>
          <div>
            <h2 className='text-lg font-bold text-gray-900'>
              Application Form Responses
            </h2>
            <p className='text-xs sm:text-sm text-gray-400 mt-0.5'>
              Detailed answers submitted by candidate through the application form
            </p>
          </div>
          <span className='px-3 py-1 rounded-full text-xs font-semibold bg-orange-50 text-[#ff6533] border border-orange-200'>
            {applicant.answers?.length || 0} Questions
          </span>
        </div>

        <div className='space-y-5'>
          {applicant.answers && applicant.answers.length > 0 ? (
            applicant.answers.map((answer, index) => {
              const val = answer.value;
              const type = answer.type || 'short_answer';

              return (
                <div
                  key={answer.questionId || index}
                  className='p-5 rounded-2xl bg-gray-50/50 border border-gray-100 hover:border-gray-200 transition-all group'
                >
                  <div className='flex items-start justify-between gap-3 mb-2.5'>
                    <div className='flex items-baseline gap-2.5 min-w-0'>
                      <span className='w-6 h-6 rounded-full bg-orange-100 text-[#ff6533] text-xs font-bold flex items-center justify-center shrink-0'>
                        {index + 1}
                      </span>
                      <h3 className='text-sm sm:text-base font-semibold text-gray-800 leading-snug'>
                        {answer.questionTitle}
                      </h3>
                    </div>
                    <span className='text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-white border border-gray-200 text-gray-500 shrink-0'>
                      {type.replace(/_/g, ' ')}
                    </span>
                  </div>

                  <div className='pl-8.5'>
                    {type === 'paragraph' && (
                      <div className='p-4 rounded-xl bg-white border border-gray-200 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap'>
                        {val || <span className='text-gray-400 italic'>No response provided</span>}
                      </div>
                    )}

                    {(type === 'short_answer' || type === 'email' || type === 'phone') && (
                      <div className='flex items-center justify-between p-3.5 rounded-xl bg-white border border-gray-200 text-sm text-gray-800 font-medium'>
                        <span>{val || <span className='text-gray-400 italic'>No response</span>}</span>
                        {val && (
                          <button
                            type='button'
                            onClick={() => handleCopy(val, answer.questionTitle)}
                            className='p-1 text-gray-400 hover:text-gray-700 rounded transition-colors opacity-0 group-hover:opacity-100'
                            title='Copy'
                          >
                            <MdContentCopy className='text-sm' />
                          </button>
                        )}
                      </div>
                    )}

                    {type === 'url' && (
                      <div className='p-3.5 rounded-xl bg-white border border-gray-200 text-sm'>
                        {val ? (
                          <a
                            href={val}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-[#ff6533] hover:underline font-medium inline-flex items-center gap-1.5 break-all'
                          >
                            {val}
                            <MdOpenInNew className='text-xs shrink-0' />
                          </a>
                        ) : (
                          <span className='text-gray-400 italic'>No link provided</span>
                        )}
                      </div>
                    )}

                    {type === 'checkboxes' && (
                      <div className='flex flex-wrap gap-2 pt-1'>
                        {Array.isArray(val) && val.length > 0 ? (
                          val.map((item, i) => (
                            <span
                              key={i}
                              className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-orange-50 text-orange-800 border border-orange-200'
                            >
                              <MdCheckCircle className='text-sm text-[#ff6533]' />
                              {item}
                            </span>
                          ))
                        ) : (
                          <span className='text-gray-400 italic text-sm'>None selected</span>
                        )}
                      </div>
                    )}

                    {(type === 'multiple_choice' || type === 'dropdown' || type === 'yes_no') && (
                      <div className='pt-1'>
                        <span className='inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white text-gray-800 border border-gray-200 shadow-2xs'>
                          <span className='w-2 h-2 rounded-full bg-[#ff6533]' />
                          {val || 'None'}
                        </span>
                      </div>
                    )}

                    {type === 'linear_scale' && (
                      <div className='flex items-center gap-3 pt-1'>
                        <div className='flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-sm'>
                          <MdStar className='text-amber-500 text-base' />
                          <span>{val} / 10</span>
                        </div>
                        <div className='flex-1 max-w-xs h-2 bg-gray-200 rounded-full overflow-hidden'>
                          <div
                            className='h-full bg-amber-500 rounded-full'
                            style={{ width: `${Math.min(100, (Number(val) || 0) * 10)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {type === 'date' && (
                      <div className='flex items-center gap-2 pt-1 text-sm text-gray-700 font-medium'>
                        <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs'>
                          <MdCalendarToday className='text-gray-400 text-sm' />
                          {val ? new Date(val).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A'}
                        </span>
                      </div>
                    )}

                    {type === 'time' && (
                      <div className='flex items-center gap-2 pt-1 text-sm text-gray-700 font-medium'>
                        <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 shadow-2xs'>
                          <MdAccessTime className='text-gray-400 text-sm' />
                          {val || 'N/A'}
                        </span>
                      </div>
                    )}

                    {type === 'file_upload' && (
                      <div className='flex items-center justify-between p-4 rounded-2xl bg-white border border-gray-200 max-w-md shadow-2xs'>
                        <div className='flex items-center gap-3 min-w-0'>
                          <div className='w-10 h-10 rounded-xl bg-orange-100 text-[#ff6533] flex items-center justify-center shrink-0'>
                            <MdFileDownload className='text-xl' />
                          </div>
                          <div className='min-w-0'>
                            <p className='text-xs sm:text-sm font-semibold text-gray-800 truncate'>
                              {val || 'Attached_Document.pdf'}
                            </p>
                            <p className='text-[11px] text-gray-400'>
                              {answer.fileSize || 'Uploaded document'}
                            </p>
                          </div>
                        </div>
                        <a
                          href={getFullFileUrl(answer.fileUrl || val)}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-200 text-gray-700 hover:text-[#ff6533] transition-colors shrink-0'
                        >
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className='text-sm text-gray-500'>No detailed answers available.</p>
          )}
        </div>
      </div>

      {/* ─── Internal Recruiter Notes ─── */}
      <div className='p-6 bg-white rounded-3xl border border-gray-100 shadow-sm'>
        <div className='flex items-center justify-between mb-3'>
          <div>
            <h3 className='text-base font-bold text-gray-900'>
              Internal Recruiter Notes
            </h3>
            <p className='text-xs text-gray-500'>
              Private assessment notes visible only to hiring admins
            </p>
          </div>
          <button
            type='button'
            onClick={handleSaveNotes}
            className='inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#ff6533] hover:bg-[#e5501a] text-white shadow-xs transition-colors cursor-pointer'
          >
            <MdSave className='text-base' />
            <span>Save Notes</span>
          </button>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          placeholder='Add candidate screening notes, interview scores, or remarks...'
          className='w-full p-4 rounded-2xl border border-gray-200 bg-gray-50/50 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#ff6533]/40 focus:border-[#ff6533] transition-all resize-none'
        />
      </div>
    </div>
  );
}
