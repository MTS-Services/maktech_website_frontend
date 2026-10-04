import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MetaForm } from './MetaForm';
import { CoverUpload } from './CoverUpload';
import { AssetBuilder } from './AssetBuilder';
import { ContentSidebar } from './ContentSidebar';
import { MdArrowBack } from 'react-icons/md';

export const ContentBuilder = ({ entityName = 'Case Study', backPath = '/admin/case-studies', formType = 'caseStudy' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const studyData = state?.study;
  const isEditMode = !!id;
  
  const methods = useForm({
    defaultValues: {
      title: studyData?.title || '',
      category: studyData?.category || '',
      client: studyData?.client || '',
      timeline: studyData?.timeline || '',
      services: studyData?.services || '',
      tags: studyData?.tags || '',
      description: studyData?.description || '',
      date: studyData?.date || '',
      postedBy: studyData?.postedBy || '',
      keyTakeaways: studyData?.keyTakeaways || '',
      blogContent: studyData?.blogContent || '',
    }
  });

  const [blocks, setBlocks] = useState(studyData?.blocks || []);

  const handleAddBlock = (type) => {
    const newBlock = { id: Date.now(), type };
    if (['image', 'video', 'grid'].includes(type)) {
      newBlock.src = ''; // Start empty for upload placeholder
    }
    setBlocks([...blocks, newBlock]);
    toast.success(`Added ${type} block`);
  };

  const handleRemoveBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
    toast.info('Block removed');
  };

  const handleUpdateBlock = (id, updates) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
  };

  const onSubmit = (data) => {
    console.log({ ...data, blocks });
    toast.success(`${entityName} ${isEditMode ? 'updated' : 'created'} successfully!`);
    navigate(-1);
  };

  return (
    <div className="w-full pb-10">
      <div className="mb-4">
        <button type="button" onClick={() => navigate(backPath)} className="flex items-center text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium cursor-pointer">
          <MdArrowBack size={16} className="mr-1.5" /> Back to {entityName}s
        </button>
      </div>
      <div className="bg-white rounded-md border border-gray-100 shadow-sm p-6 sm:p-8 w-full">
        <h1 className="text-[17px] font-medium text-gray-800 mb-6 border-b border-gray-100 pb-4">
          {isEditMode ? `Edit ${entityName}` : `Create ${entityName}`}
        </h1>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            
            {/* Top Meta Form */}
            <MetaForm formType={formType} />

            {/* Cover Upload */}
            <CoverUpload />

            {/* Asset Builder Area */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col lg:flex-row gap-6">
              <AssetBuilder blocks={blocks} onRemove={handleRemoveBlock} onUpdateBlock={handleUpdateBlock} onAdd={handleAddBlock} />
              {blocks.length > 0 && <ContentSidebar onAdd={handleAddBlock} onSaveDraft={handleSaveDraft} />}
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-4 flex items-center justify-start gap-3">
              <button
                type="submit"
                className="px-5 py-2 rounded text-[12px] font-semibold bg-[#ff6533] text-white hover:bg-[#e5501a] transition-colors cursor-pointer"
              >
                {isEditMode ? `Update ${entityName}` : `Create ${entityName}`}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-5 py-2 rounded text-[12px] font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>

          </form>
        </FormProvider>
      </div>
    </div>
  );
};
