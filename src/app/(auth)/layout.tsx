import { ReactNode, Suspense } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { redirect } from 'next/navigation';
import { QueryProvider } from '@/providers/query-provider';
import AdminLoading from '@/components/admin/AdminLoading';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const { user } = useAuth();

  if (!user) {
    redirect('/login');
  }

  return (
    <QueryProvider>
      <div className="min-h-screen bg-background">
        <Suspense fallback={<AdminLoading />}>
          {children}
        </Suspense>
      </div>
    </QueryProvider>
  );
} 