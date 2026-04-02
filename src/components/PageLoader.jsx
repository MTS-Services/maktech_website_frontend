const PageLoader = () => (
  <div
    className='fixed inset-0 flex flex-col items-center justify-center bg-black-bg z-50 overflow-hidden'
    role='status'
    aria-label='Loading page'
  >
    {/* Animated top progress bar */}
    <div className='absolute top-0 left-0 right-0 h-0.5 overflow-hidden'>
      <div className='h-full w-full bg-orange-bg-cta loader-bar' />
    </div>

    {/* Ambient radial glow */}
    <div
      className='absolute inset-0 pointer-events-none loader-glow'
      style={{
        background:
          'radial-gradient(ellipse 520px 420px at 50% 50%, rgba(255,101,51,0.13) 0%, transparent 72%)',
      }}
    />

    {/* Logo + dots */}
    <div className='relative flex flex-col items-center gap-9 loader-content'>
      <img
        src='/maktech_logo_white.webp'
        alt='maktech'
        className='h-10 w-auto select-none'
        draggable='false'
      />

      {/* Staggered pulse dots */}
      <div className='flex items-center gap-1.75' aria-hidden='true'>
        <span className='loader-dot block w-1.75 h-1.75 rounded-full bg-orange-bg-cta' />
        <span className='loader-dot block w-1.75 h-1.75 rounded-full bg-orange-bg-cta' />
        <span className='loader-dot block w-1.75 h-1.75 rounded-full bg-orange-bg-cta' />
      </div>
    </div>
  </div>
);

export default PageLoader;
