
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Check } from 'lucide-react';

const ContactSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [contactEmail, setContactEmail] = useState('contato@sistemasclaudio.com');
  const [contactPhone, setContactPhone] = useState('(11) 99999-9999');
  const [contactAddress, setContactAddress] = useState('São Paulo, SP, Brasil');

  const handleSaveContact = () => {
    setIsLoading(true);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Contato atualizado",
        description: "As informações de contato foram atualizadas com sucesso.",
        variant: "default",
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações de Contato</CardTitle>
        <CardDescription>
          Atualize as informações de contato exibidas no site
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email de Contato</Label>
          <Input 
            id="contact-email" 
            type="email"
            value={contactEmail} 
            onChange={(e) => setContactEmail(e.target.value)} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact-phone">Telefone de Contato</Label>
          <Input 
            id="contact-phone" 
            value={contactPhone} 
            onChange={(e) => setContactPhone(e.target.value)} 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="contact-address">Endereço</Label>
          <Textarea 
            id="contact-address" 
            value={contactAddress} 
            onChange={(e) => setContactAddress(e.target.value)} 
            rows={2}
          />
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            <Label htmlFor="show-contact-form" className="text-base">Exibir Formulário de Contato</Label>
            <p className="text-sm text-muted-foreground">
              Mostrar formulário de contato no site
            </p>
          </div>
          <Switch id="show-contact-form" defaultChecked />
        </div>
        
        <div className="flex items-center justify-between pt-2">
          <div className="space-y-0.5">
            <Label htmlFor="show-social-icons" className="text-base">Exibir Ícones Sociais</Label>
            <p className="text-sm text-muted-foreground">
              Mostrar ícones de redes sociais no site
            </p>
          </div>
          <Switch id="show-social-icons" defaultChecked />
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveContact} 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Check className="mr-2 h-4 w-4" />
              Salvar Informações
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ContactSettings;
