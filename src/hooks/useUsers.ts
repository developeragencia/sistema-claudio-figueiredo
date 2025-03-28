import { useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { supabase } from '@/lib/supabase';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { User } from '@/types/user';

interface UseUsersReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  exportToJson: () => void;
  exportToCsv: () => void;
  exportToExcel: () => void;
}

export function useUsers(): UseUsersReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchUsers() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar usuários');
    } finally {
      setLoading(false);
    }
  }

  function exportToJson() {
    const jsonString = JSON.stringify(users, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const fileName = `usuarios-${format(new Date(), 'dd-MM-yyyy')}.json`;
    saveAs(blob, fileName);
  }

  function exportToCsv() {
    const headers = ['ID', 'Nome', 'Email', 'Perfil', 'Status', 'Criado em', 'Último acesso'];
    const csvData = users.map(user => [
      user.id,
      user.name,
      user.email,
      user.role,
      user.status,
      format(new Date(user.created_at), 'dd/MM/yyyy', { locale: ptBR }),
      user.last_login ? format(new Date(user.last_login), 'dd/MM/yyyy HH:mm', { locale: ptBR }) : 'Nunca'
    ]);

    const csvString = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const fileName = `usuarios-${format(new Date(), 'dd-MM-yyyy')}.csv`;
    saveAs(blob, fileName);
  }

  function exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(users);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Usuários');
    const fileName = `usuarios-${format(new Date(), 'dd-MM-yyyy')}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    exportToJson,
    exportToCsv,
    exportToExcel
  };
} 