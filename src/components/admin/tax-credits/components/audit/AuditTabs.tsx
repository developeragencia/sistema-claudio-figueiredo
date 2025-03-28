
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Audit } from "@/types/audit";
import AuditTabContent from './AuditTabContent';
import { Button } from "@/components/ui/button";
import { Filter, Download } from "lucide-react";

interface AuditTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  audits: Audit[];
  onViewDetails: (auditId: string) => void;
  onDownloadDocuments: (auditId: string) => void;
  onEdit: (auditId: string) => void;
  onDelete: (auditId: string) => void;
  onApprove: (auditId: string) => void;
}

const AuditTabs: React.FC<AuditTabsProps> = ({
  activeTab,
  setActiveTab,
  audits,
  onViewDetails,
  onDownloadDocuments,
  onEdit,
  onDelete,
  onApprove
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="pending">Pendentes</TabsTrigger>
        <TabsTrigger value="completed">Concluídas</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          </div>
        </div>
        
        <AuditTabContent 
          title="Auditorias Recentes"
          description="Visualize e gerencie todas as auditorias em andamento, pendentes e concluídas."
          audits={audits}
          onViewDetails={onViewDetails}
          onDownloadDocuments={onDownloadDocuments}
          onEdit={onEdit}
          onDelete={onDelete}
          onApprove={onApprove}
          showStatus={true}
          showPriority={true}
        />
      </TabsContent>
      
      <TabsContent value="pending" className="space-y-4">
        <AuditTabContent 
          title="Auditorias Pendentes"
          description="Gerencie todas as auditorias que estão pendentes de ação."
          audits={audits.filter(audit => audit.status === "Pendente")}
          onViewDetails={onViewDetails}
          onDownloadDocuments={onDownloadDocuments}
          onEdit={onEdit}
          onDelete={onDelete}
          onApprove={onApprove}
          showStatus={false}
          showPriority={true}
        />
      </TabsContent>
      
      <TabsContent value="completed" className="space-y-4">
        <AuditTabContent 
          title="Auditorias Concluídas"
          description="Visualize todas as auditorias que foram concluídas."
          audits={audits.filter(audit => audit.status === "Concluída")}
          onViewDetails={onViewDetails}
          onDownloadDocuments={onDownloadDocuments}
          onEdit={onEdit}
          onDelete={onDelete}
          onApprove={onApprove}
          showStatus={false}
          showPriority={false}
        />
      </TabsContent>
    </Tabs>
  );
};

export default AuditTabs;
