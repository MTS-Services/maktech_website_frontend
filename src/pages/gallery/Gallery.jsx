import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const categoryList = ['1st Quarter'];
const galleryImageSources = [
  'https://i.ibb.co.com/LhBgKb9g/Chat-GPT-Image-Jul-27-2026-05-35-33-PM.png',
  'https://i.ibb.co.com/N2dkn8ND/Chat-GPT-Image-Jul-27-2026-05-40-32-PM.png',
  'https://i.ibb.co.com/357VFcxD/Chat-GPT-Image-Jul-27-2026-05-49-09-PM.png',
  'https://i.ibb.co.com/JwyM4pvn/Chat-GPT-Image-Jul-27-2026-05-57-16-PM.png',
  'https://i.ibb.co.com/7JyR6rBs/IMG-7303-JPG-2-K-202607271742.jpg',
  'https://i.ibb.co.com/jvPDzbv1/IMG-7315-JPG-2-K-202607271450.jpg',
  'https://i.ibb.co.com/wrNtLt7D/IMG-7317-JPG-2-K-202607271456.jpg',
  'https://i.ibb.co.com/67Gt8J8M/IMG-7404-JPG-2-K-202607271540.jpg',
  'https://i.ibb.co.com/gb4L6L7x/IMG-7696.jpg',
  'https://i.ibb.co.com/LDXq8n2j/IMG-7711.jpg',
  'https://i.ibb.co.com/0RjzFQz1/IMG-7719.jpg',
  'https://i.ibb.co.com/MKJPdXx/IMG-7777-JPG-2-K-202607271756-1.jpg',
  'https://i.ibb.co.com/v91mGdp/IMG-7794-JPG-2-K-202607271750.jpg',
  'https://i.ibb.co.com/bMcbcqsc/IMG-20260214-094630767-HDR-AE.jpg',
  'https://i.ibb.co.com/5gs7QY2S/IMG-20260214-104948671-HDR.jpg',
  'https://i.ibb.co.com/9kr69Gnb/IMG-20260214-121658262-HDR.jpg',
  'https://i.ibb.co.com/b5Bs5BkG/IMG-20260214-143513713-HDR.jpg',
  'https://i.ibb.co.com/JF0q9LhZ/IMG-20260214-152011326-HDR-AE.jpg',
  'https://i.ibb.co.com/N243ZdGY/IMG-20260214-163625248-HDR.jpg',
  'https://i.ibb.co.com/B5kRqhRD/IMG-20260214-171111877-HDR.jpg',
  'https://i.ibb.co.com/rRPRjW0Q/IMG-20260214-171224402-HDR.jpg',
  'https://i.ibb.co.com/xSQ3vcJ0/IMG-20260214-171557378-HDR.jpg',
  'https://i.ibb.co.com/yc3zshWz/IMG-20260214-171656632-HDR.jpg',
  'https://i.ibb.co.com/GfFRtBWX/IMG-20260214-172249393-HDR.jpg',
  'https://i.ibb.co.com/nNLzpxwN/Md-Alamgir-Kabir-sir.png',
  'https://i.ibb.co.com/B29zTDfb/Md-Mahfuz.png',
  'https://i.ibb.co.com/G38zjdM9/Md-Ridoy-Hasan-Kamrul.png'
];

const galleryData = Array.from({ length: 60 }).map((_, index) => {
  const category = categoryList[index % categoryList.length];
  
  // Deterministic height between 400 and 800 to create the varied Pinterest masonry layout
  const height = 400 + ((index * 117) % 400); 
  
  return {
    id: index + 1,
    category,
    height,
    src: galleryImageSources[index % galleryImageSources.length],
    alt: `Gallery Image ${index + 1}`
  };
});

const tabs = ['All', '1st Quarter', '2nd Quarter', '3rd Quarter', '4th Quarter', 'Picnic 2025'];

const skeletonHeights = [420, 560, 480, 640, 500, 720, 460, 600, 540, 680, 440, 520];

const GallerySkeleton = ({ count = 12 }) => (
  <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="break-inside-avoid mb-4 overflow-hidden rounded-xl border border-white/10 bg-white/5"
      >
        <div
          className="w-full animate-pulse bg-white/10"
          style={{ height: skeletonHeights[index % skeletonHeights.length] }}
        />
      </div>
    ))}
  </div>
);

const GalleryImageCard = ({ item, index, onSelect }) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    setLoaded(false);
    if (imgRef.current?.complete) {
      setLoaded(true);
    }
  }, [item.src]);

  return (
    <div
      className="break-inside-avoid mb-4 relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer"
      onClick={() => loaded && onSelect(index)}
    >
      {!loaded && (
        <div
          className="w-full animate-pulse bg-white/10"
          style={{ height: item.height * 0.75 }}
          aria-hidden="true"
        />
      )}
      <img
        ref={imgRef}
        src={item.src}
        alt={item.alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-auto block transition-all duration-500 group-hover:scale-105 ${
          loaded ? 'opacity-100' : 'absolute inset-0 opacity-0'
        }`}
        loading="lazy"
      />
      {loaded && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-end">
          <div className="p-4">
            <p className="text-white font-medium text-sm">{item.category}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Gallery = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const loadGallery = async () => {
      // Replace with API call when gallery endpoint is available
      const data = galleryData;
      if (!cancelled) {
        setGalleryItems(data);
        setIsLoading(false);
      }
    };

    loadGallery();
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      const visibleData = activeTab === 'All' || activeTab === '1st Quarter'
        ? galleryItems
        : [];

      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowLeft') {
        setSelectedImageIndex((prev) => {
          return prev === 0 ? visibleData.length - 1 : prev - 1;
        });
      }
      if (e.key === 'ArrowRight') {
        setSelectedImageIndex((prev) => {
          return prev === visibleData.length - 1 ? 0 : prev + 1;
        });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, activeTab, galleryItems]);

  const filteredData = activeTab === 'All' || activeTab === '1st Quarter'
    ? galleryItems
    : [];

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
        {isLoading ? (
          <GallerySkeleton count={16} />
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
            {filteredData.map((item, index) => (
              <GalleryImageCard
                key={item.id}
                item={item}
                index={index}
                onSelect={setSelectedImageIndex}
              />
            ))}
          </div>
        )}
        
        {!isLoading && filteredData.length === 0 && (
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
                src={filteredData[selectedImageIndex].src}
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
