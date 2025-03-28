import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export function useZodForm<T extends z.ZodType>(schema: T) {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema),
  })
} 