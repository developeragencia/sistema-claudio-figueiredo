
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ClientsManagement from '@/components/admin/clients/ClientsManagement';

const ClientsPage = () => {
  return (
    <AdminLayout activeTab="clients">
      <ClientsManagement />
    </AdminLayout>
  );
};

export default ClientsPage;
