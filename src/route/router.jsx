/**
 * Router Configuration
 *
 * This file contains all route definitions for the application.
 * Routes are organized by:
 * - Public routes (Login)
 * - Admin routes (Protected with AdminLayout)
 * - Catch-all route (Redirect to login)
 */

import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import AdminLayout from "../layout/adminLayout/AdminLayout";
import PublicLayout from "../layout/publicLayout/PublicLayout";
import Dashboard from "../pages/admin/dashboard/Dashboard";
import ComingSoon from "../pages/ComingSoon";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/Home";

/**
 * AppRoutes Component
 *
 * Renders all application routes with proper nesting and protection.
 * Use this component inside BrowserRouter.
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes - with shared Navbar */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Public Route - Login Page */}
      <Route path="/login" element={<Login />} />

      {/* Admin Routes - Protected with AdminLayout */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* Redirect /admin to /admin/dashboard */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />

        {/* Dashboard - Main admin page */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* All other routes show "Coming Soon" placeholder */}
        <Route path="emails" element={<ComingSoon />} />
        <Route path="leads" element={<ComingSoon />} />
        <Route path="orders" element={<ComingSoon />} />
        <Route path="case-studies" element={<ComingSoon />} />
        <Route path="blog" element={<ComingSoon />} />
        <Route path="jobs" element={<ComingSoon />} />
        <Route path="pricing" element={<ComingSoon />} />
      </Route>

      {/* Catch-all route - 404 Not Found page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
