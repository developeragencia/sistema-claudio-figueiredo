'use client'

import { useState } from 'react'
import { useForm } from '@/hooks/useForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UserFormData {
  name: string
  email: string
  role: string
}

interface UserFormProps {
  onSubmit: (data: UserFormData) => Promise<void>
  initialData?: UserFormData
}

export default function UserForm({ onSubmit, initialData }: UserFormProps) {
  const { values, handleChange, handleSubmit, loading, error } = useForm<UserFormData>({
    initialValues: initialData || {
      name: '',
      email: '',
      role: 'user'
    },
    onSubmit
  })

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {error.message}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <Input
          id="name"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Função</Label>
        <select
          id="role"
          name="role"
          value={values.role}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="user">Usuário</option>
          <option value="admin">Administrador</option>
        </select>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? 'Salvando...' : 'Salvar'}
      </Button>
    </form>
  )
} 