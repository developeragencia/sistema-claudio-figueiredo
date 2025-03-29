'use client'

import { useState, ChangeEvent, FormEvent } from 'react'

interface UseFormProps<T> {
  initialValues: T
  onSubmit: (values: T) => Promise<void>
}

export function useForm<T>({ initialValues, onSubmit }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await onSubmit(values)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setValues(initialValues)
    setError(null)
  }

  return {
    values,
    loading,
    error,
    handleChange,
    handleSubmit,
    resetForm,
  }
} 