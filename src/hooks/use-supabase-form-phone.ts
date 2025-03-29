import { useState } from 'react';
import { useError } from './use-supabase-error';
import { useLoading } from './use-supabase-loading';
import { useSupabaseToast } from './use-supabase-toast';
import { useValidation } from './use-supabase-validation';
import { type AuthError } from '@supabase/supabase-js';
import { z } from 'zod';

export function useSupabaseFormPhone<T>(
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
    const { name, value } = e.target;
    // Remove caracteres não numéricos
    const numericValue = value.replace(/\D/g, '');
    
    // Formata o telefone ((XX) XXXXX-XXXX)
    let formattedValue = numericValue;
    if (numericValue.length > 0) {
      if (numericValue.length <= 11) {
        formattedValue = numericValue.replace(
          /^(\d{2})(\d{5})(\d{4}).*/, 
          '($1) $2-$3'
        );
      }
    }
    
    setValues((prev) => ({ ...prev, [name]: formattedValue }));
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

  const formatPhone = (value: string) => {
    if (!value) return '';
    const numericValue = value.replace(/\D/g, '');
    if (numericValue.length <= 11) {
      return numericValue.replace(
        /^(\d{2})(\d{5})(\d{4}).*/, 
        '($1) $2-$3'
      );
    }
    return value;
  };

  const validatePhone = (phone: string) => {
    const numericValue = phone.replace(/\D/g, '');
    return numericValue.length >= 10 && numericValue.length <= 11;
  };

  return {
    values,
    error,
    loading,
    handleChange,
    handleSubmit,
    handleReset,
    getFieldError,
    formatPhone,
    validatePhone,
  };
} 