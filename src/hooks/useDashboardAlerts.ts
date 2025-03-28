import { useEffect, useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useProposals } from './useProposals';
import { useContracts } from './useContracts';

interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function useDashboardAlerts() {
  const { toast } = useToast();
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const { data: proposalsData } = useProposals();
  const { data: contractsData } = useContracts();

  useEffect(() => {
    const newAlerts: Alert[] = [];

    // Alerta para propostas pendentes há mais de 30 dias
    const longPendingProposals = proposalsData?.items?.filter(proposal => {
      const createdAt = new Date(proposal.created_at);
      const now = new Date();
      const diffDays = Math.floor((now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24));
      return proposal.status === 'ANALYSIS' && diffDays > 30;
    });

    if (longPendingProposals?.length > 0) {
      newAlerts.push({
        id: 'long-pending-proposals',
        type: 'warning',
        message: `${longPendingProposals.length} propostas estão pendentes há mais de 30 dias`,
        action: {
          label: 'Ver Propostas',
          onClick: () => window.location.href = '/propostas?status=ANALYSIS'
        }
      });
    }

    // Alerta para contratos próximos do vencimento (30 dias)
    const expiringContracts = contractsData?.items?.filter(contract => {
      const expiresAt = new Date(contract.expires_at);
      const now = new Date();
      const diffDays = Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    });

    if (expiringContracts?.length > 0) {
      newAlerts.push({
        id: 'expiring-contracts',
        type: 'info',
        message: `${expiringContracts.length} contratos vencem nos próximos 30 dias`,
        action: {
          label: 'Ver Contratos',
          onClick: () => window.location.href = '/contratos?status=ACTIVE'
        }
      });
    }

    // Alerta para alta taxa de rejeição de propostas (>50%)
    const rejectedProposals = proposalsData?.items?.filter(p => p.status === 'REJECTED').length || 0;
    const totalProposals = proposalsData?.total || 0;
    const rejectionRate = totalProposals > 0 ? (rejectedProposals / totalProposals) * 100 : 0;

    if (rejectionRate > 50) {
      newAlerts.push({
        id: 'high-rejection-rate',
        type: 'error',
        message: 'Taxa de rejeição de propostas está acima de 50%',
        action: {
          label: 'Analisar',
          onClick: () => window.location.href = '/relatorios'
        }
      });
    }

    // Alerta para crescimento positivo
    const previousMonthContracts = 0; // TODO: Implementar lógica para mês anterior
    const currentMonthContracts = contractsData?.total || 0;
    const growthRate = previousMonthContracts > 0 
      ? ((currentMonthContracts - previousMonthContracts) / previousMonthContracts) * 100 
      : 0;

    if (growthRate > 20) {
      newAlerts.push({
        id: 'positive-growth',
        type: 'success',
        message: `Crescimento de ${growthRate.toFixed(1)}% em contratos este mês!`
      });
    }

    setAlerts(newAlerts);

    // Mostrar toast para alertas críticos
    newAlerts
      .filter(alert => alert.type === 'error' || alert.type === 'warning')
      .forEach(alert => {
        toast({
          title: alert.type === 'error' ? 'Atenção!' : 'Aviso',
          description: alert.message,
          variant: alert.type === 'error' ? 'destructive' : 'default'
        });
      });
  }, [proposalsData, contractsData, toast]);

  return { alerts };
} 