import React from 'react';
import { MdCloudUpload } from 'react-icons/md';

export const CoverUpload = () => {
  return (
    <div className="mt-5">
      <label className="block text-[12px] font-medium text-gray-600 mb-1.5">Cover Image<span className="text-[#ff6533] ml-0.5">*</span></label>
      <div className="w-full border border-dashed border-gray-300 rounded-lg bg-[#fafafa] flex flex-col items-center justify-center py-10 px-6 hover:bg-gray-50 transition cursor-pointer group">
        <div className="w-9 h-9 bg-orange-50 rounded-full flex items-center justify-center mb-2">
          <MdCloudUpload className="text-lg text-[#ff6533]" />
        </div>
        <p className="text-[12px] font-bold text-gray-800">Drop visuals here</p>
        <p className="text-[9px] text-gray-400 font-medium uppercase tracking-wider mt-1">PNG, JPG OR WEBP</p>
      </div>
    </div>
  );
};
