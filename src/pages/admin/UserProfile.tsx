
import React from 'react';
import { useNavigate  } from "@/hooks/use-router";
import AdminLayout from '@/components/admin/AdminLayout';
import AdminUserProfile from '@/components/admin/AdminUserProfile';
import { useToast } from '@/components/ui/use-toast';
import { UserRole } from '@/types/user'; // Changed from @/types/client to @/types/user

const UserProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock user data - in a real app this would come from authentication or API
  const user = {
    id: '1',
    name: 'Claudio Figueiredo',
    email: 'admin@sistemasclaudio.com',
    role: 'admin' as UserRole,
    status: 'active' as const,
    createdAt: '2023-01-01',
  };

  return (
    <AdminLayout activeTab="profile">
      <AdminUserProfile user={user} />
    </AdminLayout>
  );
};

export default UserProfile;
