interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
}

export class RateLimiter {
  private store: Map<string, RateLimitEntry>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig = { maxAttempts: 5, windowMs: 15 * 60 * 1000 }) {
    this.store = new Map();
    this.config = config;
  }

  check(key: string): boolean {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry) {
      return true;
    }

    // Limpa entrada expirada
    if (now - entry.firstAttempt > this.config.windowMs) {
      this.store.delete(key);
      return true;
    }

    return entry.attempts < this.config.maxAttempts;
  }

  registerAttempt(key: string): void {
    const now = Date.now();
    const entry = this.store.get(key);

    if (!entry) {
      this.store.set(key, { attempts: 1, firstAttempt: now });
      return;
    }

    // Reseta se o tempo expirou
    if (now - entry.firstAttempt > this.config.windowMs) {
      this.store.set(key, { attempts: 1, firstAttempt: now });
      return;
    }

    // Incrementa tentativas
    entry.attempts++;
  }

  reset(key: string): void {
    this.store.delete(key);
  }

  getRemainingAttempts(key: string): number {
    const entry = this.store.get(key);
    if (!entry) {
      return this.config.maxAttempts;
    }

    const remaining = this.config.maxAttempts - entry.attempts;
    return remaining > 0 ? remaining : 0;
  }

  getTimeToReset(key: string): number {
    const entry = this.store.get(key);
    if (!entry) {
      return 0;
    }

    const timeElapsed = Date.now() - entry.firstAttempt;
    const timeRemaining = this.config.windowMs - timeElapsed;
    return timeRemaining > 0 ? timeRemaining : 0;
  }
}

// Exporta uma instância única para uso em toda a aplicação
export const rateLimiter = new RateLimiter(); 