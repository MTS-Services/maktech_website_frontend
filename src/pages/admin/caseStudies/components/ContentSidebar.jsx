import React from 'react';
import { MdImage, MdTextFields, MdGridView, MdVideoLibrary } from 'react-icons/md';

export const ContentSidebar = ({ onAdd, onSaveDraft }) => {
  const btnCls = "flex flex-col items-center justify-center gap-1.5 p-4 rounded-none border-b border-r border-gray-100 bg-white hover:bg-gray-50 transition-colors text-gray-800 cursor-pointer w-full";

  return (
    <div className="w-full lg:w-64 shrink-0">
      <div className="sticky top-6 bg-white rounded-md border border-gray-100 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-gray-100 bg-[#fbfbfb]">
          <h3 className="text-[10px] font-medium text-gray-500 uppercase tracking-wide">Add Content</h3>
        </div>
        
        <div className="grid grid-cols-2">
          <button type="button" onClick={() => onAdd('image')} className={btnCls}>
            <MdImage size={20} className="text-gray-700" />
            <span className="text-[10px] font-medium mt-1">Image</span>
          </button>
          <button type="button" onClick={() => onAdd('text')} className={`${btnCls} border-r-0`}>
            <MdTextFields size={20} className="text-gray-700" />
            <span className="text-[10px] font-medium mt-1">Text</span>
          </button>
          <button type="button" onClick={() => onAdd('grid')} className={`${btnCls} border-b-0`}>
            <MdGridView size={20} className="text-gray-700" />
            <span className="text-[10px] font-medium mt-1">Photo Grid</span>
          </button>
          <button type="button" onClick={() => onAdd('video')} className={`${btnCls} border-b-0 border-r-0`}>
            <MdVideoLibrary size={20} className="text-gray-700" />
            <span className="text-[10px] font-medium mt-1">Video/Audio</span>
          </button>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white flex justify-center">
          <button type="button" onClick={onSaveDraft} className="px-5 py-1.5 rounded-full border border-gray-200 text-gray-700 text-[11px] font-bold hover:bg-gray-50 transition-colors shadow-sm">
            Save as draft
          </button>
        </div>
      </div>
    </div>
  );
};
