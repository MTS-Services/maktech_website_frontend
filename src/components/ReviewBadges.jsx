const platforms = [
  {
    name: 'Google',
    href: 'https://share.google/SeKkXQlH7DvEzIuBr',
    image:
      'https://cdn.maktechgroup.com/media/1793434189024-e01cfae6-af56-4caa-a4b3-14fcdb762137.png',
  },
  {
    name: 'Clutch',
    href: 'https://clutch.co/profile/maktech',
    image:
      'https://cdn.maktechgroup.com/media/1793434198657-b256c1a4-1f74-406d-a19d-28ec37130041.png',
  },
  {
    name: 'Trustpilot',
    href: 'https://www.trustpilot.com/review/maktechgroup.com',
    image:
      'https://cdn.maktechgroup.com/media/1793434203345-870876a2-37f3-4d50-ae43-74bbfcbe7e5a.png',
  },
];

const ReviewBadges = ({ className = '' }) => {
  return (
    <section
      aria-label='Reviews and ratings'
      className={`w-full bg-transparent border-y border-white/10 ${className}`}
    >
      <div className='container mx-auto px-5 xl:px-8 2xl:px-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-x border-white/10'>
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`View Maktech reviews on ${platform.name}`}
              className='flex items-center justify-center py-7 sm:py-9 lg:py-11 px-6 group hover:bg-white/[0.03] transition-all duration-300'
            >
              <img
                src={platform.image}
                alt={`${platform.name} review badge`}
                loading='lazy'
                referrerPolicy='no-referrer'
                className='h-10 sm:h-11 lg:h-12 w-auto max-w-[220px] object-contain transition-transform duration-300 group-hover:scale-105'
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewBadges;
