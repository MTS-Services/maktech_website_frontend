import { useState, useRef } from 'react';

const testimonials = [
  {
    id: 1,
    quote:
      'The team understood our vision from day one. The final product was clean, fast, and exactly what we needed to scale.',
    name: 'Sarah Johnson',
    company: 'TechFlow Inc.',
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 2,
    quote:
      'Working with this team transformed how we approach digital strategy. Their expertise is unmatched.',
    name: 'Michael Chen',
    company: 'Digital Ventures',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    id: 3,
    quote:
      'From concept to launch, every step was handled with professionalism and precision. Highly recommended!',
    name: 'Emily Rodriguez',
    company: 'StartUp Hub',
    avatar: 'https://i.pravatar.cc/150?img=9',
  },
  {
    id: 4,
    quote:
      'The attention to detail and commitment to quality exceeded our expectations. A truly exceptional experience.',
    name: 'David Thompson',
    company: 'Growth Labs',
    avatar: 'https://i.pravatar.cc/150?img=13',
  },
  {
    id: 5,
    quote:
      'Innovative solutions delivered on time. They understood our business needs perfectly and delivered beyond expectations.',
    name: 'Lisa Anderson',
    company: 'CloudSync Solutions',
    avatar: 'https://i.pravatar.cc/150?img=10',
  },
  {
    id: 6,
    quote:
      'Outstanding technical expertise combined with great communication. The perfect partner for our digital transformation.',
    name: 'James Wilson',
    company: 'Enterprise Systems',
    avatar: 'https://i.pravatar.cc/150?img=14',
  },
];

// Each video uses a direct CDN video file URL and poster image
const videoTestimonials = [
  {
    id: 1,
    youtubeId: '',
    src: 'https://cdn.maktechgroup.com/media/1792649090732-1e20dc63-a430-4dae-be4b-d1ff34919435.mp4',
    poster:
      'https://cdn.maktechgroup.com/media/1793422446566-aa8d6e0f-1f4c-42a3-a98d-986c19234d98.png',
  },
  {
    id: 2,
    youtubeId: '',
    src: 'https://cdn.maktechgroup.com/media/1792649087561-04711e98-d22d-488a-949d-e92c8e8f7b56.mp4',
    poster:
      'https://cdn.maktechgroup.com/media/1793422465588-5481fed4-7c1b-46ab-a251-de7d16a81d71.png',
  },
  {
    id: 3,
    youtubeId: '',
    src: 'https://cdn.maktechgroup.com/media/1792649080452-98f10e81-45ae-437b-9ac3-345f73bf415a.mp4',
    poster:
      'https://cdn.maktechgroup.com/media/1793425599586-137a0e7b-93cd-4f3a-904a-c886248367c2.png',
  },
];

// Reels-style vertical video card: video only with overlay name and company
const VideoTestimonialCard = ({ video, isPlaying, onPlay, onStop }) => {
  const videoRef = useRef(null);
  const hasVideo = Boolean(video.youtubeId || video.src);

  const handleStart = () => {
    if (!hasVideo) return;
    onPlay?.();
  };

  return (
    <div className='relative w-full aspect-[9/16] rounded-2xl overflow-hidden border border-[#2a2a2a] bg-[#111] hover:border-[#ff6533]/60 transition-all duration-300 shadow-xl group'>
      {isPlaying && video.youtubeId ? (
        <iframe
          className='absolute inset-0 h-full w-full'
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={`${video.name} testimonial`}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
          allowFullScreen
        />
      ) : isPlaying && video.src ? (
        <div className='relative h-full w-full bg-black'>
          <video
            ref={videoRef}
            className='h-full w-full object-cover'
            src={video.src}
            poster={video.poster || undefined}
            controls
            controlsList='nodownload noplaybackrate noremoteplayback'
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            autoPlay
            playsInline
            onPause={onStop}
            onEnded={onStop}
          />
          <button
            type='button'
            onClick={onStop}
            aria-label='Close video'
            className='absolute top-3 right-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white/80 hover:bg-black hover:text-white transition-colors'
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type='button'
          onClick={handleStart}
          disabled={!hasVideo}
          aria-label={`Play ${video.name} testimonial`}
          className='group/btn relative h-full w-full text-left cursor-pointer disabled:cursor-default block'
        >
          {/* Poster image */}
          {video.poster ? (
            <img
              src={video.poster}
              alt={video.name}
              loading='lazy'
              referrerPolicy='no-referrer'
              className='h-full w-full object-cover transition-transform duration-500 group-hover/btn:scale-105'
            />
          ) : (
            <video
              src={video.src ? `${video.src}#t=0.1` : undefined}
              preload='metadata'
              muted
              playsInline
              className='pointer-events-none h-full w-full object-cover'
            />
          )}

          {/* Top highlight glow */}
          <span className='absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent pointer-events-none' />

          {/* Bottom dark gradient for text readability */}
          <span className='absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/90 via-black/45 to-transparent pointer-events-none' />

          {/* Play button in center */}
          <span className='absolute left-1/2 top-1/2 flex h-14 w-14 sm:h-16 sm:w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff6533] shadow-[0_0_30px_rgba(255,101,51,0.6)] transition-all duration-300 group-hover/btn:scale-110 group-hover/btn:shadow-[0_0_40px_rgba(255,101,51,0.9)]'>
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='white'
              className='ml-1'
            >
              <path d='M8 5v14l11-7z' />
            </svg>
          </span>

          {/* Name & Company at bottom */}
          {(video.name || video.company) && (
            <div className='absolute bottom-5 left-5 right-5 text-left pointer-events-none'>
              {video.name && (
                <p className='text-white font-semibold text-lg sm:text-xl leading-snug drop-shadow-md'>
                  {video.name}
                </p>
              )}
              {video.company && (
                <p className='text-white/70 text-xs sm:text-sm font-medium mt-0.5 drop-shadow-sm'>
                  {video.company}
                </p>
              )}
            </div>
          )}
        </button>
      )}
    </div>
  );
};

// Text testimonial card for the scrolling bottom section
const TestimonialCard = ({ testimonial }) => {
  return (
    <div className='bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl p-6 sm:p-7 flex flex-col justify-between gap-5 h-full hover:border-[#ff6533]/50 transition-colors duration-300'>
      <div className='text-[#ff6533]'>
        <svg width='36' height='36' viewBox='0 0 48 48' fill='currentColor'>
          <path d='M12 21h6v12H6V21c0-5.523 4.477-10 10-10v4c-3.313 0-6 2.687-6 6v2zm18 0h6v12h-12V21c0-5.523 4.477-10 10-10v4c-3.313 0-6 2.687-6 6v2z' />
        </svg>
      </div>

      <p className='text-[#b0b0b0] text-sm sm:text-base leading-relaxed flex-1'>
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className='flex items-center gap-3 pt-3 border-t border-white/5'>
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          loading='lazy'
          referrerPolicy='no-referrer'
          className='w-10 h-10 rounded-full object-cover shrink-0'
        />
        <div>
          <p className='text-white font-semibold text-sm sm:text-base leading-snug'>
            {testimonial.name}
          </p>
          <p className='text-[#888] text-xs sm:text-sm'>
            {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = ({ className = '' }) => {
  const [playingVideoId, setPlayingVideoId] = useState(null);

  // 4x duplicated array ensures seamless infinite right-to-left marquee on all screen sizes
  const scrollingTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];

  return (
    <section className={`w-full text-white relative overflow-hidden ${className}`}>
      {/* Section Header */}
      <div className='container mx-auto px-5 xl:px-8 2xl:px-12'>
        <div className='mb-10 xl:mb-14'>
          {/* Badge */}
          <div
            className='flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6'
            style={{
              background:
                'linear-gradient(90deg, rgba(46,34,30,0.98) 0%, rgba(38,30,28,0.92) 50%, rgba(28,22,20,0.88) 100%)',
              border: '1px solid rgba(255,255,255,0.03)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.02)',
            }}
          >
            <div className='relative flex items-center justify-center w-3.5 h-3.5'>
              <span
                className='absolute w-full h-full rounded-full'
                style={{
                  background:
                    'radial-gradient(circle at 35% 30%, rgba(255,101,51,0.95), rgba(255,101,51,0.6) 40%, rgba(255,101,51,0.25) 70%)',
                }}
              />
              <span
                className='w-2 h-2 rounded-full'
                style={{
                  background: 'linear-gradient(180deg, #ff8a5a, #ff6533)',
                }}
              />
            </div>
            <span className='text-base font-medium text-white'>Client Stories</span>
          </div>

          {/* Heading with underline */}
          <h2 className='text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight'>
            <span className='bg-linear-to-r from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent'>
              Trusted by Businesses{' '}
            </span>
            <span className='relative inline-block bg-linear-to-r from-[#FFFFFF] to-[#999999] bg-clip-text text-transparent'>
              Worldwide
              <svg
                className='absolute -bottom-2 left-0 w-full'
                height='8'
                viewBox='0 0 200 8'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                preserveAspectRatio='none'
              >
                <path
                  d='M1 4C50 2 100 2 199 4'
                  stroke='#ff6533'
                  strokeWidth='3'
                  strokeLinecap='round'
                />
              </svg>
            </span>
          </h2>
        </div>
      </div>

      {/* ── 1. Top Section: Video Testimonials Only (Reels format) ── */}
      <div className='container mx-auto px-5 xl:px-8 2xl:px-12'>
        <div className='flex overflow-x-auto snap-x snap-mandatory gap-5 pb-4 md:grid md:grid-cols-3 md:gap-6 md:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden justify-start md:justify-center'>
          {videoTestimonials.map((video) => (
            <div
              key={video.id}
              className='w-[82%] sm:w-[50%] md:w-auto shrink-0 snap-center md:shrink'
            >
              <VideoTestimonialCard
                video={video}
                isPlaying={playingVideoId === video.id}
                onPlay={() => setPlayingVideoId(video.id)}
                onStop={() => setPlayingVideoId(null)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ── 2. Bottom Section: Text Testimonials Scrolling Right-to-Left ── */}
      <div className='container mx-auto px-5 xl:px-8 2xl:px-12 mt-14 lg:mt-18'>
        <div className='w-full overflow-hidden'>
          <div
            className='flex gap-6 w-max'
            style={{
              animation: 'scroll 35s linear infinite',
              willChange: 'transform',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.animationPlayState = 'paused')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.animationPlayState = 'running')
            }
          >
            {scrollingTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className='shrink-0 w-[300px] sm:w-[350px] md:w-[380px]'
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
