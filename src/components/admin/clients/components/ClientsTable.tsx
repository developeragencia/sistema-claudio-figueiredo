import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Edit, Trash2, User, MoreHorizontal, UserCheck } from 'lucide-react';
import { Client } from '@/types/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import ClientDetailDialog from './ClientDetailDialog';
import { useToast } from '@/components/ui/use-toast';

interface ClientsTableProps {
  clients: Client[];
  isLoading: boolean;
  onViewDetails: (clientId: string) => void;
  onEditClient: (clientId: string) => void;
  onDeleteClient: (clientId: string) => void;
  onSetActiveClient: (clientId: string) => void;
}

const ClientsTable: React.FC<ClientsTableProps> = ({ 
  clients, 
  isLoading, 
  onViewDetails,
  onEditClient,
  onDeleteClient,
  onSetActiveClient
}) => {
  const [detailsClient, setDetailsClient] = useState<Client | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleViewDetails = (client: Client) => {
    setDetailsClient(client);
    setIsDetailsOpen(true);
  };
  
  const confirmDelete = (id: string) => {
    setClientToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirmed = () => {
    if (clientToDelete) {
      // Call the parent's delete function with the client ID
      onDeleteClient(clientToDelete);
      
      // Show toast notification
      toast({
        title: "Cliente excluído",
        description: "O cliente foi excluído com sucesso.",
        variant: "destructive",
      });
      
      // Reset state and close dialog
      setClientToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-3 px-4 text-left font-medium">Nome</th>
            <th className="py-3 px-4 text-left font-medium">CNPJ</th>
            <th className="py-3 px-4 text-left font-medium">Email</th>
            <th className="py-3 px-4 text-left font-medium">Telefone</th>
            <th className="py-3 px-4 text-left font-medium">Status</th>
            <th className="py-3 px-4 text-left font-medium">Criado em</th>
            <th className="py-3 px-4 text-left font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <tr key={`skeleton-${index}`} className="border-b">
                <td colSpan={7} className="py-4 px-4">
                  <div className="h-6 bg-secondary/50 rounded animate-pulse"></div>
                </td>
              </tr>
            ))
          ) : clients.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-4 px-4 text-center text-muted-foreground">
                Nenhum cliente encontrado.
              </td>
            </tr>
          ) : (
            clients.map((client) => (
              <tr key={client.id} className="border-b hover:bg-muted/50">
                <td className="py-3 px-4">{client.name}</td>
                <td className="py-3 px-4">{client.documentNumber}</td>
                <td className="py-3 px-4">{client.email}</td>
                <td className="py-3 px-4">{client.phone}</td>
                <td className="py-3 px-4">
                  <StatusBadge status={client.status} />
                </td>
                <td className="py-3 px-4">
                  {format(new Date(client.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                </td>
                <td className="py-3 px-4">
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => handleViewDetails(client)}
                      title="Ver detalhes"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Ver detalhes</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => onEditClient(client.id)}
                      title="Editar cliente"
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          title="Mais ações"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Mais ações</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onSetActiveClient(client.id)}>
                          <UserCheck className="mr-2 h-4 w-4" /> Definir como ativo
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => confirmDelete(client.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4 text-red-500" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      {/* Client Details Dialog */}
      {detailsClient && (
        <ClientDetailDialog
          client={detailsClient}
          open={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onEdit={() => {
            setIsDetailsOpen(false);
            onEditClient(detailsClient.id);
          }}
          onDelete={() => {
            setIsDetailsOpen(false);
            confirmDelete(detailsClient.id);
          }}
          onSetActive={() => {
            setIsDetailsOpen(false);
            onSetActiveClient(detailsClient.id);
          }}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir cliente</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirmed} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Status Badge component
const StatusBadge: React.FC<{ status: Client['status'] }> = ({ status }) => {
  const statusConfig = {
    ACTIVE: { label: 'Ativo', className: 'bg-green-500/20 text-green-700 hover:bg-green-500/30' },
    INACTIVE: { label: 'Inativo', className: 'bg-slate-500/20 text-slate-700 hover:bg-slate-500/30' }
  };

  const config = statusConfig[status];

  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export default ClientsTable;
