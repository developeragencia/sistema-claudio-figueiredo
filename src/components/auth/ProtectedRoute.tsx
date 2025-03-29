import React from 'react';
import { Navigate, useLocation  } from "@/hooks/use-router";
import { useAuth } from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredPermission
}) => {
  const { isAuthenticated, checkPermission, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login keeping the original URL as state
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiredPermission && !checkPermission(requiredPermission)) {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
