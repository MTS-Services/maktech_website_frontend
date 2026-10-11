import React, { useState, useEffect } from 'react';
import { MdCloudUpload, MdDelete, MdBrokenImage } from 'react-icons/md';

const normalizeImageUrl = (url) => {
  if (!url || typeof url !== 'string') return url;
  if (url.startsWith('http://www.api.maktechgroup.com')) {
    return url.replace('http://www.api.maktechgroup.com', 'https://www.api.maktechgroup.com');
  }
  return url;
};

export const CoverUpload = ({ coverUrl: propCoverUrl, onChangeCover }) => {
  const [coverUrl, setCoverUrl] = useState(normalizeImageUrl(propCoverUrl) || null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (propCoverUrl !== undefined) {
      setCoverUrl(normalizeImageUrl(propCoverUrl) || null);
      setHasError(false);
    }
  }, [propCoverUrl]);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setCoverUrl(url);
      setHasError(false);
      if (onChangeCover) onChangeCover(url, file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCoverUrl(null);
    setHasError(false);
    if (onChangeCover) onChangeCover(null, null);
  };

  return (
    <div className="mt-5">
      <label className="block text-sm font-medium text-gray-600 mb-1.5">
        Cover Image<span className="text-[#ff6533] ml-0.5">*</span>
      </label>
      
      {coverUrl ? (
        <div className="relative group w-full max-w-[808px] aspect-[808/632] border border-gray-200 rounded-lg overflow-hidden bg-gray-100 shadow-sm flex items-center justify-center">
          {/* Top-right delete button */}
          <div className="absolute top-4 right-4 bg-[#2a2a2a]/90 backdrop-blur-xs text-gray-300 rounded-md flex items-center z-20 border border-gray-600 shadow-md p-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              type="button"
              onClick={handleRemove}
              className="p-1.5 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded transition-colors cursor-pointer"
              title="Remove Cover Image"
            >
              <MdDelete size={16} />
            </button>
          </div>

          {hasError ? (
            <div className="w-full h-full p-8 bg-gray-50 border-2 border-dashed border-red-300 rounded-lg flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-3">
                <MdBrokenImage size={24} />
              </div>
              <p className="text-sm font-semibold text-gray-800 mb-1">Cover image failed to load or file is broken</p>
              <p className="text-xs text-gray-500 mb-4 max-w-sm">The cover image source is broken. Click below to reupload a new cover image.</p>
              <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#ff6533] hover:bg-[#e5501a] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer">
                <MdCloudUpload size={16} />
                Reupload Cover Image
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          ) : (
            <img
              src={coverUrl}
              alt="Cover"
              onError={() => setHasError(true)}
              className="w-full h-full object-cover block"
            />
          )}
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
