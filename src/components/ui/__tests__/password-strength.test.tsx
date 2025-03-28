import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordStrength } from '../password-strength';

describe('PasswordStrength', () => {
  it('deve renderizar o indicador de força vazio', () => {
    render(<PasswordStrength password="" />);
    
    const indicator = screen.getByRole('progressbar');
    expect(indicator).toBeInTheDocument();
    expect(indicator.getAttribute('aria-valuenow')).toBe('0');
  });

  it('deve mostrar força fraca para senha simples', () => {
    render(<PasswordStrength password="test" />);
    
    const indicator = screen.getByRole('progressbar');
    expect(indicator).toBeInTheDocument();
    expect(indicator.getAttribute('aria-valuenow')).toBe('1');
    expect(screen.getByText('Fraca')).toBeInTheDocument();
  });

  it('deve mostrar força moderada para senha com alguns requisitos', () => {
    render(<PasswordStrength password="Test123" />);
    
    const indicator = screen.getByRole('progressbar');
    expect(indicator).toBeInTheDocument();
    expect(indicator.getAttribute('aria-valuenow')).toBe('2');
    expect(screen.getByText('Moderada')).toBeInTheDocument();
  });

  it('deve mostrar força forte para senha com vários requisitos', () => {
    render(<PasswordStrength password="Test123!@#" />);
    
    const indicator = screen.getByRole('progressbar');
    expect(indicator).toBeInTheDocument();
    expect(indicator.getAttribute('aria-valuenow')).toBe('3');
    expect(screen.getByText('Forte')).toBeInTheDocument();
  });

  it('deve mostrar força muito forte para senha complexa', () => {
    render(<PasswordStrength password="Test123!@#$%^&*" />);
    
    const indicator = screen.getByRole('progressbar');
    expect(indicator).toBeInTheDocument();
    expect(indicator.getAttribute('aria-valuenow')).toBe('4');
    expect(screen.getByText('Muito Forte')).toBeInTheDocument();
  });

  it('deve atualizar a força quando a senha muda', () => {
    const { rerender } = render(<PasswordStrength password="test" />);
    expect(screen.getByText('Fraca')).toBeInTheDocument();

    rerender(<PasswordStrength password="Test123!@#" />);
    expect(screen.getByText('Forte')).toBeInTheDocument();
  });

  it('deve ter cores diferentes para cada nível de força', () => {
    const { rerender } = render(<PasswordStrength password="" />);
    let indicator = screen.getByRole('progressbar');
    expect(indicator).toHaveClass('bg-gray-200');

    rerender(<PasswordStrength password="test" />);
    indicator = screen.getByRole('progressbar');
    expect(indicator).toHaveClass('bg-red-500');

    rerender(<PasswordStrength password="Test123" />);
    indicator = screen.getByRole('progressbar');
    expect(indicator).toHaveClass('bg-yellow-500');

    rerender(<PasswordStrength password="Test123!@#" />);
    indicator = screen.getByRole('progressbar');
    expect(indicator).toHaveClass('bg-green-500');

    rerender(<PasswordStrength password="Test123!@#$%^&*" />);
    indicator = screen.getByRole('progressbar');
    expect(indicator).toHaveClass('bg-emerald-500');
  });

  it('deve ter larguras diferentes para cada nível de força', () => {
    const { rerender } = render(<PasswordStrength password="" />);
    let indicator = screen.getByRole('progressbar');
    expect(indicator.style.width).toBe('0%');

    rerender(<PasswordStrength password="test" />);
    indicator = screen.getByRole('progressbar');
    expect(indicator.style.width).toBe('25%');

    rerender(<PasswordStrength password="Test123" />);
    indicator = screen.getByRole('progressbar');
    expect(indicator.style.width).toBe('50%');

    rerender(<PasswordStrength password="Test123!@#" />);
    indicator = screen.getByRole('progressbar');
    expect(indicator.style.width).toBe('75%');

    rerender(<PasswordStrength password="Test123!@#$%^&*" />);
    indicator = screen.getByRole('progressbar');
    expect(indicator.style.width).toBe('100%');
  });
}); 