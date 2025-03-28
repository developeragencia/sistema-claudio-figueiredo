import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Search } from 'lucide-react';

// Dados simulados para exemplo
const roles = [
  {
    id: 1,
    name: 'MASTER_ADMIN',
    label: 'Master Admin',
    description: 'Acesso total ao sistema',
    permissions: [
      'users.view',
      'users.create',
      'users.edit',
      'users.delete',
      'roles.view',
      'roles.create',
      'roles.edit',
      'roles.delete',
      'audit.view',
    ],
    usersCount: 1,
  },
  {
    id: 2,
    name: 'ADMIN',
    label: 'Administrador',
    description: 'Acesso administrativo limitado',
    permissions: [
      'users.view',
      'users.create',
      'users.edit',
      'audit.view',
    ],
    usersCount: 3,
  },
  {
    id: 3,
    name: 'USER',
    label: 'Usuário',
    description: 'Acesso básico ao sistema',
    permissions: [
      'profile.view',
      'profile.edit',
    ],
    usersCount: 10,
  },
];

const allPermissions = [
  {
    group: 'Usuários',
    permissions: [
      { id: 'users.view', label: 'Visualizar usuários' },
      { id: 'users.create', label: 'Criar usuários' },
      { id: 'users.edit', label: 'Editar usuários' },
      { id: 'users.delete', label: 'Excluir usuários' },
    ],
  },
  {
    group: 'Permissões',
    permissions: [
      { id: 'roles.view', label: 'Visualizar permissões' },
      { id: 'roles.create', label: 'Criar permissões' },
      { id: 'roles.edit', label: 'Editar permissões' },
      { id: 'roles.delete', label: 'Excluir permissões' },
    ],
  },
  {
    group: 'Auditoria',
    permissions: [
      { id: 'audit.view', label: 'Visualizar logs' },
    ],
  },
  {
    group: 'Perfil',
    permissions: [
      { id: 'profile.view', label: 'Visualizar perfil' },
      { id: 'profile.edit', label: 'Editar perfil' },
    ],
  },
];

export function Roles() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Permissões</h2>
          <p className="text-muted-foreground">
            Gerencie as funções e permissões do sistema.
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Nova Função
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Funções</CardTitle>
          <CardDescription>
            Visualize e gerencie todas as funções cadastradas no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Usuários</TableHead>
                <TableHead>Permissões</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((role) => (
                <TableRow key={role.id}>
                  <TableCell>
                    <div className="font-medium">{role.label}</div>
                    <div className="text-sm text-muted-foreground">{role.name}</div>
                  </TableCell>
                  <TableCell>{role.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {role.usersCount} usuário{role.usersCount !== 1 ? 's' : ''}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {role.permissions.length} permissão{role.permissions.length !== 1 ? 'ões' : ''}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Permissões Disponíveis</CardTitle>
          <CardDescription>
            Lista de todas as permissões disponíveis no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {allPermissions.map((group) => (
              <div key={group.group} className="space-y-4">
                <h3 className="font-medium">{group.group}</h3>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {group.permissions.map((permission) => (
                    <div
                      key={permission.id}
                      className="flex items-center space-x-2 rounded-md border p-4"
                    >
                      <Checkbox id={permission.id} />
                      <Label htmlFor={permission.id}>{permission.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 