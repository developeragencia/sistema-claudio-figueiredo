
import React from 'react';
import { UserRole } from '@/types/user'; // Changed from @/types/client to @/types/user
import { cn } from '@/lib/utils';
import { CheckCircle, XCircle } from 'lucide-react';

interface PermissionProps {
  userRole: UserRole;
}

const ProfilePermissions = ({ userRole }: PermissionProps) => {
  // Define permissions based on user role
  const permissions = {
    admin: {
      title: 'Administrador Master',
      description: 'Acesso total ao sistema e todas as funcionalidades.',
      capabilities: [
        { name: 'Gerenciar usuários', allowed: true },
        { name: 'Gerenciar clientes', allowed: true },
        { name: 'Acessar todos os clientes', allowed: true },
        { name: 'Gerenciar créditos tributários', allowed: true },
        { name: 'Executar auditorias', allowed: true },
        { name: 'Configurar sistema', allowed: true },
        { name: 'Visualizar relatórios', allowed: true },
        { name: 'Editar conteúdo do site', allowed: true },
      ],
    },
    office: {
      title: 'Equipe do Escritório',
      description: 'Execução dividida entre permanente e terceirizada.',
      capabilities: [
        { name: 'Gerenciar usuários', allowed: false },
        { name: 'Gerenciar clientes', allowed: true },
        { name: 'Acessar todos os clientes', allowed: true },
        { name: 'Gerenciar créditos tributários', allowed: true },
        { name: 'Executar auditorias', allowed: true },
        { name: 'Configurar sistema', allowed: false },
        { name: 'Visualizar relatórios', allowed: true },
        { name: 'Editar conteúdo do site', allowed: false },
      ],
    },
    client: {
      title: 'Cliente (Órgão Público)',
      description: 'Visualização limitada, sem detalhes operacionais.',
      capabilities: [
        { name: 'Gerenciar usuários', allowed: false },
        { name: 'Gerenciar clientes', allowed: false },
        { name: 'Acessar todos os clientes', allowed: false },
        { name: 'Gerenciar créditos tributários', allowed: false },
        { name: 'Executar auditorias', allowed: false },
        { name: 'Configurar sistema', allowed: false },
        { name: 'Visualizar relatórios', allowed: true },
        { name: 'Editar conteúdo do site', allowed: false },
      ],
    },
    sales: {
      title: 'Representante Comercial',
      description: 'Acompanha a execução dos clientes que captou.',
      capabilities: [
        { name: 'Gerenciar usuários', allowed: false },
        { name: 'Gerenciar clientes', allowed: false },
        { name: 'Acessar todos os clientes', allowed: false },
        { name: 'Gerenciar créditos tributários', allowed: false },
        { name: 'Executar auditorias', allowed: false },
        { name: 'Configurar sistema', allowed: false },
        { name: 'Visualizar relatórios', allowed: true },
        { name: 'Editar conteúdo do site', allowed: false },
      ],
    },
  };

  const currentPermissions = permissions[userRole];

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card/50">
      <div>
        <h3 className="text-lg font-medium">{currentPermissions.title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{currentPermissions.description}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {currentPermissions.capabilities.map((capability, index) => (
          <div 
            key={index} 
            className={cn(
              "flex items-center justify-between p-2 rounded-md",
              capability.allowed ? "bg-primary/5" : "bg-muted"
            )}
          >
            <span className="text-sm">{capability.name}</span>
            {capability.allowed ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <XCircle className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePermissions;
