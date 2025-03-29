'use client'

import { useState } from 'react'

export function useError() {
  const [error, setError] = useState<Error | null>(null)

  const handleError = (error: Error) => {
    console.error('Erro capturado:', error)
    setError(error)
  }

  const clearError = () => {
    setError(null)
  }

  return {
    error,
    handleError,
    clearError,
  }
} 