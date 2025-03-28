import { useEffect, useState } from 'react';
import {
  validatePassword,
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
} from '@/lib/passwordValidation';

interface PasswordStrengthProps {
  password: string;
  onValidation?: (isValid: boolean) => void;
}

export function PasswordStrength({ password, onValidation }: PasswordStrengthProps) {
  const [strength, setStrength] = useState({
    score: 0,
    label: 'Muito fraca',
    color: 'bg-red-500',
    errors: [] as string[],
  });

  useEffect(() => {
    const validation = validatePassword(password);
    setStrength({
      score: validation.score,
      label: getPasswordStrengthLabel(validation.score),
      color: getPasswordStrengthColor(validation.score),
      errors: validation.errors,
    });

    onValidation?.(validation.isValid);
  }, [password, onValidation]);

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="h-2 flex-1 rounded-full bg-gray-200">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              strength.color
            }`}
            style={{ width: `${(strength.score / 4) * 100}%` }}
          />
        </div>
        <span className="text-sm text-gray-600">{strength.label}</span>
      </div>
      {strength.errors.length > 0 && (
        <ul className="text-sm text-red-600 space-y-1">
          {strength.errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
} 