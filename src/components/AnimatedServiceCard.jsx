import { Link } from 'react-router-dom'

/**
 * Shared "End-to-End Digital Solutions" card used on the Home and Services
 * pages so both animate identically (pair it with the useRevealOnce hook):
 *  - staggered fade/rise entrance the first time the grid scrolls into view
 *  - slow orange fill on hover, a lift, a soft white glow and a light sweep
 *  - a glow that follows the pointer, and a slow icon swap
 * Everything respects prefers-reduced-motion.
 */

// Entrance wrapper. Only this wrapper carries the staggered delay, so each
// card's hover reacts identically (no per-card hover lag).
export const RevealItem = ({ index, revealed, className = '', children }) => (
  <div
    style={{ transitionDelay: revealed ? `${index * 160}ms` : '0ms' }}
    className={`transition-[transform,opacity] duration-1100 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
      revealed
        ? 'translate-y-0 opacity-100'
        : 'translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100'
    } ${className}`}
  >
    {children}
  </div>
)

// Pointer-follow glow: feed the hovered position to CSS custom properties.
const trackPointer = (event) => {
  const rect = event.currentTarget.getBoundingClientRect()
  event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`)
  event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`)
}

const AnimatedServiceCard = ({ service, index, revealed }) => (
  <RevealItem index={index} revealed={revealed}>
    <div
      onPointerMove={trackPointer}
      className='group relative h-full overflow-hidden rounded-lg border border-white/10 bg-[#101515] p-6 backdrop-blur-sm transition-[transform,border-color,background-color,box-shadow] duration-1100 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-orange-bg-cta hover:bg-orange-bg-cta hover:shadow-[0_26px_55px_-14px_rgba(255,255,255,0.28)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:p-8'
    >
      {/* Pointer-follow glow (before the orange fill takes over) */}
      <span
        aria-hidden='true'
        className='pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden'
        style={{
          background:
            'radial-gradient(220px circle at var(--mx, 50%) var(--my, 0%), rgba(255,101,51,0.18), transparent 70%)',
        }}
      />
      {/* Light sweep on hover */}
      <span
        aria-hidden='true'
        className='pointer-events-none absolute -inset-y-6 -left-full w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent transition-[left] duration-1200 ease-out group-hover:left-[140%] motion-reduce:hidden'
      />

      {/* Card content sits above the overlays */}
      <div className='relative'>
        {/* Icon with hover effect */}
        <div className='mb-6 relative h-16 w-16'>
          {/* Default Icon - visible when not hovering */}
          <div className='absolute inset-0 text-white/60 opacity-80 transition-all duration-700 ease-out group-hover:opacity-0 group-hover:scale-75 group-hover:rotate-12'>
            <svg
              width='64'
              height='64'
              viewBox='0 0 32 32'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.5'
            >
              <rect x='4' y='4' width='10' height='10' />
              <rect x='18' y='4' width='10' height='10' />
              <rect x='4' y='18' width='10' height='10' />
              <rect x='18' y='18' width='10' height='10' />
            </svg>
          </div>
          {/* Hover Icon - visible when hovering */}
          <div className='absolute inset-0 opacity-0 scale-75 -rotate-12 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-80 group-hover:rotate-0'>
            <img
              src='/services_image/service/Frame 2147225682.svg'
              alt=''
              className='w-16 h-16 drop-shadow-lg'
            />
          </div>
        </div>

        {/* Title */}
        <h3 className='mb-3 text-lg font-semibold text-white group-hover:text-white transition-colors duration-500 md:text-xl'>
          {service.title}
        </h3>

        {/* Description */}
        <p className='mb-6 text-sm text-white/60 group-hover:text-white/90 leading-relaxed transition-colors duration-500 md:text-base'>
          {service.description}
        </p>

        {/* Read More Link */}
        <Link
          to={service.link}
          className='inline-flex items-center gap-2 text-orange-bg-cta group-hover:text-white font-medium transition-all duration-200 hover:gap-3 group'
        >
          Read More
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='transition-transform group-hover:translate-x-1'
          >
            <path d='M3 8h10M9 4l4 4-4 4' />
          </svg>
        </Link>
      </div>
    </div>
  </RevealItem>
)

export default AnimatedServiceCard
