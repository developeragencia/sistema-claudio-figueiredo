
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from 'sonner';

interface ClientConfigDialogProps {
  open: boolean;
  onClose: () => void;
}

const ClientConfigDialog: React.FC<ClientConfigDialogProps> = ({
  open,
  onClose
}) => {
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState('ACTIVE');
  const [defaultClientType, setDefaultClientType] = useState('private');
  const [maxClientsPerPage, setMaxClientsPerPage] = useState('10');
  
  const handleSaveConfig = () => {
    toast.success('Configurações salvas', {
      description: 'As configurações de clientes foram atualizadas'
    });
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Configurações de Clientes</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-refresh">Atualizar automaticamente</Label>
              <p className="text-sm text-muted-foreground">
                Atualiza a lista de clientes periodicamente
              </p>
            </div>
            <Switch 
              id="auto-refresh"
              checked={autoRefresh}
              onCheckedChange={setAutoRefresh}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="default-status">Status padrão</Label>
            <Select value={defaultStatus} onValueChange={setDefaultStatus}>
              <SelectTrigger id="default-status">
                <SelectValue placeholder="Selecione o status padrão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="default-type">Tipo de cliente padrão</Label>
            <Select value={defaultClientType} onValueChange={setDefaultClientType}>
              <SelectTrigger id="default-type">
                <SelectValue placeholder="Selecione o tipo padrão" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">Privado</SelectItem>
                <SelectItem value="public">Público</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="max-clients">Máximo de clientes por página</Label>
            <Input
              id="max-clients"
              type="number"
              value={maxClientsPerPage}
              onChange={(e) => setMaxClientsPerPage(e.target.value)}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSaveConfig}>
            Salvar configurações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ClientConfigDialog;
