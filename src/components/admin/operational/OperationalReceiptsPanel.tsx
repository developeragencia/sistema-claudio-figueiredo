
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ReceiptText, Search, Filter, ArrowUpDown, Download, Printer, 
  Eye, Copy, CheckCircle, XCircle, AlertCircle 
} from "lucide-react";

const OperationalReceiptsPanel = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gestão de Recibos Operacionais</h2>
          <p className="text-muted-foreground">
            Gerenciamento de recibos e comprovantes de operações fiscais.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
          <Button className="flex items-center gap-2">
            <ReceiptText className="h-4 w-4" />
            Novo Recibo
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Pesquisar Recibos</CardTitle>
            <CardDescription>
              Busque recibos por número, cliente ou período.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Buscar por número ou cliente..." className="pl-9" />
              </div>
              <Button className="shrink-0">Buscar</Button>
            </div>
          </CardContent>
        </Card>
        
        <Card className="flex-1">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Resumo</CardTitle>
            <CardDescription>
              Visão geral dos recibos operacionais.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold">128</div>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-500">98</div>
                <p className="text-xs text-muted-foreground">Válidos</p>
              </div>
              <div>
                <div className="text-2xl font-bold text-amber-500">30</div>
                <p className="text-xs text-muted-foreground">Pendentes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="valid">Válidos</TabsTrigger>
          <TabsTrigger value="pending">Pendentes</TabsTrigger>
          <TabsTrigger value="archived">Arquivados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4 pt-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Recibos Operacionais</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="mr-2 h-4 w-4" />
                    Ordenar
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Exportar
                  </Button>
                </div>
              </div>
              <CardDescription>
                Lista de todos os recibos operacionais do sistema.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted p-3 text-sm font-medium">
                  <div>Número</div>
                  <div>Cliente</div>
                  <div>Data</div>
                  <div>Valor</div>
                  <div>Tipo</div>
                  <div>Status</div>
                  <div>Ações</div>
                </div>
                <div className="divide-y">
                  {Array.from({ length: 10 }).map((_, i) => {
                    const isValid = i % 3 === 0;
                    const isPending = i % 3 === 1;
                    const isInvalid = i % 3 === 2;
                    
                    return (
                      <div key={i} className="grid grid-cols-7 p-3 text-sm">
                        <div>REC-{2023}-{1000 + i}</div>
                        <div>Cliente {i + 1}</div>
                        <div>{`${10 + i}/04/2023`}</div>
                        <div>R$ {(1580 * (i + 1)).toLocaleString('pt-BR')}</div>
                        <div>{i % 2 === 0 ? "Retenção" : "Comprovante"}</div>
                        <div>
                          {isValid && (
                            <Badge variant="success" className="flex w-fit items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Válido
                            </Badge>
                          )}
                          {isPending && (
                            <Badge variant="outline" className="flex w-fit items-center gap-1">
                              <AlertCircle className="h-3 w-3" />
                              Pendente
                            </Badge>
                          )}
                          {isInvalid && (
                            <Badge variant="destructive" className="flex w-fit items-center gap-1">
                              <XCircle className="h-3 w-3" />
                              Inválido
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" title="Visualizar">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Imprimir">
                            <Printer className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="Duplicar">
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Mostrando 1-10 de 128 resultados
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" disabled>Anterior</Button>
                <Button variant="outline" size="sm">Próximo</Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="valid" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recibos Válidos</CardTitle>
              <CardDescription>
                Lista de recibos operacionais validados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-4">Conteúdo similar ao da aba "Todos", filtrado por recibos válidos.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recibos Pendentes</CardTitle>
              <CardDescription>
                Lista de recibos operacionais pendentes de validação.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-4">Conteúdo similar ao da aba "Todos", filtrado por recibos pendentes.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recibos Arquivados</CardTitle>
              <CardDescription>
                Lista de recibos operacionais arquivados.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-4">Conteúdo similar ao da aba "Todos", filtrado por recibos arquivados.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OperationalReceiptsPanel;
