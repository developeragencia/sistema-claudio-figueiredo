
import React from 'react';
import { motion } from 'framer-motion';
import { User, UserRole } from '@/types/user'; // Changed from @/types/client to @/types/user
import UserProfileHeader from './user-profiles/UserProfileHeader';
import ProfilePermissions from './user-profiles/ProfilePermissions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Info, Settings } from 'lucide-react';

// Sample user data - replace with real data
const mockUser: User = {
  id: '1',
  name: 'Claudio Figueiredo',
  email: 'admin@sistemasclaudio.com',
  role: 'admin' as UserRole,
  status: 'active' as const,
  createdAt: '2023-01-01',
};

interface AdminUserProfileProps {
  user?: User;
}

const AdminUserProfile = ({ user = mockUser }: AdminUserProfileProps) => {
  const { toast } = useToast();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const handleSettingsUpdate = () => {
    toast({
      title: "Configurações atualizadas",
      description: "As configurações do perfil foram atualizadas com sucesso.",
    });
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">Perfil de Usuário</h1>
        <p className="text-muted-foreground">Gerenciar perfil e permissões do usuário</p>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <UserProfileHeader user={user} />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="permissions">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="permissions">Permissões</TabsTrigger>
            <TabsTrigger value="activity">Atividade</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>
          
          <TabsContent value="permissions" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Permissões do Perfil</CardTitle>
                <CardDescription>
                  Visualize as permissões associadas a este perfil de usuário.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfilePermissions userRole={user.role} />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="activity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Atividade Recente</CardTitle>
                <CardDescription>
                  Histórico de atividades realizadas por este usuário no sistema.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center py-8">
                  Não há registros de atividade para este usuário.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações da Conta</CardTitle>
                <CardDescription>
                  Gerencie as configurações deste usuário no sistema.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-6">
                  <div className="flex justify-between items-center">
                    <div className="space-y-0.5">
                      <div className="flex items-center">
                        <h3 className="text-base font-medium">Notificações</h3>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Info className="h-4 w-4 text-muted-foreground" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Configurações de alertas e notificações do sistema</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <p className="text-sm text-muted-foreground">Configure as notificações para este usuário</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleSettingsUpdate}>
                      <Settings className="mr-2 h-4 w-4" />
                      Configurar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
};

export default AdminUserProfile;
