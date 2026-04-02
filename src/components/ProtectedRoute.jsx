import { Navigate, useLocation } from 'react-router-dom';

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
