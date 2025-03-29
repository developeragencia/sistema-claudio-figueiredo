'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm as useReactHookForm } from 'react-hook-form'
import { z } from 'zod'

export function useForm<T extends z.ZodType>(schema: T) {
  return useReactHookForm({
    resolver: zodResolver(schema),
    mode: 'onChange'
  })
}

export type { FieldValues, UseFormReturn } from 'react-hook-form' 