
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter, RefreshCw, Calendar, FileText } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/components/ui/use-toast";

const AuditTrailsPanel = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [actionType, setActionType] = useState('all');
  const [userFilter, setUserFilter] = useState('all');
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [startDateOpen, setStartDateOpen] = useState(false);
  const [endDateOpen, setEndDateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Sample audit logs data
  const auditLogs = [
    {
      id: '1',
      timestamp: '15/03/2023 14:32:45',
      user: 'admin@sistemasclaudio.com',
      action: 'login',
      details: 'Login bem-sucedido',
      ipAddress: '192.168.1.1'
    },
    {
      id: '2',
      timestamp: '15/03/2023 15:45:12',
      user: 'admin@sistemasclaudio.com',
      action: 'update',
      details: 'Atualização de cliente ID: CL-001',
      ipAddress: '192.168.1.1'
    },
    {
      id: '3',
      timestamp: '15/03/2023 16:23:08',
      user: 'maria@sistemasclaudio.com',
      action: 'create',
      details: 'Criação de novo relatório fiscal',
      ipAddress: '192.168.1.5'
    },
    {
      id: '4',
      timestamp: '16/03/2023 09:12:33',
      user: 'joao@sistemasclaudio.com',
      action: 'delete',
      details: 'Exclusão de documento ID: DOC-123',
      ipAddress: '192.168.1.10'
    },
    {
      id: '5',
      timestamp: '16/03/2023 11:05:22',
      user: 'admin@sistemasclaudio.com',
      action: 'export',
      details: 'Exportação de relatório em PDF',
      ipAddress: '192.168.1.1'
    }
  ];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.ipAddress.includes(searchQuery);
                          
    const matchesAction = actionType === 'all' || log.action === actionType;
    const matchesUser = userFilter === 'all' || log.user === userFilter;
    
    // Date filtering would be implemented here
    
    return matchesSearch && matchesAction && matchesUser;
  });

  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Logs atualizados",
        description: "Os logs de auditoria foram atualizados com sucesso.",
      });
    }, 1500);
  };

  const handleExport = () => {
    toast({
      title: "Exportando logs",
      description: "Os logs de auditoria estão sendo exportados para CSV.",
    });
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setActionType('all');
    setUserFilter('all');
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Trilhas de Auditoria</h2>
          <p className="text-muted-foreground">
            Monitoramento completo de todas as ações realizadas no sistema
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Atualizar
          </Button>
          
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
          
          <Button size="sm" onClick={handleClearFilters}>
            <Filter className="mr-2 h-4 w-4" />
            Limpar Filtros
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>Refine os logs de auditoria com filtros específicos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar logs..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div>
              <Select value={actionType} onValueChange={setActionType}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo de Ação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Ações</SelectItem>
                  <SelectItem value="login">Login</SelectItem>
                  <SelectItem value="create">Criação</SelectItem>
                  <SelectItem value="update">Atualização</SelectItem>
                  <SelectItem value="delete">Exclusão</SelectItem>
                  <SelectItem value="export">Exportação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Usuários</SelectItem>
                  <SelectItem value="admin@sistemasclaudio.com">Admin</SelectItem>
                  <SelectItem value="maria@sistemasclaudio.com">Maria</SelectItem>
                  <SelectItem value="joao@sistemasclaudio.com">João</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Popover open={startDateOpen} onOpenChange={setStartDateOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="mr-2 h-4 w-4" />
                    {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Data inicial"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={startDate}
                    onSelect={(date) => {
                      setStartDate(date);
                      setStartDateOpen(false);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-3 text-left font-medium">Data/Hora</th>
                  <th className="p-3 text-left font-medium">Usuário</th>
                  <th className="p-3 text-left font-medium">Ação</th>
                  <th className="p-3 text-left font-medium">Detalhes</th>
                  <th className="p-3 text-left font-medium">IP</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.length > 0 ? (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="border-t hover:bg-muted/50">
                      <td className="p-3">{log.timestamp}</td>
                      <td className="p-3">{log.user}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          log.action === 'login' ? 'bg-blue-100 text-blue-800' :
                          log.action === 'create' ? 'bg-green-100 text-green-800' :
                          log.action === 'update' ? 'bg-yellow-100 text-yellow-800' :
                          log.action === 'delete' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {log.action === 'login' ? 'Login' :
                           log.action === 'create' ? 'Criação' :
                           log.action === 'update' ? 'Atualização' :
                           log.action === 'delete' ? 'Exclusão' :
                           log.action === 'export' ? 'Exportação' : log.action}
                        </span>
                      </td>
                      <td className="p-3">{log.details}</td>
                      <td className="p-3">{log.ipAddress}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      <FileText className="mx-auto h-8 w-8 mb-2" />
                      <p>Nenhum log encontrado com os filtros atuais.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditTrailsPanel;
