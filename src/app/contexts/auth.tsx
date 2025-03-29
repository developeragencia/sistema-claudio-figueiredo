'use client'

import { createContext, useContext, ReactNode } from 'react'
import { useAuth as useSupabaseAuth } from '@/hooks/use-auth'

type AuthContextType = ReturnType<typeof useSupabaseAuth>

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const auth = useSupabaseAuth()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
} 