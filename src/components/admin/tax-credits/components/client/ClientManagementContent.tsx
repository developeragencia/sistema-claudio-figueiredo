
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useActiveClient } from '@/hooks/useActiveClient';
import { useClientData } from '@/components/admin/tax-credits/hooks/useClientData';
import ClientSummaryCards from './ClientSummaryCards';
import ClientsTable from './ClientsTable';
import ClientHeader from './ClientHeader';
import { ClientActionHandlersProps } from './ClientActionHandlers';

interface ClientManagementContentProps extends ClientActionHandlersProps {}

const ClientManagementContent: React.FC<ClientManagementContentProps> = ({
  onCreateClient,
  onExportData,
  onImportData,
  onViewClient,
  onEditClient,
  onDeleteClient,
  onSetActiveClient
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { activeClient } = useActiveClient();
  const { clients, filteredClients } = useClientData(searchQuery);

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <ClientSummaryCards clients={clients} />
      
      {/* Clients Table */}
      <Card>
        <ClientHeader 
          onCreateClient={onCreateClient}
          onExportData={onExportData}
          onImportData={onImportData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <ClientsTable 
          filteredClients={filteredClients}
          clients={clients}
          activeClient={activeClient}
          onViewClient={onViewClient}
          onEditClient={onEditClient}
          onDeleteClient={onDeleteClient}
          onSetActiveClient={onSetActiveClient}
        />
      </Card>
    </div>
  );
};

export default ClientManagementContent;
