
import React from 'react';
import { useNavigate  } from "@/hooks/use-router";
import { ArrowLeft, Edit, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Client } from '@/types/client';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ClientActiveToggle from '@/components/admin/client/ClientActiveToggle';
import ButtonEffect from '@/components/admin/common/ButtonEffect';
import { useToast } from '@/components/ui/use-toast';

interface DetailHeaderProps {
  client: Client;
}

const DetailHeader: React.FC<DetailHeaderProps> = ({ client }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleEditClient = () => {
    toast({
      title: "Editar cliente",
      description: `Editando cliente ${client.name}`,
    });
  };
  
  const handleDeleteClient = () => {
    if (confirm(`Tem certeza que deseja excluir o cliente ${client.name}?`)) {
      // Handle client deletion
      toast({
        title: "Cliente removido",
        description: `O cliente ${client.name} foi removido com sucesso.`,
        variant: "destructive"
      });
      navigate('/admin/clients');
    }
  };
  
  const getStatusBadge = () => {
    switch (client.status) {
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
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start gap-3">
            <Button variant="outline" size="icon" onClick={() => navigate('/admin/clients')}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <div>
              <div className="flex items-center gap-2">
                <CardTitle>{client.name}</CardTitle>
                {getStatusBadge()}
              </div>
              <CardDescription>
                {client.cnpj} • {client.type === 'public' ? 'Entidade Pública' : 'Entidade Privada'}
              </CardDescription>
            </div>
          </div>
          
          <div className="flex items-center gap-2 ml-auto">
            <ClientActiveToggle client={client} showDetails={true} />
            
            <ButtonEffect
              onClick={handleEditClient}
              icon={<Edit className="h-3.5 w-3.5" />}
              label="Editar"
              variant="outline"
              size="sm"
              tooltip="Editar informações do cliente"
            />
            
            <ButtonEffect
              onClick={handleDeleteClient}
              icon={<Trash className="h-3.5 w-3.5" />}
              label="Excluir"
              variant="destructive"
              size="sm"
              tooltip="Excluir cliente"
            />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default DetailHeader;
