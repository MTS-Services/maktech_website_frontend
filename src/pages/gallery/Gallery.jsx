import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const categoryList = ['1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter', 'Picnic 2025'];

const galleryData = Array.from({ length: 60 }).map((_, index) => {
  const category = categoryList[index % categoryList.length];
  
  // Deterministic height between 400 and 800 to create the varied Pinterest masonry layout
  const height = 400 + ((index * 117) % 400); 
  
  return {
    id: index + 1,
    category,
    // Picsum serves images directly from Unsplash and guarantees they won't 404
    src: `https://picsum.photos/seed/maktech${index + 1}/600/${height}`,
    alt: `Gallery Image ${index + 1}`
  };
});

const tabs = ['All', '1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter', 'Picnic 2025'];

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => {
          const filtered = activeTab === 'All' ? galleryData : galleryData.filter(item => item.category === activeTab);
          return prev === 0 ? filtered.length - 1 : prev - 1;
        });
      }
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => {
          const filtered = activeTab === 'All' ? galleryData : galleryData.filter(item => item.category === activeTab);
          return prev === filtered.length - 1 ? 0 : prev + 1;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, activeTab]);

  const filteredData = activeTab === 'All' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeTab);

  return (
    <div className="min-h-screen  pt-[120px] pb-20 text-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white">
            Our Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl text-white/70">
            A glimpse into our events, projects, and moments throughout the year.
          </p>
        </div>

        {/* Tabs Section */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 border-b border-white/10 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`cursor-pointer rounded-full px-6 py-2.5 text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-orange-bg-cta text-white shadow-lg'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry Layout Gallery */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {filteredData.map((item, index) => (
            <div 
              key={item.id} 
              className="break-inside-avoid mb-4 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer"
              onClick={() => setSelectedImageIndex(index)}
            >
              <img
                src={item.src}
                alt={item.alt}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end">
                <div className="p-4">
                  <p className="text-white font-medium text-sm">{item.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredData.length === 0 && (
          <div className="text-center py-20 text-white/50">
            No images found for this category.
          </div>
        )}

        {/* Lightbox */}
        {selectedImageIndex !== null && createPortal(
          <div 
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          >
            {/* Close Button */}
            <button
              className="absolute right-6 top-6 z-[10000] flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 cursor-pointer"
              onClick={() => setSelectedImageIndex(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>

            {/* Prev Button */}
            <button
              className="absolute left-4 top-1/2 z-[10000] flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev === 0 ? filteredData.length - 1 : prev - 1));
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            {/* Next Button */}
            <button
              className="absolute right-4 top-1/2 z-[10000] flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:bg-white/20 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImageIndex((prev) => (prev === filteredData.length - 1 ? 0 : prev + 1));
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            {/* Image */}
            <div 
              className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredData[selectedImageIndex].src.replace(/\/600\/(\d+)/, (match, h) => `/1200/${parseInt(h) * 2}`)}
                alt={filteredData[selectedImageIndex].alt}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 pt-12">
                <p className="text-xl font-medium text-white">{filteredData[selectedImageIndex].category}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </div>
  );
};

export default Gallery;
