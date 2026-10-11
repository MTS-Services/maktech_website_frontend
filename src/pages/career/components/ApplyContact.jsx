import { useState, useMemo } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { MdAttachFile } from 'react-icons/md';
import { toast } from 'react-toastify';

const DEFAULT_POSITIONS = [
  { value: 'ui-ux', label: 'UI/UX Design' },
  { value: 'mern', label: 'MERN STACK Development' },
  { value: 'flutter', label: 'Flutter App Development' },
  { value: 'laravel', label: 'Laravel Development' },
  { value: 'shopify', label: 'Shopify Development' },
  { value: 'wordpress', label: 'WordPress Development' },
  { value: 'wix', label: 'WIX Development' },
  { value: 'marketing', label: 'Digital Marketing' },
  { value: 'design', label: 'Graphic Design' },
];

const getNormalizedType = (type = '') => {
  const t = type.toLowerCase().trim().replace(/[-_]/g, ' ');
  if (t.includes('paragraph') || t.includes('long answer') || t.includes('notes')) return 'paragraph';
  if (t.includes('short answer') || t.includes('short')) return 'short_answer';
  if (t.includes('email')) return 'email';
  if (t.includes('phone')) return 'phone';
  if (t.includes('multiple choice') || t.includes('single selection')) return 'multiple_choice';
  if (t.includes('checkbox')) return 'checkboxes';
  if (t.includes('dropdown')) return 'dropdown';
  if (t.includes('file')) return 'file_upload';
  if (t.includes('linear scale') || t.includes('scale') || t.includes('rating')) return 'linear_scale';
  if (t.includes('date')) return 'date';
  if (t.includes('time')) return 'time';
  if (t.includes('yes') || t.includes('no')) return 'yes_no';
  if (t.includes('url') || t.includes('link') || t.includes('portfolio') || t.includes('github') || t.includes('linkedin')) return 'url';
  if (t.includes('description') || t.includes('block')) return 'description_block';
  return 'short_answer';
};

const extractOptions = (q) => {
  if (Array.isArray(q.options) && q.options.length > 0) {
    return q.options.map((opt) => (typeof opt === 'object' && opt !== null ? opt.value : opt));
  }
  if (getNormalizedType(q.type) === 'yes_no') {
    return ['Yes', 'No'];
  }
  return [];
};

const ApplyContact = ({ job }) => {
  // Questions from API
  const dynamicQuestions = useMemo(() => {
    if (!job || !Array.isArray(job.questions) || job.questions.length === 0) {
      return [];
    }
    return [...job.questions].sort((a, b) => (a.order || 0) - (b.order || 0));
  }, [job]);

  const hasDynamicQuestions = dynamicQuestions.length > 0;

  // Dynamic answers state (mapped by question ID)
  const [answers, setAnswers] = useState({});

  // Fallback state (used ONLY when there are no dynamic questions from API)
  const [fallbackData, setFallbackData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: job?.title || 'ui-ux',
    experience: 'Fresher',
    message: '',
  });

  const handleAnswerChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (questionId, optionVal) => {
    setAnswers((prev) => {
      const current = Array.isArray(prev[questionId]) ? prev[questionId] : [];
      const updated = current.includes(optionVal)
        ? current.filter((v) => v !== optionVal)
        : [...current, optionVal];
      return { ...prev, [questionId]: updated };
    });
  };

  const handleDynamicSubmit = (e) => {
    e.preventDefault();
    // Validate required questions
    for (const q of dynamicQuestions) {
      if (q.isRequired && !answers[q.id]) {
        toast.error(`Please answer: "${q.title}"`);
        return;
      }
    }
    toast.success('Application submitted successfully! We will get in touch with you.');
    setAnswers({});
  };

  const handleFallbackChange = (e) => {
    const { name, value } = e.target;
    setFallbackData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFallbackSubmit = (e) => {
    e.preventDefault();
    toast.success('Application submitted successfully! We will get in touch with you.');
    setFallbackData({
      fullName: '',
      phone: '',
      email: '',
      service: job?.title || 'ui-ux',
      experience: 'Fresher',
      message: '',
    });
  };

  const positionOptions = job?.title
    ? [{ value: job.title, label: job.title }, ...DEFAULT_POSITIONS.filter(p => p.label !== job.title)]
    : DEFAULT_POSITIONS;

  if (job && job.isActive === false) {
    return (
      <section id='apply-contact' className='w-full relative py-16 xl:py-24 overflow-hidden'>
        <div className='mx-auto px-5 xl:px-8 max-w-xl relative z-10'>
          <div
            className='p-8 sm:p-12 text-center rounded-2xl'
            style={{
              backgroundColor: 'rgba(42, 42, 42, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div className='w-14 h-14 rounded-full bg-[#FF6533]/20 text-[#FF6533] flex items-center justify-center mx-auto mb-4'>
              <svg width='28' height='28' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
                <circle cx='12' cy='12' r='10'></circle>
                <line x1='12' y1='8' x2='12' y2='12'></line>
                <line x1='12' y1='16' x2='12.01' y2='16'></line>
              </svg>
            </div>
            <h3 className='text-white text-2xl font-bold mb-3'>Position Inactive / Closed</h3>
            <p className='text-white/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto'>
              Applications for this role ({job.title}) are currently paused. Please check back later or explore other open positions.
            </p>
            <a
              href='/career'
              className='inline-flex items-center px-6 py-2.5 rounded-full bg-[#FF6533] hover:bg-[#e5501a] text-white text-sm font-semibold transition-colors'
            >
              Explore Open Careers
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='w-full relative py-16 xl:py-20 overflow-hidden'>
      {/* Background Image */}
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: 'url(/contact/Frame 2147226071.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.3,
        }}
      />

      <div className='mx-auto px-5 xl:px-8 2xl:px-12 relative z-10'>
        {/* Header */}
        <div className='mb-12 xl:mb-16 text-center'>
          <h2 className='text-3xl xl:text-4xl 2xl:text-5xl font-semibold mb-4 leading-tight text-white'>
            Apply Now
          </h2>
          <p className='text-[#AAAAAA] text-sm xl:text-lg max-w-3xl mx-auto'>
            {job?.title
              ? `Submit your application for the ${job.title} position.`
              : 'Please fill up the form so we can reach out to you!'}
          </p>

          {job?.title && (
            <div className='mt-4 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs sm:text-sm text-white/90'>
              <span className='w-2 h-2 rounded-full bg-[#FF6533]' />
              <span className='font-semibold text-white'>{job.title}</span>
              {job.department && (
                <>
                  <span className='opacity-40'>•</span>
                  <span className='text-white/70'>{job.department}</span>
                </>
              )}
            </div>
          )}
        </div>

        {/* Form Container */}
        <div className='max-w-360 mx-auto relative'>
          {/* Orange Gradient Glow */}
          <div
            className='absolute inset-0 -z-10'
            style={{
              background:
                'radial-gradient(circle at center, rgba(254, 101, 51, 0.15), transparent 70%)',
              filter: 'blur(60px)',
            }}
          />

          {/* Outer Wrapper Box */}
          <div
            className='p-6 xl:p-8 rounded-2xl'
            style={{
              backgroundColor: 'rgba(66, 66, 66, 0.2)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {/* Form Inner Box */}
            <div
              className='p-4 md:p-6 xl:p-10 rounded-xl'
              style={{
                backgroundColor: 'rgba(66, 66, 66, 0.2)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              {hasDynamicQuestions ? (
                /* ─── DYNAMIC FORM: BUILT DIRECTLY FROM API QUESTIONS ─── */
                <form onSubmit={handleDynamicSubmit} className='p-0 md:p-2 xl:p-6 space-y-7'>
                  {dynamicQuestions.map((q) => {
                    const qId = q.id;
                    const qTitle = q.title;
                    const isReq = q.isRequired;
                    const normalizedType = getNormalizedType(q.type);
                    const options = extractOptions(q);

                    return (
                      <div key={qId} className='space-y-2.5'>
                        {normalizedType !== 'description_block' && (
                          <label className='block text-white text-sm md:text-base font-medium leading-snug'>
                            {qTitle} {isReq && <span className='text-[#FF6533]'>*</span>}
                          </label>
                        )}

                        {/* Paragraph */}
                        {normalizedType === 'paragraph' && (
                          <div
                            className='min-h-28 rounded-xl p-4 transition-all duration-200 hover:border-orange-bg-cta/60'
                            style={{
                              backgroundColor: 'rgba(66, 66, 66, 0.3)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                          >
                            <textarea
                              required={isReq}
                              value={answers[qId] || ''}
                              onChange={(e) => handleAnswerChange(qId, e.target.value)}
                              placeholder='Type your answer here...'
                              className='w-full h-full bg-transparent text-white placeholder-[#777777] outline-none resize-none text-sm md:text-base leading-relaxed'
                              rows={4}
                            />
                          </div>
                        )}

                        {/* Short Answer / URL */}
                        {(normalizedType === 'short_answer' || normalizedType === 'url') && (
                          <div
                            className='h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60'
                            style={{
                              backgroundColor: 'rgba(66, 66, 66, 0.3)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                          >
                            <input
                              type={normalizedType === 'url' ? 'url' : 'text'}
                              required={isReq}
                              value={answers[qId] || ''}
                              onChange={(e) => handleAnswerChange(qId, e.target.value)}
                              placeholder={normalizedType === 'url' ? 'https://...' : 'Enter your answer'}
                              className='w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base'
                            />
                          </div>
                        )}

                        {/* Email */}
                        {normalizedType === 'email' && (
                          <div
                            className='h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60'
                            style={{
                              backgroundColor: 'rgba(66, 66, 66, 0.3)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                          >
                            <input
                              type='email'
                              required={isReq}
                              value={answers[qId] || ''}
                              onChange={(e) => handleAnswerChange(qId, e.target.value)}
                              placeholder='your.email@example.com'
                              className='w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base'
                            />
                          </div>
                        )}

                        {/* Phone */}
                        {normalizedType === 'phone' && (
                          <div
                            className='h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60'
                            style={{
                              backgroundColor: 'rgba(66, 66, 66, 0.3)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                          >
                            <input
                              type='tel'
                              required={isReq}
                              value={answers[qId] || ''}
                              onChange={(e) => handleAnswerChange(qId, e.target.value)}
                              placeholder='+880 1XXXXXXXXX'
                              className='w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base'
                            />
                          </div>
                        )}

                        {/* Dropdown */}
                        {normalizedType === 'dropdown' && (
                          <div
                            className='h-13 rounded-xl flex items-center px-5 relative transition-all duration-200 hover:border-orange-bg-cta/60'
                            style={{
                              backgroundColor: 'rgba(66, 66, 66, 0.3)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                          >
                            <select
                              required={isReq}
                              value={answers[qId] || ''}
                              onChange={(e) => handleAnswerChange(qId, e.target.value)}
                              className='w-full bg-transparent text-white outline-none text-sm md:text-base appearance-none pr-8 cursor-pointer'
                            >
                              <option value='' className='bg-[#3F3F3F] text-white'>Select an option</option>
                              {options.map((opt, i) => (
                                <option key={i} value={opt} className='bg-[#3F3F3F] text-white'>
                                  {opt}
                                </option>
                              ))}
                            </select>
                            <IoIosArrowDown className='absolute right-4 text-white/70 text-lg pointer-events-none' />
                          </div>
                        )}

                        {/* Multiple Choice / Yes-No */}
                        {(normalizedType === 'multiple_choice' || normalizedType === 'yes_no') && (
                          <div className='flex flex-wrap gap-3 pt-1'>
                            {options.map((opt, i) => {
                              const isSelected = answers[qId] === opt;
                              return (
                                <label
                                  key={i}
                                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-pointer border transition-all text-sm font-medium ${
                                    isSelected
                                      ? 'border-[#FF6533] bg-[#FF6533]/20 text-white shadow-md'
                                      : 'border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10'
                                  }`}
                                >
                                  <input
                                    type='radio'
                                    name={`q_${qId}`}
                                    required={isReq && !answers[qId]}
                                    value={opt}
                                    checked={isSelected}
                                    onChange={() => handleAnswerChange(qId, opt)}
                                    className='accent-[#FF6533]'
                                  />
                                  <span>{opt}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}

                        {/* Checkboxes */}
                        {normalizedType === 'checkboxes' && (
                          <div className='flex flex-wrap gap-3 pt-1'>
                            {options.map((opt, i) => {
                              const isChecked = Array.isArray(answers[qId]) && answers[qId].includes(opt);
                              return (
                                <label
                                  key={i}
                                  className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl cursor-pointer border transition-all text-sm font-medium ${
                                    isChecked
                                      ? 'border-[#FF6533] bg-[#FF6533]/20 text-white shadow-md'
                                      : 'border-white/15 bg-white/5 text-white/80 hover:border-white/30 hover:bg-white/10'
                                  }`}
                                >
                                  <input
                                    type='checkbox'
                                    checked={isChecked}
                                    onChange={() => handleCheckboxChange(qId, opt)}
                                    className='accent-[#FF6533]'
                                  />
                                  <span>{opt}</span>
                                </label>
                              );
                            })}
                          </div>
                        )}

                        {/* File Upload */}
                        {normalizedType === 'file_upload' && (
                          <div
                            className='rounded-xl p-4 border border-white/15 bg-[rgba(66,66,66,0.3)] hover:border-[#FF6533]/60 transition-all'
                          >
                            <label className='flex flex-col sm:flex-row items-center justify-between gap-3 cursor-pointer'>
                              <div className='flex items-center gap-3'>
                                <div className='w-10 h-10 rounded-lg bg-[#FF6533]/20 text-[#FF6533] flex items-center justify-center shrink-0'>
                                  <MdAttachFile size={22} />
                                </div>
                                <div>
                                  <p className='text-white text-sm font-medium'>
                                    {answers[qId]
                                      ? (answers[qId].name || answers[qId])
                                      : 'Choose file to upload'}
                                  </p>
                                  <p className='text-xs text-white/50'>PDF, DOC, DOCX up to 10MB</p>
                                </div>
                              </div>
                              <span className='px-4 py-2 rounded-lg bg-[#FF6533] hover:bg-[#e5501a] text-white text-xs font-semibold transition-colors'>
                                Browse File
                              </span>
                              <input
                                type='file'
                                required={isReq && !answers[qId]}
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    handleAnswerChange(qId, file);
                                  }
                                }}
                                className='hidden'
                              />
                            </label>
                          </div>
                        )}

                        {/* Linear Scale (1 to 5) */}
                        {normalizedType === 'linear_scale' && (
                          <div className='flex flex-wrap items-center gap-3 pt-1'>
                            {[1, 2, 3, 4, 5].map((num) => {
                              const isSelected = answers[qId] === num;
                              return (
                                <button
                                  type='button'
                                  key={num}
                                  onClick={() => handleAnswerChange(qId, num)}
                                  className={`w-11 h-11 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                                    isSelected
                                      ? 'bg-[#FF6533] text-white shadow-[0_0_15px_rgba(255,101,51,0.5)] scale-105'
                                      : 'border border-white/15 bg-white/5 text-white/80 hover:bg-white/15'
                                  }`}
                                >
                                  {num}
                                </button>
                              );
                            })}
                            <span className='text-xs text-white/50 ml-2'>
                              (1 = Beginner, 5 = Expert)
                            </span>
                          </div>
                        )}

                        {/* Date */}
                        {normalizedType === 'date' && (
                          <div
                            onClick={(e) => {
                              try {
                                e.currentTarget.querySelector('input')?.showPicker();
                              } catch {}
                            }}
                            className='h-13 rounded-xl flex items-center px-5 cursor-pointer transition-all duration-200 hover:border-orange-bg-cta/60'
                            style={{
                              backgroundColor: 'rgba(66, 66, 66, 0.3)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                          >
                            <input
                              type='date'
                              required={isReq}
                              value={answers[qId] || ''}
                              onClick={(e) => {
                                try {
                                  e.target.showPicker();
                                } catch {}
                              }}
                              onChange={(e) => handleAnswerChange(qId, e.target.value)}
                              className='w-full bg-transparent text-white outline-none text-sm md:text-base cursor-pointer [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100'
                            />
                          </div>
                        )}

                        {/* Time */}
                        {normalizedType === 'time' && (
                          <div
                            onClick={(e) => {
                              try {
                                e.currentTarget.querySelector('input')?.showPicker();
                              } catch {}
                            }}
                            className='h-13 rounded-xl flex items-center px-5 cursor-pointer transition-all duration-200 hover:border-orange-bg-cta/60'
                            style={{
                              backgroundColor: 'rgba(66, 66, 66, 0.3)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                            }}
                          >
                            <input
                              type='time'
                              required={isReq}
                              value={answers[qId] || ''}
                              onClick={(e) => {
                                try {
                                  e.target.showPicker();
                                } catch {}
                              }}
                              onChange={(e) => handleAnswerChange(qId, e.target.value)}
                              className='w-full bg-transparent text-white outline-none text-sm md:text-base cursor-pointer [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100'
                            />
                          </div>
                        )}

                        {/* Description Block */}
                        {normalizedType === 'description_block' && (
                          <div className='p-4 rounded-xl border-l-4 border-[#FF6533] bg-white/5 text-white/85 text-sm md:text-base leading-relaxed'>
                            {qTitle}
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Submit Button */}
                  <div className='pt-4'>
                    <button
                      type='submit'
                      className='group inline-flex items-center justify-between gap-4 bg-[#FF6533] hover:bg-[#e55a2d] text-white p-2.5 pl-7 sm:pl-9 pr-3 rounded-full transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(255,101,51,0.35)] cursor-pointer'
                    >
                      <span className='text-base font-semibold'>
                        Submit Application
                      </span>
                      <div className='w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-md'>
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='black'
                          strokeWidth='2.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M5 12h14M12 5l7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                  </div>
                </form>
              ) : (
                /* ─── FALLBACK FORM (USED ONLY WHEN NO API QUESTIONS EXIST) ─── */
                <form onSubmit={handleFallbackSubmit} className='p-0 md:p-2 xl:p-6 space-y-6'>
                  {/* Full Name */}
                  <div>
                    <label className='block text-white text-sm md:text-base font-medium mb-2.5'>
                      Full Name <span className='text-[#FF6533]'>*</span>
                    </label>
                    <div
                      className='h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60'
                      style={{
                        backgroundColor: 'rgba(66, 66, 66, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <input
                        type='text'
                        name='fullName'
                        required
                        value={fallbackData.fullName}
                        onChange={handleFallbackChange}
                        placeholder='Enter your full name'
                        className='w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base'
                      />
                    </div>
                  </div>

                  {/* Phone & Email */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                      <label className='block text-white text-sm md:text-base font-medium mb-2.5'>
                        Phone Number <span className='text-[#FF6533]'>*</span>
                      </label>
                      <div
                        className='h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60'
                        style={{
                          backgroundColor: 'rgba(66, 66, 66, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        <input
                          type='tel'
                          name='phone'
                          required
                          value={fallbackData.phone}
                          onChange={handleFallbackChange}
                          placeholder='+880 1XXXXXXXXX'
                          className='w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-white text-sm md:text-base font-medium mb-2.5'>
                        Email Address <span className='text-[#FF6533]'>*</span>
                      </label>
                      <div
                        className='h-13 rounded-xl flex items-center px-5 transition-all duration-200 hover:border-orange-bg-cta/60'
                        style={{
                          backgroundColor: 'rgba(66, 66, 66, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        <input
                          type='email'
                          name='email'
                          required
                          value={fallbackData.email}
                          onChange={handleFallbackChange}
                          placeholder='your.name@example.com'
                          className='w-full bg-transparent text-white placeholder-[#777777] outline-none text-sm md:text-base'
                        />
                      </div>
                    </div>
                  </div>

                  {/* Applying For & Experience */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                    <div>
                      <label className='block text-white text-sm md:text-base font-medium mb-2.5'>
                        Applying For Position
                      </label>
                      <div
                        className='h-13 rounded-xl flex items-center px-5 relative transition-all duration-200 hover:border-orange-bg-cta/60'
                        style={{
                          backgroundColor: 'rgba(66, 66, 66, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        <select
                          name='service'
                          value={fallbackData.service}
                          onChange={handleFallbackChange}
                          className='w-full bg-transparent text-white outline-none text-sm md:text-base appearance-none pr-8 cursor-pointer'
                        >
                          {positionOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              className='bg-[#3F3F3F] text-white'
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                        <IoIosArrowDown className='absolute right-4 text-white/70 text-lg pointer-events-none' />
                      </div>
                    </div>

                    <div>
                      <label className='block text-white text-sm md:text-base font-medium mb-2.5'>
                        Years of Experience
                      </label>
                      <div
                        className='h-13 rounded-xl flex items-center px-5 relative transition-all duration-200 hover:border-orange-bg-cta/60'
                        style={{
                          backgroundColor: 'rgba(66, 66, 66, 0.3)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                        }}
                      >
                        <select
                          name='experience'
                          value={fallbackData.experience}
                          onChange={handleFallbackChange}
                          className='w-full bg-transparent text-white outline-none text-sm md:text-base appearance-none pr-8 cursor-pointer'
                        >
                          <option value='Fresher' className='bg-[#3F3F3F] text-white'>Fresher</option>
                          <option value='1 year' className='bg-[#3F3F3F] text-white'>1 year</option>
                          <option value='2 years' className='bg-[#3F3F3F] text-white'>2 years</option>
                          <option value='3 years' className='bg-[#3F3F3F] text-white'>3 years</option>
                          <option value='4 years' className='bg-[#3F3F3F] text-white'>4 years</option>
                          <option value='5+ years' className='bg-[#3F3F3F] text-white'>5+ years</option>
                        </select>
                        <IoIosArrowDown className='absolute right-4 text-white/70 text-lg pointer-events-none' />
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className='block text-white text-sm md:text-base font-medium mb-2.5'>
                      Message / Note
                    </label>
                    <div
                      className='min-h-32 rounded-xl p-4 transition-all duration-200 hover:border-orange-bg-cta/60'
                      style={{
                        backgroundColor: 'rgba(66, 66, 66, 0.3)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                      }}
                    >
                      <textarea
                        name='message'
                        value={fallbackData.message}
                        onChange={handleFallbackChange}
                        placeholder='Tell us about yourself...'
                        className='w-full h-full bg-transparent text-white placeholder-[#777777] outline-none resize-none text-sm md:text-base'
                        rows={4}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type='submit'
                      className='group inline-flex items-center justify-between gap-4 bg-[#FF6533] hover:bg-[#e55a2d] text-white p-2.5 pl-7 sm:pl-9 pr-3 rounded-full transition-all duration-300 active:scale-95 shadow-[0_4px_20px_rgba(255,101,51,0.35)] cursor-pointer'
                    >
                      <span className='text-base font-semibold'>
                        Send Message
                      </span>
                      <div className='w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1 shadow-md'>
                        <svg
                          width='18'
                          height='18'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='black'
                          strokeWidth='2.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path d='M5 12h14M12 5l7 7-7 7' />
                        </svg>
                      </div>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplyContact;
