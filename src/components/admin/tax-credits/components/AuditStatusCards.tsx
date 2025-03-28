
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuditSummary } from '@/types/audit';
import { LineChart, CheckCircle, AlertTriangle, Clock } from 'lucide-react';

interface AuditStatusCardsProps {
  summary: AuditSummary;
  className?: string; // Added className as optional prop
}

const AuditStatusCards: React.FC<AuditStatusCardsProps> = ({ summary, className }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ${className || ''}`}>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Auditorias</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.totalAudits || summary.total}</div>
          <p className="text-xs text-muted-foreground">
            Todas as auditorias no sistema
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.inProgressAudits || summary.emAndamento}</div>
          <p className="text-xs text-muted-foreground">
            Auditorias em processamento
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.pendingAudits || summary.pendentes}</div>
          <p className="text-xs text-muted-foreground">
            Auditorias aguardando início
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Concluídas</CardTitle>
          <CheckCircle className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summary.completedAudits || summary.concluidas}</div>
          <p className="text-xs text-muted-foreground">
            Auditorias finalizadas
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditStatusCards;
