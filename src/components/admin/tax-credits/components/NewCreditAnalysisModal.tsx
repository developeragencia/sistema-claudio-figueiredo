
import React, { useState } from 'react';
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogFooter, DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectGroup, 
  SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { useClientStore } from "@/hooks/useClientStore";
import { Calendar as CalendarIcon, FileSearch, Info } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface NewCreditAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AnalysisFormData) => void;
}

export interface AnalysisFormData {
  name: string;
  type: string;
  startDate: Date | undefined;
  endDate: Date | undefined;
  includeCorrection: boolean;
  threshold: number;
}

const NewCreditAnalysisModal: React.FC<NewCreditAnalysisModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const { activeClient } = useClientStore();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<AnalysisFormData>({
    name: "",
    type: "comprehensive",
    startDate: new Date(new Date().getFullYear() - 5, 0, 1),
    endDate: new Date(),
    includeCorrection: true,
    threshold: 100
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!activeClient) {
      toast({
        title: "Erro",
        description: "Selecione um cliente antes de iniciar uma análise.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.name.trim()) {
      toast({
        title: "Erro",
        description: "Digite um nome para a análise.",
        variant: "destructive"
      });
      return;
    }
    
    if (!formData.startDate || !formData.endDate) {
      toast({
        title: "Erro",
        description: "Selecione datas válidas para o período de análise.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.startDate > formData.endDate) {
      toast({
        title: "Erro",
        description: "A data inicial deve ser anterior à data final.",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(formData);
    setFormData({
      name: "",
      type: "comprehensive",
      startDate: new Date(new Date().getFullYear() - 5, 0, 1),
      endDate: new Date(),
      includeCorrection: true,
      threshold: 100
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSearch className="h-5 w-5 text-primary" />
            Nova Análise de Créditos
          </DialogTitle>
          <DialogDescription>
            Configure os parâmetros para identificação automática de créditos tributários.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="analysis-name">Nome da análise</Label>
              <Input
                id="analysis-name"
                placeholder="Ex: Análise IRRF 2023"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label htmlFor="analysis-type">Tipo de análise</Label>
              <Select 
                value={formData.type}
                onValueChange={(value) => setFormData({...formData, type: value})}
              >
                <SelectTrigger className="mt-1.5">
                  <SelectValue placeholder="Selecione o tipo de análise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="comprehensive">Análise Completa</SelectItem>
                    <SelectItem value="pis-cofins">PIS/COFINS</SelectItem>
                    <SelectItem value="irrf">IRRF</SelectItem>
                    <SelectItem value="csll">CSLL</SelectItem>
                    <SelectItem value="icms">ICMS</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Data inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal mt-1.5"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? (
                        format(formData.startDate, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Selecione a data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => setFormData({...formData, startDate: date})}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label>Data final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal mt-1.5"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.endDate ? (
                        format(formData.endDate, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>Selecione a data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => setFormData({...formData, endDate: date})}
                      initialFocus
                      locale={ptBR}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div>
              <Label htmlFor="threshold">Valor mínimo de crédito (R$)</Label>
              <Input
                id="threshold"
                type="number"
                min="0"
                step="10"
                value={formData.threshold}
                onChange={(e) => setFormData({...formData, threshold: Number(e.target.value)})}
                className="mt-1.5"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Créditos abaixo deste valor serão ignorados.
              </p>
            </div>
            
            <div className="flex items-center space-x-2 mt-4">
              <Checkbox
                id="include-correction"
                checked={formData.includeCorrection}
                onCheckedChange={(checked) => 
                  setFormData({...formData, includeCorrection: checked as boolean})
                }
              />
              <Label
                htmlFor="include-correction"
                className="text-sm font-normal cursor-pointer"
              >
                Aplicar correção pela taxa Selic
              </Label>
            </div>
          </div>
          
          <DialogFooter>
            <div className="flex items-center text-sm text-muted-foreground mr-auto">
              <Info className="h-4 w-4 mr-1" />
              {activeClient ? (
                <span>Cliente selecionado: <strong>{activeClient.name}</strong></span>
              ) : (
                <span className="text-amber-600">Nenhum cliente selecionado</span>
              )}
            </div>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              Iniciar Análise
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewCreditAnalysisModal;
