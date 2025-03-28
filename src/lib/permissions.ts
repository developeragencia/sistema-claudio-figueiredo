import { User, UserRole } from '@/types/user';

export const PERMISSIONS = {
  // Permissões de clientes
  'clients.list': 'Listar clientes',
  'clients.view': 'Visualizar cliente',
  'clients.create': 'Criar cliente',
  'clients.update': 'Atualizar cliente',
  'clients.delete': 'Excluir cliente',
  'clients.assign_users': 'Atribuir usuários a clientes',
  
  // Permissões de transações
  'transactions.list': 'Listar transações',
  'transactions.view': 'Visualizar transação',
  'transactions.create': 'Criar transação',
  'transactions.update': 'Atualizar transação',
  'transactions.delete': 'Excluir transação',
  'transactions.approve': 'Aprovar transação',
  'transactions.reject': 'Rejeitar transação',
  
  // Permissões de relatórios
  'reports.view': 'Visualizar relatórios',
  'reports.export': 'Exportar relatórios',
  'reports.create': 'Criar relatórios personalizados',
  
  // Permissões de usuários
  'users.list': 'Listar usuários',
  'users.view': 'Visualizar usuário',
  'users.create': 'Criar usuário',
  'users.update': 'Atualizar usuário',
  'users.delete': 'Excluir usuário',
  
  // Permissões de configurações
  'settings.view': 'Visualizar configurações',
  'settings.update': 'Atualizar configurações',
  
  // Permissões especiais
  'all.access': 'Acesso total',
} as const;

export type Permission = keyof typeof PERMISSIONS;

export function hasPermission(user: User | null, permission: Permission): boolean {
  if (!user) {
    return false;
  }

  // Master admin tem todas as permissões
  if (user.role === 'MASTER_ADMIN') {
    return true;
  }

  // Verifica se o usuário tem a permissão específica ou permissão total
  return user.permissions.includes(permission) || user.permissions.includes('all.access');
}

export function hasAnyPermission(user: User | null, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(user, permission));
}

export function hasAllPermissions(user: User | null, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(user, permission));
}

export function getAvailablePermissions(role: UserRole): Permission[] {
  switch (role) {
    case 'MASTER_ADMIN':
      return Object.keys(PERMISSIONS) as Permission[];
    
    case 'OFFICE_TEAM':
      return [
        'clients.list',
        'clients.view',
        'clients.create',
        'clients.update',
        'transactions.list',
        'transactions.view',
        'transactions.create',
        'transactions.update',
        'transactions.approve',
        'transactions.reject',
        'reports.view',
        'reports.export',
      ];
    
    case 'CLIENT':
      return [
        'transactions.list',
        'transactions.view',
        'transactions.create',
        'reports.view',
        'reports.export',
      ];
    
    case 'SALES_REP':
      return [
        'clients.list',
        'clients.view',
        'transactions.list',
        'transactions.view',
        'reports.view',
      ];
    
    default:
      return [];
  }
}