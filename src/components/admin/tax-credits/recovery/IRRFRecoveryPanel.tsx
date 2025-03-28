
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BriefcaseBusiness, FileSearch, FileSpreadsheet, Clock, DollarSign } from 'lucide-react';

const IRRFRecoveryPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Recuperação IRRF/PJ</h1>
      </div>

      <Tabs defaultValue="identification" className="space-y-4">
        <TabsList>
          <TabsTrigger value="identification">Identificação</TabsTrigger>
          <TabsTrigger value="analysis">Análise</TabsTrigger>
          <TabsTrigger value="process">Processo</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>

        <TabsContent value="identification" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileSearch className="h-5 w-5 mr-2 text-primary" />
                  Identificação de Oportunidades
                </CardTitle>
                <CardDescription>
                  Identifique oportunidades de recuperação de IRRF retido
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">Ferramenta de identificação de IRRF retido indevidamente</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  <FileSpreadsheet className="h-5 w-5 mr-2 text-primary" />
                  Importação de Dados
                </CardTitle>
                <CardDescription>
                  Importe dados para análise de retenções
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center border rounded-md bg-muted/20">
                  <p className="text-muted-foreground">Ferramenta de importação de notas fiscais e retenções</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BriefcaseBusiness className="h-5 w-5 text-primary" />
                Análise de Retenções
              </CardTitle>
              <CardDescription>
                Analise detalhadamente as retenções identificadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Tabela de análise de retenções com detalhes</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Processo de Recuperação
              </CardTitle>
              <CardDescription>
                Acompanhe o progresso do processo de recuperação
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Timeline do processo de recuperação</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Relatórios de Recuperação
              </CardTitle>
              <CardDescription>
                Visualize os valores recuperados e em processo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] flex items-center justify-center border rounded-md bg-muted/20">
                <p className="text-muted-foreground">Gráficos e tabelas de valores recuperados</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IRRFRecoveryPanel;
