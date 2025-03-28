import { describe, it, expect, beforeEach, vi } from 'vitest';
import { rateLimiter } from '../rateLimiting';

describe('RateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // @ts-ignore - Acessando propriedade privada para limpar os testes
    rateLimiter.attempts.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('deve permitir tentativas dentro do limite', () => {
    const email = 'test@example.com';

    // Primeiras 5 tentativas devem ser permitidas
    for (let i = 0; i < 5; i++) {
      const result = rateLimiter.check(email);
      expect(result.allowed).toBe(true);
      rateLimiter.registerAttempt(email, false);
    }

    // A sexta tentativa deve ser bloqueada
    const result = rateLimiter.check(email);
    expect(result.allowed).toBe(false);
    expect(result.waitTime).toBeDefined();
  });

  it('deve liberar o bloqueio após o período de espera', () => {
    const email = 'test@example.com';

    // Registrar 5 tentativas falhas
    for (let i = 0; i < 5; i++) {
      rateLimiter.registerAttempt(email, false);
    }

    // Verificar que está bloqueado
    let result = rateLimiter.check(email);
    expect(result.allowed).toBe(false);

    // Avançar 30 minutos
    vi.advanceTimersByTime(30 * 60 * 1000);

    // Verificar que foi desbloqueado
    result = rateLimiter.check(email);
    expect(result.allowed).toBe(true);
  });

  it('deve resetar as tentativas após um login bem-sucedido', () => {
    const email = 'test@example.com';

    // Registrar 3 tentativas falhas
    for (let i = 0; i < 3; i++) {
      rateLimiter.registerAttempt(email, false);
    }

    // Registrar uma tentativa bem-sucedida
    rateLimiter.registerAttempt(email, true);

    // Verificar que o contador foi resetado
    expect(rateLimiter.getRemainingAttempts(email)).toBe(5);
  });

  it('deve limpar tentativas antigas após o período da janela', () => {
    const email = 'test@example.com';

    // Registrar 3 tentativas falhas
    for (let i = 0; i < 3; i++) {
      rateLimiter.registerAttempt(email, false);
    }

    // Avançar 15 minutos
    vi.advanceTimersByTime(15 * 60 * 1000);

    // Verificar que as tentativas foram limpas
    expect(rateLimiter.getRemainingAttempts(email)).toBe(5);
  });

  it('deve retornar o número correto de tentativas restantes', () => {
    const email = 'test@example.com';

    expect(rateLimiter.getRemainingAttempts(email)).toBe(5);

    // Registrar 2 tentativas falhas
    rateLimiter.registerAttempt(email, false);
    rateLimiter.registerAttempt(email, false);

    expect(rateLimiter.getRemainingAttempts(email)).toBe(3);
  });
}); 