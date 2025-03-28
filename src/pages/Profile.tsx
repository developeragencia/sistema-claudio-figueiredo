import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Upload } from 'lucide-react';

const profileSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('Email inválido'),
  current_password: z.string().optional(),
  new_password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres').optional(),
  confirm_password: z.string().optional()
}).refine((data) => {
  if (data.new_password && !data.current_password) {
    return false;
  }
  return true;
}, {
  message: "A senha atual é necessária para alterar a senha",
  path: ["current_password"]
}).refine((data) => {
  if (data.new_password && data.new_password !== data.confirm_password) {
    return false;
  }
  return true;
}, {
  message: "As senhas não coincidem",
  path: ["confirm_password"]
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function Profile() {
  const { user, updateProfile, updatePassword, updateAvatar } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      current_password: '',
      new_password: '',
      confirm_password: ''
    }
  });

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setIsLoading(true);

      // Atualiza o perfil
      await updateProfile({
        name: data.name,
        email: data.email
      });

      // Se houver nova senha, atualiza a senha
      if (data.new_password && data.current_password) {
        await updatePassword({
          current_password: data.current_password,
          new_password: data.new_password
        });
      }

      toast({
        title: 'Perfil atualizado',
        description: 'Suas informações foram atualizadas com sucesso.',
        variant: 'default'
      });

      // Limpa os campos de senha
      reset({
        name: data.name,
        email: data.email,
        current_password: '',
        new_password: '',
        confirm_password: ''
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao atualizar o perfil.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUpdatingAvatar(true);
      await updateAvatar(file);
      toast({
        title: 'Avatar atualizado',
        description: 'Sua foto de perfil foi atualizada com sucesso.',
        variant: 'default'
      });
        } catch (error) {
      toast({
        title: 'Erro',
        description: 'Ocorreu um erro ao atualizar a foto de perfil.',
        variant: 'destructive'
      });
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="container max-w-2xl space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Perfil</h1>
          <p className="text-muted-foreground">
            Gerencie suas informações pessoais e senha
          </p>
        </div>
      </div>

          <Card>
            <CardHeader>
          <CardTitle>Foto de Perfil</CardTitle>
          <CardDescription>
            Clique na imagem para alterar sua foto de perfil
          </CardDescription>
            </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Label htmlFor="avatar" className="cursor-pointer">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user?.avatar_url} alt={user?.name} />
                <AvatarFallback>{user?.name ? getInitials(user.name) : 'U'}</AvatarFallback>
              </Avatar>
              {isUpdatingAvatar && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                  <Loader2 className="h-6 w-6 animate-spin text-white" />
                </div>
              )}
              {!isUpdatingAvatar && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity hover:opacity-100">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              )}
            </Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
              disabled={isUpdatingAvatar}
            />
          </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
          <CardDescription>
            Atualize suas informações pessoais e senha
          </CardDescription>
            </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                {...register('name')}
                error={errors.name?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="current_password">Senha Atual</Label>
              <Input
                id="current_password"
                type="password"
                {...register('current_password')}
                error={errors.current_password?.message}
              />
              </div>

            <div className="space-y-2">
              <Label htmlFor="new_password">Nova Senha</Label>
              <Input
                id="new_password"
                type="password"
                {...register('new_password')}
                error={errors.new_password?.message}
              />
                </div>

            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirmar Nova Senha</Label>
              <Input
                id="confirm_password"
                type="password"
                {...register('confirm_password')}
                error={errors.confirm_password?.message}
              />
              </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Salvando...
                </>
              ) : (
                'Salvar Alterações'
              )}
            </Button>
          </form>
            </CardContent>
          </Card>
    </div>
  );
} 