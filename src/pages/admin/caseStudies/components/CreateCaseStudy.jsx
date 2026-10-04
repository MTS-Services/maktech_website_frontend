import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MetaForm } from './MetaForm';
import { CoverUpload } from './CoverUpload';
import { AssetBuilder } from './AssetBuilder';
import { ContentSidebar } from './ContentSidebar';
import { MdArrowBack } from 'react-icons/md';

export const CreateCaseStudy = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const studyData = state?.study;
  const isEditMode = !!id;
  
  const methods = useForm({
    defaultValues: {
      title: studyData?.title || 'E-commerce Platform for Fashion Retailer',
      category: studyData?.category || 'Web Development',
      client: studyData?.client || 'Fashion House BD',
      timeline: '14 Weeks',
      services: 'International IT Product & Services',
      tags: '',
      description: studyData?.description || '',
    }
  });

  const [blocks, setBlocks] = useState([
    { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80', alt: 'Monitor' },
    { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80', alt: 'Laptop' },
    { id: 3, type: 'text' },
    { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', alt: 'Screens' },
    { id: 5, type: 'thanks' }
  ]);

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
    toast.success('Case study created successfully!');
    navigate(-1);
  };

  return (
    <div className="w-full pb-10">
      <div className="mb-4">
        <button type="button" onClick={() => navigate('/admin/case-studies')} className="flex items-center text-[13px] text-gray-500 hover:text-gray-800 transition-colors font-medium cursor-pointer">
          <MdArrowBack size={16} className="mr-1.5" /> Back to Case Studies
        </button>
      </div>
      <div className="bg-white rounded-md border border-gray-100 shadow-sm p-6 sm:p-8 w-full">
        <h1 className="text-[17px] font-medium text-gray-800 mb-6 border-b border-gray-100 pb-4">
          {isEditMode ? 'Edit Case Study' : 'Create Case Study'}
        </h1>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
            
            {/* Top Meta Form */}
            <MetaForm />

            {/* Cover Upload */}
            <CoverUpload />

            {/* Asset Builder Area */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col lg:flex-row gap-6 items-start">
              <AssetBuilder blocks={blocks} onRemove={handleRemoveBlock} onUpdateBlock={handleUpdateBlock} />
              <ContentSidebar onAdd={handleAddBlock} onSaveDraft={handleSaveDraft} />
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-4 flex items-center justify-start gap-3">
              <button
                type="submit"
                className="px-5 py-2 rounded text-[12px] font-semibold bg-[#ff6533] text-white hover:bg-[#e5501a] transition-colors cursor-pointer"
              >
                Update Case Study
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
