import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { useProposals } from '@/hooks/useProposals';
import { useContracts } from '@/hooks/useContracts';

export function DashboardAlerts() {
  const { data: proposalsData } = useProposals({});
  const { data: contractsData } = useContracts({});

  const proposalsInAnalysis = proposalsData?.items?.filter(p => p.status === 'ANALYSIS').length || 0;
  const expiringContracts = contractsData?.items?.filter(c => {
    if (!c.end_date) return false;
    const endDate = new Date(c.end_date);
    const today = new Date();
    const daysUntilExpiration = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiration <= 30 && daysUntilExpiration > 0;
  }).length || 0;

  const expiredContracts = contractsData?.items?.filter(c => {
    if (!c.end_date) return false;
    const endDate = new Date(c.end_date);
    const today = new Date();
    return endDate < today;
  }).length || 0;

  return (
    <div className="space-y-4">
      {proposalsInAnalysis > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Propostas em Análise</AlertTitle>
          <AlertDescription>
            Existem {proposalsInAnalysis} proposta{proposalsInAnalysis > 1 ? 's' : ''} aguardando análise.
          </AlertDescription>
        </Alert>
      )}

      {expiringContracts > 0 && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Contratos a Vencer</AlertTitle>
          <AlertDescription>
            {expiringContracts} contrato{expiringContracts > 1 ? 's' : ''} irá{expiringContracts > 1 ? 'ão' : ''} vencer nos próximos 30 dias.
          </AlertDescription>
        </Alert>
      )}

      {expiredContracts > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Contratos Vencidos</AlertTitle>
          <AlertDescription>
            Existem {expiredContracts} contrato{expiredContracts > 1 ? 's' : ''} vencido{expiredContracts > 1 ? 's' : ''}.
          </AlertDescription>
        </Alert>
      )}

      {proposalsInAnalysis === 0 && expiringContracts === 0 && expiredContracts === 0 && (
        <Alert variant="default">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Tudo em Ordem</AlertTitle>
          <AlertDescription>
            Não há alertas pendentes no momento.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
} 