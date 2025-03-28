
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import { Audit } from "@/types/audit";

interface AuditStatusCardsProps {
  audits: Audit[];
}

const AuditStatusCards: React.FC<AuditStatusCardsProps> = ({ audits }) => {
  const inProgressCount = audits.filter(audit => audit.status === "Em Andamento").length;
  const completedCount = audits.filter(audit => audit.status === "Concluída").length;
  const pendingCount = audits.filter(audit => audit.status === "Pendente").length;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Auditorias</CardTitle>
          <div className="rounded-full bg-primary/10 p-1">
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{audits.length}</div>
          <p className="text-xs text-muted-foreground">+2 no último mês</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
          <div className="rounded-full bg-blue-500/10 p-1">
            <Clock className="h-4 w-4 text-blue-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{inProgressCount}</div>
          <p className="text-xs text-muted-foreground">8 processos ativos</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
          <div className="rounded-full bg-green-500/10 p-1">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedCount}</div>
          <p className="text-xs text-muted-foreground">+3 este mês</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          <div className="rounded-full bg-amber-500/10 p-1">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pendingCount}</div>
          <p className="text-xs text-muted-foreground">Requer atenção</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditStatusCards;
