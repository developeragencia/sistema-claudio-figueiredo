
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Audit } from "@/types/audit";
import AuditActionButtons from '../AuditActionButtons';

interface AuditTabContentProps {
  title: string;
  description: string;
  audits: Audit[];
  onViewDetails: (auditId: string) => void;
  onDownloadDocuments: (auditId: string) => void;
  onEdit: (auditId: string) => void;
  onDelete: (auditId: string) => void;
  onApprove: (auditId: string) => void;
  showStatus?: boolean;
  showPriority?: boolean;
}

const AuditTabContent: React.FC<AuditTabContentProps> = ({
  title,
  description,
  audits,
  onViewDetails,
  onDownloadDocuments,
  onEdit,
  onDelete,
  onApprove,
  showStatus = true,
  showPriority = true
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em Andamento":
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Em Andamento</Badge>;
      case "Concluída":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Concluída</Badge>;
      case "Pendente":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Pendente</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Alta":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Alta</Badge>;
      case "Média":
        return <Badge variant="outline" className="bg-amber-100 text-amber-800 border-amber-200">Média</Badge>;
      case "Baixa":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Baixa</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              {showStatus && <TableHead>Status</TableHead>}
              {showPriority && <TableHead>Prioridade</TableHead>}
              <TableHead>Responsável</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {audits.map((audit) => (
              <TableRow key={audit.id}>
                <TableCell className="font-medium">{audit.id}</TableCell>
                <TableCell>{audit.clientName}</TableCell>
                <TableCell>{audit.auditType}</TableCell>
                <TableCell>{audit.date}</TableCell>
                {showStatus && <TableCell>{getStatusBadge(audit.status)}</TableCell>}
                {showPriority && <TableCell>{getPriorityBadge(audit.priority || '')}</TableCell>}
                <TableCell>{audit.assignedTo}</TableCell>
                <TableCell>
                  <AuditActionButtons 
                    audit={audit}
                    onViewDetails={onViewDetails}
                    onDownloadDocuments={onDownloadDocuments}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onApprove={onApprove}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AuditTabContent;
