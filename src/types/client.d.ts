
export interface Client {
  id: string;
  name: string;
  cnpj: string;
  documentNumber: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  segment: string;
  type: string;
  zipCode?: string;
  userRoles?: {
    canViewOperations: boolean;
    canEditOperations: boolean;
    canApproveOperations: boolean;
    isAdmin: boolean;
    isRepresentative: boolean;
  };
}

export type UserRole = 'admin' | 'office' | 'client' | 'sales' | 'representative' | 'staff';
