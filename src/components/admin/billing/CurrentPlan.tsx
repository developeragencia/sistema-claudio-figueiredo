
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, CheckCircle, PlusCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import BillingPlans from './BillingPlans';

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  billingCycle: string;
}

export const CurrentPlan: React.FC = () => {
  const { toast } = useToast();
  const [showPlansSheet, setShowPlansSheet] = useState(false);
  const [currentPlan, setCurrentPlan] = useState<Plan>({
    id: 'business',
    name: 'Plano Empresarial',
    price: 1250,
    features: [
      'Acesso a todos os recursos',
      'Suporte prioritário',
      'Até 10 usuários'
    ],
    billingCycle: 'mensal'
  });

  // Simulate loading plan data
  useEffect(() => {
    // This would be an API call in a real application
    const timer = setTimeout(() => {
      // This code will run if you update the plan via the plan selection sheet
      // It checks for plan changes in localStorage
      const savedPlan = localStorage.getItem('currentPlan');
      if (savedPlan) {
        try {
          const parsedPlan = JSON.parse(savedPlan);
          setCurrentPlan(parsedPlan);
          localStorage.removeItem('currentPlan');
        } catch (e) {
          console.error('Failed to parse saved plan');
        }
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [showPlansSheet]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const handleChangePlan = () => {
    setShowPlansSheet(true);
  };

  const handleSheetClose = () => {
    // In a real app, we would refresh the current plan data from the server
    // For demo, we're just setting it manually based on selected plan
    toast({
      title: "Planos atualizados",
      description: "Suas informações de plano foram carregadas com sucesso.",
    });
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <CreditCard className="mr-2 h-5 w-5 text-primary" />
            Plano Atual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-xl font-bold">{currentPlan.name}</h3>
            <p className="text-sm text-muted-foreground">Faturamento {currentPlan.billingCycle}</p>
          </div>
          <p className="text-3xl font-bold text-primary mb-2">
            {formatCurrency(currentPlan.price)}<span className="text-sm text-muted-foreground">/mês</span>
          </p>
          <ul className="space-y-1 text-sm">
            {currentPlan.features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="outline" onClick={handleChangePlan}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Alterar Plano
          </Button>
        </CardFooter>
      </Card>

      <Sheet open={showPlansSheet} onOpenChange={(open) => {
        setShowPlansSheet(open);
        if (!open) handleSheetClose();
      }}>
        <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle>Escolha seu plano</SheetTitle>
            <SheetDescription>
              Compare os planos disponíveis e escolha o que melhor atende suas necessidades.
            </SheetDescription>
          </SheetHeader>
          <BillingPlans />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CurrentPlan;
