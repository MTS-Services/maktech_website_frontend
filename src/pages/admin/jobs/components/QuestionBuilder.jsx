import React, { useState, useEffect } from 'react';
import { useFieldArray, useFormContext, Controller } from 'react-hook-form';
import { 
  MdClose, MdShortText, MdNotes, MdEmail, MdPhone, 
  MdRadioButtonChecked, MdCheckBox, MdArrowDropDown, 
  MdFileUpload, MdWork, MdLink, MdDescription,
  MdRadioButtonUnchecked, MdCheckBoxOutlineBlank
} from 'react-icons/md';

// ─── Constants ─────────────────────────────────────────────────────────────
export const QUESTION_TYPES = [
  { id: 'short_answer', label: 'Short Answer', icon: MdShortText, hint: 'Short answer' },
  { id: 'paragraph', label: 'Paragraph', icon: MdNotes, hint: 'Long answer' },
  { id: 'email', label: 'Email', icon: MdEmail, hint: 'Email address' },
  { id: 'phone', label: 'Phone Number', icon: MdPhone, hint: 'Phone number' },
  { id: 'multiple_choice', label: 'Multiple Choice', icon: MdRadioButtonChecked, hint: 'Single selection' },
  { id: 'checkboxes', label: 'Checkboxes', icon: MdCheckBox, hint: 'Multiple selection' },
  { id: 'dropdown', label: 'Dropdown', icon: MdArrowDropDown, hint: 'Dropdown selection' },
  { id: 'file_upload', label: 'File Upload', icon: MdFileUpload, hint: 'File upload' },
  { id: 'portfolio_url', label: 'Portfolio URL', icon: MdWork, hint: 'URL' },
  { id: 'linkedin_url', label: 'LinkedIn URL', icon: MdLink, hint: 'URL' },
  { id: 'behance_url', label: 'Behance URL', icon: MdLink, hint: 'URL' },
  { id: 'github_url', label: 'GitHub URL', icon: MdLink, hint: 'URL' },
  { id: 'dribbble_url', label: 'Dribbble URL', icon: MdLink, hint: 'URL' },
  { id: 'description_block', label: 'Description Block', icon: MdDescription, hint: 'Read-only text' },
];

const labelCls = "block text-sm font-bold text-gray-700 mb-2";
const inputCls = "w-full px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition bg-white";

// ─── Question Type Modal ───────────────────────────────────────────────────
export const QuestionTypeModal = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Add a question</h2>
            <p className="text-sm text-gray-500">Choose what candidates should share.</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors">
            <MdClose size={24} />
          </button>
        </div>
        
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {QUESTION_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => {
                    onSelect(type.id);
                    onClose();
                  }}
                  className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 hover:border-[#ff6533] hover:bg-[#fff4f0] text-left transition-colors group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-50 group-hover:bg-white flex items-center justify-center text-gray-500 group-hover:text-[#ff6533] transition-colors shrink-0">
                    <Icon size={20} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">{type.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};


// ─── Question Options Component ─────────────────────────────────────────────
const QuestionOptions = ({ questionIndex, control, register, type }) => {
  const { fields, append, remove, swap } = useFieldArray({
    control,
    name: `questions.${questionIndex}.options`
  });

  const [draggedOptionIndex, setDraggedOptionIndex] = useState(null);
  const [dragEnabledOptionIndex, setDragEnabledOptionIndex] = useState(null);

  // Add default option if empty
  useEffect(() => {
    if (fields.length === 0) {
      append({ value: '' });
    }
  }, [fields.length, append]);

  return (
    <div className="mt-4 pt-2 border-t border-gray-100/0">
      <div className="flex items-center justify-between mb-3">
        <label className={labelCls + " !mb-0"}>Options</label>
        <span className="text-xs font-medium text-gray-400">Drag to reorder</span>
      </div>

      <div className="space-y-2.5">
        {fields.map((field, idx) => (
          <div 
            key={field.id} 
            draggable={dragEnabledOptionIndex === idx}
            onDragStart={(e) => {
              setDraggedOptionIndex(idx);
              e.stopPropagation(); // prevent parent question from dragging
              e.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (draggedOptionIndex !== null && draggedOptionIndex !== idx) {
                swap(draggedOptionIndex, idx);
              }
              setDraggedOptionIndex(null);
              setDragEnabledOptionIndex(null);
            }}
            onDragEnd={(e) => {
              e.stopPropagation();
              setDraggedOptionIndex(null);
              setDragEnabledOptionIndex(null);
            }}
            className={`flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white transition-all ${draggedOptionIndex === idx ? 'opacity-50 scale-[0.99] border-orange-300' : 'hover:border-gray-300'}`}
          >
             {/* Drag Handle */}
             <div 
               onMouseEnter={() => setDragEnabledOptionIndex(idx)}
               onMouseLeave={() => setDragEnabledOptionIndex(null)}
               className="flex gap-0.5 cursor-grab active:cursor-grabbing opacity-30 hover:opacity-100 p-1 pl-0 shrink-0"
             >
               <div className="flex flex-col gap-1">
                 <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                 <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                 <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
               </div>
               <div className="flex flex-col gap-1">
                 <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                 <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                 <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
               </div>
             </div>

             {/* Type Icon */}
             <div className="w-5 h-5 flex items-center justify-center text-gray-400 shrink-0">
               {type === 'multiple_choice' ? <MdRadioButtonUnchecked size={18}/> : 
                type === 'checkboxes' ? <MdCheckBoxOutlineBlank size={18}/> : 
                <MdArrowDropDown size={20} />}
             </div>

             {/* Input */}
             <input 
               {...register(`questions.${questionIndex}.options.${idx}.value`)}
               placeholder={`Option ${idx + 1}`}
               className="flex-1 bg-transparent focus:outline-none text-sm font-medium text-gray-900 placeholder:text-gray-500"
             />

             {/* Remove Button */}
             <button 
               type="button" 
               onClick={() => remove(idx)} 
               className="text-gray-400 hover:text-gray-700 transition-colors p-1"
             >
               <MdClose size={18} />
             </button>
          </div>
        ))}
      </div>
      
      <button 
         type="button" 
         onClick={() => append({ value: '' })}
         className="mt-4 text-sm font-bold text-[#ff6533] hover:text-[#e5501a] transition-colors flex items-center gap-1 cursor-pointer"
      >
        <span>+</span> Add option
      </button>
    </div>
  );
};


// ─── Question List ─────────────────────────────────────────────────────────
export const QuestionList = ({ fields, remove, swap }) => {
  const { control, register, watch } = useFormContext();

  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragEnabledIndex, setDragEnabledIndex] = useState(null);

  useEffect(() => {
    let scrollInterval = null;
    let currentClientY = null;

    const scrollStep = () => {
      if (draggedIndex === null || currentClientY === null) return;
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
      if (!scrollInterval) scrollInterval = setInterval(scrollStep, 16);
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

  if (fields.length === 0) return null;

  return (
    <div className="space-y-6 w-full">
      {fields.map((item, index) => {
        const questionType = watch(`questions.${index}.type`);
        const typeConfig = QUESTION_TYPES.find(t => t.id === questionType) || QUESTION_TYPES[0];
        
        return (
          <div 
            key={item.id}
            draggable={dragEnabledIndex === index}
            onDragStart={(e) => {
              setDraggedIndex(index);
              e.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (draggedIndex !== null && draggedIndex !== index) {
                swap(draggedIndex, index);
              }
              setDraggedIndex(null);
              setDragEnabledIndex(null);
            }}
            onDragEnd={() => {
              setDraggedIndex(null);
              setDragEnabledIndex(null);
            }}
            className={`bg-white rounded-2xl border border-gray-200 shadow-sm transition-all duration-200 ${draggedIndex === index ? 'opacity-40 scale-[0.98]' : 'opacity-100'}`}
          >
            {/* Card Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div 
                  onMouseEnter={() => setDragEnabledIndex(index)}
                  onMouseLeave={() => setDragEnabledIndex(null)}
                  className="flex gap-0.5 cursor-grab active:cursor-grabbing opacity-30 hover:opacity-100 p-2 -ml-2"
                >
                  <div className="flex flex-col gap-1">
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                  </div>
                </div>
                <div className="px-3 py-1 rounded-full bg-[#fff4f0] text-[#ff6533] text-xs font-bold">
                  {typeConfig.label}
                </div>
              </div>
              <button 
                type="button" 
                onClick={() => remove(index)}
                className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
              >
                <MdClose size={20} />
              </button>
            </div>

            {/* Card Body */}
            <div className="p-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <label className={labelCls}>
                    {questionType === 'description_block' ? 'Description text' : 'Question title'}
                  </label>
                  {questionType === 'description_block' ? (
                    <textarea 
                      {...register(`questions.${index}.title`, { required: true })}
                      placeholder="Enter the description text here..."
                      rows={3}
                      className={`${inputCls} resize-none`}
                    />
                  ) : (
                    <input 
                      {...register(`questions.${index}.title`, { required: true })}
                      placeholder={`New ${typeConfig.label.toLowerCase()} question`}
                      className={inputCls}
                    />
                  )}
                </div>
                <div className="w-full md:w-64 shrink-0">
                  <label className={labelCls}>Type</label>
                  <div className="relative">
                    <select 
                      {...register(`questions.${index}.type`)}
                      className={`${inputCls} appearance-none pr-10 cursor-pointer font-medium text-gray-700`}
                    >
                      {QUESTION_TYPES.map(t => (
                        <option key={t.id} value={t.id}>{t.label}</option>
                      ))}
                    </select>
                    <MdArrowDropDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={24} />
                  </div>
                </div>
              </div>

              {/* Dynamic Content based on Type */}
              {['multiple_choice', 'checkboxes', 'dropdown'].includes(questionType) && (
                <QuestionOptions 
                  questionIndex={index} 
                  control={control} 
                  register={register} 
                  type={questionType} 
                />
              )}

              {questionType === 'file_upload' && (
                <div className="flex flex-wrap items-center gap-3 p-3 px-4 rounded-xl bg-gray-50/80 border border-gray-100 mt-2">
                   <span className="text-[13px] font-bold text-gray-400">Accept files</span>
                   <div className="flex flex-wrap items-center gap-1.5">
                      {['PDF', 'DOC', 'DOCX', 'PNG', 'JPG'].map(ext => (
                         <span key={ext} className="px-2 py-1 rounded-md bg-white border border-gray-200 text-[11px] font-bold text-gray-600 shadow-sm">
                           {ext}
                         </span>
                      ))}
                   </div>
                   <span className="text-[13px] font-medium text-gray-400 ml-2">Max. 10 MB &middot; 1 file</span>
                </div>
              )}

              {/* Required Toggle */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <Controller
                  name={`questions.${index}.required`}
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-center gap-3 cursor-pointer group">
                      <div className={`relative w-11 h-6 rounded-full transition-colors ${field.value ? 'bg-[#ff6533]' : 'bg-gray-200 group-hover:bg-gray-300'}`}>
                        <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${field.value ? 'translate-x-5' : 'translate-x-0'}`}></div>
                      </div>
                      <span className="text-sm font-bold text-gray-700">Required <span className="text-red-500">*</span></span>
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={field.value} 
                        onChange={(e) => field.onChange(e.target.checked)} 
                      />
                    </label>
                  )}
                />
                <span className="text-sm text-gray-400 font-medium">{typeConfig.hint}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
