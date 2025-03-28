
import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface AuditHeaderProps {
  onNewAudit: () => void;
}

const AuditHeader: React.FC<AuditHeaderProps> = ({ onNewAudit }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Gestão de Auditorias</h2>
        <p className="text-muted-foreground">
          Gerencie auditorias, acompanhe status e delegue tarefas para sua equipe.
        </p>
      </div>
      <Button onClick={onNewAudit}>
        <Plus className="mr-2 h-4 w-4" />
        Nova Auditoria
      </Button>
    </div>
  );
};

export default AuditHeader;
