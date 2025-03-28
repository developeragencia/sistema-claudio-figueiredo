
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, CheckCircle, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from 'sonner';
import { Audit } from '@/types/audit';

interface NewAuditFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (auditData: Partial<Audit>) => void;
  initialData?: Partial<Audit>;
  clientId?: string;
  clientName?: string;
  isEdit?: boolean;
}

const NewAuditForm: React.FC<NewAuditFormProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  clientId,
  clientName,
  isEdit = false
}) => {
  const [formData, setFormData] = useState<Partial<Audit>>(initialData || {
    clientName: clientName || '',
    documentNumber: '',
    auditType: 'Fiscal',
    startDate: new Date().toISOString().split('T')[0],
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    status: 'PENDENTE',
    assignedTo: '',
    documentsCount: 0,
    notes: ''
  });

  const [startDateOpen, setStartDateOpen] = useState(false);
  const [deadlineDateOpen, setDeadlineDateOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (name: string, date: Date | undefined) => {
    if (date) {
      setFormData(prev => ({ 
        ...prev, 
        [name]: date.toISOString().split('T')[0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.documentNumber || !formData.auditType) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    // Add client ID if provided
    const finalData = clientId ? {...formData, clientId} : formData;
    
    onSave(finalData);
    onClose();
    
    // Show success message
    toast.success(
      isEdit ? 'Auditoria atualizada com sucesso!' : 'Nova auditoria criada com sucesso!', 
      {
        description: `${formData.auditType} para ${formData.clientName}`,
        icon: <CheckCircle className="h-4 w-4 text-green-500" />
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isEdit ? 'Editar Auditoria' : 'Nova Auditoria'}
          </DialogTitle>
          <DialogDescription>
            {isEdit 
              ? 'Atualize as informações da auditoria existente.' 
              : 'Preencha os dados para criar uma nova auditoria.'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-4">
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-2">
              <Label htmlFor="clientName">Cliente *</Label>
              <Input
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Nome do cliente"
                readOnly={!!clientName}
                className={cn(!!clientName && "bg-muted")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="documentNumber">Número do Documento/CNPJ *</Label>
              <Input
                id="documentNumber"
                name="documentNumber"
                value={formData.documentNumber}
                onChange={handleInputChange}
                placeholder="Ex: 12.345.678/0001-99"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="auditType">Tipo de Auditoria *</Label>
                <Select 
                  value={formData.auditType} 
                  onValueChange={(value) => handleSelectChange('auditType', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Fiscal">Fiscal</SelectItem>
                    <SelectItem value="Contábil">Contábil</SelectItem>
                    <SelectItem value="Trabalhista">Trabalhista</SelectItem>
                    <SelectItem value="Previdenciária">Previdenciária</SelectItem>
                    <SelectItem value="Tributária">Tributária</SelectItem>
                    <SelectItem value="Operacional">Operacional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select 
                  value={formData.status} 
                  onValueChange={(value) => handleSelectChange('status', value as any)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PENDENTE">Pendente</SelectItem>
                    <SelectItem value="EM_ANDAMENTO">Em Andamento</SelectItem>
                    <SelectItem value="CONCLUIDA">Concluída</SelectItem>
                    <SelectItem value="CANCELADA">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início</Label>
                <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.startDate ? (
                        format(new Date(formData.startDate), "dd/MM/yyyy")
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.startDate ? new Date(formData.startDate) : undefined}
                      onSelect={(date) => {
                        handleDateChange('startDate', date);
                        setStartDateOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Prazo Final</Label>
                <Popover open={deadlineDateOpen} onOpenChange={setDeadlineDateOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? (
                        format(new Date(formData.deadline), "dd/MM/yyyy")
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={formData.deadline ? new Date(formData.deadline) : undefined}
                      onSelect={(date) => {
                        handleDateChange('deadline', date);
                        setDeadlineDateOpen(false);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="assignedTo">Responsável</Label>
              <Input
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleInputChange}
                placeholder="Nome do responsável"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações</Label>
              <Textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Observações adicionais sobre a auditoria"
                className="min-h-[100px]"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              {isEdit ? 'Atualizar' : 'Criar'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewAuditForm;
