import React from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Eye, Edit, Trash, Download, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';

interface ActionButtonsProps {
  id: string;
  entityType: 'credit' | 'audit' | 'client' | 'document' | 'import' | 'opportunity' | 'report';
  showView?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
  showDownload?: boolean;
  showApprove?: boolean;
  showReject?: boolean;
  showMenu?: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onDownload?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
  customActions?: Array<{
    icon: React.ReactNode;
    label: string;
    onClick: (id: string) => void;
  }>;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  id,
  entityType,
  showView = true,
  showEdit = false,
  showDelete = false,
  showDownload = false,
  showApprove = false,
  showReject = false,
  showMenu = false,
  onView,
  onEdit,
  onDelete,
  onDownload,
  onApprove,
  onReject,
  customActions = []
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const defaultPaths = {
    credit: `/admin/tax_credits/${id}`,
    audit: `/admin/audits/${id}`,
    client: `/admin/client/${id}`,
    document: `/admin/documents/${id}`,
    import: `/admin/imports/${id}`,
    opportunity: `/admin/opportunities/${id}`,
    report: `/admin/reports/${id}`
  };

  const handleView = () => {
    if (onView) {
      onView(id);
    } else {
      navigate(defaultPaths[entityType]);
    }
  };

  const handleEdit = () => {
    if (onEdit) {
      onEdit(id);
    } else {
      toast({
        title: "Editar",
        description: `Editando ${entityType} ${id}`,
      });
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      // Call the passed delete handler with the correct ID
      onDelete(id);
    } else {
      // Default behavior with toast message
      toast({
        title: "Excluir",
        description: `Excluindo ${entityType} ${id}`,
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (onDownload) {
      onDownload(id);
    } else {
      toast({
        title: "Download",
        description: `Baixando ${entityType} ${id}`,
      });
    }
  };

  const handleApprove = () => {
    if (onApprove) {
      onApprove(id);
    } else {
      toast({
        title: "Aprovado",
        description: `${entityType} ${id} aprovado com sucesso`,
      });
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject(id);
    } else {
      toast({
        title: "Rejeitado",
        description: `${entityType} ${id} rejeitado`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-1">
      {showView && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleView}
          title="Ver detalhes"
        >
          <Eye className="h-4 w-4" />
        </Button>
      )}
      
      {showEdit && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleEdit}
          title="Editar"
        >
          <Edit className="h-4 w-4" />
        </Button>
      )}
      
      {showDelete && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleDelete}
          title="Excluir"
        >
          <Trash className="h-4 w-4" />
        </Button>
      )}
      
      {showDownload && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={handleDownload}
          title="Download"
        >
          <Download className="h-4 w-4" />
        </Button>
      )}
      
      {showApprove && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-green-600 hover:text-green-700 hover:bg-green-50"
          onClick={handleApprove}
          title="Aprovar"
        >
          <CheckCircle className="h-4 w-4" />
        </Button>
      )}
      
      {showReject && (
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={handleReject}
          title="Rejeitar"
        >
          <XCircle className="h-4 w-4" />
        </Button>
      )}
      
      {showMenu && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              title="Mais ações"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {customActions.map((action, index) => (
              <DropdownMenuItem 
                key={index} 
                onClick={() => action.onClick(id)}
              >
                <span className="mr-2">{action.icon}</span>
                {action.label}
              </DropdownMenuItem>
            ))}
            {!customActions.length && (
              <DropdownMenuItem 
                onClick={handleView}
              >
                <Eye className="mr-2 h-4 w-4" />
                Ver detalhes
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ActionButtons;
