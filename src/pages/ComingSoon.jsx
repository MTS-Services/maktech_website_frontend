/**
 * Coming Soon Placeholder Component
 * 
 * This is a reusable placeholder component shown for pages that are
 * not yet implemented. It provides a professional "under construction" message.
 * 
 * Props:
 * @param {string} pageName - The name of the page being developed
 * 
 * Usage:
 * <ComingSoon pageName="Emails" />
 * 
 * This component is used for:
 * - Emails, Leads, Orders, Case Studies, Blog, Jobs, Pricing pages
 */

import { MdConstruction } from 'react-icons/md'
import { useLocation } from 'react-router-dom'

const formatPageName = (pathSegment) => {
  if (!pathSegment) return 'This Page'
  return pathSegment
    .replace(/-/g, ' ')
    .split(' ')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

const ComingSoon = () => {
  const { pathname } = useLocation()
  const lastSegment = pathname.split('/').filter(Boolean).pop() || ''
  const pageName = formatPageName(lastSegment)

  return (
    <div className='flex items-center justify-center min-h-[70vh]'>
      <div className='text-center max-w-md'>
        {/* Construction Icon */}
        <div className='inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-6'>
          <MdConstruction className='text-5xl text-orange-600' />
        </div>

        {/* Coming Soon Heading */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Coming Soon</h1>

        {/* Page Name */}
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">{pageName}</h2>

        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          We&apos;re working hard to bring you this feature. The <strong>{pageName}</strong> page is currently under development and will be available soon.
        </p>

        {/* Progress Indicator */}
        <div className="bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
          <div className="bg-orange-500 h-full rounded-full animate-pulse" style={{ width: '45%' }}></div>
        </div>

        {/* Status Badge */}
        <div className='inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full'>
          <div className='w-2 h-2 bg-orange-600 rounded-full animate-pulse'></div>
          <span className='text-sm font-medium'>In Development</span>
        </div>

        {/* Additional Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Check back later or contact the development team for updates.</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
