
import { format, isToday, isYesterday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDate = (date: Date): string => {
  if (isToday(date)) {
    return `Hoje, ${format(date, 'HH:mm', { locale: ptBR })}`;
  } else if (isYesterday(date)) {
    return `Ontem, ${format(date, 'HH:mm', { locale: ptBR })}`;
  } else {
    return format(date, 'dd/MM/yyyy HH:mm', { locale: ptBR });
  }
};
