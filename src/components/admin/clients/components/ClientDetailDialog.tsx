
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Client } from '@/types/client';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Edit, Trash2, UserCheck, Calendar, Building, Mail, Phone, MapPin, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface ClientDetailDialogProps {
  client: Client;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onSetActive: () => void;
}

const ClientDetailDialog: React.FC<ClientDetailDialogProps> = ({
  client,
  open,
  onClose,
  onEdit,
  onDelete,
  onSetActive
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Detalhes do Cliente</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Building className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{client.name}</h2>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>
                    Cliente desde {format(new Date(client.createdAt), 'dd/MM/yyyy', { locale: ptBR })}
                  </span>
                </div>
              </div>
            </div>
            <Badge 
              variant="outline" 
              className={
                client.status === 'ACTIVE' 
                  ? 'bg-green-500/20 text-green-700' 
                  : 'bg-slate-500/20 text-slate-700'
              }
            >
              {client.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
            </Badge>
          </div>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DetailItem icon={<Building />} label="CNPJ" value={client.documentNumber} />
            <DetailItem icon={<User />} label="Tipo" value={client.type === 'private' ? 'Privado' : 'Público'} />
            <DetailItem icon={<Mail />} label="Email" value={client.email} />
            <DetailItem icon={<Phone />} label="Telefone" value={client.phone} />
            <DetailItem icon={<MapPin />} label="Endereço" value={`${client.address || ''} ${client.city || ''} ${client.state || ''}`} />
            <DetailItem icon={<Building />} label="Segmento" value={client.segment || 'Não especificado'} />
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-lg font-medium mb-3">Informações de Contato</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailItem icon={<User />} label="Nome" value={client.contactName || 'Não especificado'} />
              <DetailItem icon={<Mail />} label="Email" value={client.contactEmail || 'Não especificado'} />
              <DetailItem icon={<Phone />} label="Telefone" value={client.contactPhone || 'Não especificado'} />
            </div>
          </div>
        </div>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onSetActive}>
            <UserCheck className="mr-2 h-4 w-4" />
            Definir como Ativo
          </Button>
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const DetailItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-start gap-2">
    <div className="mt-0.5 text-muted-foreground">{icon}</div>
    <div>
      <p className="text-sm font-medium">{label}</p>
      <p className="text-sm text-muted-foreground">{value}</p>
    </div>
  </div>
);

export default ClientDetailDialog;
