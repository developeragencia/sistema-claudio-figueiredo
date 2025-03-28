
import { StatusType } from '@/types/declarations';

export type AuditAction = 
  | 'create' 
  | 'update' 
  | 'delete' 
  | 'status_change' 
  | 'calculation' 
  | 'export' 
  | 'import';

export interface AuditTrail {
  id: string;
  date: Date;
  userName: string;
  userRole: string;
  action: AuditAction;
  resourceName: string;
  resourceId: string;
  ipAddress: string;
  details: string;
  previousStatus?: StatusType; // Update type to StatusType
  newStatus?: StatusType; // Update type to StatusType
}
