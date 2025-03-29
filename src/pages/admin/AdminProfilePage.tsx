import React from 'react';
import { useRouter } from 'next/navigation';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminProfileSettings from '@/components/admin/profile/AdminProfileSettings';
import { useToast } from '@/components/ui/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminProfilePage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAdminAuth();
  
  if (!user) {
    return null; // Ou um componente de carregamento
  }
  
  return (
    <AdminLayout activeTab="admin_profile">
      <AdminProfileSettings />
    </AdminLayout>
  );
};

export default AdminProfilePage;
