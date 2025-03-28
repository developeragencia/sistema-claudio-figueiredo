import React, { useState } from 'react';
import { Building, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useActiveClient } from '@/hooks/useActiveClient';
import { Client } from '@/types/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';
import ClientSelectorContent from './client-selector/PopoverContent';

// Mock clients data - replace with API call in production
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Prefeitura Municipal de São Paulo',
    cnpj: '12.345.678/0001-01',
    documentNumber: '12.345.678/0001-01',
    status: 'ACTIVE',
    type: 'public',
    segment: 'Municipal',
    createdAt: '2023-01-01',
    updatedAt: '2023-01-01',
    email: 'contato@prefeitura.sp.gov.br',
    phone: '(11) 1234-5678',
    city: 'São Paulo',
    state: 'SP',
    contactName: 'João Silva',
    contactEmail: 'joao.silva@prefeitura.sp.gov.br',
    contactPhone: '(11) 1234-5678',
  },
  {
    id: '2',
    name: 'Secretaria Estadual de Educação',
    cnpj: '23.456.789/0001-02',
    documentNumber: '23.456.789/0001-02',
    status: 'ACTIVE',
    type: 'public',
    segment: 'Estadual',
    createdAt: '2023-02-15',
    updatedAt: '2023-02-15',
    email: 'contato@educacao.sp.gov.br',
    phone: '(11) 2345-6789',
    city: 'São Paulo',
    state: 'SP',
    contactName: 'Maria Souza',
    contactEmail: 'maria.souza@educacao.sp.gov.br',
    contactPhone: '(11) 2345-6789',
  },
  {
    id: '3',
    name: 'Hospital Municipal Dr. João Silva',
    cnpj: '34.567.890/0001-03',
    documentNumber: '34.567.890/0001-03',
    status: 'INACTIVE',
    type: 'public',
    segment: 'Saúde',
    createdAt: '2023-03-20',
    updatedAt: '2023-03-20',
    email: 'contato@hospital.sp.gov.br',
    phone: '(11) 3456-7890',
    city: 'São Paulo',
    state: 'SP',
    contactName: 'Carlos Santos',
    contactEmail: 'carlos.santos@hospital.sp.gov.br',
    contactPhone: '(11) 3456-7890',
  },
  {
    id: '4',
    name: 'Departamento de Infraestrutura',
    cnpj: '45.678.901/0001-04',
    documentNumber: '45.678.901/0001-04',
    status: 'PROSPECT',
    type: 'public',
    segment: 'Federal',
    createdAt: '2023-04-10',
    updatedAt: '2023-04-10',
    email: 'contato@infraestrutura.gov.br',
    phone: '(11) 4567-8901',
    city: 'Brasília',
    state: 'DF',
    contactName: 'Ana Oliveira',
    contactEmail: 'ana.oliveira@infraestrutura.gov.br',
    contactPhone: '(11) 4567-8901',
  },
  {
    id: '5',
    name: 'Universidade Estadual',
    cnpj: '56.789.012/0001-05',
    documentNumber: '56.789.012/0001-05',
    status: 'ACTIVE',
    type: 'public',
    segment: 'Educação',
    createdAt: '2023-05-05',
    updatedAt: '2023-05-05',
    email: 'contato@universidade.edu.br',
    phone: '(11) 5678-9012',
    city: 'Campinas',
    state: 'SP',
    contactName: 'Pedro Lima',
    contactEmail: 'pedro.lima@universidade.edu.br',
    contactPhone: '(11) 5678-9012',
  },
];

const ActiveClientSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { activeClient, setActiveClient, clearActiveClient } = useActiveClient();
  const { toast } = useToast();

  const filteredClients = mockClients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.cnpj.includes(searchTerm)
  );

  const handleSelectClient = (client: Client) => {
    setActiveClient(client);
    setIsOpen(false);
    toast({
      title: 'Cliente ativado',
      description: `${client.name} foi selecionado como cliente ativo.`,
    });
  };

  const handleClearClient = () => {
    clearActiveClient();
    toast({
      title: 'Cliente desativado',
      description: 'Nenhum cliente está ativo no momento.',
    });
  };

  return (
    <div className="flex items-center">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 gap-1 border-dashed",
              !activeClient && "text-muted-foreground"
            )}
          >
            <Building className="h-3.5 w-3.5" />
            {activeClient ? (
              <span className="max-w-[150px] truncate font-medium">
                {activeClient.name}
              </span>
            ) : (
              <span>Selecionar Cliente</span>
            )}
            <ChevronDown className="h-3.5 w-3.5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0" align="start">
          <ClientSelectorContent
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filteredClients={filteredClients}
            activeClient={activeClient}
            onSelectClient={handleSelectClient}
          />
        </PopoverContent>
      </Popover>

      {activeClient && (
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 ml-1 text-muted-foreground"
          onClick={handleClearClient}
        >
          <X className="h-3.5 w-3.5" />
        </Button>
      )}
    </div>
  );
};

export default ActiveClientSelector;
