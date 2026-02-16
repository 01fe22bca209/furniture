import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('adminAuth') === 'true';

  // Clear auth if somehow invalid
  useEffect(() => {
    if (!isAuthenticated && location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
      localStorage.removeItem('adminAuth');
    }
  }, [isAuthenticated, location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
