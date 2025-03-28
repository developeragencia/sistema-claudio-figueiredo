
import React from 'react';
import { Activity, Filter, PlusCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import OpportunitiesTabContent from '@/components/admin/tax-credits/components/OpportunitiesTabContent';
import TabTitleSection from '@/components/admin/header/TabTitleSection';

const OpportunitiesPage: React.FC = () => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = React.useState(false);

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
  };

  const handleFilterOpportunities = () => {
    toast({
      title: "Filtrar oportunidades",
      description: "Opções de filtro para oportunidades de crédito.",
    });
  };

  return (
    <div className="space-y-6">
      <TabTitleSection 
        Icon={Activity} 
        title="Oportunidades de Crédito" 
        description="Identificação e gerenciamento de oportunidades de recuperação de créditos tributários."
      />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-semibold">Oportunidades Identificadas</h2>
          <p className="text-sm text-muted-foreground">Gerencie oportunidades de crédito detectadas para seus clientes</p>
        </div>
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

      <OpportunitiesTabContent />
    </div>
  );
};

export default OpportunitiesPage;
