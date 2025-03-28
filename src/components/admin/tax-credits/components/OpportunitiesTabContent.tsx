
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpportunityCard from './OpportunityCard';
import OpportunityDetailsModal from './OpportunityDetailsModal';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCw, Filter, PlusCircle } from 'lucide-react';

const OpportunitiesTabContent: React.FC = () => {
  const [selectedOpportunity, setSelectedOpportunity] = useState<any | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Sample data for opportunities
  const opportunities = [
    {
      id: 'OP-001',
      title: "Crédito de PIS/COFINS sobre insumos",
      client: "Empresa ABC Ltda",
      value: "R$ 345.678,90",
      confidence: 94,
      date: "01/07/2023",
      status: "Disponível"
    },
    {
      id: 'OP-002',
      title: "Compensação de IRPJ",
      client: "XYZ Indústria S.A.",
      value: "R$ 156.789,23",
      confidence: 87,
      date: "28/06/2023",
      status: "Disponível"
    },
    {
      id: 'OP-003',
      title: "Exclusão do ICMS da base de PIS/COFINS",
      client: "Tech Solutions Ltda",
      value: "R$ 567.123,45",
      confidence: 96,
      date: "15/06/2023",
      status: "Em análise"
    },
    {
      id: 'OP-004',
      title: "Crédito Extemporâneo de IPI",
      client: "Comércio Geral Ltda",
      value: "R$ 89.456,78",
      confidence: 82,
      date: "10/06/2023",
      status: "Em análise"
    },
    {
      id: 'OP-005',
      title: "Ressarcimento de ICMS-ST",
      client: "Distribuidora Norte Ltda",
      value: "R$ 123.987,65",
      confidence: 91,
      date: "05/06/2023",
      status: "Aprovado"
    },
    {
      id: 'OP-006',
      title: "Compensação de INSS sobre folha",
      client: "Serviços Gerais S.A.",
      value: "R$ 234.567,89",
      confidence: 88,
      date: "01/06/2023",
      status: "Aprovado"
    }
  ];

  const handleCardClick = (opportunity: any) => {
    setSelectedOpportunity(opportunity);
    setIsDetailsModalOpen(true);
  };

  const closeModal = () => {
    setIsDetailsModalOpen(false);
  };

  const handleStartRecovery = (opportunityId: string) => {
    const opportunity = opportunities.find(op => op.id === opportunityId);
    if (!opportunity) return;
    
    toast({
      title: "Iniciando recuperação",
      description: `Processo de recuperação para ${opportunity.title} iniciado com sucesso.`,
    });
    
    // Navigate to tax credits page or recovery page
    navigate('/admin/tax_credits');
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate refresh operation
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Dados atualizados",
        description: "Lista de oportunidades atualizada com sucesso.",
      });
    }, 1500);
  };

  const handleCreateOpportunity = () => {
    toast({
      title: "Nova oportunidade",
      description: "Formulário para criar nova oportunidade de crédito.",
    });
    // You could open a modal here for creating new opportunities
  };

  const handleFilterOpportunities = () => {
    toast({
      title: "Filtrar oportunidades",
      description: "Opções de filtro para oportunidades de crédito.",
    });
    // You could open a filter dialog here
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h2 className="text-xl font-semibold">Oportunidades de Crédito</h2>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent mr-2" />
                  <span>Atualizando...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  <span>Atualizar</span>
                </>
              )}
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleFilterOpportunities}
            >
              <Filter className="h-4 w-4 mr-2" />
              <span>Filtrar</span>
            </Button>
            <Button 
              size="sm"
              onClick={handleCreateOpportunity}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Nova Oportunidade</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id}>
              <OpportunityCard
                id={opportunity.id}
                title={opportunity.title}
                client={opportunity.client}
                value={opportunity.value}
                confidence={opportunity.confidence}
                date={opportunity.date}
                status={opportunity.status as any}
                onClick={() => handleCardClick(opportunity)}
                onViewDetails={() => handleCardClick(opportunity)}
                onStartRecovery={() => handleStartRecovery(opportunity.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <OpportunityDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={closeModal}
        opportunity={selectedOpportunity}
        onStartRecovery={handleStartRecovery}
      />
    </>
  );
};

export default OpportunitiesTabContent;
