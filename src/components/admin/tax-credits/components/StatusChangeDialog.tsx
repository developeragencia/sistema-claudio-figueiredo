
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { TaxCredit } from '@/types/tax-credits';

interface StatusChangeDialogProps {
  open: boolean;
  onClose: () => void;
  credit: TaxCredit | null;
  onConfirm?: (status: string, notes: string) => void;
  onStatusChange?: (creditId: string, status: string, notes: string) => void;
}

const StatusChangeDialog: React.FC<StatusChangeDialogProps> = ({
  open,
  onClose,
  credit,
  onConfirm,
  onStatusChange
}) => {
  // Initialize with credit status, ensuring lowercase matching
  const [selectedStatus, setSelectedStatus] = useState<string>(
    credit?.status?.toLowerCase() || 'pending'
  );
  const [notes, setNotes] = useState('');

  const handleConfirm = () => {
    if (credit) {
      if (onConfirm) {
        console.log('Changing status to:', selectedStatus, 'with notes:', notes);
        onConfirm(selectedStatus, notes);
      } else if (onStatusChange) {
        console.log('Using onStatusChange with creditId:', credit.id);
        onStatusChange(credit.id, selectedStatus, notes);
      }
    }
    onClose();
  };

  if (!credit) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Alterar status do crédito</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pending" id="pending" />
              <Label htmlFor="pending">Pendente</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="analyzing" id="analyzing" />
              <Label htmlFor="analyzing">Em Análise</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="approved" id="approved" />
              <Label htmlFor="approved">Aprovado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rejected" id="rejected" />
              <Label htmlFor="rejected">Rejeitado</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recovered" id="recovered" />
              <Label htmlFor="recovered">Recuperado</Label>
            </div>
          </RadioGroup>

          <div className="mt-4">
            <Label htmlFor="notes">Observações sobre a mudança de status:</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Adicione observações sobre a alteração de status..."
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StatusChangeDialog;
