
import React from 'react';
import { Building, Calendar, Mail, MapPin, Phone, Shield, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Client } from '@/types/client';
import ClientOperationsAccess from '@/components/admin/client/ClientOperationsAccess';
import { useToast } from '@/components/ui/use-toast';

interface ClientInfoTabProps {
  client: Client;
}

const ClientInfoTab: React.FC<ClientInfoTabProps> = ({ client }) => {
  const { toast } = useToast();
  
  const handleCreateTaxCredit = () => {
    toast({
      title: "Novo crédito tributário",
      description: `Criando novo crédito para ${client.name}`,
    });
  };
  
  const handleCreateRecoveryProcess = () => {
    toast({
      title: "Novo processo de recuperação",
      description: `Criando novo processo para ${client.name}`,
    });
  };
  
  const handleCreateAudit = () => {
    toast({
      title: "Nova auditoria",
      description: `Criando nova auditoria para ${client.name}`,
    });
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
        <CardTitle className="text-lg">Detalhes do Cliente</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-semibold mb-2">Informações Gerais</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>CNPJ: {client.cnpj}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>Contato: {client.contactName}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>Email: {client.contactEmail}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>Telefone: {client.contactPhone}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Criado em: {new Date(client.createdAt).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Endereço: {client.address || 'Não informado'}, {client.city || 'N/A'}/{client.state || 'N/A'}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>Segmento: {client.segment}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-md font-semibold mb-2">Status e Tipo</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span>Status: </span>
                  {getStatusBadge()}
                </div>
                
                <div className="flex items-center gap-2">
                  <span>Tipo: </span>
                  <Badge variant="outline" className={client.type === 'public' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}>
                    {client.type === 'public' ? 'Público' : 'Privado'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-md font-semibold mb-2">Permissões e Acesso</h3>
              <ClientOperationsAccess client={client} />
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-md font-semibold mb-2">Ações Rápidas</h3>
              <div className="grid grid-cols-1 gap-2">
                <Button onClick={handleCreateTaxCredit} variant="outline" className="justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Crédito Tributário
                </Button>
                
                <Button onClick={handleCreateRecoveryProcess} variant="outline" className="justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Novo Processo de Recuperação
                </Button>
                
                <Button onClick={handleCreateAudit} variant="outline" className="justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova Auditoria
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientInfoTab;
