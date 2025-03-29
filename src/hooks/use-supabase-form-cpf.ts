import { useState } from 'react';
import { useError } from './use-supabase-error';
import { useLoading } from './use-supabase-loading';
import { useSupabaseToast } from './use-supabase-toast';
import { useValidation } from './use-supabase-validation';
import { type AuthError } from '@supabase/supabase-js';
import { z } from 'zod';

export function useSupabaseFormCPF<T>(
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
    
    // Formata o CPF (XXX.XXX.XXX-XX)
    let formattedValue = numericValue;
    if (numericValue.length > 0) {
      formattedValue = numericValue.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2}).*/, 
        '$1.$2.$3-$4'
      );
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

  const formatCPF = (value: string) => {
    if (!value) return '';
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(
      /^(\d{3})(\d{3})(\d{3})(\d{2}).*/, 
      '$1.$2.$3-$4'
    );
  };

  const validateCPF = (cpf: string) => {
    cpf = cpf.replace(/[^\d]/g, '');

    if (cpf.length !== 11) return false;

    // Elimina CPFs inválidos conhecidos
    if (/^(\d)\1+$/.test(cpf)) return false;

    // Valida 1o dígito
    let add = 0;
    for (let i = 0; i < 9; i++) {
      add += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;

    // Valida 2o dígito
    add = 0;
    for (let i = 0; i < 10; i++) {
      add += parseInt(cpf.charAt(i)) * (11 - i);
    }
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;

    return true;
  };

  return {
    values,
    error,
    loading,
    handleChange,
    handleSubmit,
    handleReset,
    getFieldError,
    formatCPF,
    validateCPF,
  };
} 