const ChevronIcon = () => (
  <svg
    width='12'
    height='12'
    viewBox='0 0 12 12'
    fill='none'
    aria-hidden='true'
  >
    <path
      d='M4.5 2.5L7.5 6L4.5 9.5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

/**
 * Breadcrumb component
 * - Simple usage:  <Breadcrumb label="Pricing" />  → Home › Pricing
 * - Multi-level:   <Breadcrumb crumbs={[{label:'Case Studies',href:'/case-study'},{label:'Laravel'},{label:'Project Name'}]} />
 *                  → Home › Case Studies › Laravel › Project Name
 */
const Breadcrumb = ({ label, crumbs }) => {
  // Build items array: always start with Home
  const items = crumbs ? crumbs : [{ label, href: undefined }];

  return (
    <nav aria-label='Breadcrumb'>
      <ol className='inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-sm text-white/70'>
        <li>
          <a
            href='/'
            className='hover:text-white transition-colors duration-150'
          >
            Home
          </a>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className='inline-flex items-center gap-2'>
              <ChevronIcon />
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className='text-white/90 font-medium'
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className='hover:text-white transition-colors duration-150'
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
