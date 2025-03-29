import { useState } from 'react';
import { Link  } from "@/hooks/use-router";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email inválido')
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema)
  });

  const onSubmit = async (data: ForgotPasswordData) => {
    try {
      setIsLoading(true);
      await resetPassword(data);
    } catch (error) {
      console.error('Error resetting password:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Esqueceu sua senha?
        </h1>
        <p className="text-sm text-muted-foreground">
          Digite seu email para receber um link de recuperação
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-sm text-destructive">
              {errors.email.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Enviando...' : 'Enviar link de recuperação'}
        </Button>
      </form>
      <div className="text-center text-sm">
        <Link
          to="/login"
          className="text-primary hover:underline"
        >
          Voltar para o login
        </Link>
      </div>
    </div>
  );
} 