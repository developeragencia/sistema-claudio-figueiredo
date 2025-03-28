import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useClient, useUpdateClient } from '@/hooks/useClients';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import ClientForm from '@/components/clients/ClientForm';
import { hasPermission } from '@/lib/permissions';

const ClientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const {
    data: client,
    isLoading,
    error,
  } = useClient(id!);

  const updateClient = useUpdateClient();

  if (!hasPermission(user, 'clients.update')) {
    navigate('/clients');
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">
          Ocorreu um erro ao carregar o cliente. Tente novamente.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Editar Cliente</h1>
        <Button variant="outline" onClick={() => navigate('/clients')}>
          Voltar
        </Button>
      </div>

      <ClientForm
        client={client}
        onSubmit={async (data) => {
          try {
            await updateClient.mutateAsync({
              id: client.id,
              ...data,
            });
            toast({
              title: 'Cliente atualizado',
              description: 'O cliente foi atualizado com sucesso.',
            });
            navigate('/clients');
          } catch (error) {
            toast({
              title: 'Erro ao atualizar cliente',
              description: 'Ocorreu um erro ao atualizar o cliente. Tente novamente.',
              variant: 'destructive',
            });
          }
        }}
        isLoading={updateClient.isLoading}
      />
    </div>
  );
};

export default ClientDetails; 