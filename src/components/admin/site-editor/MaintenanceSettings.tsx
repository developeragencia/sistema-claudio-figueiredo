
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { 
  Loader2, Check, Construction, 
  Wrench, AlertCircle, Timer, 
  ShieldAlert
} from 'lucide-react';

const MaintenanceSettings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [maintenanceMessage, setMaintenanceMessage] = useState('Estamos realizando manutenção em nosso sistema para melhorar sua experiência. Por favor, tente novamente mais tarde.');
  const [maintenanceEndDate, setMaintenanceEndDate] = useState(() => {
    // Default end date is 24 hours from now
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return date.toISOString().slice(0, 16); // format for datetime-local input
  });
  
  // Check if maintenance mode is currently active from localStorage
  useEffect(() => {
    const savedMaintenanceMode = localStorage.getItem('maintenanceMode');
    const savedMaintenanceEndDate = localStorage.getItem('maintenanceEndDate');
    const savedMaintenanceMessage = localStorage.getItem('maintenanceMessage');
    
    if (savedMaintenanceMode === 'true') {
      setMaintenanceMode(true);
    }
    
    if (savedMaintenanceEndDate) {
      setMaintenanceEndDate(savedMaintenanceEndDate);
    }
    
    if (savedMaintenanceMessage) {
      setMaintenanceMessage(savedMaintenanceMessage);
    }
  }, []);

  const handleSaveMaintenance = () => {
    setIsLoading(true);
    
    // Save maintenance settings to localStorage
    localStorage.setItem('maintenanceMode', maintenanceMode.toString());
    localStorage.setItem('maintenanceEndDate', maintenanceEndDate);
    localStorage.setItem('maintenanceMessage', maintenanceMessage);
    
    // Simulate saving
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: maintenanceMode ? "Modo de manutenção ativado" : "Modo de manutenção desativado",
        description: maintenanceMode 
          ? "O site está agora em modo de manutenção e os visitantes verão a página de manutenção." 
          : "O site está acessível normalmente para todos os visitantes.",
        variant: "default",
      });
    }, 1000);
  };

  // Calculate remaining time for maintenance
  const getMaintenanceTimeRemaining = () => {
    const endDate = new Date(maintenanceEndDate);
    const now = new Date();
    
    // If end date is in the past, return 0
    if (endDate <= now) {
      return { hours: 0, minutes: 0 };
    }
    
    const diffMs = endDate.getTime() - now.getTime();
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours: diffHrs, minutes: diffMins };
  };

  const timeRemaining = getMaintenanceTimeRemaining();
  const endDateInPast = new Date(maintenanceEndDate) <= new Date();

  return (
    <Card className={maintenanceMode ? "border-destructive/30 shadow-[0_0_20px_rgba(239,68,68,0.1)]" : ""}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Construction className={`h-5 w-5 ${maintenanceMode ? "text-destructive" : "text-muted-foreground"}`} />
          <CardTitle>Modo de Manutenção</CardTitle>
        </div>
        <CardDescription>
          Ative o modo de manutenção para notificar os usuários sobre interrupções no serviço
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between bg-muted/40 p-4 rounded-lg">
          <div className="space-y-0.5 flex items-center gap-3">
            {maintenanceMode ? (
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Wrench className="h-5 w-5 text-destructive" />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                <Check className="h-5 w-5 text-green-500" />
              </div>
            )}
            <div>
              <Label htmlFor="maintenance-mode" className="text-base font-medium">
                {maintenanceMode ? "Site em Manutenção" : "Site Operacional"}
              </Label>
              <p className="text-sm text-muted-foreground">
                {maintenanceMode 
                  ? "Os visitantes serão redirecionados para a página de manutenção" 
                  : "O site está funcionando normalmente"}
              </p>
            </div>
          </div>
          <Switch 
            id="maintenance-mode" 
            checked={maintenanceMode}
            onCheckedChange={setMaintenanceMode}
            className={maintenanceMode ? "data-[state=checked]:bg-destructive" : ""}
          />
        </div>
        
        {maintenanceMode && (
          <div className="border border-destructive/20 rounded-lg p-4 bg-destructive/5">
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <span className="font-medium text-destructive">Atenção: Modo de manutenção ativo</span>
            </div>
            <p className="text-sm mb-3">
              Quando ativado, todos os visitantes serão redirecionados para a página de manutenção. 
              Apenas administradores terão acesso ao site completo.
            </p>
            
            <div className="flex items-center gap-1.5 text-xs bg-white/80 dark:bg-black/20 px-3 py-1.5 rounded-md border border-destructive/10 text-muted-foreground">
              <Timer className="h-3.5 w-3.5 text-destructive" />
              <span>
                {endDateInPast 
                  ? "Data de término no passado, atualize para um momento futuro" 
                  : `Restam aproximadamente ${timeRemaining.hours} horas e ${timeRemaining.minutes} minutos até o término programado`}
              </span>
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="maintenance-end">Data de Término da Manutenção</Label>
          <Input 
            id="maintenance-end" 
            type="datetime-local"
            value={maintenanceEndDate}
            onChange={(e) => setMaintenanceEndDate(e.target.value)}
            className={endDateInPast ? "border-destructive" : ""}
          />
          {endDateInPast && (
            <p className="text-xs text-destructive mt-1">
              A data de término precisa ser no futuro
            </p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="maintenance-message">Mensagem de Manutenção</Label>
          <Textarea 
            id="maintenance-message" 
            value={maintenanceMessage}
            onChange={(e) => setMaintenanceMessage(e.target.value)}
            rows={3}
            placeholder="Explique aos usuários o motivo da manutenção e quando o site retornará"
          />
        </div>
        
        <div className="space-y-2 mt-6">
          <Label className="text-base font-medium">Visualização da Mensagem</Label>
          <div className="bg-card border rounded-lg p-4 mt-2">
            <div className="flex items-center gap-2 mb-2">
              <ShieldAlert className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Site em Manutenção</h3>
            </div>
            <p className="text-muted-foreground">{maintenanceMessage}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSaveMaintenance} 
          disabled={isLoading}
          variant={maintenanceMode ? "destructive" : "default"}
          className="relative overflow-hidden group"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <div className="relative z-10 flex items-center">
                {maintenanceMode ? (
                  <Construction className="mr-2 h-4 w-4" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                {maintenanceMode ? "Ativar Modo de Manutenção" : "Salvar Configurações"}
              </div>
              <span className="absolute inset-0 h-full w-0 bg-black/10 group-hover:w-full transition-all duration-300 ease-in-out -z-0"></span>
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MaintenanceSettings;
