import React, { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PageHeader } from '@/components/common/PageHeader';
import { FilterCard, FilterOption } from '@/components/common/FilterCard';
import { DataTable, Column } from '@/components/common/DataTable';
import { useFilters } from '@/hooks/useFilters';
import { usePagination } from '@/hooks/usePagination';
import { useUsers } from '@/hooks/useApi';
import { UserModal } from '@/components/users/UserModal';
import { MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { User, UserFormData } from '@/types/users';
import { useQuery } from '@tanstack/react-query';

const roleLabels = {
  MASTER_ADMIN: 'Master Admin',
  ADMIN: 'Administrador',
  USER: 'Usuário',
};

const statusLabels = {
  active: 'Ativo',
  inactive: 'Inativo',
  blocked: 'Bloqueado',
};

const statusColors = {
  active: 'bg-green-500',
  inactive: 'bg-yellow-500',
  blocked: 'bg-red-500',
} as const;

const filterOptions: FilterOption[] = [
  {
    id: 'role',
    label: 'Função',
    options: Object.entries(roleLabels).map(([value, label]) => ({ value, label })),
  },
  {
    id: 'status',
    label: 'Status',
    options: Object.entries(statusLabels).map(([value, label]) => ({ value, label })),
  },
];

export function Users() {
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { users, isLoading, deleteUser } = useUsers();
  const { filters, handleSearchChange, handleFilterChange } = useFilters();
  const { page, pageSize, totalPages, goToPage, changePageSize } = usePagination({
    total: users.length,
  });
  const queryClient = useQueryClient();

  // Filtra e pagina os usuários
  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Aplica filtros
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.role) {
      result = result.filter(user => user.role === filters.role);
    }

    if (filters.status) {
      result = result.filter(user => user.status === filters.status);
    }

    // Aplica paginação
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    return result.slice(start, end);
  }, [filters, users, page, pageSize]);

  // Reseta a página quando os filtros mudam
  useEffect(() => {
    goToPage(1);
  }, [filters, goToPage]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (user: User) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        await deleteUser(user.id);
        toast.success('Usuário excluído com sucesso');
        queryClient.invalidateQueries(['users']);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Erro ao excluir usuário:', error.message);
          toast.error('Erro ao excluir usuário');
        }
      }
    }
  };

  // Colunas da tabela
  const columns: Column<User>[] = [
    {
      header: 'Usuário',
      accessorKey: 'name',
      cell: (row) => {
        const userInitials = row.name
          .split(' ')
          .map(n => n[0])
          .join('')
          .toUpperCase();

        return (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={row.avatar_url} alt={row.name} />
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
            <span className="font-medium">{row.name}</span>
          </div>
        );
      },
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Função',
      accessorKey: 'role',
      cell: (row) => (
        <Badge variant="secondary">
          {roleLabels[row.role as keyof typeof roleLabels]}
        </Badge>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (row) => (
        <Badge
          variant="outline"
          className={`${statusColors[row.status as keyof typeof statusColors]} text-white`}
        >
          {statusLabels[row.status as keyof typeof statusLabels]}
        </Badge>
      ),
    },
    {
      header: 'Último Acesso',
      accessorKey: 'lastLogin',
      cell: (row) => new Date(row.lastLogin).toLocaleString('pt-BR'),
    },
    {
      header: 'Ações',
      accessorKey: 'actions',
      cell: (row) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleEdit(row)}>
              Editar
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => handleDelete(row)}
            >
              Excluir
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Usuários"
        description="Gerencie os usuários do sistema e suas permissões."
        createButton={{
          label: 'Novo Usuário',
          onClick: () => {
            setSelectedUser(undefined);
            setIsModalOpen(true);
          },
        }}
      />

      <FilterCard
        title="Filtros"
        description="Use os filtros abaixo para encontrar usuários específicos."
        searchPlaceholder="Buscar por nome ou email..."
        filters={filterOptions}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
      />

      <DataTable
        title="Lista de Usuários"
        description="Visualize e gerencie todos os usuários cadastrados no sistema."
        columns={columns}
        data={filteredUsers}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        onPageChange={goToPage}
        onPageSizeChange={changePageSize}
      />

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedUser(undefined);
        }}
        user={selectedUser}
      />
    </div>
  );
} 