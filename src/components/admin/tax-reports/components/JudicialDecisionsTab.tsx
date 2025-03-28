
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, RefreshCw, File, FileSpreadsheet } from 'lucide-react';

interface JudicialDecisionsTabProps {
  isGenerating: boolean;
  handleGenerate: () => void;
  handleExport: (format: string) => void;
}

const JudicialDecisionsTab: React.FC<JudicialDecisionsTabProps> = ({
  isGenerating,
  handleGenerate,
  handleExport
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios para Decisões Judiciais</CardTitle>
          <CardDescription>
            Relatórios específicos para processos judiciais relacionados à compensação tributária
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-3 text-left font-medium">Nome do Relatório</th>
                    <th className="p-3 text-left font-medium">Processo</th>
                    <th className="p-3 text-left font-medium">Criado em</th>
                    <th className="p-3 text-left font-medium">Exportar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="p-3">Relatório Judicial - Compensação CSLL</td>
                    <td className="p-3">1234567-89.2023.8.26.0100</td>
                    <td className="p-3">25/04/2023</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                          <File className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Excel
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="p-3">Relatório Judicial - Compensação PIS/COFINS</td>
                    <td className="p-3">9876543-21.2022.8.26.0100</td>
                    <td className="p-3">18/02/2023</td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleExport('pdf')}>
                          <File className="mr-2 h-4 w-4" />
                          PDF
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExport('excel')}>
                          <FileSpreadsheet className="mr-2 h-4 w-4" />
                          Excel
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <Button onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Gerando...
                </>
              ) : (
                <>
                  <Scale className="mr-2 h-4 w-4" />
                  Gerar Novo Relatório Judicial
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JudicialDecisionsTab;
