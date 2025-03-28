
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building, Calendar, FileText, ArrowRight, Plus, Calculator, Upload, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const OverviewTab: React.FC<{
  onNewRecovery: () => void;
}> = ({ onNewRecovery }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visão Geral da Recuperação IRRF/PJ</CardTitle>
        <CardDescription>
          Acompanhe o status dos processos de recuperação de créditos IRRF para pessoas jurídicas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Processos Recentes</h3>
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium truncate">Processo #{1000 + item}</h4>
                      <Badge variant="outline" className="bg-amber-100 text-amber-800">Em Andamento</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Cliente: Prefeitura Municipal</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Calendar className="h-3.5 w-3.5 mr-1.5" />
                        12/06/2023
                      </span>
                      <span className="flex items-center">
                        <FileText className="h-3.5 w-3.5 mr-1.5" />
                        15 documentos
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full flex items-center gap-2">
                <span>Ver todos os processos</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Resumo por Status</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Pendentes</span>
                  <span className="text-amber-600 font-medium">24%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Em Processamento</span>
                  <span className="text-blue-600 font-medium">38%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '38%' }}></div>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Concluídos</span>
                  <span className="text-green-600 font-medium">35%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Com Erros</span>
                  <span className="text-red-600 font-medium">3%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2.5">
                  <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '3%' }}></div>
                </div>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mt-6">Ações Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button className="flex items-center gap-2" onClick={onNewRecovery}>
                <Plus className="h-4 w-4" />
                <span>Novo Processo</span>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Calculator className="h-4 w-4" />
                <span>Calcular</span>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Importar</span>
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Configurar</span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewTab;
