import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não conferem',
  path: ['confirmPassword']
})

type ResetPasswordData = z.infer<typeof resetPasswordSchema>

export function ResetPassword() {
  const { updatePassword } = useAuth()
  const [searchParams] = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordData>({
    resolver: zodResolver(resetPasswordSchema)
  })

  const onSubmit = async (data: ResetPasswordData) => {
    try {
      setIsLoading(true)
      await updatePassword({
        password: data.password,
        token: searchParams.get('token')
      })
    } catch (error) {
      console.error('Error resetting password:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Redefinir senha
        </h1>
        <p className="text-sm text-muted-foreground">
          Digite sua nova senha
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Nova senha"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-sm text-destructive">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Confirmar senha"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Redefinindo...' : 'Redefinir senha'}
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
  )
} 