
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, RefreshCw, File, FileSpreadsheet } from 'lucide-react';

interface PerDcompTabProps {
  isGenerating: boolean;
  handleGenerate: () => void;
  handleExport: (format: string) => void;
}

const PerDcompTab: React.FC<PerDcompTabProps> = ({
  isGenerating,
  handleGenerate,
  handleExport
}) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Relatórios PER/DCOMP</CardTitle>
          <CardDescription>
            Relatórios específicos para PER/DCOMP conforme requisitos da Receita Federal
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="border rounded-md overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="p-3 text-left font-medium">Nome do Relatório</th>
                    <th className="p-3 text-left font-medium">Criado em</th>
                    <th className="p-3 text-left font-medium">Tipo</th>
                    <th className="p-3 text-left font-medium">Exportar</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t hover:bg-muted/50">
                    <td className="p-3">Relatório PER/DCOMP - 1º Trimestre 2023</td>
                    <td className="p-3">15/03/2023</td>
                    <td className="p-3">PER/DCOMP</td>
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
                    <td className="p-3">Relatório PER/DCOMP - 4º Trimestre 2022</td>
                    <td className="p-3">10/01/2023</td>
                    <td className="p-3">PER/DCOMP</td>
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
                  <FileText className="mr-2 h-4 w-4" />
                  Gerar Novo Relatório PER/DCOMP
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerDcompTab;
