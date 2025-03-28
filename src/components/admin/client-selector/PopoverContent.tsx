
import React from 'react';
import { Client } from '@/types/client';
import SearchInput from './SearchInput';
import ClientListItem from './ClientListItem';
import NoResultsFound from './NoResultsFound';

interface ClientSelectorContentProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  filteredClients: Client[];
  activeClient: Client | null;
  onSelectClient: (client: Client) => void;
}

const ClientSelectorContent = ({
  searchTerm,
  setSearchTerm,
  filteredClients,
  activeClient,
  onSelectClient
}: ClientSelectorContentProps) => {
  return (
    <>
      <div className="p-3 border-b">
        <h4 className="font-medium text-sm mb-1.5">Selecionar Cliente Ativo</h4>
        <SearchInput
          searchTerm={searchTerm}
          onChange={setSearchTerm}
        />
      </div>
      <div className="max-h-[300px] overflow-y-auto">
        {filteredClients.length > 0 ? (
          filteredClients.map((client) => (
            <ClientListItem
              key={client.id}
              client={client}
              isActive={activeClient?.id === client.id}
              onSelect={onSelectClient}
            />
          ))
        ) : (
          <NoResultsFound />
        )}
      </div>
    </>
  );
};

export default ClientSelectorContent;
