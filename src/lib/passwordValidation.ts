export interface PasswordValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordValidationResult {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('A senha deve ter no mínimo 8 caracteres');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }

  if (!/\d/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('A senha deve conter pelo menos um caractere especial');
  }

  if (/(.)\1{2,}/.test(password)) {
    errors.push('A senha não deve conter caracteres repetidos em sequência');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function calculatePasswordStrength(password: string): number {
  if (!password) return 0;

  let strength = 0;
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /\d/.test(password),
    /[!@#$%^&*(),.?":{}|<>]/.test(password),
    password.length >= 12,
    /[!@#$%^&*(),.?":{}|<>].*[!@#$%^&*(),.?":{}|<>]/.test(password) // Dois ou mais caracteres especiais
  ];

  const passedChecks = checks.filter(check => check).length;

  if (passedChecks <= 2) return 1; // Fraca
  if (passedChecks <= 4) return 2; // Moderada
  if (passedChecks <= 6) return 3; // Forte
  return 4; // Muito forte
}

export function getPasswordStrengthLabel(score: number): string {
  switch (true) {
    case score >= 4:
      return 'Muito forte';
    case score >= 3:
      return 'Forte';
    case score >= 2:
      return 'Média';
    case score >= 1:
      return 'Fraca';
    default:
      return 'Muito fraca';
  }
}

export function getPasswordStrengthColor(score: number): string {
  switch (true) {
    case score >= 4:
      return 'bg-green-500';
    case score >= 3:
      return 'bg-blue-500';
    case score >= 2:
      return 'bg-yellow-500';
    case score >= 1:
      return 'bg-orange-500';
    default:
      return 'bg-red-500';
  }
} 