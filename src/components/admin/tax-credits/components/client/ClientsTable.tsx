
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Building, 
  Eye, 
  MoreHorizontal, 
  Pencil, 
  Trash, 
  User, 
  Calendar, 
  CheckCircle, 
  XCircle
} from 'lucide-react';
import { useNavigate  } from "@/hooks/use-router";
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Client } from '@/types/client';
import { cn } from '@/lib/utils';
import ClientActiveToggle from '@/components/admin/client/ClientActiveToggle';
import ButtonEffect from '@/components/admin/common/ButtonEffect';

interface ClientsTableProps {
  clients: Client[];
  filteredClients: Client[];
  activeClient: Client | null;
  onViewClient: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
  onSetActiveClient: (client: Client) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({
  clients,
  filteredClients,
  activeClient,
  onViewClient,
  onEditClient,
  onDeleteClient,
  onSetActiveClient
}) => {
  const navigate = useNavigate();

  // Function to get badge for client status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Ativo</Badge>;
      case 'INACTIVE':
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Inativo</Badge>;
      case 'PROSPECT':
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Prospecto</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Cliente</TableHead>
            <TableHead className="w-[160px]">CNPJ</TableHead>
            <TableHead className="w-[140px]">Segmento</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead className="w-[120px]">Status</TableHead>
            <TableHead className="w-[150px]">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                <div className="flex flex-col items-center justify-center py-4">
                  <Building className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">Nenhum cliente encontrado.</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredClients.map((client) => (
              <TableRow 
                key={client.id} 
                className={cn(
                  "group",
                  activeClient?.id === client.id ? "bg-primary/5" : ""
                )}
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center",
                      client.type === 'public' 
                        ? "bg-blue-100 text-blue-600"
                        : "bg-purple-100 text-purple-600"
                    )}>
                      <Building className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-medium">{client.name}</div>
                      <div className="text-xs text-muted-foreground">{client.city}/{client.state}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-mono text-xs">{client.cnpj}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {client.segment}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <User className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-sm">{client.contactName}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(client.status)}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <ClientActiveToggle client={client} />

                    <ButtonEffect
                      onClick={() => onViewClient(client)}
                      variant="ghost"
                      size="sm"
                      icon={<Eye className="h-3.5 w-3.5" />}
                      tooltip="Ver detalhes"
                    />

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditClient(client)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onDeleteClient(client)}>
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientsTable;
