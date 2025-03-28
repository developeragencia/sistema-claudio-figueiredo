import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import LoadingScreen from './LoadingScreen';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  roles?: string[];
}

export function ProtectedRoute({ 
  children, 
  requireAuth = true,
  roles = []
}: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // Mostra loading enquanto verifica autenticação
  if (isLoading) {
    return <LoadingScreen />;
  }

  // Se a rota requer autenticação e não há usuário logado
  if (requireAuth && !user) {
    // Salva a localização atual para redirecionar depois do login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Se a rota é de autenticação (login/registro) e já existe usuário logado
  if (!requireAuth && user) {
    // Redireciona para o dashboard
    return <Navigate to="/dashboard" replace />;
  }

  // Se há restrição de roles e o usuário não tem a role necessária
  if (roles.length > 0 && user?.roles && !roles.some(role => user.roles.includes(role))) {
    // Redireciona para página de acesso negado
    return <Navigate to="/unauthorized" replace />;
  }

  // Se passou por todas as verificações, renderiza o conteúdo
  return <>{children}</>;
} 