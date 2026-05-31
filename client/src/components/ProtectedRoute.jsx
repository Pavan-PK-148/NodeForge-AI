import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  const location = useLocation();

  // If no token, redirect to login, but save the intended destination
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}