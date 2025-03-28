import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { logger } from '../logger';

describe('Logger', () => {
  const originalConsole = { ...console };
  const mockConsole = {
    log: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    info: vi.fn(),
  };

  beforeEach(() => {
    // Mock das funções do console
    console.log = mockConsole.log;
    console.error = mockConsole.error;
    console.warn = mockConsole.warn;
    console.info = mockConsole.info;

    // Limpar os mocks antes de cada teste
    vi.clearAllMocks();
  });

  afterEach(() => {
    // Restaurar o console original
    console.log = originalConsole.log;
    console.error = originalConsole.error;
    console.warn = originalConsole.warn;
    console.info = originalConsole.info;
  });

  it('deve registrar mensagens de erro corretamente', () => {
    const error = new Error('Teste de erro');
    logger.error('Erro no sistema', { error });

    expect(mockConsole.error).toHaveBeenCalledTimes(1);
    const loggedMessage = mockConsole.error.mock.calls[0][0];
    
    expect(loggedMessage).toContain('ERROR');
    expect(loggedMessage).toContain('Erro no sistema');
    expect(loggedMessage).toContain('Error: Teste de erro');
  });

  it('deve registrar mensagens de aviso corretamente', () => {
    logger.warn('Aviso importante', { userId: '123' });

    expect(mockConsole.warn).toHaveBeenCalledTimes(1);
    const loggedMessage = mockConsole.warn.mock.calls[0][0];
    
    expect(loggedMessage).toContain('WARN');
    expect(loggedMessage).toContain('Aviso importante');
    expect(loggedMessage).toContain('userId: 123');
  });

  it('deve registrar mensagens de informação corretamente', () => {
    logger.info('Operação concluída', { result: 'success' });

    expect(mockConsole.info).toHaveBeenCalledTimes(1);
    const loggedMessage = mockConsole.info.mock.calls[0][0];
    
    expect(loggedMessage).toContain('INFO');
    expect(loggedMessage).toContain('Operação concluída');
    expect(loggedMessage).toContain('result: success');
  });

  it('deve registrar mensagens de debug corretamente', () => {
    logger.debug('Depuração', { step: 1 });

    expect(mockConsole.log).toHaveBeenCalledTimes(1);
    const loggedMessage = mockConsole.log.mock.calls[0][0];
    
    expect(loggedMessage).toContain('DEBUG');
    expect(loggedMessage).toContain('Depuração');
    expect(loggedMessage).toContain('step: 1');
  });

  it('deve formatar objetos complexos corretamente', () => {
    const complexData = {
      user: {
        id: 123,
        name: 'Test User',
        roles: ['admin', 'user']
      },
      timestamp: new Date('2024-01-01T12:00:00Z')
    };

    logger.info('Dados do usuário', complexData);

    expect(mockConsole.info).toHaveBeenCalledTimes(1);
    const loggedMessage = mockConsole.info.mock.calls[0][0];
    
    expect(loggedMessage).toContain('INFO');
    expect(loggedMessage).toContain('Dados do usuário');
    expect(loggedMessage).toContain('Test User');
    expect(loggedMessage).toContain('admin');
    expect(loggedMessage).toContain('2024-01-01');
  });

  it('deve lidar com mensagens sem dados adicionais', () => {
    logger.info('Apenas mensagem');

    expect(mockConsole.info).toHaveBeenCalledTimes(1);
    const loggedMessage = mockConsole.info.mock.calls[0][0];
    
    expect(loggedMessage).toContain('INFO');
    expect(loggedMessage).toContain('Apenas mensagem');
  });

  it('deve incluir o timestamp em todas as mensagens', () => {
    const now = new Date();
    vi.setSystemTime(now);

    logger.info('Test message');

    expect(mockConsole.info).toHaveBeenCalledTimes(1);
    const loggedMessage = mockConsole.info.mock.calls[0][0];
    
    expect(loggedMessage).toContain(now.toISOString());
  });
}); 