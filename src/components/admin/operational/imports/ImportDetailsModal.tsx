
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileDown, CheckCircle, XCircle, RefreshCw } from "lucide-react";

interface ImportDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileId?: string;
}

const ImportDetailsModal: React.FC<ImportDetailsModalProps> = ({
  isOpen,
  onClose,
  fileId
}) => {
  // Mock data for the selected file
  // In a real application, this would be fetched based on the fileId
  const fileDetails = {
    id: fileId || 'N/A',
    name: `dados_operacionais_${fileId?.slice(-1)}.xml`,
    type: 'XML',
    client: 'Cliente ABC',
    uploadDate: '22/04/2023',
    uploadTime: '14:30',
    status: 'Concluído',
    size: '4.2 MB',
    records: 127,
    uploader: 'Administrador',
    processingTime: '2 minutos',
    errors: 0,
    warnings: 0
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Concluído':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3" />
            Concluído
          </Badge>
        );
      case 'Processando':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
            <RefreshCw className="h-3 w-3" />
            Processando
          </Badge>
        );
      case 'Falha':
        return (
          <Badge variant="outline" className="flex w-fit items-center gap-1 bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3" />
            Falha
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes da Importação</DialogTitle>
          <DialogDescription>
            Informações detalhadas do arquivo importado.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{fileDetails.name}</h3>
              <p className="text-sm text-muted-foreground">ID: {fileDetails.id}</p>
            </div>
            {getStatusBadge(fileDetails.status)}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tipo</p>
              <p>{fileDetails.type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Cliente</p>
              <p>{fileDetails.client}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Data de Upload</p>
              <p>{fileDetails.uploadDate} às {fileDetails.uploadTime}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tamanho</p>
              <p>{fileDetails.size}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Registros</p>
              <p>{fileDetails.records}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Enviado por</p>
              <p>{fileDetails.uploader}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tempo de Processamento</p>
              <p>{fileDetails.processingTime}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Erros/Avisos</p>
              <p>{fileDetails.errors} erros, {fileDetails.warnings} avisos</p>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-md">
            <h4 className="font-medium mb-2">Histórico de Processamento</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between">
                <span>Upload Iniciado</span>
                <span className="text-muted-foreground">{fileDetails.uploadDate} {fileDetails.uploadTime}</span>
              </li>
              <li className="flex justify-between">
                <span>Validação Concluída</span>
                <span className="text-muted-foreground">{fileDetails.uploadDate} 14:31</span>
              </li>
              <li className="flex justify-between">
                <span>Processamento Iniciado</span>
                <span className="text-muted-foreground">{fileDetails.uploadDate} 14:31</span>
              </li>
              <li className="flex justify-between">
                <span>Importação Concluída</span>
                <span className="text-muted-foreground">{fileDetails.uploadDate} 14:32</span>
              </li>
            </ul>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Fechar</Button>
          <Button className="gap-2">
            <FileDown className="h-4 w-4" />
            Baixar Arquivo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportDetailsModal;
