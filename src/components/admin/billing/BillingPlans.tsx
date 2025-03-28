
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';

interface Plan {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export const BillingPlans = () => {
  const { toast } = useToast();
  const [showChangePlanDialog, setShowChangePlanDialog] = React.useState(false);
  const [selectedPlan, setSelectedPlan] = React.useState<Plan | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Plano Básico',
      description: 'Para pequenas empresas',
      price: 750,
      features: ['Acesso a recursos básicos', 'Suporte por email', 'Até 3 usuários'],
    },
    {
      id: 'business',
      name: 'Plano Empresarial',
      description: 'Para médias empresas',
      price: 1250,
      features: ['Acesso a todos os recursos', 'Suporte prioritário', 'Até 10 usuários'],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Plano Enterprise',
      description: 'Para grandes empresas',
      price: 2500,
      features: ['Acesso a todos os recursos', 'Suporte 24/7', 'Usuários ilimitados', 'API dedicada', 'Gerente de conta'],
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const handleChangePlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setShowChangePlanDialog(true);
  };

  const confirmPlanChange = () => {
    if (selectedPlan) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        // Update current plan in UI (in a real app, this would be handled by API response)
        plans.forEach(plan => {
          plan.popular = plan.id === selectedPlan.id;
        });
        
        setIsSubmitting(false);
        setShowChangePlanDialog(false);
        
        toast({
          title: "Plano alterado com sucesso",
          description: `Seu plano foi alterado para ${selectedPlan.name}. A nova cobrança será efetuada no próximo ciclo.`,
          variant: "success",
        });
      }, 1500);
    }
  };

  const cancelPlanChange = () => {
    setShowChangePlanDialog(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.popular ? 'border-primary shadow-md' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-3 left-0 right-0 mx-auto w-fit px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                Atual
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-3xl font-bold">
                {formatCurrency(plan.price)}<span className="text-sm text-muted-foreground font-normal">/mês</span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                variant={plan.popular ? "outline" : "default"} 
                className="w-full" 
                onClick={() => handleChangePlan(plan)}
                disabled={plan.popular}
              >
                {plan.popular ? 'Seu plano atual' : 'Alterar para este plano'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={showChangePlanDialog} onOpenChange={setShowChangePlanDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar alteração de plano</DialogTitle>
            <DialogDescription>
              Você está prestes a alterar seu plano para {selectedPlan?.name}. 
              O valor de {formatCurrency(selectedPlan?.price || 0)}/mês será cobrado no próximo ciclo de faturamento.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <h3 className="font-medium mb-2">Detalhes do plano:</h3>
            <ul className="space-y-2">
              {selectedPlan?.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={cancelPlanChange}
              disabled={isSubmitting}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              Cancelar
            </Button>
            <Button 
              onClick={confirmPlanChange} 
              disabled={isSubmitting}
              className="flex items-center gap-1"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processando...
                </>
              ) : (
                <>
                  <Check className="h-4 w-4" />
                  Confirmar alteração
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BillingPlans;
