import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const Pagination = ({ page, totalPages, pageRange, onPage }) => {
  if (totalPages <= 1) return null;
  return (
    <div className='flex items-center gap-1 flex-wrap'>
      <button
        type='button'
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        aria-label='Previous page'
        className='inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150'
      >
        <MdChevronLeft className='text-xl' aria-hidden='true' />
      </button>

      {pageRange.map((p, i) =>
        p === '…' ? (
          <span
            key={`ell-${i}`}
            className='w-9 h-9 inline-flex items-center justify-center text-gray-400 text-sm select-none'
          >
            &hellip;
          </span>
        ) : (
          <button
            key={p}
            type='button'
            onClick={() => onPage(p)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-colors duration-150 ${
              p === page
                ? 'bg-orange-bg-cta text-white border-transparent shadow-sm'
                : 'border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        type='button'
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        aria-label='Next page'
        className='inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors duration-150'
      >
        <MdChevronRight className='text-xl' aria-hidden='true' />
      </button>
    </div>
  );
};

export default Pagination;
