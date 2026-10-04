import React from 'react';
import { useFormContext } from 'react-hook-form';

export const MetaForm = () => {
  const { register, formState: { errors } } = useFormContext();

  const labelCls = "block text-[12px] font-medium text-gray-600 mb-1.5";
  const inputCls = "w-full px-3 py-2 rounded-md border border-gray-200 text-[13px] text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition";
  const errCls = "text-red-500 text-xs mt-1";
  const star = <span className="text-[#ff6533] ml-0.5">*</span>;

  return (
    <div className="space-y-4">
      <div>
        <label className={labelCls}>Title{star}</label>
        <input type="text" {...register('title', { required: 'Title is required' })} className={inputCls} placeholder="E-commerce Platform for Fashion Retailer" />
        {errors.title && <p className={errCls}>{errors.title.message}</p>}
      </div>
      
      <div>
        <label className={labelCls}>Category{star}</label>
        <select {...register('category', { required: 'Category is required' })} className={`${inputCls} bg-white appearance-none`}>
          <option value="Web Development">Web Development</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Mobile App">Mobile App</option>
          <option value="Branding">Branding</option>
        </select>
        {errors.category && <p className={errCls}>{errors.category.message}</p>}
      </div>

      <div>
        <label className={labelCls}>Client{star}</label>
        <input type="text" {...register('client', { required: 'Client is required' })} className={inputCls} placeholder="Fashion House BD" />
        {errors.client && <p className={errCls}>{errors.client.message}</p>}
      </div>

      <div>
        <label className={labelCls}>Timeline{star}</label>
        <input type="text" {...register('timeline', { required: 'Timeline is required' })} className={inputCls} placeholder="14 Weeks" />
        {errors.timeline && <p className={errCls}>{errors.timeline.message}</p>}
      </div>

      <div>
        <label className={labelCls}>Services{star}</label>
        <input type="text" {...register('services', { required: 'Services are required' })} className={inputCls} placeholder="International IT Product & Services" />
        {errors.services && <p className={errCls}>{errors.services.message}</p>}
      </div>

      <div>
        <label className={labelCls}>Tags{star}</label>
        <input type="text" {...register('tags', { required: 'Tags are required' })} className={inputCls} />
        {errors.tags && <p className={errCls}>{errors.tags.message}</p>}
      </div>

      <div>
        <label className={labelCls}>Description{star}</label>
        <textarea {...register('description', { required: 'Description is required' })} rows={4} className={`${inputCls} resize-none`} />
        {errors.description && <p className={errCls}>{errors.description.message}</p>}
      </div>
    </div>
  );
};
