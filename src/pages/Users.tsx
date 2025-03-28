import React, { useState } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Plus, Search, Download } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { UserForm } from '@/components/users/UserForm';

const userSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  role: z.string().min(1, 'O papel é obrigatório'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirm_password: z.string()
}).refine((data) => data.password === data.confirm_password, {
  message: 'As senhas não conferem',
  path: ['confirm_password']
});

type UserFormData = z.infer<typeof userSchema>;

export function Users() {
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { data, isLoading, createUser } = useUsers({
    search
  });
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema)
  });

  const onSubmit = async (formData: UserFormData) => {
    try {
      await createUser(formData);
      toast({
        title: 'Usuário criado',
        description: 'O usuário foi criado com sucesso.',
        variant: 'default'
      });
      setIsDialogOpen(false);
      reset();
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao criar o usuário.',
        variant: 'destructive'
      });
    }
  };

  const handleExport = (format: 'json' | 'csv' | 'xlsx') => {
    if (!data?.items) return;

    const exportData = data.items.map(user => ({
      'Nome': user.name,
      'E-mail': user.email,
      'Papel': user.role === 'ADMIN' ? 'Administrador' :
               user.role === 'MANAGER' ? 'Gerente' : 'Usuário',
      'Status': user.status === 'ACTIVE' ? 'Ativo' : 'Inativo',
      'Criado em': format === 'xlsx'
        ? new Date(user.created_at)
        : format(new Date(user.created_at), 'dd/MM/yyyy', { locale: ptBR }),
      'Último acesso': user.last_login
        ? format === 'xlsx'
          ? new Date(user.last_login)
          : format(new Date(user.last_login), 'dd/MM/yyyy HH:mm', { locale: ptBR })
        : 'Nunca'
    }));

    switch (format) {
      case 'json':
        const jsonBlob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
        saveAs(jsonBlob, `usuarios-${format(new Date(), 'dd-MM-yyyy')}.json`);
        break;

      case 'csv':
        const csvContent = [
          Object.keys(exportData[0]).join(','),
          ...exportData.map(row => Object.values(row).join(','))
        ].join('\n');

        const csvBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(csvBlob, `usuarios-${format(new Date(), 'dd-MM-yyyy')}.csv`);
        break;

      case 'xlsx':
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        XLSX.utils.book_append_sheet(wb, ws, 'Usuários');
        XLSX.writeFile(wb, `usuarios-${format(new Date(), 'dd-MM-yyyy')}.xlsx`);
        break;
    }

    toast({
      title: 'Dados exportados',
      description: `Os dados foram exportados com sucesso no formato ${format.toUpperCase()}.`,
      variant: 'default'
    });
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'Administrador';
      case 'MANAGER':
        return 'Gerente';
      case 'USER':
        return 'Usuário';
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'text-red-500';
      case 'MANAGER':
        return 'text-blue-500';
      case 'USER':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'text-green-500';
      case 'INACTIVE':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">
            Gerencie os usuários do sistema
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo Usuário</DialogTitle>
                <DialogDescription>
                  Preencha os dados do novo usuário
                </DialogDescription>
              </DialogHeader>

              <UserForm onSubmit={onSubmit} />
            </DialogContent>
          </Dialog>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => handleExport('json')}>
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
          <CardDescription>
            Visualize e gerencie todos os usuários cadastrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar usuários..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Papel</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Último acesso</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        <div className="flex items-center justify-center">
                          <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : data?.items && data.items.length > 0 ? (
                    data.items.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span className={getRoleColor(user.role)}>
                            {getRoleText(user.role)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span className={getStatusColor(user.status)}>
                            {user.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(new Date(user.created_at), 'dd/MM/yyyy', { locale: ptBR })}
                        </TableCell>
                        <TableCell>
                          {user.last_login
                            ? format(new Date(user.last_login), 'dd/MM/yyyy HH:mm', { locale: ptBR })
                            : 'Nunca'}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        Nenhum usuário encontrado.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 