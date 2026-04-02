/**
 * PageLoader — full-screen loading indicator shown while lazy chunks load.
 *
 * Used as the <Suspense fallback> in router.jsx.
 * Matches the site's #1c1c1c background so there is no white flash on
 * navigation between code-split routes.
 */
const PageLoader = () => (
  <div
    className='fixed inset-0 flex items-center justify-center bg-black-bg z-50'
    role='status'
    aria-label='Loading page'
  >
    <div className='w-8 h-8 rounded-full border-2 border-orange-bg-cta/20 border-t-orange-bg-cta animate-spin' />
  </div>
);

export default PageLoader;
