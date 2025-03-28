
import React from 'react';
import { TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calendar, Eye } from 'lucide-react';
import { AuditTrail } from '../types';
import { formatDate } from '../utils';
import AuditActionBadge from './AuditActionBadge';

interface AuditTableRowProps {
  audit: AuditTrail;
  onViewDetails: (audit: AuditTrail) => void;
}

const AuditTableRow: React.FC<AuditTableRowProps> = ({ audit, onViewDetails }) => {
  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
          <span>{formatDate(audit.date)}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{audit.userName}</span>
          <span className="text-xs text-muted-foreground">{audit.userRole}</span>
        </div>
      </TableCell>
      <TableCell>
        <AuditActionBadge action={audit.action} />
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">{audit.resourceName}</span>
          <span className="text-xs text-muted-foreground">{audit.resourceId}</span>
        </div>
      </TableCell>
      <TableCell>{audit.ipAddress}</TableCell>
      <TableCell className="text-center">
        <Button variant="ghost" size="sm" onClick={() => onViewDetails(audit)}>
          <Eye className="h-4 w-4 mr-1" />
          Ver
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AuditTableRow;
