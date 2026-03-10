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
import AppRoutes from './route/router'

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <AppRoutes />
    </Router>
  )
}

export default App
