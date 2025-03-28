"use client"

import React from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale';

export interface DatePickerProps {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  placeholderText?: string;
  className?: string;
  minDate?: Date;
  maxDate?: Date;
  showTimeSelect?: boolean;
  dateFormat?: string;
  isClearable?: boolean;
  disabled?: boolean;
}

export function DatePicker({
  selected,
  onChange,
  placeholderText = 'Selecione uma data',
  className = '',
  minDate,
  maxDate,
  showTimeSelect = false,
  dateFormat = 'dd/MM/yyyy',
  isClearable = true,
  disabled = false,
}: DatePickerProps) {
  return (
    <ReactDatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholderText}
      className={`w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      minDate={minDate}
      maxDate={maxDate}
      showTimeSelect={showTimeSelect}
      dateFormat={dateFormat}
      isClearable={isClearable}
      disabled={disabled}
      locale={ptBR}
    />
  );
} 