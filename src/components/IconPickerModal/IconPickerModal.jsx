import React, { useState, useMemo, useEffect } from 'react';
import { MdSearch, MdClose } from 'react-icons/md';
import * as MdIcons from 'react-icons/md';

// Extract all icon names except the default export if any
const ICON_KEYS = Object.keys(MdIcons).filter(key => key !== 'default');

export const IconPickerModal = ({ isOpen, onClose, onSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(150);

  // Reset state when opened or when searching
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setVisibleCount(150);
    }
  }, [isOpen]);

  // Also reset visible count when typing a new search
  useEffect(() => {
    setVisibleCount(150);
  }, [searchTerm]);

  // Filter icons based on search
  const allFilteredIcons = useMemo(() => {
    if (!isOpen) return [];
    const lowerSearch = searchTerm.toLowerCase();
    
    if (!lowerSearch) return ICON_KEYS;
    return ICON_KEYS.filter(key => key.toLowerCase().includes(lowerSearch));
  }, [searchTerm, isOpen]);

  const displayedIcons = useMemo(() => {
    return allFilteredIcons.slice(0, visibleCount);
  }, [allFilteredIcons, visibleCount]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    // If we've scrolled near the bottom, load more
    if (scrollHeight - scrollTop - clientHeight < 300) {
      if (visibleCount < allFilteredIcons.length) {
        setVisibleCount(prev => prev + 150);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm transition-opacity">
       <div 
         className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[85vh] min-h-[500px] flex flex-col animate-in fade-in zoom-in-95 duration-200"
         onClick={(e) => e.stopPropagation()}
       >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-100 shrink-0">
             <h2 className="text-lg font-bold text-gray-900">Choose an Icon</h2>
             <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                <MdClose size={24} />
             </button>
          </div>
          
          {/* Search */}
          <div className="p-5 pb-3 shrink-0">
             <div className="relative">
                <MdSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={22} />
                <input 
                   type="text"
                   autoFocus
                   placeholder="Search icons (e.g., user, document, star)..."
                   value={searchTerm}
                   onChange={e => setSearchTerm(e.target.value)}
                   className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder:text-gray-400 text-gray-800"
                />
             </div>
             <p className="text-xs text-gray-400 mt-2 ml-1">
               Showing {displayedIcons.length} of {allFilteredIcons.length} icons. Scroll to load more.
             </p>
          </div>
          
          {/* Icon Grid */}
          <div className="flex-1 overflow-y-auto p-5 pt-2" onScroll={handleScroll}>
             {displayedIcons.length === 0 ? (
               <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                  <MdSearch size={48} className="mb-3 opacity-20" />
                  <p className="text-sm font-medium">No icons found for "{searchTerm}"</p>
               </div>
             ) : (
               <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                 {displayedIcons.map(iconName => {
                   const IconCmp = MdIcons[iconName];
                   return (
                     <button
                       key={iconName}
                       onClick={() => {
                         onSelect(iconName);
                         onClose();
                       }}
                       className="flex flex-col items-center justify-center p-3 gap-2 rounded-xl border border-gray-100 hover:border-orange-500 hover:bg-orange-50 text-gray-600 hover:text-[#ff6533] transition-all cursor-pointer group"
                       title={iconName.replace('Md', '')}
                     >
                       <IconCmp size={26} className="group-hover:scale-110 transition-transform" />
                     </button>
                   );
                 })}
               </div>
             )}
          </div>
       </div>
    </div>
  );
};
