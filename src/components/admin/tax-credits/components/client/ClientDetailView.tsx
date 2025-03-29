
import React, { useState } from 'react';
import { useParams, useNavigate  } from "@/hooks/use-router";
import { FileText, Shield, Plus } from 'lucide-react';
import { useClientStore } from '@/hooks/useClientStore';
import { useActiveClient } from '@/hooks/useActiveClient';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';

// Import the new components
import DetailHeader from './DetailHeader';
import ClientInfoTab from './ClientInfoTab';
import EmptyTabContent from './EmptyTabContent';

const ClientDetailView = () => {
  const { clientId } = useParams<{ clientId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { clients, removeClient } = useClientStore();
  const [activeTab, setActiveTab] = useState('info');
  
  const client = clients.find(c => c.id === clientId);
  
  if (!client) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>Cliente não encontrado</CardTitle>
              <CardDescription>O cliente especificado não foi encontrado no sistema.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p>Verifique o ID do cliente ou navegue de volta para a lista de clientes.</p>
          <Button className="mt-4" onClick={() => navigate('/admin/clients')}>
            Ver todos os clientes
          </Button>
        </CardContent>
      </Card>
    );
  }
  
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
  
  return (
    <div className="space-y-6">
      {/* Header with client info and actions */}
      <DetailHeader client={client} />
      
      {/* Tabs for different sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-card border">
          <TabsTrigger value="info">Informações</TabsTrigger>
          <TabsTrigger value="tax-credits">Créditos Tributários</TabsTrigger>
          <TabsTrigger value="recovery">Processos de Recuperação</TabsTrigger>
          <TabsTrigger value="audits">Auditorias</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
        </TabsList>
        
        {/* Client Information Tab */}
        <TabsContent value="info" className="space-y-4">
          <ClientInfoTab client={client} />
        </TabsContent>
        
        {/* Tax Credits Tab */}
        <TabsContent value="tax-credits">
          <EmptyTabContent 
            title="Créditos Tributários"
            description="Gerenciamento de créditos tributários do cliente"
            actionLabel="Novo Crédito"
            icon={<FileText className="h-16 w-16 text-muted-foreground/60" />}
            onAction={handleCreateTaxCredit}
          />
        </TabsContent>
        
        {/* Recovery Processes Tab */}
        <TabsContent value="recovery">
          <EmptyTabContent 
            title="Processos de Recuperação"
            description="Gerenciamento de processos de recuperação do cliente"
            actionLabel="Novo Processo"
            icon={<FileText className="h-16 w-16 text-muted-foreground/60" />}
            onAction={handleCreateRecoveryProcess}
          />
        </TabsContent>
        
        {/* Audits Tab */}
        <TabsContent value="audits">
          <EmptyTabContent 
            title="Auditorias"
            description="Gerenciamento de auditorias do cliente"
            actionLabel="Nova Auditoria"
            icon={<Shield className="h-16 w-16 text-muted-foreground/60" />}
            onAction={handleCreateAudit}
          />
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents">
          <EmptyTabContent 
            title="Documentos"
            description="Gerenciamento de documentos do cliente"
            actionLabel="Novo Documento"
            icon={<FileText className="h-16 w-16 text-muted-foreground/60" />}
            onAction={() => toast({
              title: "Novo documento",
              description: `Criando novo documento para ${client.name}`,
            })}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetailView;
