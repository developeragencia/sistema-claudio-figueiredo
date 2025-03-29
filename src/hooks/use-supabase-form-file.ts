import { useState } from 'react';
import { useError } from './use-supabase-error';
import { useLoading } from './use-supabase-loading';
import { useSupabaseToast } from './use-supabase-toast';
import { useValidation } from './use-supabase-validation';
import { type AuthError } from '@supabase/supabase-js';
import { z } from 'zod';

export function useSupabaseFormFile<T>(
  initialValues: T,
  schema: z.ZodType,
  onSubmit: (values: T, file: File | null) => Promise<{ data?: any; error?: AuthError | null }>,
  onSuccess?: (data: any) => void,
) {
  const [values, setValues] = useState<T>(initialValues);
  const [file, setFile] = useState<File | null>(null);
  const { error, handleError, clearError } = useError();
  const { loading, startLoading, stopLoading } = useLoading();
  const { showError, showSuccess } = useSupabaseToast();
  const { validate, getFieldError, clearErrors } = useValidation(schema);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
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
      const { data, error } = await onSubmit(values, file);

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
    setFile(null);
    clearError();
    clearErrors();
  };

  return {
    values,
    file,
    error,
    loading,
    handleChange,
    handleFileChange,
    handleSubmit,
    handleReset,
    getFieldError,
  };
} 