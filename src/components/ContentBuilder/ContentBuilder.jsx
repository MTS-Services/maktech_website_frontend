import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MetaForm } from './MetaForm';
import { CoverUpload } from './CoverUpload';
import { AssetBuilder } from './AssetBuilder';
import { ContentSidebar } from './ContentSidebar';
import { MdArrowBack } from 'react-icons/md';
import apiClient from '../../services/apiClient';

const normalizeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('http://www.api.maktechgroup.com')) {
    return url.replace('http://www.api.maktechgroup.com', 'https://www.api.maktechgroup.com');
  }
  return url;
};

const extractBlocks = (study) => {
  if (!study) return [];
  if (Array.isArray(study.blocks) && study.blocks.length > 0) {
    return study.blocks;
  }
  if (study.content) {
    if (typeof study.content === 'object' && Array.isArray(study.content.blocks)) {
      return study.content.blocks;
    }
    if (typeof study.content === 'string') {
      try {
        const parsed = JSON.parse(study.content);
        if (Array.isArray(parsed?.blocks) && parsed.blocks.length > 0) {
          return parsed.blocks;
        }
      } catch (e) {
        // Not a JSON string
      }
    }
  }
  return [];
};

const extractCover = (study) => {
  if (!study) return '';
  const url = study.coverImage || study.image || '';
  if (typeof url === 'string') {
    if (url.startsWith('http://www.api.maktechgroup.com')) {
      return url.replace('http://www.api.maktechgroup.com', 'https://www.api.maktechgroup.com');
    }
    return url;
  }
  return '';
};

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

  const [coverUrl, setCoverUrl] = useState(() => extractCover(studyData));
  const [blocks, setBlocks] = useState(() => extractBlocks(studyData));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If in edit mode, ensure full data (including blocks & cover) is loaded
  useEffect(() => {
    if (id) {
      // Check if studyData passed in location.state already has blocks
      const initialBlocks = extractBlocks(studyData);
      if (initialBlocks.length > 0) {
        setBlocks(initialBlocks);
      }
      const initialCover = extractCover(studyData);
      if (initialCover) {
        setCoverUrl(initialCover);
      }

      // Fetch fresh data from API
      apiClient.get(`/api/v1/case-studies/${id}`)
        .then((res) => {
          if (res.data?.success && res.data.data) {
            const fetched = res.data.data;
            methods.reset({
              title: fetched.title || '',
              category: fetched.category || '',
              client: fetched.client || '',
              timeline: fetched.timeline || '',
              services: fetched.services || '',
              tags: fetched.tags || '',
              description: fetched.description || '',
              date: fetched.date || '',
              postedBy: fetched.postedBy || '',
              keyTakeaways: fetched.keyTakeaways || '',
              blogContent: fetched.blogContent || '',
            });
            const fetchedCover = extractCover(fetched);
            if (fetchedCover) {
              setCoverUrl(fetchedCover);
            }
            const fetchedBlocks = extractBlocks(fetched);
            if (fetchedBlocks.length > 0) {
              setBlocks(fetchedBlocks);
            }
          }
        })
        .catch((err) => console.error("Failed to load study for editing:", err));
    }
  }, [id]);

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

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      let htmlContent = '';
      if (blocks && blocks.length > 0) {
        htmlContent = blocks.map(b => {
          if (b.type === 'text') return `<div class="my-6">${b.html || ''}</div>`;
          if (b.type === 'image') return `<img src="${b.src}" alt="image" class="w-full h-auto rounded-xl shadow-sm my-6" />`;
          if (b.type === 'video') return `<video src="${b.src}" controls class="w-full h-auto rounded-xl shadow-sm my-6"></video>`;
          if (b.type === 'grid') {
            let gridClass = 'grid-cols-2';
            if (b.layout === '3-col') gridClass = 'grid-cols-3';
            else if (b.layout === '4-col') gridClass = 'grid-cols-4';
            const imagesHtml = (b.images || []).map(img => `<img src="${img}" class="w-full h-full object-cover rounded-xl shadow-sm aspect-video" />`).join('');
            return `<div class="grid gap-4 ${gridClass} my-6">${imagesHtml}</div>`;
          }
          if (b.type === 'thanks') return `<div class="text-center py-16 my-8 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#4a1a00]"><h2 style="color:white; font-size: 24px; margin-bottom: 8px; text-transform: uppercase; font-weight: 300;">Thanks for</h2><h1 style="color:white; font-size: 48px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em;">Watching</h1></div>`;
          return '';
        }).join('');
      }

      const payload = {
        ...data,
        content: {
          html: htmlContent,
          blocks: blocks
        },
        coverImage: coverUrl
      };

      if (formType === 'caseStudy') {
        if (isEditMode) {
          await apiClient.put(`/api/v1/case-studies/${id}`, payload);
        } else {
          await apiClient.post('/api/v1/case-studies', payload);
        }
      }
      toast.success(`${entityName} ${isEditMode ? 'updated' : 'created'} successfully!`);
      navigate(backPath);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
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
            <CoverUpload coverUrl={coverUrl} onChangeCover={setCoverUrl} />

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
