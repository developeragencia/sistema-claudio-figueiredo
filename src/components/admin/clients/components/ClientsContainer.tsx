
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import ClientsTable from './ClientsTable';
import ClientsFilters from './ClientsFilters';
import ClientForm from './ClientForm';
import { useClientStore } from '@/hooks/useClientStore';
import { Client } from '@/types/client';
import ClientConfigDialog from './ClientConfigDialog';
import ClientDetailDialog from './ClientDetailDialog';
import ClientsHeader from './ClientsHeader';

const ClientsContainer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const { allClients, addClient, updateClient, removeClient, setActiveClient } = useClientStore();
  
  const filteredClients = allClients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.documentNumber.includes(searchQuery);
    
    const matchesStatus = statusFilter ? client.status === statusFilter : true;
    
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Dados atualizados com sucesso');
    }, 1000);
  };

  const handleCreateClient = () => {
    console.log("Creating new client...");
    setSelectedClient(null);
    setIsEditMode(false);
    setIsFormOpen(true);
  };

  const handleViewClientDetails = (clientId: string) => {
    const client = allClients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      setIsDetailOpen(true);
    }
  };
  
  const handleEditClient = (clientId: string) => {
    const client = allClients.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      setIsEditMode(true);
      setIsFormOpen(true);
    }
  };
  
  const handleDeleteClient = (clientId: string) => {
    const client = allClients.find(c => c.id === clientId);
    if (client) {
      removeClient(client.id);
      toast.success('Cliente removido com sucesso', {
        description: `O cliente ${client.name} foi excluído.`
      });
    }
  };
  
  const handleSetActiveClient = (clientId: string) => {
    const client = allClients.find(c => c.id === clientId);
    if (client) {
      setActiveClient(client);
    }
  };

  const handleSaveClient = (clientData: Partial<Client>) => {
    if (isEditMode && selectedClient) {
      updateClient(selectedClient.id, clientData);
      toast.success('Cliente atualizado com sucesso');
    } else {
      const newClient: Client = {
        id: Date.now().toString(),
        name: clientData.name || '',
        documentNumber: clientData.documentNumber || '',
        cnpj: clientData.documentNumber || '',
        email: clientData.email || '',
        phone: clientData.phone || '',
        address: clientData.address || '',
        city: clientData.city || '',
        state: clientData.state || '',
        contactName: clientData.contactName || '',
        contactEmail: clientData.contactEmail || '',
        contactPhone: clientData.contactPhone || '',
        segment: clientData.segment || '',
        type: clientData.type || 'private',
        status: clientData.status || 'ACTIVE',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      addClient(newClient);
      toast.success('Cliente adicionado com sucesso');
    }
    
    setIsFormOpen(false);
  };
  
  const handleOpenConfig = () => {
    setIsConfigOpen(true);
  };
  
  const handleExportData = (format: string) => {
    toast.success('Exportando dados', {
      description: `Os dados estão sendo exportados no formato ${format.toUpperCase()}`
    });
  };
  
  const handleImportData = () => {
    toast.info('Importar dados', {
      description: 'Selecione um arquivo para importar clientes'
    });
  };

  return (
    <div className="space-y-6">
      <ClientsHeader 
        isLoading={isLoading}
        onCreateClient={handleCreateClient}
        onRefresh={handleRefresh}
        onExportData={handleExportData}
        onImportData={handleImportData}
        onOpenConfig={handleOpenConfig}
      />

      <ClientsFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <Card>
        <ClientsTable 
          clients={filteredClients} 
          isLoading={isLoading} 
          onViewDetails={handleViewClientDetails}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
          onSetActiveClient={handleSetActiveClient}
        />
      </Card>

      <ClientForm
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveClient}
        initialData={selectedClient}
        isEdit={isEditMode}
      />
      
      <ClientConfigDialog
        open={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
      />

      {selectedClient && (
        <ClientDetailDialog
          client={selectedClient}
          open={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          onEdit={() => {
            setIsDetailOpen(false);
            setIsEditMode(true);
            setIsFormOpen(true);
          }}
          onDelete={() => {
            setIsDetailOpen(false);
            removeClient(selectedClient.id);
            toast.success('Cliente removido com sucesso');
          }}
          onSetActive={() => {
            setIsDetailOpen(false);
            setActiveClient(selectedClient);
            toast.success(`${selectedClient.name} definido como cliente ativo`);
          }}
        />
      )}
    </div>
  );
};

export default ClientsContainer;
