import { useState } from 'react';
import { useSupabase } from './use-supabase';
import { type ZodSchema } from 'zod';

interface UseSupabaseFormOptions<T> {
  initialValues: T;
  schema: ZodSchema;
  onSubmit: (values: T) => Promise<any>;
  onSuccess?: (data: any) => void;
}

export function useSupabaseForm<T extends Record<string, any>>({
  initialValues,
  schema,
  onSubmit,
  onSuccess,
}: UseSupabaseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { loading, execute } = useSupabase({ onSuccess });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const validatedData = await schema.parse(values);
      await execute(onSubmit(validatedData));
    } catch (error: any) {
      if (error.errors) {
        const formErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          const path = err.path.join('.');
          formErrors[path] = err.message;
        });
        setErrors(formErrors);
      }
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
    handleReset,
  };
} 