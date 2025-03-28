import React, { useState } from 'react';
import { useSystemAudit } from '@/hooks/useSystemAudit';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Search, Download, Activity, User, FileText, Settings } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { DatePicker } from '@/components/ui/date-picker';
import { logger } from '@/lib/logger';

export function SystemAudit() {
  const [search, setSearch] = useState('');
  const [action, setAction] = useState<string>('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const { data, isLoading, error } = useSystemAudit({
    search,
    action,
    start_date: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
    end_date: endDate ? format(endDate, 'yyyy-MM-dd') : undefined
  });
  const { toast } = useToast();

  const handleExport = (format: 'json' | 'csv' | 'xlsx') => {
    if (!data?.items) return;

    const exportData = data.items.map(audit => ({
      'Data': format === 'xlsx'
        ? new Date(audit.created_at)
        : format(new Date(audit.created_at), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR }),
      'Usuário': audit.user?.name || 'Sistema',
      'Ação': getActionText(audit.action),
      'Recurso': audit.resource_type,
      'ID do Recurso': audit.resource_id,
      'Detalhes': JSON.stringify(audit.details),
      'IP': audit.ip_address
    }));

    switch (format) {
      case 'json':
        const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        saveAs(jsonBlob, `auditoria-${format(new Date(), 'dd-MM-yyyy')}.json`);
        break;

      case 'csv':
        const csvContent = [
          Object.keys(exportData[0]).join(','),
          ...exportData.map(row => Object.values(row).join(','))
        ].join('\n');

        const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(csvBlob, `auditoria-${format(new Date(), 'dd-MM-yyyy')}.csv`);
        break;

      case 'xlsx':
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, 'Auditoria');
        XLSX.writeFile(wb, `auditoria-${format(new Date(), 'dd-MM-yyyy')}.xlsx`);
        break;
    }

    toast({
      title: 'Dados exportados',
      description: `Os dados foram exportados com sucesso no formato ${format.toUpperCase()}.`,
      variant: 'default'
    });
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'CREATE':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'UPDATE':
        return <Settings className="h-4 w-4 text-blue-500" />;
      case 'DELETE':
        return <Activity className="h-4 w-4 text-red-500" />;
      case 'LOGIN':
      case 'LOGOUT':
        return <User className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'Criação';
      case 'UPDATE':
        return 'Atualização';
      case 'DELETE':
        return 'Exclusão';
      case 'LOGIN':
        return 'Login';
      case 'LOGOUT':
        return 'Logout';
      default:
        return action;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'CREATE':
        return 'text-green-500';
      case 'UPDATE':
        return 'text-blue-500';
      case 'DELETE':
        return 'text-red-500';
      case 'LOGIN':
      case 'LOGOUT':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    logger.error('Erro ao carregar dados de auditoria', { error });
    return <div>Erro ao carregar dados de auditoria</div>;
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Auditoria do Sistema</h1>
          <p className="text-muted-foreground">
            Visualize e analise as ações realizadas no sistema
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
            Use os filtros abaixo para encontrar registros específicos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label>Buscar</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar na auditoria..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Ação</Label>
              <Select value={action} onValueChange={setAction}>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as ações" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas</SelectItem>
                  <SelectItem value="CREATE">Criação</SelectItem>
                  <SelectItem value="UPDATE">Atualização</SelectItem>
                  <SelectItem value="DELETE">Exclusão</SelectItem>
                  <SelectItem value="LOGIN">Login</SelectItem>
                  <SelectItem value="LOGOUT">Logout</SelectItem>
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
          <CardTitle>Registros de Auditoria</CardTitle>
          <CardDescription>
            Visualize todas as ações realizadas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Ação</TableHead>
                  <TableHead>Recurso</TableHead>
                  <TableHead>ID do Recurso</TableHead>
                  <TableHead>Detalhes</TableHead>
                  <TableHead>IP</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data?.items && data.items.length > 0 ? (
                  data.items.map((audit) => (
                    <TableRow key={audit.id}>
                      <TableCell>
                        {format(new Date(audit.created_at), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })}
                      </TableCell>
                      <TableCell>{audit.user?.name || 'Sistema'}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getActionIcon(audit.action)}
                          <span className={getActionColor(audit.action)}>
                            {getActionText(audit.action)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{audit.resource_type}</TableCell>
                      <TableCell>{audit.resource_id}</TableCell>
                      <TableCell>
                        <pre className="max-w-xs overflow-auto text-xs">
                          {JSON.stringify(audit.details, null, 2)}
                        </pre>
                      </TableCell>
                      <TableCell>{audit.ip_address}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      Nenhum registro encontrado.
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