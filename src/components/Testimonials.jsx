// const testimonials = [
//   {
//     id: 1,
//     quote: "The team understood our vision from day one. The final product was clean, fast, and exactly what we needed to scale.",
//     name: "Sarah Johnson",
//     company: "TechFlow Inc.",
//     avatar: "https://i.pravatar.cc/150?img=5"
//   },
//   {
//     id: 2,
//     quote: "Working with this team transformed how we approach digital strategy. Their expertise is unmatched.",
//     name: "Michael Chen",
//     company: "Digital Ventures",
//     avatar: "https://i.pravatar.cc/150?img=12"
//   },
//   {
//     id: 3,
//     quote: "From concept to launch, every step was handled with professionalism and precision. Highly recommended!",
//     name: "Emily Rodriguez",
//     company: "StartUp Hub",
//     avatar: "https://i.pravatar.cc/150?img=9"
//   },
//   {
//     id: 4,
//     quote: "The attention to detail and commitment to quality exceeded our expectations. A truly exceptional experience.",
//     name: "David Thompson",
//     company: "Growth Labs",
//     avatar: "https://i.pravatar.cc/150?img=13"
//   },
//   {
//     id: 5,
//     quote: "Innovative solutions delivered on time. They understood our business needs perfectly and delivered beyond expectations.",
//     name: "Lisa Anderson",
//     company: "CloudSync Solutions",
//     avatar: "https://i.pravatar.cc/150?img=10"
//   },
//   {
//     id: 6,
//     quote: "Outstanding technical expertise combined with great communication. The perfect partner for our digital transformation.",
//     name: "James Wilson",
//     company: "Enterprise Systems",
//     avatar: "https://i.pravatar.cc/150?img=14"
//   }
// ];

// const TestimonialCard = ({ testimonial }) => {
//   return (
//     <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 flex flex-col gap-6 h-full hover:border-[#3a3a3a] transition-colors duration-300">
//       {/* Quote Icon */}
//       <div className="text-orange-bg-cta">
//         <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
//           <path d="M12 21h6v12H6V21c0-5.523 4.477-10 10-10v4c-3.313 0-6 2.687-6 6v2zm18 0h6v12h-12V21c0-5.523 4.477-10 10-10v4c-3.313 0-6 2.687-6 6v2z"/>
//         </svg>
//       </div>
      
//       {/* Quote Text */}
//       <p className="text-[#b0b0b0] text-base leading-relaxed flex-1">
//         {testimonial.quote}
//       </p>
      
//       {/* Author Info */}
//       <div className="flex items-center gap-4">
//         <img 
//           src={testimonial.avatar} 
//           alt={testimonial.name}
//           className="w-12 h-12 rounded-full"
//         />
//         <div>
//           <p className="text-white font-semibold text-base">
//             {testimonial.name},
//           </p>
//           <p className="text-[#888] text-sm">
//             {testimonial.company}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Testimonials = ({ className = '' }) => {
//   // Duplicate testimonials for seamless loop
//   const duplicatedTestimonials = [...testimonials, ...testimonials];

//   return (
//     <section className={`w-full text-white relative overflow-hidden ${className}`}>
//       <div className="container mx-auto px-5 xl:px-8 2xl:px-12">
//         {/* Header */}
//         <div className="mb-12 xl:mb-16">
//           {/* Badge */}
//           <div
//             className="flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6"
//             style={{
//               background:
//                 "linear-gradient(90deg, rgba(46,34,30,0.98) 0%, rgba(38,30,28,0.92) 50%, rgba(28,22,20,0.88) 100%)",
//               border: "1px solid rgba(255,255,255,0.03)",
//               boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
//             }}
//           >
//             <div className="relative flex items-center justify-center w-3.5 h-3.5">
//               <span
//                 className="absolute w-full h-full rounded-full"
//                 style={{
//                   background:
//                     "radial-gradient(circle at 35% 30%, rgba(255,101,51,0.95), rgba(255,101,51,0.6) 40%, rgba(255,101,51,0.25) 70%)",
//                 }}
//               ></span>
//               <span
//                 className="w-2 h-2 rounded-full"
//                 style={{
//                   background: "linear-gradient(180deg, #ff8a5a, #ff6533)",
//                 }}
//               ></span>
//             </div>
//             <span className="text-base font-medium text-white">Client Stories</span>
//           </div>

//           {/* Heading with underline */}
//           <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight">
//             <span className="bg-linear-to-r from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent">
//               Trusted by Businesses{" "}
//             </span>
//             <span className="relative inline-block bg-linear-to-r from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent">
//               Worldwide
//               <svg 
//                 className="absolute -bottom-2 left-0 w-full" 
//                 height="8" 
//                 viewBox="0 0 200 8" 
//                 fill="none" 
//                 xmlns="http://www.w3.org/2000/svg"
//                 preserveAspectRatio="none"
//               >
//                 <path 
//                   d="M1 4C50 2 100 2 199 4" 
//                   stroke="#ff6533" 
//                   strokeWidth="3" 
//                   strokeLinecap="round"
//                 />
//               </svg>
//             </span>
//           </h2>
//         </div>
//       </div>

//       {/* Scrolling Testimonials */}
//       <div className="container mx-auto px-5 xl:px-8 2xl:px-12">
//         <div className="relative overflow-hidden">
//           <div 
//             className="flex gap-6"
//             style={{
//               animation: 'scroll 10s linear infinite',
//               willChange: 'transform',
//             }}
//             onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
//             onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
//           >
//             {duplicatedTestimonials.map((testimonial, index) => (
//               <div key={`${testimonial.id}-${index}`} className="shrink-0 w-[90%] md:w-[45%] xl:w-[30%]">
//                 <TestimonialCard testimonial={testimonial} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

import { useState, useEffect, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    quote: "The team understood our vision from day one. The final product was clean, fast, and exactly what we needed to scale.",
    name: "Sarah Johnson",
    company: "TechFlow Inc.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 2,
    quote: "Working with this team transformed how we approach digital strategy. Their expertise is unmatched.",
    name: "Michael Chen",
    company: "Digital Ventures",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 3,
    quote: "From concept to launch, every step was handled with professionalism and precision. Highly recommended!",
    name: "Emily Rodriguez",
    company: "StartUp Hub",
    avatar: "https://i.pravatar.cc/150?img=9"
  },
  {
    id: 4,
    quote: "The attention to detail and commitment to quality exceeded our expectations. A truly exceptional experience.",
    name: "David Thompson",
    company: "Growth Labs",
    avatar: "https://i.pravatar.cc/150?img=13"
  },
  {
    id: 5,
    quote: "Innovative solutions delivered on time. They understood our business needs perfectly and delivered beyond expectations.",
    name: "Lisa Anderson",
    company: "CloudSync Solutions",
    avatar: "https://i.pravatar.cc/150?img=10"
  },
  {
    id: 6,
    quote: "Outstanding technical expertise combined with great communication. The perfect partner for our digital transformation.",
    name: "James Wilson",
    company: "Enterprise Systems",
    avatar: "https://i.pravatar.cc/150?img=14"
  }
];

// Each video uses either a YouTube ID (`youtubeId`) or a direct video file URL (`src`)
const videoTestimonials = [
  {
    id: 1,
    youtubeId: "",
    src: "https://cdn.maktechgroup.com/media/1792649090732-1e20dc63-a430-4dae-be4b-d1ff34919435.mp4",
    poster: "",
    name: "Client video 1",
    company: "",
  },
  {
    id: 2,
    youtubeId: "",
    src: "https://cdn.maktechgroup.com/media/1792649087561-04711e98-d22d-488a-949d-e92c8e8f7b56.mp4",
    poster: "",
    name: "Client video 2",
    company: "",
  },
  {
    id: 3,
    youtubeId: "",
    src: "https://cdn.maktechgroup.com/media/1792649080452-98f10e81-45ae-437b-9ac3-345f73bf415a.mp4",
    poster: "",
    name: "Client video 3",
    company: "",
  },
];

const VideoTestimonialCard = ({ video, onPlay, onStop, autoPlayWhenVisible = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  // Browsers only allow autoplay without a user click when the video is muted
  const [startMuted, setStartMuted] = useState(false);
  const cardRef = useRef(null);
  const videoRef = useRef(null);
  const hasStartedRef = useRef(false);
  const hasVideo = Boolean(video.youtubeId || video.src);

  useEffect(() => {
    const card = cardRef.current;
    if (!autoPlayWhenVisible || !video.src || !card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!hasStartedRef.current) {
            hasStartedRef.current = true;
            setStartMuted(true);
            setIsPlaying(true);
          }
          videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, [autoPlayWhenVisible, video.src]);

  const startVideo = () => {
    if (!hasVideo) return;
    hasStartedRef.current = true;
    setStartMuted(false);
    setIsPlaying(true);
    onPlay?.();
  };

  return (
    <div ref={cardRef} className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden flex flex-col h-full hover:border-[#3a3a3a] transition-colors duration-300">
      <div className="relative flex-1 min-h-[240px] bg-black">
        {isPlaying && video.youtubeId ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
            title={`${video.name} testimonial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : isPlaying && video.src ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-contain"
            src={video.src}
            muted={startMuted}
            poster={video.poster || undefined}
            controls
            controlsList="nodownload noplaybackrate noremoteplayback"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            autoPlay
            playsInline
            onPlay={onPlay}
            onPause={onStop}
            onEnded={onStop}
          />
        ) : (
          <button
            type="button"
            onClick={startVideo}
            disabled={!hasVideo}
            aria-label={`Play ${video.name} testimonial`}
            className="group absolute inset-0 h-full w-full disabled:cursor-default"
          >
            {video.poster ? (
              <img
                src={video.poster}
                alt={video.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-enabled:group-hover:scale-105"
              />
            ) : (
              // #t=0.1 makes browsers paint the first frame as a thumbnail
              <video
                src={video.src ? `${video.src}#t=0.1` : undefined}
                preload="metadata"
                muted
                playsInline
                className="pointer-events-none h-full w-full object-cover transition-transform duration-500 group-enabled:group-hover:scale-105"
              />
            )}
            <span className="absolute inset-0 bg-black/40" />
            <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff6533] shadow-[0_0_30px_rgba(255,101,51,0.5)] transition-transform duration-300 group-enabled:group-hover:scale-110">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white" className="ml-1">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}
      </div>

      {/* Client name/company under the video (commented out: video cards show only the video)
      <div className="p-6 flex-1 flex flex-col justify-end">
        <p className="text-white font-semibold text-base">{video.name}</p>
        <p className="text-[#888] text-sm">{video.company}</p>
      </div>
      */}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg p-8 flex flex-col gap-6 h-full hover:border-[#3a3a3a] transition-colors duration-300">
      <div className="text-orange-bg-cta">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="currentColor">
          <path d="M12 21h6v12H6V21c0-5.523 4.477-10 10-10v4c-3.313 0-6 2.687-6 6v2zm18 0h6v12h-12V21c0-5.523 4.477-10 10-10v4c-3.313 0-6 2.687-6 6v2z"/>
        </svg>
      </div>

      <p className="text-[#b0b0b0] text-base leading-relaxed flex-1">
        {testimonial.quote}
      </p>

      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="text-white font-semibold text-base">
            {testimonial.name},
          </p>
          <p className="text-[#888] text-sm">
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = ({ className = '' }) => {
  const trackRef = useRef(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const updateArrows = () => {
    const track = trackRef.current;
    if (!track) return;
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 4);
  };

  useEffect(() => {
    updateArrows();
    window.addEventListener('resize', updateArrows);
    return () => window.removeEventListener('resize', updateArrows);
  }, []);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const sliderItems = [
    ...videoTestimonials.map((video) => ({ ...video, type: 'video' })),
    ...testimonials.map((testimonial) => ({ ...testimonial, type: 'quote' })),
  ];

  /*
  // Old auto-slide (commented out): continuous scroll with a duplicated set of cards
  const [isMobile, setIsMobile] = useState(false);
  const positionRef = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Exact pixel width of one set — includes gap, sub-pixel, everything
    const singleSetWidth = track.scrollWidth / 2;
    const speed = isMobile ? 1 : 1;

    const animate = () => {
      if (!pausedRef.current) {
        positionRef.current += speed;

        // When we reach the end of the first set, snap back to 0 instantly.
        // Since both sets are identical, this is completely imperceptible.
        if (positionRef.current >= singleSetWidth) {
          positionRef.current = 0;
        }

        track.style.transform = `translateX(-${positionRef.current}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  const videoPlayingRef = useRef(false);

  const handleVideoPlay = () => {
    videoPlayingRef.current = true;
    pausedRef.current = true;
  };

  const handleVideoStop = () => {
    videoPlayingRef.current = false;
    pausedRef.current = false;
  };

  const duplicatedTestimonials = [...sliderItems, ...sliderItems];
  */

  const arrowClass =
    "flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#2a2a2a] bg-[#1a1a1a] text-white transition-colors duration-300 hover:border-[#ff6533] hover:bg-[#ff6533] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#2a2a2a] disabled:hover:bg-[#1a1a1a]";

  return (
    <section className={`w-full text-white relative overflow-hidden ${className}`}>
      <div className="container mx-auto px-5 xl:px-8 2xl:px-12">
        <div className="mb-12 xl:mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6"
            style={{
              background:
                "linear-gradient(90deg, rgba(46,34,30,0.98) 0%, rgba(38,30,28,0.92) 50%, rgba(28,22,20,0.88) 100%)",
              border: "1px solid rgba(255,255,255,0.03)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.02)",
            }}
          >
            <div className="relative flex items-center justify-center w-3.5 h-3.5">
              <span
                className="absolute w-full h-full rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 35% 30%, rgba(255,101,51,0.95), rgba(255,101,51,0.6) 40%, rgba(255,101,51,0.25) 70%)",
                }}
              ></span>
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: "linear-gradient(180deg, #ff8a5a, #ff6533)",
                }}
              ></span>
            </div>
            <span className="text-base font-medium text-white">Client Stories</span>
          </div>

          <h2 className="text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight">
            <span className="bg-linear-to-r from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent">
              Trusted by Businesses{" "}
            </span>
            <span className="relative inline-block bg-linear-to-r from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent">
              Worldwide
              <svg
                className="absolute -bottom-2 left-0 w-full"
                height="8"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 4C50 2 100 2 199 4"
                  stroke="#ff6533"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          </div>
        </div>

      </div>

      <div className="container mx-auto px-5 xl:px-8 2xl:px-12">
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous testimonial"
            className={`${arrowClass} absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 max-md:left-2 max-md:translate-x-0`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollNext}
            aria-label="Next testimonial"
            className={`${arrowClass} absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 max-md:right-2 max-md:translate-x-0`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div
            ref={trackRef}
            onScroll={updateArrows}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {sliderItems.map((item, index) => (
              <div
                key={`${item.type}-${item.id}`}
                className="shrink-0 snap-start w-[90%] md:w-[45%] xl:w-[30%]"
              >
                {item.type === 'video' ? (
                  <VideoTestimonialCard video={item} autoPlayWhenVisible={index === 0} />
                ) : (
                  <TestimonialCard testimonial={item} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;