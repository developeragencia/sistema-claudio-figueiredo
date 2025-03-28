
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye, Edit, Trash, CheckCircle } from 'lucide-react';
import { RecoveryProcess } from '@/types/recovery';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/components/ui/use-toast';

interface RecoveryActionButtonsProps {
  process: RecoveryProcess;
  onViewDetails: (processId: string) => void;
  onEdit: (processId: string) => void;
  onDelete: (processId: string) => void;
  onApprove: (processId: string) => void;
}

const RecoveryActionButtons: React.FC<RecoveryActionButtonsProps> = ({
  process,
  onViewDetails,
  onEdit,
  onDelete,
  onApprove
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const { toast } = useToast();
  
  const handleViewDetails = () => {
    onViewDetails(process.id);
  };
  
  const handleEdit = () => {
    onEdit(process.id);
  };
  
  const confirmDelete = () => {
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirmed = () => {
    onDelete(process.id);
    setIsDeleteDialogOpen(false);
  };
  
  const handleApprove = () => {
    onApprove(process.id);
  };

  return (
    <>
      <div className="flex space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={handleViewDetails}
          title="Ver detalhes"
        >
          <Eye className="h-4 w-4" />
          <span className="sr-only">Ver detalhes</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={handleEdit}
          title="Editar processo"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only">Editar</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={confirmDelete}
          title="Excluir processo"
        >
          <Trash className="h-4 w-4" />
          <span className="sr-only">Excluir</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
          onClick={handleApprove}
          title="Aprovar processo"
        >
          <CheckCircle className="h-4 w-4" />
          <span className="sr-only">Aprovar</span>
        </Button>
      </div>
      
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir processo de recuperação</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o processo {process.processNumber}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteConfirmed} 
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Sim, excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RecoveryActionButtons;
