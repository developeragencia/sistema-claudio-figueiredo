
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";
import { Client } from '@/types/client';

// Create interface for client with optional userRoles property
interface ClientWithPermissions extends Client {
  userRoles?: {
    canViewOperations: boolean;
    canEditOperations: boolean;
    canApproveOperations: boolean;
    isAdmin: boolean;
    isRepresentative: boolean;
  };
}

interface ClientOperationsAccessProps {
  client: ClientWithPermissions;
}

const ClientOperationsAccess: React.FC<ClientOperationsAccessProps> = ({ client }) => {
  // Default values if userRoles doesn't exist
  const defaultPermissions = {
    canViewOperations: false,
    canEditOperations: false,
    canApproveOperations: false,
    isAdmin: false,
    isRepresentative: false
  };
  
  // Use userRoles if available, otherwise use defaults
  const permissions = client.userRoles || defaultPermissions;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="canViewOperations" className="flex-1">Visualizar Operações</Label>
          <div className="flex items-center">
            {permissions.canViewOperations ? 
              <Check className="h-4 w-4 text-green-500 mr-2" /> : 
              <X className="h-4 w-4 text-red-500 mr-2" />}
            <Switch 
              id="canViewOperations" 
              checked={permissions.canViewOperations}
              disabled
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="canEditOperations" className="flex-1">Editar Operações</Label>
          <div className="flex items-center">
            {permissions.canEditOperations ? 
              <Check className="h-4 w-4 text-green-500 mr-2" /> : 
              <X className="h-4 w-4 text-red-500 mr-2" />}
            <Switch 
              id="canEditOperations" 
              checked={permissions.canEditOperations}
              disabled
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="canApproveOperations" className="flex-1">Aprovar Operações</Label>
          <div className="flex items-center">
            {permissions.canApproveOperations ? 
              <Check className="h-4 w-4 text-green-500 mr-2" /> : 
              <X className="h-4 w-4 text-red-500 mr-2" />}
            <Switch 
              id="canApproveOperations" 
              checked={permissions.canApproveOperations}
              disabled
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="isAdmin" className="flex-1">Administrador</Label>
          <div className="flex items-center">
            {permissions.isAdmin ? 
              <Check className="h-4 w-4 text-green-500 mr-2" /> : 
              <X className="h-4 w-4 text-red-500 mr-2" />}
            <Switch 
              id="isAdmin" 
              checked={permissions.isAdmin}
              disabled
            />
          </div>
        </div>
        
        <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="isRepresentative" className="flex-1">Representante</Label>
          <div className="flex items-center">
            {permissions.isRepresentative ? 
              <Check className="h-4 w-4 text-green-500 mr-2" /> : 
              <X className="h-4 w-4 text-red-500 mr-2" />}
            <Switch 
              id="isRepresentative" 
              checked={permissions.isRepresentative}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientOperationsAccess;
