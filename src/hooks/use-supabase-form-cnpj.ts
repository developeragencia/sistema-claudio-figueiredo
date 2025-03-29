import { useState } from 'react';
import { useError } from './use-supabase-error';
import { useLoading } from './use-supabase-loading';
import { useSupabaseToast } from './use-supabase-toast';
import { useValidation } from './use-supabase-validation';
import { type AuthError } from '@supabase/supabase-js';
import { z } from 'zod';

export function useSupabaseFormCNPJ<T>(
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
    
    // Formata o CNPJ (XX.XXX.XXX/XXXX-XX)
    let formattedValue = numericValue;
    if (numericValue.length > 0) {
      formattedValue = numericValue.replace(
        /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, 
        '$1.$2.$3/$4-$5'
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

  const formatCNPJ = (value: string) => {
    if (!value) return '';
    const numericValue = value.replace(/\D/g, '');
    return numericValue.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2}).*/, 
      '$1.$2.$3/$4-$5'
    );
  };

  const validateCNPJ = (cnpj: string) => {
    cnpj = cnpj.replace(/[^\d]/g, '');

    if (cnpj.length !== 14) return false;

    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1+$/.test(cnpj)) return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number(digitos.charAt(0))) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
      soma += Number(numeros.charAt(tamanho - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== Number(digitos.charAt(1))) return false;

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
    formatCNPJ,
    validateCNPJ,
  };
} 