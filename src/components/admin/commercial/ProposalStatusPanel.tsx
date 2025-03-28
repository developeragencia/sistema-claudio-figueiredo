
import React from 'react';
import { 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertTriangle, 
  FileCheck, 
  UserCheck 
} from 'lucide-react';
import { ProposalStatus } from '@/types/proposal';

interface StatusCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
  onClick: () => void;
}

const StatusCard: React.FC<StatusCardProps> = ({ title, count, icon, color, onClick }) => {
  return (
    <div 
      className={`rounded-lg border p-4 hover:shadow-md transition-shadow cursor-pointer ${color}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
        <div className={`p-2 rounded-full ${color.replace('border-l-', 'bg-')}`}>{icon}</div>
      </div>
      <div className="flex items-center gap-1 mt-3 text-xs font-medium">
        <span>Ver detalhes</span>
        <ArrowUpRight className="h-3 w-3" />
      </div>
    </div>
  );
};

interface ProposalStatusPanelProps {
  proposalCounts: Record<string, number>;
  onFilterByStatus: (status: ProposalStatus | null) => void;
}

const ProposalStatusPanel: React.FC<ProposalStatusPanelProps> = ({ 
  proposalCounts, 
  onFilterByStatus 
}) => {
  // Calculate counts for each status group, accounting for both old and new status names
  const pendingCount = (proposalCounts.REQUEST || 0) + (proposalCounts.DRAFT || 0) + (proposalCounts.PENDING || 0);
  const analysisCount = (proposalCounts.ANALYSIS || 0) + (proposalCounts.IN_ANALYSIS || 0);
  const approvedCount = proposalCounts.APPROVED || 0;
  const rejectedCount = proposalCounts.REJECTED || 0;
  const convertedCount = proposalCounts.CONVERTED || 0;
  const totalCount = Object.values(proposalCounts).reduce((acc, count) => acc + count, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatusCard
        title="Solicitadas"
        count={pendingCount}
        icon={<UserCheck className="h-5 w-5 text-blue-600" />}
        color="border-l-4 border-l-blue-500"
        onClick={() => onFilterByStatus(proposalCounts.REQUEST ? 'REQUEST' : 'PENDING')}
      />
      
      <StatusCard
        title="Em Análise"
        count={analysisCount}
        icon={<Clock className="h-5 w-5 text-amber-600" />}
        color="border-l-4 border-l-amber-500"
        onClick={() => onFilterByStatus(proposalCounts.ANALYSIS ? 'ANALYSIS' : 'IN_ANALYSIS')}
      />
      
      <StatusCard
        title="Aprovadas"
        count={approvedCount}
        icon={<CheckCircle2 className="h-5 w-5 text-green-600" />}
        color="border-l-4 border-l-green-500"
        onClick={() => onFilterByStatus('APPROVED')}
      />
      
      <StatusCard
        title="Rejeitadas"
        count={rejectedCount}
        icon={<XCircle className="h-5 w-5 text-red-600" />}
        color="border-l-4 border-l-red-500"
        onClick={() => onFilterByStatus('REJECTED')}
      />
      
      <StatusCard
        title="Convertidas"
        count={convertedCount}
        icon={<FileCheck className="h-5 w-5 text-violet-600" />}
        color="border-l-4 border-l-violet-500"
        onClick={() => onFilterByStatus('CONVERTED')}
      />
      
      <StatusCard
        title="Todas"
        count={totalCount}
        icon={<AlertTriangle className="h-5 w-5 text-indigo-600" />}
        color="border-l-4 border-l-indigo-500"
        onClick={() => onFilterByStatus(null)}
      />
    </div>
  );
};

export default ProposalStatusPanel;
