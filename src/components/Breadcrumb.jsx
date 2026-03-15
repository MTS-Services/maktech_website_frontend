const Breadcrumb = ({ label }) => (
  <nav aria-label='Breadcrumb'>
    <ol className='inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/20 text-sm text-white/70'>
      <li>
        <a href='/' className='hover:text-white transition-colors duration-150'>
          Home
        </a>
      </li>
      <li aria-hidden='true'>
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
      </li>
      <li>
        <span aria-current='page' className='text-white/90 font-medium'>
          {label}
        </span>
      </li>
    </ol>
  </nav>
);

export default Breadcrumb;
