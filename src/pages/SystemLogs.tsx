import React, { useState } from 'react';
import { useSystemLogs } from '@/hooks/useSystemLogs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Search, Download, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePicker } from '@/components/ui/date-picker';
import { logger } from '@/lib/logger';

export function SystemLogs() {
  const [search, setSearch] = useState('');
  const [level, setLevel] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { data, isLoading, error } = useSystemLogs({
    search,
    level,
    start_date: startDate,
    end_date: endDate
  });
  const { toast } = useToast();

  const handleExport = (format: 'json' | 'csv' | 'xlsx') => {
    if (!data?.items) return;

    const exportData = data.items.map(log => ({
      'Data': format === 'xlsx'
        ? new Date(log.created_at)
        : format(new Date(log.created_at), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
      'Nível': log.level === 'ERROR' ? 'Erro' :
               log.level === 'WARNING' ? 'Aviso' :
               log.level === 'INFO' ? 'Informação' : 'Debug',
      'Mensagem': log.message,
      'Usuário': log.user?.name || 'Sistema',
      'IP': log.ip_address,
      'Navegador': log.user_agent
    }));

    switch (format) {
      case 'json':
        const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        saveAs(jsonBlob, `logs-${format(new Date(), 'dd-MM-yyyy')}.json`);
        break;

      case 'csv':
        const csvContent = [
          Object.keys(exportData[0]).join(','),
          ...exportData.map(row => Object.values(row).join(','))
        ].join('\n');

        const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(csvBlob, `logs-${format(new Date(), 'dd-MM-yyyy')}.csv`);
        break;

      case 'xlsx':
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, 'Logs');
        XLSX.writeFile(wb, `logs-${format(new Date(), 'dd-MM-yyyy')}.xlsx`);
        break;
    }

    toast({
      title: 'Dados exportados',
      description: `Os dados foram exportados com sucesso no formato ${format.toUpperCase()}.`,
      variant: 'default'
    });
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'ERROR':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'WARNING':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'INFO':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'DEBUG':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getLevelText = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'Erro';
      case 'WARNING':
        return 'Aviso';
      case 'INFO':
        return 'Informação';
      case 'DEBUG':
        return 'Debug';
      default:
        return level;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'ERROR':
        return 'text-red-500';
      case 'WARNING':
        return 'text-yellow-500';
      case 'INFO':
        return 'text-blue-500';
      case 'DEBUG':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    logger.error('Erro ao carregar logs do sistema', { error });
    return <div>Erro ao carregar logs do sistema</div>;
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Logs do Sistema</h1>
          <p className="text-muted-foreground">
            Visualize e analise os logs do sistema
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => handleExport('json')}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Use os filtros abaixo para encontrar logs específicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar nos logs..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Nível</Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os níveis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos</SelectItem>
                  <SelectItem value="ERROR">Erro</SelectItem>
                  <SelectItem value="WARNING">Aviso</SelectItem>
                  <SelectItem value="INFO">Informação</SelectItem>
                  <SelectItem value="DEBUG">Debug</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Data Inicial</Label>
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                placeholderText="Data inicial"
              />
            </div>

            <div className="space-y-2">
              <Label>Data Final</Label>
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                placeholderText="Data final"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Logs</CardTitle>
          <CardDescription>
            Visualize todos os logs do sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Nível</TableHead>
                  <TableHead>Mensagem</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>IP</TableHead>
                  <TableHead>Navegador</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.items && data.items.length > 0 ? (
                  data.items.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {format(new Date(log.created_at), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getLevelIcon(log.level)}
                          <span className={getLevelColor(log.level)}>
                            {getLevelText(log.level)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell>{log.user?.name || 'Sistema'}</TableCell>
                      <TableCell>{log.ip_address}</TableCell>
                      <TableCell>{log.user_agent}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Nenhum log encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 