import { format, parseISO, isValid, differenceInDays, differenceInMonths, differenceInYears, addDays, addMonths, addYears, isBefore, isAfter, isSameDay, startOfDay, endOfDay, startOfMonth, endOfMonth, startOfYear, endOfYear } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(date: string | Date, pattern = 'dd/MM/yyyy'): string {
  if (!date) return '';
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) return '';
  return format(parsedDate, pattern, { locale: ptBR });
}

export function formatDateTime(date: string | Date): string {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
}

export function formatDateTimeWithSeconds(date: string | Date): string {
  return formatDate(date, 'dd/MM/yyyy HH:mm:ss');
}

export function formatDateRelative(date: string | Date): string {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(parsedDate)) return '';

  const now = new Date();
  const days = differenceInDays(now, parsedDate);
  const months = differenceInMonths(now, parsedDate);
  const years = differenceInYears(now, parsedDate);

  if (years > 0) return `${years} ${years === 1 ? 'ano' : 'anos'} atrás`;
  if (months > 0) return `${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
  if (days > 0) return `${days} ${days === 1 ? 'dia' : 'dias'} atrás`;
  return 'hoje';
}

export function addDaysToDate(date: Date | string, days: number): Date {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return addDays(parsedDate, days);
}

export function addMonthsToDate(date: Date | string, months: number): Date {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return addMonths(parsedDate, months);
}

export function addYearsToDate(date: Date | string, years: number): Date {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return addYears(parsedDate, years);
}

export function isDateBefore(date1: Date | string, date2: Date | string): boolean {
  const parsedDate1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const parsedDate2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isBefore(parsedDate1, parsedDate2);
}

export function isDateAfter(date1: Date | string, date2: Date | string): boolean {
  const parsedDate1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const parsedDate2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isAfter(parsedDate1, parsedDate2);
}

export function isSameDate(date1: Date | string, date2: Date | string): boolean {
  const parsedDate1 = typeof date1 === 'string' ? parseISO(date1) : date1;
  const parsedDate2 = typeof date2 === 'string' ? parseISO(date2) : date2;
  return isSameDay(parsedDate1, parsedDate2);
}

export function getDayStart(date: Date | string): Date {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return startOfDay(parsedDate);
}

export function getDayEnd(date: Date | string): Date {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return endOfDay(parsedDate);
}

export function getMonthStart(date: Date | string): Date {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return startOfMonth(parsedDate);
}

export function getMonthEnd(date: Date | string): Date {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return endOfMonth(parsedDate);
}

export function getYearStart(date: Date | string): Date {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return startOfYear(parsedDate);
}

export function getYearEnd(date: Date | string): Date {
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  return endOfYear(parsedDate);
}

export function getDaysBetweenDates(startDate: Date | string, endDate: Date | string): number {
  const parsedStartDate = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const parsedEndDate = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  return differenceInDays(parsedEndDate, parsedStartDate);
}

export function getMonthsBetweenDates(startDate: Date | string, endDate: Date | string): number {
  const parsedStartDate = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const parsedEndDate = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  return differenceInMonths(parsedEndDate, parsedStartDate);
}

export function getYearsBetweenDates(startDate: Date | string, endDate: Date | string): number {
  const parsedStartDate = typeof startDate === 'string' ? parseISO(startDate) : startDate;
  const parsedEndDate = typeof endDate === 'string' ? parseISO(endDate) : endDate;
  return differenceInYears(parsedEndDate, parsedStartDate);
} 