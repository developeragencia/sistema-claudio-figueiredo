
import React from 'react';
import { User, UserRole } from '@/types/user'; 
import { 
  User as UserIcon, 
  Mail, 
  Calendar, 
  Shield, 
  CheckCircle, 
  XCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface UserProfileHeaderProps {
  user: User;
}

const UserProfileHeader = ({ user }: UserProfileHeaderProps) => {
  // Map old role values to displayed text
  const getRoleDisplay = (role: UserRole): string => {
    switch(role) {
      case 'MASTER_ADMIN': return 'Administrador Master';
      case 'OFFICE_TEAM': return 'Equipe do Escritório';
      case 'CLIENT': return 'Cliente';
      case 'SALES_REP': return 'Representante Comercial';
      case 'admin': return 'Administrador';
      case 'staff': return 'Equipe do Escritório';
      case 'client': return 'Cliente';
      case 'representative': return 'Representante';
      case 'office': return 'Escritório';
      case 'sales': return 'Comercial';
      case 'admin_master': return 'Administrador Master';
      case 'staff_permanent': return 'Equipe Permanente';
      case 'staff_outsourced': return 'Equipe Terceirizada';
      case 'commercial_rep': return 'Representante Comercial';
      default: return 'Usuário';
    }
  };

  // Default user status to 'active' if not provided
  const userStatus = user.status || 'active';

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-card/50 mb-5">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
          <UserIcon className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <div className="flex items-center gap-2 mt-1 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <Badge 
              variant="secondary" 
              className={cn(
                (userStatus === 'active') 
                  ? "bg-green-500/20 text-green-700 dark:text-green-300"
                  : "bg-amber-500/20 text-amber-700 dark:text-amber-300"
              )}
            >
              {(userStatus === 'active') ? (
                <CheckCircle className="h-3 w-3 mr-1" />
              ) : (
                <XCircle className="h-3 w-3 mr-1" />
              )}
              {(userStatus === 'active') ? 'Ativo' : 'Inativo'}
            </Badge>
            
            <Badge 
              variant="outline" 
              className="bg-primary/5 border-primary/10"
            >
              <Shield className="h-3 w-3 mr-1 text-primary" />
              {getRoleDisplay(user.role)}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-start sm:items-end">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Membro desde: {new Date(user.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>
        
        {user.clientId && (
          <Badge variant="outline" className="mt-2">
            Cliente associado: ID-{user.clientId}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default UserProfileHeader;
