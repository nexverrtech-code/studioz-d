import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '@/services/auth.service';

/**
 * Route guard for the admin surface.
 *
 * ⚠️ Client-side only, and therefore NOT a security boundary — the bundle is
 * public and anyone can read it. It keeps the console out of casual view and
 * marks the exact place a real, server-verified guard belongs.
 *
 * The attempted path is passed through so a successful sign-in lands where
 * the user was actually going.
 */
export const RequireAuth = ({ children }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default RequireAuth;
