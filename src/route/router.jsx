import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/adminLayout/AdminLayout';

// Lazy-loaded routes — each page is its own chunk, only parsed when visited
const Login = lazy(() => import('../pages/login/Login'));
const Dashboard = lazy(() => import('../pages/admin/dashboard/Dashboard'));
const ComingSoon = lazy(() => import('../pages/ComingSoon'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => (
  <Suspense fallback={null}>
    <Routes>
      <Route path='/login' element={<Login />} />

      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Navigate to='/admin/dashboard' replace />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='emails' element={<ComingSoon pageName='Emails' />} />
        <Route path='leads' element={<ComingSoon pageName='Leads' />} />
        <Route path='orders' element={<ComingSoon pageName='Orders' />} />
        <Route
          path='case-studies'
          element={<ComingSoon pageName='Case Studies' />}
        />
        <Route path='blog' element={<ComingSoon pageName='Blog' />} />
        <Route path='jobs' element={<ComingSoon pageName='Jobs' />} />
        <Route path='pricing' element={<ComingSoon pageName='Pricing' />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
