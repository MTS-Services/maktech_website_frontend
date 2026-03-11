/**
 * Public Layout Component
 *
 * Shared layout wrapper for all public-facing pages.
 * Provides a consistent structure with:
 * - Persistent floating Navbar (bottom-center of viewport)
 * - Dynamic content area via React Router's Outlet
 *
 * Layout Structure:
 * ┌──────────────────────────────┐
 * │                              │
 * │        Page Content          │
 * │         (Outlet)             │
 * │                              │
 * │   ┌──────────────────────┐   │
 * │   │    Floating Navbar   │   │
 * │   └──────────────────────┘   │
 * └──────────────────────────────┘
 */

import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const PublicLayout = () => {
  return (
    <>
      <Outlet />
      <Navbar />
    </>
  );
};

export default PublicLayout;
