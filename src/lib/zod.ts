import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

export const supplierSchema = z.object({
  name: z.string().min(3, 'O nome deve ter no mínimo 3 caracteres'),
  cnpj: z.string().min(14, 'CNPJ inválido').max(14, 'CNPJ inválido'),
  email: z.string().email('E-mail inválido').optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
})

export const paymentSchema = z.object({
  supplierId: z.string().uuid('ID do fornecedor inválido'),
  amount: z.number().min(0, 'O valor deve ser maior que 0'),
  dueDate: z.date(),
  paymentDate: z.date().optional(),
  status: z.enum(['pending', 'paid', 'cancelled']),
  taxRetention: z.number().min(0, 'A retenção deve ser maior ou igual a 0'),
})

export const taxRetentionSchema = z.object({
  type: z.string().min(3, 'O tipo deve ter no mínimo 3 caracteres'),
  rate: z.number().min(0, 'A alíquota deve ser maior ou igual a 0'),
}) 