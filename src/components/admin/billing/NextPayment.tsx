
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

export const NextPayment: React.FC = () => {
  const { toast } = useToast();
  const [showPayDialog, setShowPayDialog] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const dueDate = new Date('2023-09-15');
  const today = new Date();
  const daysLeft = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  const progress = Math.max(0, Math.min(100, 100 - (daysLeft / 30) * 100));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  const handlePayNow = () => {
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      setTimeout(() => {
        setShowPayDialog(false);
        setSuccess(false);
        
        toast({
          title: "Pagamento realizado com sucesso",
          description: "Sua fatura foi paga e o recibo foi enviado para seu email.",
        });
      }, 2000);
    }, 2000);
  };
  
  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Calendar className="mr-2 h-5 w-5 text-primary" />
            Próximo Pagamento
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="text-xl font-bold">{formatDate(dueDate)}</h3>
            <p className="text-sm text-muted-foreground">Assinatura Mensal</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-amber-500 mr-2" />
                <p className="text-sm">{daysLeft} dias restantes</p>
              </div>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="flex items-center mt-6 mb-2">
            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
            <p className="text-sm">Pagamento automático ativado</p>
          </div>
          
          <p className="text-2xl font-bold text-primary mt-4">
            {formatCurrency(1250.00)}
          </p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => setShowPayDialog(true)}>
            Pagar Agora
          </Button>
        </CardFooter>
      </Card>
      
      <Dialog open={showPayDialog} onOpenChange={setShowPayDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Efetuar Pagamento</DialogTitle>
            <DialogDescription>
              Você está prestes a efetuar o pagamento da assinatura mensal.
            </DialogDescription>
          </DialogHeader>
          
          {success ? (
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="rounded-full bg-green-100 p-3 mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">Pagamento Confirmado!</h3>
              <p className="text-center text-muted-foreground">
                Seu pagamento foi processado com sucesso. Um recibo foi enviado para seu email.
              </p>
            </div>
          ) : (
            <>
              <div className="py-4 space-y-4">
                <div className="space-y-2">
                  <p className="font-medium">Resumo do pagamento</p>
                  <div className="bg-muted p-4 rounded-md">
                    <div className="flex justify-between mb-2">
                      <span>Plano Empresarial</span>
                      <span>{formatCurrency(1250.00)}</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{formatCurrency(1250.00)}</span>
                    </div>
                  </div>
                </div>
                
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Informação</AlertTitle>
                  <AlertDescription>
                    O pagamento será processado utilizando o cartão Visa terminando em 4242.
                  </AlertDescription>
                </Alert>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPayDialog(false)} disabled={processing}>
                  Cancelar
                </Button>
                <Button onClick={handlePayNow} disabled={processing}>
                  {processing ? "Processando..." : "Confirmar Pagamento"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NextPayment;
