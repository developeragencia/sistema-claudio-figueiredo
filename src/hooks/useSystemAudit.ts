import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase } from '@/lib/supabase';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface AuditLog {
  id: string;
  action: string;
  details: string;
  user_id: string;
  created_at: string;
}

interface UseSystemAuditReturn {
  logs: AuditLog[];
  loading: boolean;
  error: string | null;
  fetchLogs: () => Promise<void>;
  exportToJson: () => void;
  exportToCsv: () => void;
  exportToExcel: () => void;
}

export function useSystemAudit(): UseSystemAuditReturn {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchLogs() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLogs(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar logs de auditoria');
    } finally {
      setLoading(false);
    }
  }

  function exportToJson() {
    const jsonString = JSON.stringify(logs, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const fileName = `auditoria-${format(new Date(), 'dd-MM-yyyy')}.json`;
    saveAs(blob, fileName);
  }

  function exportToCsv() {
    const headers = ['ID', 'Ação', 'Detalhes', 'Usuário', 'Data'];
    const csvData = logs.map(log => [
      log.id,
      log.action,
      log.details,
      log.user_id,
      format(new Date(log.created_at), 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
    ]);

    const csvString = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const fileName = `auditoria-${format(new Date(), 'dd-MM-yyyy')}.csv`;
    saveAs(blob, fileName);
  }

  function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(logs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Logs');
    const fileName = `auditoria-${format(new Date(), 'dd-MM-yyyy')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  return {
    logs,
    loading,
    error,
    fetchLogs,
    exportToJson,
    exportToCsv,
    exportToExcel
  };
} 