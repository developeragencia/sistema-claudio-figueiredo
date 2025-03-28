
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CreditList from '../list/CreditList';
import { BarChart2, Download, ArrowRight, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Building, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CreditTabsProps {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  filteredCredits: Array<any>;
  onApprove: (creditId: string) => void;
  onReject: (creditId: string) => void;
}

const CreditTabs: React.FC<CreditTabsProps> = ({
  activeTab,
  setActiveTab,
  filteredCredits,
  onApprove,
  onReject
}) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="identification">Identificados</TabsTrigger>
        <TabsTrigger value="pending">Pendentes</TabsTrigger>
        <TabsTrigger value="approved">Aprovados</TabsTrigger>
      </TabsList>
      
      <TabsContent value="identification" className="space-y-4 pt-4">
        <CreditList
          title="Créditos Identificados"
          description="Lista completa de créditos identificados pelo sistema."
          credits={filteredCredits}
          emptyMessage={{
            title: "Nenhum crédito encontrado",
            description: "Não foram identificados créditos que correspondam aos seus critérios de busca."
          }}
          onApprove={onApprove}
          onReject={onReject}
          showExport={true}
        />
      </TabsContent>

      <TabsContent value="pending" className="space-y-4 pt-4">
        <CreditList
          title="Créditos Pendentes"
          description="Créditos tributários identificados aguardando revisão."
          credits={filteredCredits.filter(credit => credit.status === 'pending')}
          emptyMessage={{
            title: "Nenhum crédito pendente",
            description: "Não há créditos pendentes de revisão no momento."
          }}
          onApprove={onApprove}
          onReject={onReject}
        />
      </TabsContent>

      <TabsContent value="approved" className="space-y-4 pt-4">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>Créditos Aprovados</CardTitle>
                <CardDescription>
                  Créditos tributários aprovados para compensação.
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <BarChart2 className="mr-2 h-4 w-4" />
                  Relatório
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCredits.filter(credit => credit.status === 'approved').length > 0 ? (
                filteredCredits.filter(credit => credit.status === 'approved').map((credit) => (
                  <div key={credit.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3 md:mb-0">
                      <div className="bg-green-500/10 p-2 rounded-full">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{credit.id}</p>
                          <Badge variant="success">Aprovado</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Building className="h-3.5 w-3.5" />
                          <span>{credit.supplier}</span>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground"></span>
                          <RefreshCw className="h-3.5 w-3.5" />
                          <span>Atualizado: {credit.identificationDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-end mr-2">
                        <span className="text-sm font-medium">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(credit.totalCredit)}
                        </span>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <span className="text-green-600">+</span>
                          <span>
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(credit.correctionAmount)}
                          </span>
                          <span className="ml-1">(Selic)</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <ArrowRight className="mr-2 h-4 w-4" />
                        Compensar
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">Nenhum crédito aprovado</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Não há créditos aprovados que correspondam aos seus critérios de busca.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

// Don't forget to import Card, CardHeader, CardTitle, CardDescription, CardContent
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default CreditTabs;
