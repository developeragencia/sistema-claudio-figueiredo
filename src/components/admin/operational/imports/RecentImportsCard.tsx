
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileType, CheckCircle2, FileX, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImportDetailsModal from './ImportDetailsModal';

const RecentImportsCard = () => {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const recentImports = [
    { id: 'IMP-001', name: 'dados_fiscais_2023.xml', date: '22/04/2023', time: '14:30', status: 'success' },
    { id: 'IMP-002', name: 'clientes_ativos.csv', date: '21/04/2023', time: '09:15', status: 'success' },
    { id: 'IMP-003', name: 'notas_fiscais_2022.xml', date: '20/04/2023', time: '16:45', status: 'failed' },
  ];

  const handleViewDetails = (fileId: string) => {
    setSelectedFileId(fileId);
    setIsDetailsModalOpen(true);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Importações Recentes</CardTitle>
        <CardDescription>
          Lista dos últimos arquivos importados para o sistema.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentImports.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <FileType className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">Importado em: {item.date} às {item.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.status === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                ) : (
                  <FileX className="h-5 w-5 text-red-500" />
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2"
                  onClick={() => handleViewDetails(item.id)}
                >
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Ver Detalhes</span>
                </Button>
              </div>
            </div>
          ))}
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

export default RecentImportsCard;
