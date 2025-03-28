import { describe, it, expect } from 'vitest';
import { validatePassword, calculatePasswordStrength } from '../passwordValidation';

describe('Password Validation', () => {
  describe('validatePassword', () => {
    it('deve aceitar uma senha válida', () => {
      const password = 'Test123!@#';
      const result = validatePassword(password);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('deve rejeitar uma senha muito curta', () => {
      const password = 'Test1!';
      const result = validatePassword(password);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve ter pelo menos 8 caracteres');
    });

    it('deve rejeitar uma senha sem números', () => {
      const password = 'TestTest!@';
      const result = validatePassword(password);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve conter pelo menos um número');
    });

    it('deve rejeitar uma senha sem caracteres especiais', () => {
      const password = 'TestTest123';
      const result = validatePassword(password);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve conter pelo menos um caractere especial');
    });

    it('deve rejeitar uma senha sem letras maiúsculas', () => {
      const password = 'test123!@#';
      const result = validatePassword(password);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve conter pelo menos uma letra maiúscula');
    });

    it('deve rejeitar uma senha sem letras minúsculas', () => {
      const password = 'TEST123!@#';
      const result = validatePassword(password);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha deve conter pelo menos uma letra minúscula');
    });

    it('deve rejeitar uma senha com caracteres repetidos em sequência', () => {
      const password = 'Test111!@#';
      const result = validatePassword(password);
      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('A senha não deve conter caracteres repetidos em sequência');
    });
  });

  describe('calculatePasswordStrength', () => {
    it('deve retornar força 0 para senha vazia', () => {
      expect(calculatePasswordStrength('')).toBe(0);
    });

    it('deve retornar força baixa para senha fraca', () => {
      expect(calculatePasswordStrength('test')).toBe(1);
    });

    it('deve retornar força média para senha moderada', () => {
      expect(calculatePasswordStrength('Test123')).toBe(2);
    });

    it('deve retornar força alta para senha forte', () => {
      expect(calculatePasswordStrength('Test123!@#')).toBe(3);
    });

    it('deve retornar força máxima para senha muito forte', () => {
      expect(calculatePasswordStrength('Test123!@#$%^&*')).toBe(4);
    });
  });
}); 