'use client'

import { useState, useCallback } from 'react'

export function useError() {
  const [error, setError] = useState<Error | null>(null)

  const handleError = useCallback((err: unknown) => {
    console.error(err)
    if (err instanceof Error) {
      setError(err)
    } else {
      setError(new Error('Um erro inesperado ocorreu'))
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  return {
    error,
    handleError,
    clearError
  }
} 