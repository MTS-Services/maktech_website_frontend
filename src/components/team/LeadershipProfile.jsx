const LeadershipProfile = ({
  orientation = 'image-left',
  headline,
  description,
  name,
  role,
  company = '',
  image,
  imageAlt,
}) => {
  const isImageLeft = orientation === 'image-left';
  const paragraphs = Array.isArray(description) ? description : [description];

  const imageBlock = (
    <div className='relative mx-auto w-full max-w-130 overflow-hidden rounded-4xl bg-[#1a0f08] aspect-[0.9] ring-1 ring-orange-bg-cta/30'>
      <img
        src={image}
        alt={imageAlt || name}
        className='h-full w-full object-cover'
        loading='lazy'
      />
      {/* Orange glow overlay — matches the warm gradient baked into the frame PNGs */}
      <div
        className='absolute inset-0 pointer-events-none rounded-4xl'
        style={{
          background:
            'radial-gradient(ellipse 80% 45% at 50% 100%, rgba(255,101,51,0.35) 0%, transparent 70%)',
        }}
        aria-hidden='true'
      />
    </div>
  );

  const textBlock = (
    <div className='flex flex-col gap-6 text-left'>
      <h3 className='text-[32px] sm:text-[36px] font-semibold leading-tight text-gray-bg-primary'>
        {headline}
      </h3>

      <div className='flex flex-col gap-3 text-base text-[#d4d4d4] leading-relaxed'>
        {paragraphs.map((para, idx) => (
          <p key={idx} className='m-0'>
            {para}
          </p>
        ))}
      </div>

      <div className='flex flex-col gap-0.5 text-white'>
        <span className='text-xl font-semibold'>{name}</span>
        <span className='text-lg'>{role}</span>
        {company ? (
          <span className='text-lg text-white/60'>{company}</span>
        ) : null}
      </div>
    </div>
  );

  return (
    <div
      className={`grid items-center gap-10 lg:gap-16 ${isImageLeft ? 'lg:grid-cols-[minmax(0,520px)_1fr]' : 'lg:grid-cols-[1fr_minmax(0,520px)]'}`}
    >
      {isImageLeft ? (
        <>
          {imageBlock}
          {textBlock}
        </>
      ) : (
        <>
          {textBlock}
          {imageBlock}
        </>
      )}
    </div>
  );
};

export default LeadershipProfile;
