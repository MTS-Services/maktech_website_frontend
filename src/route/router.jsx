import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layout/adminLayout/AdminLayout";
import PublicLayout from "../layout/publicLayout/PublicLayout";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import OurTeam from "../pages/ourTeam/OurTeam";
import Career from "../pages/career/Career";
import ApplyJobs from "../pages/career/ApplyJobs";
import Contact from "../pages/contact/Contact";
// Lazy-loaded routes — each page is its own chunk, only parsed when visited
const Login = lazy(() => import("../pages/login/Login"));
const Dashboard = lazy(() => import("../pages/admin/dashboard/Dashboard"));
const Emails = lazy(() => import("../pages/admin/emails/Emails"));
const ComposePage = lazy(() => import("../pages/admin/compose/ComposePage"));
const Leads = lazy(() => import("../pages/admin/leads/Leads"));
const Orders = lazy(() => import("../pages/admin/orders/Orders"));
const CaseStudies = lazy(
  () => import("../pages/admin/caseStudies/CaseStudies"),
);
const Blog = lazy(() => import("../pages/admin/blog/Blog"));
const Jobs = lazy(() => import("../pages/admin/jobs/Jobs"));
const Pricing = lazy(() => import("../pages/admin/pricing/Pricing"));
const Services = lazy(() => import("../pages/services/Services"));
const ServiceUIUX = lazy(() => import("../pages/services/UIUX"));
const ServiceMERN = lazy(() => import("../pages/services/MERN"));
const ServiceFlutter = lazy(() => import("../pages/services/Flutter"));
const ServiceLaravel = lazy(() => import("../pages/services/Laravel"));
const ServiceShopify = lazy(() => import("../pages/services/Shopify"));
const ServiceWix = lazy(() => import("../pages/services/Wix"));
const ServiceDigitalMarketing = lazy(
  () => import("../pages/services/DigitalMarketing"),
);
const ServiceGraphicDesign = lazy(
  () => import("../pages/services/GraphicDesign"),
);
const ServiceWordPress = lazy(() => import("../pages/services/WordPress"));
const ServiceAIML = lazy(() => import("../pages/services/AIML"));
const ServiceSASProduct = lazy(() => import("../pages/services/SASProduct"));
const ComingSoon = lazy(() => import("../pages/ComingSoon"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => (
  <Suspense fallback={null}>
    <Routes>
      {/* Public Routes - with shared Navbar */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/services" element={<Services />}></Route>
        <Route path="/services/ui-ux" element={<ServiceUIUX />}></Route>
        <Route path="/services/mern" element={<ServiceMERN />}></Route>
        <Route path="/services/flutter" element={<ServiceFlutter />}></Route>
        <Route path="/services/laravel" element={<ServiceLaravel />}></Route>
        <Route path="/services/shopify" element={<ServiceShopify />}></Route>
        <Route path="/services/wix" element={<ServiceWix />}></Route>
        <Route
          path="/services/digital-marketing"
          element={<ServiceDigitalMarketing />}
        ></Route>
        <Route
          path="/services/graphic-design"
          element={<ServiceGraphicDesign />}
        ></Route>
        <Route
          path="/services/wordpress"
          element={<ServiceWordPress />}
        ></Route>
        <Route path="/services/ai-ml" element={<ServiceAIML />}></Route>
        <Route
          path="/services/sas-product"
          element={<ServiceSASProduct />}
        ></Route>
        <Route path="/pricing" element={<ComingSoon />} />
        <Route path="/case-study" element={<ComingSoon />} />
        <Route path="/company" element={<ComingSoon />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/career" element={<Career />} />
        <Route path="/apply-jobs" element={<ApplyJobs />} />
      </Route>
      <Route path="/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="emails" element={<Emails />} />
        <Route path="compose" element={<ComposePage />} />
        <Route path="leads" element={<Leads />} />
        <Route path="orders" element={<Orders />} />
        <Route path="case-studies" element={<CaseStudies />} />
        <Route path="blog" element={<Blog />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="pricing" element={<Pricing />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
