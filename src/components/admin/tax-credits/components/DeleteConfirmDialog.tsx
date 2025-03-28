
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { TaxCredit } from '@/types/tax-credits';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  credit: TaxCredit | null;
  onConfirm: (creditId: string) => void;
}

const DeleteConfirmDialog: React.FC<DeleteConfirmDialogProps> = ({
  open,
  onClose,
  credit,
  onConfirm,
}) => {
  const handleConfirm = () => {
    if (credit && credit.id) {
      console.log('Confirming deletion of credit with ID:', credit.id);
      onConfirm(credit.id);
    } else {
      console.error('Cannot delete credit: missing credit ID');
    }
  };

  if (!credit) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir crédito tributário</AlertDialogTitle>
          <AlertDialogDescription>
            Você está prestes a excluir o crédito tributário de <strong>{credit.clientName}</strong> no 
            valor de <strong>{formatCurrency(credit.creditAmount)}</strong>.
            <br /><br />
            Esta ação não pode ser desfeita. Deseja continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm} 
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Sim, excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmDialog;
