
import React from 'react';
import { useParams  } from "@/hooks/use-router";
import AdminLayout from '@/components/admin/AdminLayout';
import ClientDetailView from '@/components/admin/tax-credits/components/client/ClientDetailView';

const ClientDetailPage = () => {
  const { clientId } = useParams<{ clientId: string }>();
  
  return (
    <AdminLayout activeTab={`client/${clientId}`}>
      <ClientDetailView />
    </AdminLayout>
  );
};

export default ClientDetailPage;
