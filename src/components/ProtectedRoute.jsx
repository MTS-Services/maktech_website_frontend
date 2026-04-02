import { Navigate, useLocation } from 'react-router-dom';

/**
 * ProtectedRoute — redirects unauthenticated users to /login.
 *
 * The current implementation checks localStorage for an 'authToken' key,
 * consistent with how apiClient.js reads the token for API requests.
 *
 * Production upgrade path:
 *   Replace the localStorage check with a proper auth context that validates
 *   a JWT or reads a session cookie (httpOnly cookies via the backend are the
 *   OWASP-recommended approach — localStorage is susceptible to XSS).
 *
 * Usage in router.jsx:
 *   <Route path='/admin' element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = Boolean(localStorage.getItem('authToken'));

  if (!isAuthenticated) {
    // Preserve the attempted URL so Login can redirect back after sign-in
    return <Navigate to='/login' replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
