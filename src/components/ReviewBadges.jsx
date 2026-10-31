const platforms = [
  {
    name: 'Google',
    href: 'https://share.google/SeKkXQlH7DvEzIuBr',
    label: 'Google Business Profile',
    logo: (
      <svg
        viewBox='0 0 272 92'
        className='h-6 sm:h-7 lg:h-8 w-auto'
        aria-label='Google'
      >
        <path
          fill='#4285F4'
          d='M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z'
        />
        <path
          fill='#EA4335'
          d='M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z'
        />
        <path
          fill='#4285F4'
          d='M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z'
        />
        <path fill='#34A853' d='M225 3v65h-9.5V3h9.5z' />
        <path
          fill='#EA4335'
          d='M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z'
        />
        <path
          fill='#4285F4'
          d='M35.29 41.41V32H67c.31 1.64.47 3.58.47 5.68 0 7.06-1.93 15.79-8.15 22.01-6.05 6.3-13.78 9.66-24.02 9.66C16.32 69.35.36 53.89.36 34.91.36 15.93 16.32.47 35.3.47c9.91 0 17.14 3.95 22.43 8.99l-6.38 6.38c-3.86-3.61-9.07-6.47-16.05-6.47-13.19 0-23.6 10.67-23.6 23.86 0 13.19 10.42 23.86 23.6 23.86 8.57 0 13.44-3.44 16.55-6.55 2.52-2.52 4.19-6.13 4.86-11.13H35.29z'
        />
      </svg>
    ),
  },
  {
    name: 'Clutch',
    href: 'https://clutch.co/profile/maktech',
    label: 'Clutch Profile',
    logo: (
      <svg
        viewBox='0 0 115 32'
        className='h-6 sm:h-7 lg:h-8 w-auto'
        aria-label='Clutch'
      >
        <path
          fill='#ffffff'
          d='M19.1 22.4c-2.4 1.8-5.3 2.8-8.4 2.8-7.5 0-10.7-5.3-10.7-10.6 0-6.1 4.2-11.1 11.2-11.1 2.8 0 5.4.8 7.6 2.3l-2.1 4.1c-1.7-1.1-3.6-1.7-5.5-1.7-4.1 0-6.4 3-6.4 6.4 0 3.7 2.4 6.2 6.3 6.2 1.9 0 3.8-.6 5.6-1.9l2.4 3.5zM24.7 1.1h4.8v23.5h-4.8V1.1zM47.7 8.3v16.3h-4.8v-2.3c-1.4 1.8-3.5 2.8-6.1 2.8-4.7 0-7.8-3.3-7.8-8.2V8.3h4.8v8.3c0 2.5 1.4 4.3 4 4.3 2.7 0 5.1-2 5.1-4.7V8.3h4.8zM57.6 4.3v4h5.2v4.2h-5.2v7.1c0 1.5.7 2.1 2.1 2.1.9 0 1.9-.3 2.7-.8l1.4 3.7c-1.5.9-3.4 1.3-5.2 1.3-4 0-5.8-2.1-5.8-5.9v-7.5h-3.3V8.3h3.3V4.3h4.8zM82.8 22.4c-2.4 1.8-5.3 2.8-8.4 2.8-7.5 0-10.7-5.3-10.7-10.6 0-6.1 4.2-11.1 11.2-11.1 2.8 0 5.4.8 7.6 2.3l-2.1 4.1c-1.7-1.1-3.6-1.7-5.5-1.7-4.1 0-6.4 3-6.4 6.4 0 3.7 2.4 6.2 6.3 6.2 1.9 0 3.8-.6 5.6-1.9l2.4 3.5zM99.3 1.1v9.1c1.3-1.4 3.2-2.4 5.5-2.4 4.8 0 7.8 3.5 7.8 8.4v8.4h-4.8v-7.9c0-2.8-1.5-4.5-4.1-4.5-2.8 0-4.4 2.1-4.4 4.8v7.6h-4.8V1.1h4.8z'
        />
        <circle cx='39.5' cy='14.6' r='3.2' fill='#ff3c00' />
      </svg>
    ),
  },
  {
    name: 'Trustpilot',
    href: 'https://www.trustpilot.com/review/maktechgroup.com',
    label: 'Trustpilot Review',
    logo: (
      <svg
        viewBox='0 0 135 32'
        className='h-6 sm:h-7 lg:h-8 w-auto'
        aria-label='Trustpilot'
      >
        <g transform='translate(0, 1.5)'>
          <polygon
            points='14.5,0 18.9,9.1 29,10.6 21.7,17.7 23.4,27.7 14.5,23 5.6,27.7 7.3,17.7 0,10.6 10.1,9.1'
            fill='#00b67a'
          />
          <polygon
            points='14.5,0 18.9,9.1 29,10.6 21.7,17.7 14.5,14'
            fill='#005128'
          />
        </g>
        <text
          x='36'
          y='22'
          fill='#ffffff'
          fontFamily='Inter, system-ui, sans-serif'
          fontWeight='700'
          fontSize='19'
          letterSpacing='-0.3px'
        >
          Trustpilot
        </text>
      </svg>
    ),
  },
];

const ReviewBadges = ({ className = '' }) => {
  return (
    <section
      aria-label='Reviews and ratings'
      className={`w-full bg-[#141414] border-y border-white/10 ${className}`}
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
              className='flex flex-col items-center justify-center py-7 sm:py-9 lg:py-11 px-6 group hover:bg-white/[0.03] transition-all duration-300'
            >
              {/* Brand Logo */}
              <div className='flex items-center justify-center h-8 transition-transform duration-300 group-hover:scale-105'>
                {platform.logo}
              </div>

              {/* Reviewed on + 5 stars */}
              <div className='flex items-center gap-2 mt-3.5'>
                <span className='text-white/70 text-xs sm:text-sm font-medium tracking-wide'>
                  Reviewed on
                </span>
                <div
                  className='flex items-center gap-0.5 text-[#FBBF24]'
                  aria-label='5 out of 5 stars'
                >
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className='w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current'
                      viewBox='0 0 20 20'
                      aria-hidden='true'
                    >
                      <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                    </svg>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewBadges;
