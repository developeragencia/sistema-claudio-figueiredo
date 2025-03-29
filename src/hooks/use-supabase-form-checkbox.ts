import { useState } from 'react';
import { useError } from './use-supabase-error';
import { useLoading } from './use-supabase-loading';
import { useSupabaseToast } from './use-supabase-toast';
import { useValidation } from './use-supabase-validation';
import { type AuthError } from '@supabase/supabase-js';
import { z } from 'zod';

export function useSupabaseFormCheckbox<T>(
  initialValues: T,
  schema: z.ZodType,
  onSubmit: (values: T) => Promise<{ data?: any; error?: AuthError | null }>,
  onSuccess?: (data: any) => void,
) {
  const [values, setValues] = useState<T>(initialValues);
  const { error, handleError, clearError } = useError();
  const { loading, startLoading, stopLoading } = useLoading();
  const { showError, showSuccess } = useSupabaseToast();
  const { validate, getFieldError, clearErrors } = useValidation(schema);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startLoading();
    clearError();
    clearErrors();

    if (!validate(values)) {
      stopLoading();
      return;
    }

    try {
      const { data, error } = await onSubmit(values);

      if (error) {
        handleError(error);
        showError(error);
        return;
      }

      if (onSuccess) {
        onSuccess(data);
      }

      showSuccess('Operação realizada com sucesso!');
      handleReset();
    } catch (err) {
      const error = err as AuthError;
      handleError(error);
      showError(error);
    } finally {
      stopLoading();
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    clearError();
    clearErrors();
  };

  return {
    values,
    error,
    loading,
    handleChange,
    handleSubmit,
    handleReset,
    getFieldError,
  };
} 