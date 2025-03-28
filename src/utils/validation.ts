export function validateCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/[^\d]/g, '');

  if (cnpj.length !== 14) return false;

  if (/^(\d)\1+$/.test(cnpj)) return false;

  let sum = 0;
  let weight = 5;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }

  let digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;

  if (parseInt(cnpj.charAt(12)) !== digit) return false;

  sum = 0;
  weight = 6;

  for (let i = 0; i < 13; i++) {
    sum += parseInt(cnpj.charAt(i)) * weight;
    weight = weight === 2 ? 9 : weight - 1;
  }

  digit = 11 - (sum % 11);
  if (digit > 9) digit = 0;

  return parseInt(cnpj.charAt(13)) === digit;
}

export function validatePhone(phone: string): boolean {
  phone = phone.replace(/[^\d]/g, '');
  return /^(\d{10,11})$/.test(phone);
}

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateDate(date: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(date)) return false;

  const d = new Date(date);
  return d instanceof Date && !isNaN(d.getTime());
}

export function validateCurrency(value: string): boolean {
  return /^\d+(\.\d{1,2})?$/.test(value);
}

export function validateRequired(value: any): boolean {
  if (typeof value === 'string') {
    return value.trim().length > 0;
  }
  return value !== null && value !== undefined;
}

export function validateMinLength(value: string, min: number): boolean {
  return value.length >= min;
}

export function validateMaxLength(value: string, max: number): boolean {
  return value.length <= max;
}

export function validateMinValue(value: number, min: number): boolean {
  return value >= min;
}

export function validateMaxValue(value: number, max: number): boolean {
  return value <= max;
}

export function validateRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max;
} 