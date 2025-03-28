
import React, { useState } from 'react';
import { 
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import CurrentPlan from './CurrentPlan';
import NextPayment from './NextPayment';
import PaymentMethods from './PaymentMethods';
import Invoices from './Invoices';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const BillingContent: React.FC = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Informações atualizadas",
        description: "As informações de faturamento foram atualizadas com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Faturamento</h1>
          <p className="text-muted-foreground">
            Gerencie suas faturas e pagamentos
          </p>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleRefresh}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="invoices">Faturas</TabsTrigger>
          <TabsTrigger value="payment-methods">Métodos de Pagamento</TabsTrigger>
          <TabsTrigger value="plans">Planos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CurrentPlan />
            <NextPayment />
            <PaymentMethods />
          </div>
          <Invoices />
        </TabsContent>
        
        <TabsContent value="invoices">
          <Invoices />
        </TabsContent>
        
        <TabsContent value="payment-methods">
          <PaymentMethods />
        </TabsContent>
        
        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Seu plano atual</h2>
              <CurrentPlan />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Próximo pagamento</h2>
              <NextPayment />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingContent;
