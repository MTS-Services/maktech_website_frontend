import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MetaForm } from './MetaForm';
import { CoverUpload } from './CoverUpload';
import { AssetBuilder } from './AssetBuilder';
import { ContentSidebar } from './ContentSidebar';
import { MdArrowBack } from 'react-icons/md';
import apiClient from '../../services/apiClient';

export const ContentBuilder = ({ entityName = 'Case Study', backPath = '/admin/case-studies', formType = 'caseStudy' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const studyData = state?.study;
  const isEditMode = !!id;

  const htmlToTextList = (html) => {
    if (!html) return '';
    if (!html.includes('<li')) return html;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const lis = Array.from(doc.querySelectorAll('li')).map(li => li.textContent);
    return lis.join('\n');
  };
  const htmlToTextParagraphs = (html) => {
    if (!html) return '';
    if (!html.includes('<p')) return html;
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const ps = Array.from(doc.querySelectorAll('p')).map(p => p.textContent);
    return ps.join('\n\n');
  };
  
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
      readTime: studyData?.readTime || '',
      keyTakeaways: studyData?.keyTakeaways || '',
      blogContent: studyData?.blogContent || '',
    }
  });

  const [blocks, setBlocks] = useState(() => {
    if (studyData?.content && typeof studyData.content === 'object' && studyData.content.blocks) {
      return studyData.content.blocks;
    }
    if (studyData?.blocks) return studyData.blocks;
    if (studyData?.content && typeof studyData.content === 'string') {
      return [{ id: Date.now(), type: 'text', html: studyData.content }];
    }
    return [];
  });
  const [coverImage, setCoverImage] = useState(studyData?.coverImage ? { url: studyData.coverImage } : null);

  const handleAddBlock = React.useCallback((type) => {
    const newBlock = { id: Date.now(), type };
    if (['image', 'video', 'grid'].includes(type)) {
      newBlock.src = ''; // Start empty for upload placeholder
    }
    setBlocks(prevBlocks => [...prevBlocks, newBlock]);
    toast.success(`Added ${type} block`);
  }, []);

  const handleRemoveBlock = React.useCallback((id) => {
    setBlocks(prevBlocks => {
      const blockToRemove = prevBlocks.find(b => b.id === id);
      if (blockToRemove && blockToRemove.filename) {
        apiClient.delete(`/api/v1/uploads/${blockToRemove.filename}`).catch(err => console.error("Failed to delete", err));
      }
      return prevBlocks.filter(b => b.id !== id);
    });
    toast.info('Block removed');
  }, []);

  const handleUpdateBlock = React.useCallback((id, updates) => {
    setBlocks(prevBlocks => prevBlocks.map(b => b.id === id ? { ...b, ...updates } : b));
  }, []);

  const handleSaveDraft = () => {
    toast.success('Draft saved successfully!');
  };

    const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formatKeyTakeaways = (text) => {
        if (!text) return '';
        if (text.includes('<ul')) return text;
        const items = text.split('\n').filter(line => line.trim() !== '').map(line => `<li>${line.replace(/^[•\-\*]\s*/, '').trim()}</li>`);
        return `<ul>${items.join('')}</ul>`;
      };
      const formatBlogContent = (text) => {
        if (!text) return '';
        if (text.includes('<p>')) return text;
        const paragraphs = text.split('\n\n').filter(p => p.trim() !== '').map(p => `<p>${p.trim()}</p>`);
        return paragraphs.join('');
      };
      let htmlContent = '';
      if (blocks && blocks.length > 0) {
        htmlContent = blocks.map(b => {
          if (b.type === 'text') return `<div class="my-6">${b.html || ''}</div>`;
          if (b.type === 'image') return `<img src="${b.src}" alt="image" class="w-full h-auto rounded-xl shadow-sm my-6" />`;
          if (b.type === 'video' && b.mediaType === 'audio') return `<audio src="${b.src}" controls class="w-full max-w-md my-8 mx-auto block"></audio>`;
          if (b.type === 'video') return `<video src="${b.src}" controls class="w-full h-auto rounded-xl shadow-sm my-6 bg-black"></video>`;
          if (b.type === 'grid') {
            let gridClass = 'grid-cols-2';
            if (b.layout === '1-col') gridClass = 'grid-cols-1';
            else if (b.layout === '3-col') gridClass = 'grid-cols-3';
            else if (b.layout === '4-col') gridClass = 'grid-cols-4';
            else if (b.layout === '1-large-3-small') gridClass = 'grid-cols-4';
            
            const imagesHtml = (b.images || []).map(img => `<img src="${img}" class="w-full h-full object-cover rounded-xl shadow-sm aspect-video" />`).join('');
            return `<div class="grid gap-4 ${gridClass} my-6">${imagesHtml}</div>`;
          }
          if (b.type === 'thanks') return `<div class="text-center py-16 my-8 rounded-xl bg-gradient-to-br from-[#1a1a1a] to-[#4a1a00]"><h2 style="color:white; font-size: 24px; margin-bottom: 8px; text-transform: uppercase; font-weight: 300;">Thanks for</h2><h1 style="color:white; font-size: 48px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em;">Watching</h1></div>`;
          return '';
        }).join('');
      }

      console.log('SUBMITTING BLOCKS:', blocks); console.log('SUBMITTING HTML:', htmlContent);
      const payload = {
        ...data,
        content: {
          html: htmlContent,
          blocks: blocks
        },
        coverImage: coverImage ? coverImage.url : null,
        isPublished: true
      };

      let res;
      if (formType === 'caseStudy') {
        if (isEditMode) {
          res = await apiClient.put(`/api/v1/case-studies/${id}`, payload);
        } else {
          res = await apiClient.post('/api/v1/case-studies', payload);
        }
      } else if (formType === 'blog') {
        if (isEditMode) {
          res = await apiClient.patch(`/api/v1/blogs/${id}`, payload);
        } else {
          res = await apiClient.post('/api/v1/blogs', payload);
        }
      } else {
        toast.success(`${entityName} ${isEditMode ? 'updated' : 'created'} (Mocked)`);
        navigate(-1);
        return;
      }

      if (res.data.success) {
        toast.success(`${entityName} ${isEditMode ? 'updated' : 'created'} successfully!`);
        navigate(-1);
      }
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
            <CoverUpload value={coverImage} onChange={(url, filename) => setCoverImage(url ? { url, filename } : null)} />

            {/* Asset Builder Area */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col lg:flex-row gap-6">
              <AssetBuilder blocks={blocks} onRemove={handleRemoveBlock} onUpdateBlock={handleUpdateBlock} onAdd={handleAddBlock} />
              {blocks.length > 0 && <ContentSidebar onAdd={handleAddBlock} onSaveDraft={handleSaveDraft} />}
            </div>

            {/* Footer Actions */}
            <div className="mt-8 pt-4 flex items-center justify-start gap-3">
              <button
                type="submit"
                className="px-5 py-2 rounded text-[12px] font-semibold bg-[#ff6533] text-white hover:bg-[#e5501a] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed" disabled={isSubmitting}
              >
                {isSubmitting ? 'Saving...' : isEditMode ? `Update ${entityName}` : `Create ${entityName}`}
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
