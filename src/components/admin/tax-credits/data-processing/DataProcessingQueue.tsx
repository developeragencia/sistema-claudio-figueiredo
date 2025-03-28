import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  RefreshCw, StopCircle, ArrowUpDown, CheckCircle2, XCircle, 
  AlertTriangle, Clock, Layers, Hourglass
} from 'lucide-react';
import { toast } from 'sonner';

interface QueueItem {
  id: string;
  type: 'import' | 'analysis' | 'correction';
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'canceled';
  progress: number;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  clientName?: string;
  fileCount?: number;
  recordCount?: number;
}

const mockQueueItems: QueueItem[] = [
  {
    id: 'TASK-001',
    type: 'import',
    description: 'Importação NFe Janeiro 2023',
    status: 'completed',
    progress: 100,
    createdAt: '2023-05-15T14:30:00Z',
    startedAt: '2023-05-15T14:30:05Z',
    completedAt: '2023-05-15T14:35:22Z',
    clientName: 'ABC Comércio Ltda',
    fileCount: 15,
    recordCount: 1250
  },
  {
    id: 'TASK-002',
    type: 'analysis',
    description: 'Análise de créditos tributários',
    status: 'processing',
    progress: 65,
    createdAt: '2023-05-15T15:20:00Z',
    startedAt: '2023-05-15T15:20:10Z',
    clientName: 'XYZ Indústria S/A',
    recordCount: 850
  },
  {
    id: 'TASK-003',
    type: 'correction',
    description: 'Correção monetária Selic',
    status: 'pending',
    progress: 0,
    createdAt: '2023-05-15T16:00:00Z',
    clientName: 'Gama Consulting'
  },
  {
    id: 'TASK-004',
    type: 'import',
    description: 'Importação Extratos Bancários',
    status: 'failed',
    progress: 35,
    createdAt: '2023-05-15T13:10:00Z',
    startedAt: '2023-05-15T13:10:15Z',
    completedAt: '2023-05-15T13:15:30Z',
    clientName: 'Delta Serviços ME',
    fileCount: 8,
    recordCount: 550
  }
];

const DataProcessingQueue: React.FC = () => {
  const [queueItems, setQueueItems] = useState<QueueItem[]>(mockQueueItems);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = () => {
    setIsRefreshing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
      toast("Fila atualizada", {
        description: "As informações da fila de processamento foram atualizadas."
      });
    }, 1500);
  };
  
  const handleCancelTask = (taskId: string) => {
    setQueueItems(items => 
      items.map(item => 
        item.id === taskId 
          ? { ...item, status: 'canceled', progress: 0 } 
          : item
      )
    );
    
    toast("Tarefa cancelada", {
      description: `A tarefa ${taskId} foi cancelada com sucesso.`
    });
  };
  
  const handleRestartTask = (taskId: string) => {
    setQueueItems(items => 
      items.map(item => 
        item.id === taskId 
          ? { ...item, status: 'pending', progress: 0, startedAt: undefined, completedAt: undefined } 
          : item
      )
    );
    
    toast("Tarefa reiniciada", {
      description: `A tarefa ${taskId} foi colocada novamente na fila.`
    });
  };
  
  const handleRollback = (taskId: string) => {
    setQueueItems(items => 
      items.map(item => 
        item.id === taskId 
          ? { ...item, status: 'pending', description: `Rollback: ${item.description}`, progress: 0 } 
          : item
      )
    );
    
    toast("Rollback iniciado", {
      description: `O rollback da tarefa ${taskId} foi iniciado.`
    });
  };
  
  const renderStatusBadge = (status: QueueItem['status']) => {
    switch(status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
            <CheckCircle2 className="h-3 w-3" />
            Concluído
          </Badge>
        );
      case 'processing':
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
            <RefreshCw className="h-3 w-3 animate-spin" />
            Processando
          </Badge>
        );
      case 'pending':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Pendente
          </Badge>
        );
      case 'failed':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 flex items-center gap-1">
            <XCircle className="h-3 w-3" />
            Falha
          </Badge>
        );
      case 'canceled':
        return (
          <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200 flex items-center gap-1">
            <StopCircle className="h-3 w-3" />
            Cancelado
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">{status}</Badge>
        );
    }
  };
  
  const renderTypeIcon = (type: QueueItem['type']) => {
    switch(type) {
      case 'import':
        return <Layers className="h-4 w-4 text-blue-600" />;
      case 'analysis':
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case 'correction':
        return <Hourglass className="h-4 w-4 text-purple-600" />;
      default:
        return null;
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Fila de Processamento</CardTitle>
          <CardDescription>
            Gerenciamento de tarefas de processamento assíncrono
          </CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="ml-2"
        >
          {isRefreshing ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Atualizando...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Atualizar
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Tipo</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progresso</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queueItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{renderTypeIcon(item.type)}</TableCell>
                <TableCell className="font-medium">
                  <div>{item.description}</div>
                  <div className="text-xs text-muted-foreground">{item.id}</div>
                </TableCell>
                <TableCell>{item.clientName}</TableCell>
                <TableCell>{renderStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <div className="w-full">
                    <Progress value={item.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.progress}%
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    {item.status === 'processing' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCancelTask(item.id)}
                      >
                        <StopCircle className="h-4 w-4" />
                      </Button>
                    )}
                    {(item.status === 'failed' || item.status === 'canceled') && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRestartTask(item.id)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
                    {(item.status === 'completed' || item.status === 'failed') && item.type === 'import' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRollback(item.id)}
                      >
                        <ArrowUpDown className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          Total de tarefas: {queueItems.length}
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => toast("Tarefa cancelada", {
              description: "Todas as tarefas pendentes foram canceladas."
            })}
          >
            Cancelar todas pendentes
          </Button>
          <Button 
            size="sm"
            onClick={() => toast("Limpeza concluída", {
              description: "A fila foi limpa de tarefas concluídas e com falha."
            })}
          >
            Limpar fila
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DataProcessingQueue;
