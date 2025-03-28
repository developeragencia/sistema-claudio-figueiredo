
import { useState, useCallback, useMemo } from 'react';
import { AuditTrail } from './types';
import { mockAuditLogs } from './mock-data';
import { useToast } from '@/components/ui/use-toast';

export const useAuditTrail = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [actionFilter, setActionFilter] = useState<string>("all");
  const [userFilter, setUserFilter] = useState<string | null>("all");
  const [dateFilter, setDateFilter] = useState<{ from: Date | null; to: Date | null }>({ from: null, to: null });
  const [selectedAudit, setSelectedAudit] = useState<AuditTrail | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Get all audit logs
  const auditLogs: AuditTrail[] = useMemo(() => {
    try {
      return mockAuditLogs || [];
    } catch (error) {
      console.error("Error loading audit logs:", error);
      return [];
    }
  }, []);
  
  // Extract unique users for the filter dropdown
  const uniqueUsers = useMemo(() => {
    try {
      const users = new Map();
      auditLogs.forEach(log => {
        if (!users.has(log.userName)) {
          users.set(log.userName, {
            id: log.userName, // Use username as ID for simplicity
            name: log.userName
          });
        }
      });
      return Array.from(users.values());
    } catch (error) {
      console.error("Error extracting unique users:", error);
      return [];
    }
  }, [auditLogs]);
  
  // Filter audit logs based on search query and filters
  const filteredLogs = useMemo(() => {
    try {
      return auditLogs.filter(log => {
        // Apply search filter
        const matchesSearch = searchQuery === '' || 
          log.resourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          log.details.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Apply action filter
        const matchesAction = actionFilter === "all" || log.action === actionFilter;
        
        // Apply user filter
        const matchesUser = userFilter === "all" || log.userName === userFilter;
        
        // Apply date filter
        const logDate = new Date(log.date);
        const matchesDateFrom = !dateFilter.from || logDate >= dateFilter.from;
        const matchesDateTo = !dateFilter.to || logDate <= dateFilter.to;
        
        return matchesSearch && matchesAction && matchesUser && matchesDateFrom && matchesDateTo;
      });
    } catch (error) {
      console.error("Error filtering audits:", error);
      return [];
    }
  }, [auditLogs, searchQuery, actionFilter, userFilter, dateFilter]);
  
  // Open detail dialog for a specific audit log
  const viewDetails = useCallback((audit: AuditTrail) => {
    setSelectedAudit(audit);
    setIsDetailsOpen(true);
  }, []);
  
  // Export audit logs
  const exportAuditLogs = useCallback(() => {
    try {
      setIsLoading(true);
      
      // Mock export functionality - in a real app, this would call an API
      setTimeout(() => {
        const csvContent = 
          "data:text/csv;charset=utf-8," + 
          "ID,Date,User,Action,Resource,Details\n" + 
          filteredLogs.map(log => 
            `${log.id},${log.date.toLocaleString()},${log.userName},${log.action},${log.resourceName},"${log.details}"`
          ).join("\n");
          
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `audit_logs_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setIsLoading(false);
        
        toast({
          title: "Exportação concluída",
          description: "Os logs de auditoria foram exportados com sucesso.",
        });
      }, 1000);
    } catch (error) {
      console.error("Error exporting audit logs:", error);
      setIsLoading(false);
    }
  }, [filteredLogs, toast]);
  
  return {
    auditLogs,
    filteredLogs,
    searchQuery,
    setSearchQuery,
    userFilter,
    setUserFilter,
    actionFilter,
    setActionFilter,
    dateFilter,
    setDateFilter,
    selectedAudit,
    isDetailsOpen,
    setIsDetailsOpen,
    isLoading,
    viewDetails,
    uniqueUsers,
    exportAuditLogs,
  };
};
