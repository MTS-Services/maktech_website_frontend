import React, { useState, useEffect, useRef } from 'react';
import { useForm, useFieldArray, FormProvider, useFormContext } from 'react-hook-form';
import { useNavigate, useLocation, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import apiClient from '../../../../services/apiClient';
import { MdArrowBack, MdImage, MdAutoAwesome } from 'react-icons/md';
import * as MdIcons from 'react-icons/md';
import { IconPickerModal } from '../../../../components/IconPickerModal/IconPickerModal';
import { QuestionTypeModal, QuestionList } from './QuestionBuilder';

const labelCls = "block text-sm font-medium text-gray-600 mb-1.5";
const inputCls = "w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition bg-white";
const errCls = "text-red-500 text-xs mt-1";

// ─── Reusable Section Header ───────────────────────────────────────────────
const SectionHeader = ({ number, title, subtitle }) => (
  <div className="flex items-start gap-3 mb-6">
    <span className="text-[#ff6533] text-sm font-semibold mt-0.5">{number}</span>
    <div>
      <h3 className="text-lg font-bold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  </div>
);

// ─── Dynamic List Component (for Responsibilities, Benefits, Job Types) ───
const DynamicList = ({ name, control, register, errors, titlePlaceholder, addLabel }) => {
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name,
  });
  
  const { watch, setValue } = useFormContext();

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragEnabledIndex, setDragEnabledIndex] = useState(null);
  const [iconPickerIndex, setIconPickerIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, index) => {
    e.preventDefault(); // Necessary to allow dropping
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if (draggedIndex === null) return;
    if (draggedIndex !== index) {
      swap(draggedIndex, index);
    }
    setDraggedIndex(null);
    setDragEnabledIndex(null);
  };
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragEnabledIndex(null);
  };

  useEffect(() => {
    let scrollInterval = null;
    let currentClientY = null;

    const scrollStep = () => {
      if (draggedIndex === null || currentClientY === null) return;
      
      // AdminLayout uses a specific div for scrolling instead of window
      const scrollContainer = document.querySelector('div[data-lenis-prevent]') || window;
      const isWindow = scrollContainer === window;
      const rect = isWindow ? { top: 0, bottom: window.innerHeight } : scrollContainer.getBoundingClientRect();
      
      const threshold = 150;
      const scrollSpeed = 15;

      if (currentClientY - rect.top < threshold) {
        scrollContainer.scrollBy({ top: -scrollSpeed });
      } else if (rect.bottom - currentClientY < threshold) {
        scrollContainer.scrollBy({ top: scrollSpeed });
      }
    };

    const handleGlobalDragOver = (e) => {
      if (draggedIndex === null) return;
      currentClientY = e.clientY;
      if (!scrollInterval) {
        scrollInterval = setInterval(scrollStep, 16); // 60fps continuous scroll
      }
    };

    const stopScroll = () => {
      if (scrollInterval) {
        clearInterval(scrollInterval);
        scrollInterval = null;
      }
      currentClientY = null;
    };

    window.addEventListener('dragover', handleGlobalDragOver);
    window.addEventListener('drop', stopScroll);
    window.addEventListener('dragend', stopScroll);
    
    return () => {
      window.removeEventListener('dragover', handleGlobalDragOver);
      window.removeEventListener('drop', stopScroll);
      window.removeEventListener('dragend', stopScroll);
      stopScroll();
    };
  }, [draggedIndex]);

  return (
    <div className="space-y-5">
      {fields.map((item, index) => (
        <div 
          key={item.id} 
          draggable={dragEnabledIndex === index}
          onDragStart={(e) => handleDragStart(e, index)}
          onDragOver={(e) => handleDragOver(e, index)}
          onDrop={(e) => handleDrop(e, index)}
          onDragEnd={handleDragEnd}
          className={`relative flex flex-col p-5 sm:p-6 border border-gray-200 rounded-xl bg-white shadow-sm transition-all duration-200 ${draggedIndex === index ? 'opacity-40 scale-[0.98]' : 'opacity-100'}`}
        >
          
          {/* Header: Drag Handle + Icon Picker */}
          <div className="flex items-center gap-4 mb-5">
            <div 
              onMouseEnter={() => setDragEnabledIndex(index)}
              onMouseLeave={() => setDragEnabledIndex(null)}
              className="flex flex-col gap-1 cursor-grab active:cursor-grabbing opacity-30 hover:opacity-100 p-2 -ml-2"
            >
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              </div>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              </div>
              <div className="flex gap-1">
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={() => setIconPickerIndex(index)}
              className="flex flex-col items-center justify-center w-[60px] h-[60px] rounded-xl border border-[#ff6533]/30 bg-[#fff4f0] text-[#ff6533] hover:bg-[#ffe5dc] transition-colors cursor-pointer group"
            >
              {(() => {
                const iconName = watch(`${name}.${index}.icon`);
                const IconCmp = iconName && MdIcons[iconName] ? MdIcons[iconName] : MdAutoAwesome;
                return <IconCmp size={22} className="mb-0.5" />;
              })()}
              <span className="text-[10px] font-bold capitalize">Change</span>
            </button>
          </div>
          
          {/* Inputs Section */}
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Title</label>
              <input 
                {...register(`${name}.${index}.title`, { required: 'Title is required' })}
                placeholder={titlePlaceholder}
                className={inputCls}
              />
              {errors?.[name]?.[index]?.title && <p className={errCls}>{errors[name][index].title.message}</p>}
            </div>
            <div>
              <label className={labelCls}>Description</label>
              <textarea 
                {...register(`${name}.${index}.description`, { required: 'Description is required' })}
                rows={3}
                className={`${inputCls} resize-none`}
              />
              {errors?.[name]?.[index]?.description && <p className={errCls}>{errors[name][index].description.message}</p>}
            </div>
          </div>
          
          <button type="button" onClick={() => remove(index)} className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-gray-100 rounded-md transition-colors cursor-pointer">
            ✕
          </button>
        </div>
      ))}
      
      <button
        type="button"
        onClick={() => append({ title: '', description: '', icon: '' })}
        className="w-full py-3 mt-2 rounded-lg border border-dashed border-gray-300 text-sm font-semibold text-[#ff6533] hover:bg-orange-50 hover:border-[#ff6533]/50 transition-colors cursor-pointer flex items-center justify-center gap-2"
      >
        <span>+</span> {addLabel}
      </button>

      {/* Icon Picker Modal */}
      <IconPickerModal 
        isOpen={iconPickerIndex !== null} 
        onClose={() => setIconPickerIndex(null)}
        onSelect={(iconName) => {
          if (iconPickerIndex !== null) {
            setValue(`${name}.${iconPickerIndex}.icon`, iconName, { shouldDirty: true });
          }
        }}
      />
    </div>
  );
};


export const JobBuilder = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStep = parseInt(searchParams.get('step')) || 1;
  const [step, setStepState] = useState(initialStep);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const isEditMode = !!id;
  const jobData = state?.job;

  const setStep = (newStep) => {
    setStepState(newStep);
    setSearchParams({ step: newStep }, { replace: true });
  };

  const mapApiToForm = (list) => {
    if (!list) return [{ title: '', description: '', icon: '' }];
    return list.map(item => ({
      ...item,
      icon: item.emoji || ''
    }));
  };

  const methods = useForm({
    defaultValues: {
      title: jobData?.title || '',
      description: jobData?.description || '',
      vacancy: jobData?.vacancy || '',
      type: jobData?.type || '',
      department: jobData?.department || '',
      salary: jobData?.salary || '',
      coverImage: jobData?.coverImage || null,
      responsibilities: jobData?.responsibilities ? mapApiToForm(jobData.responsibilities) : [{ title: '', description: '', icon: '' }],
      benefits: jobData?.benefits ? mapApiToForm(jobData.benefits) : [{ title: '', description: '', icon: '' }],
      jobTypes: jobData?.jobTypes ? mapApiToForm(jobData.jobTypes) : [{ title: '', description: '', icon: '' }],
      questions: jobData?.questions ? jobData.questions.map(q => ({ ...q, required: q.isRequired || false })) : [],
    }
  });

  const { register, control, handleSubmit, formState: { errors } } = methods;

  const { fields: questionFields, append: appendQuestion, remove: removeQuestion, swap: swapQuestion } = useFieldArray({
    control,
    name: 'questions'
  });

  // Initialize preview if coverImage exists in initial data
  useEffect(() => {
    if (jobData?.coverImage && typeof jobData.coverImage === 'string') {
      setCoverImagePreview(jobData.coverImage);
    }
  }, [jobData]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      methods.setValue('coverImage', file, { shouldDirty: true });
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitStep1 = () => {
    // Validate step 1, then go to step 2
    setStep(2);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatList = (list) => {
    if (!list) return [];
    return list.map((item, index) => {
      const formatted = { ...item, order: index + 1 };
      if (item.icon) {
        formatted.emoji = item.icon;
        delete formatted.icon;
      } else {
        formatted.emoji = 'MdAutoAwesome';
      }
      return formatted;
    });
  };

  const onFinalSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const payload = { ...data };
      
      // Handle file upload first if coverImage is a File object
      if (payload.coverImage instanceof File) {
        const formData = new FormData();
        formData.append('image', payload.coverImage);
        const uploadRes = await apiClient.post('/api/v1/uploads', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        payload.coverImage = uploadRes.data.data.url;
      }
      
      if (payload.vacancy !== undefined && payload.vacancy !== '') {
        payload.vacancy = parseInt(payload.vacancy, 10);
        if (isNaN(payload.vacancy)) payload.vacancy = 1;
      } else {
        delete payload.vacancy;
      }
      
      payload.jobTypes = formatList(payload.jobTypes);
      payload.responsibilities = formatList(payload.responsibilities);
      payload.benefits = formatList(payload.benefits);
      
      if (payload.questions) {
        payload.questions = payload.questions.map((q, idx) => {
          const formattedQ = { ...q, order: idx + 1, isRequired: q.required || q.isRequired || false };
          delete formattedQ.required; // Remove frontend-only field
          if (formattedQ.options) {
            formattedQ.options = formattedQ.options.map((opt, optIdx) => ({
              ...opt,
              order: optIdx + 1
            }));
          }
          return formattedQ;
        });
      }
      
      if (!payload.coverImage) {
        payload.coverImage = 'http://localhost:3000/uploads/dummy-job.jpg';
      }

      if (isEditMode && id) {
        await apiClient.patch(`/api/v1/jobs/${id}`, payload);
        toast.success('Job updated successfully!');
      } else {
        await apiClient.post('/api/v1/jobs', payload);
        toast.success('Job created successfully!');
      }
      navigate('/admin/jobs');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save job posting');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Watch job title for the step 2 header
  const currentTitle = methods.watch('title');
  const questions = methods.watch('questions') || [];

  const handleAddQuestion = (typeId) => {
    appendQuestion({ title: '', type: typeId, required: false });
    setIsQuestionModalOpen(false);
  };

  const handleAddQuestionClick = () => {
    if (questionFields.length === 0) {
      setIsQuestionModalOpen(true);
    } else {
      const lastType = questionFields[questionFields.length - 1].type;
      handleAddQuestion(lastType);
    }
  };

  if (step === 2) {
    return (
      <div className="w-full pb-10 mx-auto">
        <FormProvider {...methods}>
          <div className="mb-8">
            <button type="button" onClick={() => setStep(1)} className="flex items-center text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium cursor-pointer">
              <MdArrowBack size={16} className="mr-1.5" /> Back to Job Details
            </button>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
             <div>
                <p className="text-[#ff6533] text-xs font-bold tracking-wider uppercase mb-2">
                  {currentTitle || 'JOB TITLE'} / APPLICATION
                </p>
                <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Build your application form</h1>
                <p className="text-gray-500 text-sm">Design a clear, considerate application experience for every candidate.</p>
             </div>
             {questions.length > 0 && (
               <button type="button" onClick={handleAddQuestionClick} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-orange-bg-cta hover:bg-[#e5501a] transition-all shadow-sm cursor-pointer self-start">
                  + Add question
               </button>
             )}
          </div>

          {questionFields.length === 0 ? (
            <div className="w-full bg-white rounded-2xl border border-dashed border-gray-200 p-16 sm:p-24 flex flex-col items-center justify-center text-center shadow-sm">
               <div className="relative mb-6">
                  <div className="flex gap-2 items-center justify-center">
                      <div className="w-9 h-9 rounded-[10px] border-[1.5px] border-[#ff6533]/30 bg-orange-50/50"></div>
                      <div className="w-9 h-9 rounded-full border-[1.5px] border-[#ff6533]/30 bg-orange-50/50"></div>
                  </div>
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ff6533] text-white w-7 h-7 rounded-lg flex items-center justify-center text-sm font-bold shadow-md shadow-orange-500/20">
                     +
                  </div>
               </div>
               <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Start building your application form</h2>
               <p className="text-gray-500 text-sm mb-6">Add your first question to begin.</p>
               <button type="button" onClick={handleAddQuestionClick} className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-orange-bg-cta hover:bg-[#e5501a] transition-colors shadow-sm cursor-pointer">
                  + Add question
               </button>
            </div>
          ) : (
            <>
              <QuestionList fields={questionFields} remove={removeQuestion} swap={swapQuestion} />
              
              <button 
                type="button" 
                onClick={handleAddQuestionClick}
                className="w-full py-4 mt-6 rounded-2xl border border-dashed border-gray-300 text-sm font-bold text-gray-600 hover:text-[#ff6533] hover:border-[#ff6533]/50 hover:bg-[#fff4f0] transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                + Add another question
              </button>
            </>
          )}
          
          <hr className="border-gray-100 my-8" />
          
          <div className="flex items-center justify-end gap-3">
            <button type="button" onClick={() => navigate('/admin/jobs')} className="px-6 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors cursor-pointer shadow-sm">
              Save draft
            </button>
            <button 
              type="button" 
              onClick={methods.handleSubmit(onFinalSubmit)} 
              disabled={isSubmitting}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold text-white transition-all active:scale-[0.97] cursor-pointer shadow-md shadow-orange-500/20 ${isSubmitting ? 'bg-orange-400 opacity-70 cursor-not-allowed' : 'bg-orange-bg-cta hover:bg-[#e5501a]'}`}
            >
              {isSubmitting ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </FormProvider>

        {/* Question Type Selection Modal */}
        <QuestionTypeModal 
          isOpen={isQuestionModalOpen} 
          onClose={() => setIsQuestionModalOpen(false)}
          onSelect={handleAddQuestion}
        />
      </div>
    );
  }

  return (
    <div className="w-full pb-10 mx-auto">
      <div className="mb-4">
        <button type="button" onClick={() => navigate('/admin/jobs')} className="flex items-center text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium cursor-pointer">
          <MdArrowBack size={16} className="mr-1.5" /> Back to Jobs
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-10 w-full mb-8">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmitStep1)} noValidate className="space-y-12">
            
            {/* 01 Basic Information */}
            <section>
              <SectionHeader number="01" title="Basic information" subtitle="The essential details candidates see first." />
              <div className="space-y-6">
                <div>
                  <label className={labelCls}>Job title</label>
                  <input {...register('title', { required: 'Job title is required' })} placeholder="Product Designer" className={inputCls} />
                  {errors.title && <p className={errCls}>{errors.title.message}</p>}
                </div>
                <div>
                  <label className={labelCls}>Job Description</label>
                  <textarea {...register('description')} rows={3} placeholder="Design products that shape the future of work." className={`${inputCls} resize-none`} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className={labelCls}>Vacancy</label>
                    <input {...register('vacancy')} placeholder="01" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Employment type</label>
                    <input {...register('type')} placeholder="Full-time" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Department</label>
                    <input {...register('department')} placeholder="Product & Design" className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Salary</label>
                    <input {...register('salary')} placeholder="Negotiable" className={inputCls} />
                  </div>
                </div>

                {/* Cover Image Placeholder */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 p-4 rounded-xl border border-dashed border-gray-300 bg-[#fafafa] flex items-center justify-between group cursor-pointer hover:bg-gray-50 hover:border-gray-400 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 border border-gray-200 overflow-hidden shrink-0">
                       {coverImagePreview ? (
                         <img src={coverImagePreview} alt="Cover preview" className="w-full h-full object-cover" />
                       ) : (
                         <MdImage size={24} />
                       )}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-800">Cover image</h4>
                      <p className="text-xs text-gray-500 mt-0.5">Shown at the top of your job page</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-[#ff6533] px-2">{coverImagePreview ? 'Change image' : 'Upload image'}</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                  />
                </div>
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* 02 Key Responsibilities */}
            <section>
              <SectionHeader number="02" title="Key Responsibilities" subtitle="Manage responsibility cards shown on the frontend." />
              <DynamicList name="responsibilities" control={control} register={register} errors={errors} titlePlaceholder="Creative direction" addLabel="Add responsibility" />
            </section>

            <hr className="border-gray-100" />

            {/* 03 Employee Benefits */}
            <section>
              <SectionHeader number="03" title="Employee Benefits" subtitle="Show the value of working with your team." />
              <DynamicList name="benefits" control={control} register={register} errors={errors} titlePlaceholder="Flexible hours" addLabel="Add benefit" />
            </section>

            <hr className="border-gray-100" />

            {/* 04 Job Type */}
            <section>
              <SectionHeader number="04" title="Job Type" subtitle="Manage the essential job details shown on the frontend." />
              <DynamicList name="jobTypes" control={control} register={register} errors={errors} titlePlaceholder="Full-time role" addLabel="Add job type" />
            </section>

          </form>
        </FormProvider>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={() => navigate('/admin/jobs')}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit(onSubmitStep1)}
          className="px-6 py-2.5 rounded-lg text-sm font-semibold text-white bg-orange-bg-cta hover:bg-[#e5501a] transition-all active:scale-[0.97] cursor-pointer"
        >
          {isEditMode ? 'Next Step' : 'Next'}
        </button>
      </div>
    </div>
  );
};
