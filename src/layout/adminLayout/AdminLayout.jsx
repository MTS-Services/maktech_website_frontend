/**
 * Admin Layout Component
 * 
 * This is the main layout wrapper for all admin pages.
 * It provides a consistent structure with:
 * - Fixed left sidebar navigation
 * - Dynamic right content area that changes based on route
 * 
 * Architecture:
 * - Uses React Router's Outlet to render child routes
 * - Responsive design (sidebar collapses on mobile)
 * - Sticky sidebar that scrolls independently of content
 * 
 * Layout Structure:
 * ┌─────────────┬──────────────────┐
 * │             │                  │
 * │   Sidebar   │   Main Content   │
 * │   (Fixed)   │    (Scrolls)     │
 * │             │                  │
 * └─────────────┴──────────────────┘
 */

import { Outlet } from 'react-router-dom'
import Sidebar from './adminSidebar/AdminSidebar'

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Left Sidebar - Fixed, scrollable independently */}
      <aside className="w-72 shrink-0">
        <Sidebar />
      </aside>
      
      {/* Right Content Area - Scrollable, fills remaining space */}
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="container mx-auto p-8">
          {/* 
            Outlet renders the matched child route component
            This is where Dashboard, Emails, Leads, etc. will appear
          */}
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default AdminLayout
