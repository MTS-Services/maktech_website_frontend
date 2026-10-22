import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Check both localStorage and cookie (if available)
  let token = localStorage.getItem('authToken');
  if (!token && typeof document !== 'undefined') {
    const match = document.cookie.match(/(^|;)\s*authToken\s*=\s*([^;]+)/);
    if (match) {
      token = match[2];
      // Sync back to localStorage
      localStorage.setItem('authToken', token);
    }
  }

  const isAuthenticated = Boolean(token);

  if (!isAuthenticated) {
    // Preserve the attempted URL so Login can redirect back after sign-in
    return <Navigate to='/login' replace state={{ from: location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
