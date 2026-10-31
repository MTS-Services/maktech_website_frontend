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
      className={`w-full bg-transparent py-14 md:py-20 lg:py-24 ${className}`}
    >
      <div className='container mx-auto px-5 xl:px-8 2xl:px-12'>
        <div className='flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 md:gap-24 lg:gap-32'>
          {platforms.map((platform) => (
            <a
              key={platform.name}
              href={platform.href}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`View Maktech reviews on ${platform.name}`}
              className='flex items-center justify-center group transition-transform duration-300 hover:scale-105'
            >
              <img
                src={platform.image}
                alt={`${platform.name} review badge`}
                loading='lazy'
                referrerPolicy='no-referrer'
                className='h-10 sm:h-12 lg:h-14 w-auto max-w-[220px] object-contain transition-all duration-300 group-hover:opacity-100 opacity-90'
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewBadges;
