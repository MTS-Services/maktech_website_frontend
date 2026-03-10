/**
 * Dashboard Page Component
 * 
 * This is the main dashboard landing page shown after login.
 * It displays key metrics, statistics, and overview information.
 * 
 * Features:
 * - Welcome message
 * - Stats cards showing key metrics
 * - Quick actions section
 * - Integration with Redux for fetching data
 * 
 * This page serves as the home/default view for the admin area.
 */

import { MdDashboard } from 'react-icons/md'

const Dashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Good Morning, Admin!
          </h1>
          <p className="text-lg text-gray-600">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        {/* Coming Soon Card */}
        <div className="bg-linear-to-br from-orange-50 to-orange-100 rounded-2xl p-12 shadow-lg">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6">
            <MdDashboard className="text-4xl text-white" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Dashboard Coming Soon
          </h2>
          
          <p className="text-gray-700 mb-6 leading-relaxed max-w-md mx-auto">
            We&apos;re building an amazing dashboard experience with analytics, 
            charts, and real-time data visualization.
          </p>

          <div className="flex items-center justify-center gap-2 text-orange-600 font-semibold">
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
            <span>In Development</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
