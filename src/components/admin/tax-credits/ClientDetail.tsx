import React, { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useParams  } from "@/hooks/use-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Building, Phone, Mail, Calendar, MapPin, User, FileText, Dna } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useClientStore } from '@/hooks/useClientStore';
import { Client } from '@/types/client';

interface ClientDetailProps {
  clientId?: string;
}

const ClientDetail: React.FC<ClientDetailProps> = ({ clientId }) => {
  const { toast } = useToast();
  const { clients } = useClientStore();
  const [activeTab, setActiveTab] = useState('profile');

  // Use useParams to get the clientId from the URL if it's not passed as a prop
  const { clientId: routeClientId } = useParams<{ clientId: string }>();
  const currentClientId = clientId || routeClientId;

  const client: Client | undefined = clients.find((c) => c.id === currentClientId);

  if (!client) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Cliente não encontrado</CardTitle>
          <CardDescription>O cliente especificado não foi encontrado.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Verifique o ID do cliente ou tente novamente mais tarde.</p>
        </CardContent>
      </Card>
    );
  }

  const handleCreateTaxCredit = () => {
    toast({
      title: 'Novo crédito tributário',
      description: 'Formulário de criação de crédito tributário aberto',
    });
  };

  const handleCreateRecoveryProcess = () => {
    toast({
      title: 'Novo processo de recuperação',
      description: 'Formulário de criação de processo de recuperação aberto',
    });
  };

  const handleCreateAudit = () => {
    toast({
      title: 'Nova auditoria',
      description: 'Formulário de criação de auditoria aberto',
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>{client.name}</CardTitle>
              <CardDescription>
                Detalhes e informações sobre o cliente selecionado
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateTaxCredit}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Crédito
              </Button>
              <Button onClick={handleCreateRecoveryProcess}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Novo Processo
              </Button>
              <Button onClick={handleCreateAudit}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Nova Auditoria
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Informações Gerais</h3>
              <div className="space-y-1">
                <p className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{client.cnpj}</span>
                </p>
                <p className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{client.contactName}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{client.contactEmail}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{client.contactPhone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Criado em:{' '}
                    {new Date(client.createdAt).toLocaleDateString()}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{client.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Dna className="h-4 w-4 text-muted-foreground" />
                  <span>Segmento: {client.segment}</span>
                </p>
                <p>
                  Status:{' '}
                  <Badge
                    className={
                      client.status === 'ACTIVE'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                    }
                  >
                    {client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </Badge>
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Informações Adicionais
              </h3>
              <div className="space-y-1">
                <p>
                  Tipo: {client.type === 'private' ? 'Privado' : 'Público'}
                </p>
              </div>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <h3 className="text-lg font-semibold mb-2">
              Créditos Tributários, Processos e Auditorias
            </h3>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="tax-credits">
                  <FileText className="mr-2 h-4 w-4" />
                  Créditos
                </TabsTrigger>
                <TabsTrigger value="recovery-processes">
                  <Building className="mr-2 h-4 w-4" />
                  Processos
                </TabsTrigger>
                <TabsTrigger value="audits">
                  <FileText className="mr-2 h-4 w-4" />
                  Auditorias
                </TabsTrigger>
              </TabsList>
              <TabsContent value="tax-credits">
                <p>Lista de créditos tributários do cliente.</p>
              </TabsContent>
              <TabsContent value="recovery-processes">
                <p>Lista de processos de recuperação do cliente.</p>
              </TabsContent>
              <TabsContent value="audits">
                <p>Lista de auditorias do cliente.</p>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientDetail;
