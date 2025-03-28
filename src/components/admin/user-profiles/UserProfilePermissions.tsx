
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle, Save, UserCog } from 'lucide-react';
import { UserRole } from '@/types/user';
import { toast } from 'sonner';

interface PermissionSwitchProps {
  id: string;
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

const PermissionSwitch: React.FC<PermissionSwitchProps> = ({
  id,
  label,
  description,
  checked,
  onCheckedChange,
  disabled = false,
}) => {
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
      <div className="space-y-0.5">
        <Label htmlFor={id}>{label}</Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        id={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
};

interface RoleCardProps {
  role: UserRole;
  title: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({
  role,
  title,
  description,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`cursor-pointer rounded-lg border p-4 transition-all hover:shadow-md ${
        isActive ? 'border-primary bg-primary/5 shadow-sm' : 'hover:border-primary/50'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        {isActive && (
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <CheckCircle className="h-3 w-3 mr-1" />
            Selecionado
          </Badge>
        )}
      </div>
    </div>
  );
};

interface UserProfilePermissionsProps {
  userRole: UserRole;
}

const UserProfilePermissions: React.FC<UserProfilePermissionsProps> = ({ 
  userRole = 'client' 
}) => {
  const [activeRole, setActiveRole] = React.useState<UserRole>(userRole);
  const [permissions, setPermissions] = React.useState({
    viewAllClients: activeRole === 'admin_master' || activeRole === 'staff_permanent',
    editClients: activeRole === 'admin_master' || activeRole === 'staff_permanent',
    deleteClients: activeRole === 'admin_master',
    viewProposals: activeRole !== 'client',
    createProposals: activeRole === 'admin_master' || activeRole === 'commercial_rep',
    approveProposals: activeRole === 'admin_master' || activeRole === 'staff_permanent',
    viewOperationalDetails: activeRole !== 'client' && activeRole !== 'commercial_rep',
    assignUsers: activeRole === 'admin_master',
    viewReports: true,
    adminAccess: activeRole === 'admin_master',
  });

  // Update permissions when active role changes
  React.useEffect(() => {
    setPermissions({
      viewAllClients: activeRole === 'admin_master' || activeRole === 'staff_permanent',
      editClients: activeRole === 'admin_master' || activeRole === 'staff_permanent',
      deleteClients: activeRole === 'admin_master',
      viewProposals: activeRole !== 'client',
      createProposals: activeRole === 'admin_master' || activeRole === 'commercial_rep',
      approveProposals: activeRole === 'admin_master' || activeRole === 'staff_permanent',
      viewOperationalDetails: activeRole !== 'client' && activeRole !== 'commercial_rep',
      assignUsers: activeRole === 'admin_master',
      viewReports: true,
      adminAccess: activeRole === 'admin_master',
    });
  }, [activeRole]);

  const handlePermissionChange = (key: keyof typeof permissions, value: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSavePermissions = () => {
    // Here you would save the permissions to the server
    toast.success("Permissões salvas", {
      description: "As alterações foram salvas com sucesso."
    });
  };

  const isAdminMaster = activeRole === 'admin_master';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Perfis e Permissões</h1>
        <p className="text-muted-foreground">
          Gerencie perfis de usuários e permissões de acesso ao sistema
        </p>
      </div>

      <Tabs defaultValue="roles">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="roles">Perfis</TabsTrigger>
          <TabsTrigger value="permissions">Permissões</TabsTrigger>
        </TabsList>
        
        <TabsContent value="roles" className="space-y-4 mt-4">
          <Alert variant="default" className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-900/20 dark:text-amber-300">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="mb-1">Atenção</AlertTitle>
            <AlertDescription>
              A alteração de perfil irá redefinir as permissões padrão para o perfil selecionado.
            </AlertDescription>
          </Alert>
          
          <div className="grid gap-4 mt-5">
            <RoleCard
              role="admin_master"
              title="Administrador Master"
              description="Acesso total ao sistema, incluindo todas as funcionalidades administrativas"
              isActive={activeRole === 'admin_master'}
              onClick={() => setActiveRole('admin_master')}
            />
            
            <RoleCard
              role="staff_permanent"
              title="Equipe Permanente"
              description="Acesso à execução de todos os clientes, funcionalidades operacionais e gerenciamento"
              isActive={activeRole === 'staff_permanent'}
              onClick={() => setActiveRole('staff_permanent')}
            />
            
            <RoleCard
              role="staff_outsourced"
              title="Equipe Terceirizada"
              description="Acesso restrito apenas aos clientes designados para o usuário"
              isActive={activeRole === 'staff_outsourced'}
              onClick={() => setActiveRole('staff_outsourced')}
            />
            
            <RoleCard
              role="client"
              title="Cliente (Órgão Público)"
              description="Visualização limitada sem detalhes operacionais, apenas acompanhamento"
              isActive={activeRole === 'client'}
              onClick={() => setActiveRole('client')}
            />
            
            <RoleCard
              role="commercial_rep"
              title="Representante Comercial"
              description="Acompanha a execução dos clientes que captou, solicita propostas comerciais"
              isActive={activeRole === 'commercial_rep'}
              onClick={() => setActiveRole('commercial_rep')}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="permissions" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCog className="h-5 w-5" />
                <span>Permissões de {getUserRoleName(activeRole)}</span>
              </CardTitle>
              <CardDescription>
                Configure as permissões específicas para este perfil de usuário
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                <PermissionSwitch
                  id="viewAllClients"
                  label="Visualizar todos os clientes"
                  description="Permite visualizar informações de todos os clientes cadastrados"
                  checked={permissions.viewAllClients}
                  onCheckedChange={(checked) => handlePermissionChange('viewAllClients', checked)}
                  disabled={isAdminMaster}
                />
                
                <PermissionSwitch
                  id="editClients"
                  label="Editar clientes"
                  description="Permite editar informações dos clientes"
                  checked={permissions.editClients}
                  onCheckedChange={(checked) => handlePermissionChange('editClients', checked)}
                  disabled={isAdminMaster}
                />
                
                <PermissionSwitch
                  id="deleteClients"
                  label="Excluir clientes"
                  description="Permite excluir clientes do sistema"
                  checked={permissions.deleteClients}
                  onCheckedChange={(checked) => handlePermissionChange('deleteClients', checked)}
                  disabled={isAdminMaster}
                />
                
                <PermissionSwitch
                  id="viewProposals"
                  label="Visualizar propostas"
                  description="Permite visualizar propostas comerciais"
                  checked={permissions.viewProposals}
                  onCheckedChange={(checked) => handlePermissionChange('viewProposals', checked)}
                  disabled={isAdminMaster}
                />
                
                <PermissionSwitch
                  id="createProposals"
                  label="Criar propostas"
                  description="Permite criar novas propostas comerciais"
                  checked={permissions.createProposals}
                  onCheckedChange={(checked) => handlePermissionChange('createProposals', checked)}
                  disabled={isAdminMaster}
                />
                
                <PermissionSwitch
                  id="approveProposals"
                  label="Aprovar propostas"
                  description="Permite aprovar ou rejeitar propostas comerciais"
                  checked={permissions.approveProposals}
                  onCheckedChange={(checked) => handlePermissionChange('approveProposals', checked)}
                  disabled={isAdminMaster}
                />
                
                <PermissionSwitch
                  id="viewOperationalDetails"
                  label="Ver detalhes operacionais"
                  description="Permite visualizar detalhes operacionais e técnicos"
                  checked={permissions.viewOperationalDetails}
                  onCheckedChange={(checked) => handlePermissionChange('viewOperationalDetails', checked)}
                  disabled={isAdminMaster}
                />
                
                <PermissionSwitch
                  id="assignUsers"
                  label="Atribuir usuários"
                  description="Permite atribuir usuários a clientes e projetos"
                  checked={permissions.assignUsers}
                  onCheckedChange={(checked) => handlePermissionChange('assignUsers', checked)}
                  disabled={isAdminMaster}
                />
                
                <PermissionSwitch
                  id="viewReports"
                  label="Visualizar relatórios"
                  description="Permite visualizar relatórios do sistema"
                  checked={permissions.viewReports}
                  onCheckedChange={(checked) => handlePermissionChange('viewReports', checked)}
                  disabled={isAdminMaster}
                />
                
                <PermissionSwitch
                  id="adminAccess"
                  label="Acesso administrativo"
                  description="Permite acesso a configurações administrativas do sistema"
                  checked={permissions.adminAccess}
                  onCheckedChange={(checked) => handlePermissionChange('adminAccess', checked)}
                  disabled={isAdminMaster}
                />
              </div>
              
              <div className="flex justify-end">
                <Button onClick={handleSavePermissions} className="mt-4">
                  <Save className="h-4 w-4 mr-2" />
                  Salvar Permissões
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

// Helper function to get user role name in Portuguese
function getUserRoleName(role: UserRole): string {
  switch (role) {
    case 'admin_master':
      return 'Administrador Master';
    case 'staff_permanent':
      return 'Equipe Permanente';
    case 'staff_outsourced':
      return 'Equipe Terceirizada';
    case 'client':
      return 'Cliente';
    case 'commercial_rep':
      return 'Representante Comercial';
    default:
      return 'Usuário';
  }
}

export default UserProfilePermissions;
