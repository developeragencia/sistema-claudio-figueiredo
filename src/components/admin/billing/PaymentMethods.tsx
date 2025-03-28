
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, CheckCircle, Plus, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface PaymentMethod {
  id: string;
  type: 'credit' | 'debit';
  brand: string;
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

export const PaymentMethods = () => {
  const { toast } = useToast();
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit',
      brand: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true
    }
  ]);
  
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });
  
  const handleAddPaymentMethod = () => {
    // In a real app, this would integrate with a payment processor
    const [expiryMonth, expiryYear] = newCard.expiry.split('/');
    
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: 'credit',
      brand: 'mastercard',
      last4: newCard.number.slice(-4),
      expiryMonth,
      expiryYear: `20${expiryYear}`,
      isDefault: methods.length === 0
    };
    
    setMethods([...methods, newMethod]);
    setNewCard({ number: '', name: '', expiry: '', cvc: '' });
    setShowAddDialog(false);
    
    toast({
      title: "Método de pagamento adicionado",
      description: `Cartão terminando em ${newMethod.last4} foi adicionado com sucesso.`
    });
  };
  
  const handleSetDefault = (id: string) => {
    setMethods(methods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
    
    toast({
      title: "Método de pagamento atualizado",
      description: "Seu método de pagamento padrão foi atualizado."
    });
  };
  
  const handleDelete = (id: string) => {
    const methodToDelete = methods.find(m => m.id === id);
    if (methodToDelete?.isDefault && methods.length > 1) {
      toast({
        title: "Erro",
        description: "Não é possível remover o método de pagamento padrão. Defina outro como padrão primeiro.",
        variant: "destructive"
      });
      return;
    }
    
    setMethods(methods.filter(method => method.id !== id));
    toast({
      title: "Método de pagamento removido",
      description: "O método de pagamento foi removido com sucesso."
    });
  };
  
  const getBrandLogo = (brand: string) => {
    const brands: Record<string, { color: string, text: string }> = {
      visa: { color: "from-blue-600 to-blue-800", text: "VISA" },
      mastercard: { color: "from-red-600 to-orange-600", text: "MC" },
      amex: { color: "from-blue-500 to-blue-700", text: "AMEX" },
      default: { color: "from-gray-600 to-gray-800", text: "CARD" }
    };
    
    const brandInfo = brands[brand.toLowerCase()] || brands.default;
    
    return (
      <div className={`h-10 w-16 bg-gradient-to-r ${brandInfo.color} rounded-md flex items-center justify-center text-white font-bold`}>
        {brandInfo.text}
      </div>
    );
  };
  
  const handleExpiryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    // Remove non-digits
    value = value.replace(/\D/g, '');
    
    // Add slash after month
    if (value.length > 2) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    
    setNewCard({ ...newCard, expiry: value });
  };
  
  const handleCardNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target;
    // Remove non-digits
    value = value.replace(/\D/g, '');
    
    // Format with spaces
    if (value.length > 0) {
      value = value.match(/.{1,4}/g)?.join(' ') || value;
    }
    
    setNewCard({ ...newCard, number: value });
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Métodos de Pagamento</CardTitle>
            <CardDescription>Gerencie seus cartões e outras formas de pagamento</CardDescription>
          </div>
          <Button variant="outline" size="sm" onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Adicionar
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {methods.map((method) => (
              <div 
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getBrandLogo(method.brand)}
                  <div>
                    <p className="font-medium">{method.brand.charAt(0).toUpperCase() + method.brand.slice(1)} terminando em {method.last4}</p>
                    <p className="text-sm text-muted-foreground">Expira em {method.expiryMonth}/{method.expiryYear}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault ? (
                    <div className="flex items-center text-sm text-primary">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Padrão
                    </div>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleSetDefault(method.id)}
                    >
                      Definir como padrão
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleDelete(method.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {methods.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CreditCard className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-1">Nenhum método de pagamento</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Você ainda não adicionou nenhum método de pagamento.
                </p>
                <Button onClick={() => setShowAddDialog(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar método
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar método de pagamento</DialogTitle>
            <DialogDescription>
              Adicione um novo cartão de crédito ou débito para usar em suas transações.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="card-number">Número do cartão</Label>
              <Input 
                id="card-number" 
                placeholder="1234 5678 9012 3456" 
                value={newCard.number}
                onChange={handleCardNumberInput}
                maxLength={19}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-name">Nome no cartão</Label>
              <Input 
                id="card-name" 
                placeholder="JOÃO M SILVA" 
                value={newCard.name}
                onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="card-expiry">Validade (MM/AA)</Label>
                <Input 
                  id="card-expiry" 
                  placeholder="MM/AA" 
                  value={newCard.expiry}
                  onChange={handleExpiryInput}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card-cvc">CVC</Label>
                <Input 
                  id="card-cvc" 
                  placeholder="123" 
                  type="password"
                  maxLength={4}
                  value={newCard.cvc}
                  onChange={(e) => setNewCard({ ...newCard, cvc: e.target.value.replace(/\D/g, '') })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleAddPaymentMethod}
              disabled={!newCard.number || !newCard.name || !newCard.expiry || !newCard.cvc}
            >
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentMethods;
