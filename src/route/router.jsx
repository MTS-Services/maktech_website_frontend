/**
 * Router Configuration
 * 
 * This file contains all route definitions for the application.
 * Routes are organized by:
 * - Public routes (Login)
 * - Admin routes (Protected with AdminLayout)
 * - Catch-all route (Redirect to login)
 */

import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/login/Login'
import AdminLayout from '../layout/adminLayout/AdminLayout'
import Dashboard from '../pages/admin/dashboard/Dashboard'
import ComingSoon from '../pages/ComingSoon'
import NotFound from '../pages/NotFound'

/**
 * AppRoutes Component
 * 
 * Renders all application routes with proper nesting and protection.
 * Use this component inside BrowserRouter.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route - Login Page */}
      <Route path="/login" element={<Login />} />
      
      {/* Admin Routes - Protected with AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Redirect /admin to /admin/dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        
        {/* Dashboard - Main admin page */}
        <Route path="dashboard" element={<Dashboard />} />
        
        {/* All other routes show "Coming Soon" placeholder */}
        <Route path="emails" element={<ComingSoon pageName="Emails" />} />
        <Route path="leads" element={<ComingSoon pageName="Leads" />} />
        <Route path="orders" element={<ComingSoon pageName="Orders" />} />
        <Route path="case-studies" element={<ComingSoon pageName="Case Studies" />} />
        <Route path="blog" element={<ComingSoon pageName="Blog" />} />
        <Route path="jobs" element={<ComingSoon pageName="Jobs" />} />
        <Route path="pricing" element={<ComingSoon pageName="Pricing" />} />
      </Route>

      {/* Catch-all route - 404 Not Found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes
