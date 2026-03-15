import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../layout/adminLayout/AdminLayout';
import PublicLayout from '../layout/publicLayout/PublicLayout';
import Home from '../pages/home/Home';
import About from '../pages/about/About';

// Lazy-loaded routes — each page is its own chunk, only parsed when visited
const Login = lazy(() => import('../pages/login/Login'));
const Dashboard = lazy(() => import('../pages/admin/dashboard/Dashboard'));
const Emails = lazy(() => import('../pages/admin/emails/Emails'));
const ComposePage = lazy(() => import('../pages/admin/compose/ComposePage'));
const Leads = lazy(() => import('../pages/admin/leads/Leads'));
const Orders = lazy(() => import('../pages/admin/orders/Orders'));
const CaseStudies = lazy(
  () => import('../pages/admin/caseStudies/CaseStudies'),
);
const Blog = lazy(() => import('../pages/admin/blog/Blog'));
const Jobs = lazy(() => import('../pages/admin/jobs/Jobs'));
const Pricing = lazy(() => import('../pages/admin/pricing/Pricing'));
const ComingSoon = lazy(() => import('../pages/ComingSoon'));
const NotFound = lazy(() => import('../pages/NotFound'));

const AppRoutes = () => (
  <Suspense fallback={null}>
    <Routes>
      {/* Public Routes - with shared Navbar */}
      <Route element={<PublicLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Route>
      <Route path='/login' element={<Login />} />

      <Route path='/admin' element={<AdminLayout />}>
        <Route index element={<Navigate to='/admin/dashboard' replace />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='emails' element={<Emails />} />
        <Route path='compose' element={<ComposePage />} />
        <Route path='leads' element={<Leads />} />
        <Route path='orders' element={<Orders />} />
        <Route path='case-studies' element={<CaseStudies />} />
        <Route path='blog' element={<Blog />} />
        <Route path='jobs' element={<Jobs />} />
        <Route path='pricing' element={<Pricing />} />
      </Route>

      <Route path='*' element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
