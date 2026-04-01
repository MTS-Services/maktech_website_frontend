/**
 * FeatureSection - Reusable two-column feature section
 *
 * Used by:
 * - Home page: WhyChooseUs
 * - Services page: WhoWeAre
 *
 * Props:
 * - badge: { text: string, icon?: JSX }
 * - heading: string
 * - subheading?: string (optional, for multi-line)
 * - description: string[]
 * - ctaText: string
 * - ctaLink: string
 * - features: Array<{ id, title, description, icon }>
 * - backgroundStyle?: 'dark' | 'light' (default: 'dark')
 */

import { Link } from "react-router-dom";

const FeatureCard = ({
  feature,
  iconBg = true,
  index = 0,
  animateCards = false,
}) => (
  <div
    className='bg-[#1e1e1e] xl:bg-[#1e1e1e] rounded-xl p-6 flex flex-col gap-4 border border-white/5'
    style={
      animateCards
        ? {
            animation: `fadeSlideUp 0.55s cubic-bezier(0.22,1,0.36,1) both`,
            animationDelay: `${index * 0.12}s`,
          }
        : undefined
    }
  >
    {/* Icon */}
    <div
      className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${
        iconBg ? 'bg-orange-bg-cta' : 'bg-transparent'
      }`}
    >
      {feature.icon}
    </div>
    <div className='flex flex-col gap-2'>
      <h3 className='text-white font-semibold text-base xl:text-xl leading-snug'>
        {feature.title}
      </h3>
      <p className='text-[#a0a0a0] text-sm md:text-base leading-relaxed'>
        {feature.description}
      </p>
    </div>
  </div>
);

const FeatureSection = ({
  badge,
  heading,
  subheading,
  description,
  ctaText,
  ctaLink,
  features,
  backgroundStyle = 'dark',
  backgroundImages = null,
  iconBg = true,
  animatedLines = false,
  animateCards = false,
}) => {
  const isDarkBg = backgroundStyle === 'dark';

  return (
    <section
      className={`w-full relative overflow-hidden py-16 xl:py-20 2xl:py-24 ${isDarkBg ? 'bg-[#111111] xl:bg-white' : 'bg-white'}`}
    >
      {/* Background blob image — desktop only */}
      {backgroundImages?.blob && (
        <div className='hidden xl:block absolute inset-0 z-0'>
          <img
            src={backgroundImages.blob}
            alt=''
            aria-hidden='true'
            className='w-full h-full object-cover'
          />
        </div>
      )}

      {/* Animated vertical lines — section scoped */}
      {animatedLines && (
        <div
          aria-hidden='true'
          className='absolute inset-0 z-0 overflow-hidden pointer-events-none'
        >
          {[12, 30, 50, 68,88].map((pos, i) => (
            <div
              key={i}
              className='absolute -top-15 bottom-0 w-px'
              style={{
                left: `${pos}%`,
                background:
                  'linear-gradient(to bottom, transparent, rgba(255,101,51,0.12) 40%, rgba(255,101,51,0.06) 60%, transparent)',
              }}
            >
              <div
                className='absolute w-0.5 h-16 rounded-full'
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background:
                    'linear-gradient(to bottom, transparent, #ff6533 50%, transparent)',
                  opacity: 0.45,
                  animation: `lineDrop ${7 + i * 1.5}s linear infinite`,
                  animationDelay: `${i * 1.4}s`,
                  willChange: 'top, opacity',
                  backfaceVisibility: 'hidden',
                }}
              />
              <div
                className='absolute w-0.5 h-10 rounded-full'
                style={{
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background:
                    'linear-gradient(to bottom, transparent, #ff6533 50%, transparent)',
                  opacity: 0.3,
                  animation: `lineDrop ${9 + i * 1.2}s linear infinite`,
                  animationDelay: `${i * 1.4 + 3.5}s`,
                  willChange: 'top, opacity',
                  backfaceVisibility: 'hidden',
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Left-bottom glow — desktop only */}
      {isDarkBg && (
        <div
          aria-hidden='true'
          className='hidden xl:block pointer-events-none absolute z-0'
          style={{
            width: '500px',
            height: '500px',
            bottom: '-150px',
            left: '-100px',
            background: 'rgba(255, 101, 51, 0.35)',
            borderRadius: '50%',
            filter: 'blur(120px)',
          }}
        />
      )}

      {/* Right top-to-bottom glow — desktop only */}
      {isDarkBg && (
        <div
          aria-hidden='true'
          className='hidden xl:block pointer-events-none absolute z-0'
          style={{
            width: '450px',
            height: '600px',
            top: '-80px',
            right: '-100px',
            background: 'rgba(255, 101, 51, 0.30)',
            borderRadius: '50%',
            filter: 'blur(130px)',
          }}
        />
      )}

      <div className='container mx-auto px-5 xl:px-8 2xl:px-12 relative z-10'>
        {/* ── Mobile / Tablet: stacked layout ── */}
        <div className='xl:hidden'>
          {/* Text block */}
          <div className='mb-12'>
            {/* Badge */}
            <div
              className='flex items-center gap-2 px-3 py-1.5 rounded-md w-fit mb-6'
              style={
                isDarkBg && !badge.light
                  ? {
                      background:
                        'linear-gradient(90deg, rgba(46,34,30,0.98) 0%, rgba(38,30,28,0.92) 50%, rgba(28,22,20,0.88) 100%)',
                      border: '1px solid rgba(255,255,255,0.03)',
                    }
                  : {
                      background: '#f0ddd8',
                      border: '1px solid #e5cac3',
                    }
              }
            >
              {badge.icon ? (
                badge.icon
              ) : (
                <div className='relative flex items-center justify-center w-3.5 h-3.5'>
                  {isDarkBg && !badge.light ? (
                    <>
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
                          background:
                            'linear-gradient(180deg, #ff8a5a, #ff6533)',
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <span className='absolute w-full h-full bg-orange-bg-cta rounded-full opacity-30' />
                      <span className='w-2 h-2 bg-orange-bg-cta rounded-full' />
                    </>
                  )}
                </div>
              )}
              <span
                className={`text-base font-medium ${isDarkBg && !badge.light ? 'text-white' : 'text-[#555]'}`}
              >
                {badge.text}
              </span>
            </div>

            {/* Heading */}
            <h2
              className={`text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight mb-4 ${isDarkBg ? 'bg-linear-to-br from-[#2F2F2F] to-[#BFBDBD] bg-clip-text text-transparent' : 'text-[#2F2F2F]'}`}
            >
              {heading}
              {subheading && <br />}
              {subheading}
            </h2>

            {/* Description */}
            {description.map((desc, idx) => (
              <p
                key={idx}
                className={`text-sm leading-relaxed ${isDarkBg ? 'text-[#AAAAAA]' : 'text-[#555]'} ${idx < description.length - 1 ? 'mb-3' : 'mb-8'}`}
              >
                {desc}
              </p>
            ))}

            {/* CTA */}
            {ctaText && (
              <Link
                to={ctaLink}
                className='inline-flex items-center gap-2 bg-orange-bg-cta hover:bg-[#d14608] text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors duration-200 cursor-pointer'
              >
                {ctaText}
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M5 12h14M12 5l7 7-7 7' />
                </svg>
              </Link>
            )}
          </div>

          {/* Cards — 1 col mobile, 2 col tablet */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {features.map((f, i) => (
              <FeatureCard
                key={f.id}
                feature={f}
                iconBg={iconBg}
                index={i}
                animateCards={animateCards}
              />
            ))}
          </div>
        </div>

        {/* ── Desktop: side-by-side layout ── */}
        <div className='hidden xl:flex items-center gap-16 2xl:gap-20'>
          {/* Left: Text */}
          <div className='w-[45%] shrink-0 flex flex-col gap-5'>
            {/* Badge */}
            <div
              className='flex items-center gap-2 px-3 py-1.5 border rounded-md w-fit'
              style={
                isDarkBg && !badge.light
                  ? {
                      background:
                        'linear-gradient(90deg, rgba(46,34,30,0.98) 0%, rgba(38,30,28,0.92) 50%, rgba(28,22,20,0.88) 100%)',
                      borderColor: 'rgba(255,255,255,0.03)',
                    }
                  : {
                      background: '#f0ddd8',
                      borderColor: '#e5cac3',
                    }
              }
            >
              {badge.icon ? (
                badge.icon
              ) : (
                <div className='relative flex items-center justify-center w-3.5 h-3.5'>
                  {isDarkBg && !badge.light ? (
                    <>
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
                          background:
                            'linear-gradient(180deg, #ff8a5a, #ff6533)',
                        }}
                      />
                    </>
                  ) : (
                    <>
                      <span className='absolute w-full h-full bg-orange-bg-cta rounded-full opacity-30' />
                      <span className='w-2 h-2 bg-orange-bg-cta rounded-full' />
                    </>
                  )}
                </div>
              )}
              <span
                className={`text-base font-medium ${isDarkBg && !badge.light ? 'text-white' : 'text-[#555]'}`}
              >
                {badge.text}
              </span>
            </div>

            {/* Heading */}
            <h2
              className={`text-3xl xl:text-4xl 2xl:text-5xl font-semibold leading-tight ${isDarkBg ? 'bg-linear-to-br from-[#2F2F2F] to-[#BFBDBD] bg-clip-text text-transparent' : 'text-[#2F2F2F]'}`}
            >
              {heading}
              {subheading && <br />}
              {subheading}
            </h2>

            {/* Divider line */}
            <div className='w-20 h-0.5 bg-orange-bg-cta rounded-full' />

            {/* Description */}
            {description.map((desc, idx) => (
              <p
                key={idx}
                className={`text-base md:text-lg lg:text-xl xl:text-2xl leading-relaxed ${isDarkBg ? 'text-[#AAAAAA]' : 'text-[#555]'}`}
              >
                {desc}
              </p>
            ))}

            {/* CTA */}
            {ctaText && (
              <Link
                to={ctaLink}
                className='flex items-center gap-2 bg-orange-bg-cta hover:bg-[#d14608] text-white px-6 py-3 rounded-md text-base font-semibold transition-colors duration-200 cursor-pointer w-fit mt-2'
              >
                {ctaText}
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M5 12h14M12 5l7 7-7 7' />
                </svg>
              </Link>
            )}
          </div>

          {/* Right: 2×2 feature cards */}
          <div className='flex-1 grid grid-cols-2 gap-4'>
            {features.map((f, i) => (
              <FeatureCard
                key={f.id}
                feature={f}
                iconBg={iconBg}
                index={i}
                animateCards={animateCards}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
