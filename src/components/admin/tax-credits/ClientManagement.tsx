
import React from 'react';
import { useClientActionHandlers } from './components/client/ClientActionHandlers';
import ClientManagementContent from './components/client/ClientManagementContent';

const ClientManagement = () => {
  const actionHandlers = useClientActionHandlers();
  
  return (
    <ClientManagementContent
      onCreateClient={actionHandlers.onCreateClient}
      onExportData={actionHandlers.onExportData}
      onImportData={actionHandlers.onImportData}
      onViewClient={actionHandlers.onViewClient}
      onEditClient={actionHandlers.onEditClient}
      onDeleteClient={actionHandlers.onDeleteClient}
      onSetActiveClient={actionHandlers.onSetActiveClient}
    />
  );
};

export default ClientManagement;
