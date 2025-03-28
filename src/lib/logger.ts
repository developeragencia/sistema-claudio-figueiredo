interface LoggerConfig {
  level: 'debug' | 'info' | 'warn' | 'error';
  prefix?: string;
}

class Logger {
  private config: LoggerConfig;
  private levels = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };

  constructor(config: LoggerConfig = { level: 'info' }) {
    this.config = config;
  }

  private shouldLog(level: keyof typeof this.levels): boolean {
    return this.levels[level] >= this.levels[this.config.level];
  }

  private formatMessage(level: string, message: string, ...args: any[]): string {
    const timestamp = new Date().toISOString();
    const prefix = this.config.prefix ? `[${this.config.prefix}]` : '';
    const formattedMessage = args.length > 0 ? this.interpolate(message, args) : message;
    return `${timestamp} ${prefix}[${level.toUpperCase()}] ${formattedMessage}`;
  }

  private interpolate(message: string, args: any[]): string {
    return message.replace(/%[sdjifoO%]/g, (match) => {
      if (match === '%%') return '%';
      const value = args.shift();
      switch (match) {
        case '%s': return String(value);
        case '%d': return Number(value).toString();
        case '%i': return Math.floor(Number(value)).toString();
        case '%f': return Number(value).toString();
        case '%j': return JSON.stringify(value);
        case '%o':
        case '%O': return this.inspectObject(value);
        default: return match;
      }
    });
  }

  private inspectObject(obj: any): string {
    try {
      return JSON.stringify(obj, null, 2);
    } catch (error) {
      return '[Circular]';
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, ...args));
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, ...args));
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, ...args));
    }
  }

  error(message: string | Error, ...args: any[]): void {
    if (this.shouldLog('error')) {
      const errorMessage = message instanceof Error ? message.stack || message.message : message;
      console.error(this.formatMessage('error', errorMessage, ...args));
    }
  }

  setLevel(level: LoggerConfig['level']): void {
    this.config.level = level;
  }

  setPrefix(prefix: string): void {
    this.config.prefix = prefix;
  }
}

// Exporta uma instância única para uso em toda a aplicação
export const logger = new Logger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  prefix: 'SecureBridge'
}); 