
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  ChevronRight, Filter, FileText, Cog, ArrowDownUp, 
  CheckCircle2, XCircle, RefreshCw, Clock, Database
} from 'lucide-react';
import { toast } from 'sonner';
import DataProcessingQueue from './DataProcessingQueue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const DataRefinementPanel: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('refinement');
  const [dataSource, setDataSource] = useState('');
  const [refinementRules, setRefinementRules] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmitRefinement = () => {
    if (!dataSource) {
      toast("Fonte de dados requerida", {
        description: "Selecione uma fonte de dados para refinamento."
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast("Refinamento iniciado", {
        description: "O processo de refinamento de dados foi adicionado à fila de processamento."
      });
    }, 2000);
  };
  
  const handleSubmitClassification = () => {
    if (!refinementRules) {
      toast("Regras requeridas", {
        description: "Selecione regras de classificação tributária."
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      toast("Classificação iniciada", {
        description: "O processo de classificação de dados foi adicionado à fila de processamento."
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Refinamento e Classificação de Dados</h2>
          <p className="text-muted-foreground">
            Processamento, refinamento e classificação de dados conforme regras tributárias.
          </p>
        </div>
      </div>
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="refinement">Refinamento de Dados</TabsTrigger>
          <TabsTrigger value="classification">Classificação Tributária</TabsTrigger>
          <TabsTrigger value="queue">Fila de Processamento</TabsTrigger>
        </TabsList>
        
        <TabsContent value="refinement" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Refinamento Inicial de Dados</CardTitle>
              <CardDescription>
                Extraia e refine dados relevantes para análise tributária.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="data-source">Fonte de Dados</Label>
                <Select value={dataSource} onValueChange={setDataSource}>
                  <SelectTrigger id="data-source">
                    <SelectValue placeholder="Selecione uma fonte de dados" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nfe">Notas Fiscais Eletrônicas</SelectItem>
                    <SelectItem value="payments">Registros de Pagamentos</SelectItem>
                    <SelectItem value="suppliers">Cadastro de Fornecedores</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleSubmitRefinement}
                disabled={isProcessing || !dataSource}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    Iniciar Refinamento
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="classification" className="space-y-4 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Classificação Tributária</CardTitle>
              <CardDescription>
                Classifique dados conforme regras de retenção e tributação.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="classification-rules">Regras de Classificação</Label>
                <Select value={refinementRules} onValueChange={setRefinementRules}>
                  <SelectTrigger id="classification-rules">
                    <SelectValue placeholder="Selecione as regras de classificação" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="irrf">IRRF - Retenção na Fonte</SelectItem>
                    <SelectItem value="pis">PIS/COFINS - Créditos</SelectItem>
                    <SelectItem value="csll">CSLL - Base de Cálculo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleSubmitClassification}
                disabled={isProcessing || !refinementRules}
                className="w-full"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <ChevronRight className="mr-2 h-4 w-4" />
                    Iniciar Classificação
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="queue" className="space-y-4 pt-4">
          <DataProcessingQueue />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DataRefinementPanel;
