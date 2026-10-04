import React, { useState } from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';

export const CoverUpload = () => {
  const [coverUrl, setCoverUrl] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCoverUrl(null);
  };

  return (
    <div className="mt-5">
      <label className="block text-sm font-medium text-gray-600 mb-1.5">Cover Image<span className="text-[#ff6533] ml-0.5">*</span></label>
      
      {coverUrl ? (
        <div className="relative group w-full max-w-[808px] aspect-[808/632] border border-gray-200 rounded-lg overflow-hidden bg-gray-100 shadow-sm flex items-center justify-center">
          <div className="absolute top-4 right-4 bg-[#2a2a2a] text-gray-300 rounded-md flex items-center opacity-0 group-hover:opacity-100 transition-opacity z-10 shadow-md">
             <button type="button" onClick={handleRemove} className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded-md transition-colors cursor-pointer"><MdDelete size={16} /></button>
          </div>
          <img src={coverUrl} alt="Cover" className="w-full h-full object-cover block" />
        </div>
      ) : (
        <div className="relative w-full max-w-[808px] min-h-[250px] border border-dashed border-gray-300 rounded-lg bg-[#fafafa] flex flex-col items-center justify-center py-10 px-6 hover:bg-gray-50 transition cursor-pointer group">
          <div className="w-9 h-9 bg-orange-50 rounded-full flex items-center justify-center mb-2">
            <MdCloudUpload className="text-lg text-[#ff6533]" />
          </div>
          <p className="text-[12px] font-bold text-gray-800">Drop visuals here</p>
          <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mt-1">PNG, JPG OR WEBP</p>
          
          <input 
            type="file" 
            accept="image/*" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            onChange={handleFileChange} 
          />
        </div>
      )}
    </div>
  );
};
