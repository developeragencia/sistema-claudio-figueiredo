
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, RefreshCw, Info } from "lucide-react";
import ImportDetailsModal from './ImportDetailsModal';

const ImportHistoryTable = () => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock data for the import history
  const importHistory = [
    { id: 'IMP-001', name: 'dados_operacionais_1.xml', type: 'XML', date: '22/04/2023', user: 'Administrador', status: 'Concluído' },
    { id: 'IMP-002', name: 'dados_fiscais_2023.csv', type: 'CSV', date: '21/04/2023', user: 'Supervisor', status: 'Processando' },
    { id: 'IMP-003', name: 'notas_fiscais_abril.xml', type: 'XML', date: '20/04/2023', user: 'Administrador', status: 'Falha' },
    { id: 'IMP-004', name: 'clientes_ativos.xlsx', type: 'XLSX', date: '19/04/2023', user: 'Supervisor', status: 'Concluído' },
    { id: 'IMP-005', name: 'produtos_estoque.csv', type: 'CSV', date: '18/04/2023', user: 'Administrador', status: 'Concluído' },
  ];

  const handleViewDetails = (fileId: string) => {
    setSelectedFileId(fileId);
    setIsDetailsModalOpen(true);
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
    <Card>
      <CardHeader>
        <CardTitle>Histórico de Importações</CardTitle>
        <CardDescription>
          Visualize todas as importações realizadas no sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-6 bg-muted p-3 text-sm font-medium">
            <div>ID</div>
            <div>Arquivo</div>
            <div>Tipo</div>
            <div>Data</div>
            <div>Status</div>
            <div>Ações</div>
          </div>
          <div className="divide-y">
            {importHistory.map((item) => (
              <div key={item.id} className="grid grid-cols-6 p-3 text-sm">
                <div>{item.id}</div>
                <div className="truncate max-w-[200px]">{item.name}</div>
                <div>{item.type}</div>
                <div>{item.date}</div>
                <div>{getStatusBadge(item.status)}</div>
                <div>
                  <Button variant="ghost" size="sm" onClick={() => handleViewDetails(item.id)}>
                    <Info className="mr-2 h-4 w-4" />
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <ImportDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        fileId={selectedFileId || undefined}
      />
    </Card>
  );
};

export default ImportHistoryTable;
