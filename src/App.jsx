/**
 * Root Application Component
 * 
 * This is the main App component that sets up routing for the entire application.
 * It uses React Router v6 with Router wrapper and routes imported from router.jsx.
 * 
 * Route Structure:
 * - / : Demo login page (entry point)
 * - /admin/* : Protected admin area with layout and nested routes
 *   - dashboard, emails, leads, orders, case-studies, blog, jobs, pricing
 */

import { BrowserRouter as Router } from 'react-router-dom'
import { useEffect } from 'react'
import Lenis from 'lenis'
import AppRoutes from './route/router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    })

    // Animation frame loop
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup on unmount
    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppRoutes />
      <ToastContainer
        position='bottom-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme='light'
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '14px',
        }}
      />
    </Router>
  );
}

export default App;
