'use client'

import { Badge } from '@/components/ui/badge'

export function ActiveClientIndicator({ isActive }: { isActive: boolean }) {
  return (
    <Badge variant={isActive ? 'success' : 'destructive'}>
      {isActive ? 'Ativo' : 'Inativo'}
    </Badge>
  )
} 