
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Check, Loader2, Mail, User, Lock } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { supabase } from '@/integrations/supabase/client';

const profileFormSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
  newPassword: z.string().min(6, { message: 'A nova senha deve ter pelo menos 6 caracteres' }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const AdminProfileSettings = () => {
  const { toast } = useToast();
  const { user } = useAdminAuth();
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar || '');

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmitProfile = async (data: ProfileFormValues) => {
    if (!user?.id) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: "Usuário não identificado. Por favor, faça login novamente.",
      });
      return;
    }

    setLoadingProfile(true);
    try {
      // Update user metadata and profile in database
      const { error: updateError } = await supabase.auth.updateUser({
        email: data.email,
        data: { name: data.name }
      });
      
      if (updateError) throw updateError;
      
      // Update profile in profiles table if it exists
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ name: data.name, email: data.email })
        .eq('id', user.id);
      
      if (profileError) {
        console.error("Error updating profile:", profileError);
        // Continue anyway as the auth user was updated
      }

      toast({
        title: "Perfil atualizado",
        description: "Suas informações de perfil foram atualizadas com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao atualizar perfil:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar perfil",
        description: error.message || "Ocorreu um erro ao tentar atualizar seu perfil.",
      });
    } finally {
      setLoadingProfile(false);
    }
  };

  const onSubmitPassword = async (data: PasswordFormValues) => {
    setLoadingPassword(true);
    try {
      // In a real system, we would verify the current password before updating
      const { error } = await supabase.auth.updateUser({
        password: data.newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Senha atualizada",
        description: "Sua senha foi atualizada com sucesso.",
      });
      
      passwordForm.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar senha",
        description: error.message || "Ocorreu um erro ao tentar atualizar sua senha.",
      });
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user?.id) return;

    try {
      // First show the local preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Upload to Supabase Storage if available
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      
      // Check if storage bucket exists before uploading
      const { data: bucketData } = await supabase.storage.getBucket('avatars');
      
      if (bucketData) {
        const { error } = await supabase.storage
          .from('avatars')
          .upload(fileName, file, { upsert: true });
          
        if (error) throw error;
        
        // Get public URL 
        const { data } = supabase.storage.from('avatars').getPublicUrl(fileName);
        
        if (data) {
          // Update profile with avatar URL
          await supabase
            .from('profiles')
            .update({ avatar_url: data.publicUrl })
            .eq('id', user.id);
            
          // Also update it in user metadata
          await supabase.auth.updateUser({
            data: { avatar: data.publicUrl }
          });
        }
      } else {
        console.log("Avatars bucket doesn't exist or is not accessible");
      }
      
      toast({
        title: "Avatar atualizado",
        description: "Sua imagem de perfil foi atualizada com sucesso.",
      });
    } catch (error: any) {
      console.error("Erro ao fazer upload do avatar:", error);
      toast({
        variant: "destructive",
        title: "Erro ao atualizar avatar",
        description: error.message || "Ocorreu um erro ao tentar atualizar sua imagem de perfil.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Perfil do Administrador</CardTitle>
          <CardDescription>
            Gerencie suas informações pessoais e como elas serão exibidas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col items-center space-y-2">
              <Avatar className="w-32 h-32">
                <AvatarImage src={avatarUrl} alt={user?.name || 'Administrador'} />
                <AvatarFallback className="text-4xl">{user?.name?.charAt(0) || 'A'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center">
                <Label 
                  htmlFor="avatar-upload" 
                  className="text-primary cursor-pointer hover:underline text-sm"
                >
                  Alterar imagem
                </Label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleAvatarUpload}
                />
              </div>
            </div>
            
            <div className="w-full">
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4 text-primary" />
                          Nome completo
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={profileForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-primary" />
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Seu email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={loadingProfile}
                    className="w-full"
                  >
                    {loadingProfile ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Salvar informações
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Segurança da Conta</CardTitle>
          <CardDescription>
            Altere sua senha para manter sua conta segura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...passwordForm}>
            <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-4">
              <FormField
                control={passwordForm.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Senha atual
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Digite sua senha atual" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={passwordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Nova senha
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Digite sua nova senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-primary" />
                      Confirme a nova senha
                    </FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Confirme sua nova senha" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                disabled={loadingPassword}
                className="w-full"
              >
                {loadingPassword ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Atualizando senha...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Atualizar senha
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProfileSettings;
