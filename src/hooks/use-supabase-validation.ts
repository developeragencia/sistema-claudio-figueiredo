import { useState } from 'react';
import { type ZodSchema } from 'zod';

interface UseValidationOptions<T> {
  schema: ZodSchema;
  initialValues: T;
}

export function useValidation<T extends Record<string, any>>({
  schema,
  initialValues,
}: UseValidationOptions<T>) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = async (values: T) => {
    try {
      await schema.parse(values);
      setErrors({});
      return true;
    } catch (error: any) {
      if (error.errors) {
        const formErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          const path = err.path.join('.');
          formErrors[path] = err.message;
        });
        setErrors(formErrors);
      }
      return false;
    }
  };

  const clearErrors = () => {
    setErrors({});
  };

  const getFieldError = (field: keyof T) => {
    return errors[field as string];
  };

  const hasErrors = () => {
    return Object.keys(errors).length > 0;
  };

  return {
    errors,
    validate,
    clearErrors,
    getFieldError,
    hasErrors,
  };
} 