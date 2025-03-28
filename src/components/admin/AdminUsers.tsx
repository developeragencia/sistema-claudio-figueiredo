
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Search, Plus, Edit, Trash2, UserPlus, Mail, UserCheck, X, Check, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

const initialUsers = [
  { id: 1, name: 'Claudio Figueiredo', email: 'admin@sistemasclaudio.com', role: 'Administrador', status: 'Ativo' },
  { id: 2, name: 'Maria Silva', email: 'maria@example.com', role: 'Usuário', status: 'Ativo' },
  { id: 3, name: 'Pedro Alves', email: 'pedro@example.com', role: 'Gerente', status: 'Inativo' },
  { id: 4, name: 'Ana Costa', email: 'ana@example.com', role: 'Usuário', status: 'Ativo' },
  { id: 5, name: 'Lucas Mendes', email: 'lucas@example.com', role: 'Técnico', status: 'Ativo' },
];

const UserForm = ({ onSave, onCancel, editingUser = null }: { onSave: (user: any) => void, onCancel: () => void, editingUser?: any }) => {
  const [name, setName] = useState(editingUser ? editingUser.name : '');
  const [email, setEmail] = useState(editingUser ? editingUser.email : '');
  const [role, setRole] = useState(editingUser ? editingUser.role : 'Usuário');
  const [status, setStatus] = useState(editingUser ? editingUser.status : 'Ativo');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onSave({
        id: editingUser ? editingUser.id : Date.now(),
        name,
        email,
        role,
        status
      });
      setLoading(false);
    }, 800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo"
            required
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            required
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="role">Função</Label>
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma função" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Administrador">Administrador</SelectItem>
                <SelectItem value="Gerente">Gerente</SelectItem>
                <SelectItem value="Técnico">Técnico</SelectItem>
                <SelectItem value="Usuário">Usuário</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Ativo">Ativo</SelectItem>
                <SelectItem value="Inativo">Inativo</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DialogFooter className="pt-4 flex flex-col sm:flex-row gap-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onCancel}
          disabled={loading}
          className="w-full"
        >
          <X className="w-4 h-4 mr-2" />
          Cancelar
        </Button>
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Salvando...
            </>
          ) : (
            <>
              <Check className="w-4 h-4 mr-2" />
              {editingUser ? 'Atualizar' : 'Adicionar'}
            </>
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

const MobileUserCard = ({ user, onEdit, onDelete }: { user: any, onEdit: () => void, onDelete: () => void }) => {
  return (
    <div className="p-4 bg-card border border-border/50 rounded-lg shadow-sm mb-3">
      <div className="flex items-center mb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 mr-3">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-medium">{user.name}</h3>
          <p className="text-xs text-muted-foreground">{user.email}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 text-sm mb-3">
        <div>
          <span className="text-xs text-muted-foreground">Função:</span>
          <p>{user.role}</p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Status:</span>
          <div className="mt-1">
            <Badge variant={user.status === 'Ativo' ? 'default' : 'secondary'} className={
              user.status === 'Ativo' 
                ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30 dark:bg-green-500/20 dark:text-green-300' 
                : 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 dark:bg-amber-500/20 dark:text-amber-300'
            }>
              {user.status}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2 border-t border-border/30 pt-3">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEdit}
        >
          <Edit className="h-3.5 w-3.5 mr-1" />
          Editar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onDelete}
          className="text-destructive hover:text-destructive border-destructive/20 hover:bg-destructive/10"
        >
          <Trash2 className="h-3.5 w-3.5 mr-1" />
          Excluir
        </Button>
      </div>
    </div>
  );
};

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);
  const { toast } = useToast();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddUser = (newUser: any) => {
    setUsers([...users, newUser]);
    setIsAddUserOpen(false);
    toast({
      title: "Usuário adicionado",
      description: `${newUser.name} foi adicionado com sucesso.`
    });
  };
  
  const handleUpdateUser = (updatedUser: any) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    setEditingUser(null);
    toast({
      title: "Usuário atualizado",
      description: `${updatedUser.name} foi atualizado com sucesso.`
    });
  };
  
  const handleDeleteUser = () => {
    if (userToDelete) {
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setUserToDelete(null);
      setDeleteDialogOpen(false);
      toast({
        title: "Usuário removido",
        description: `O usuário foi removido com sucesso.`
      });
    }
  };
  
  const openDeleteDialog = (user: any) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">Usuários</h1>
          <p className="text-muted-foreground">Gerenciar usuários do sistema</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar usuários..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto mt-2 sm:mt-0">
                <UserPlus className="h-4 w-4 mr-2" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Adicionar Novo Usuário</DialogTitle>
                <DialogDescription>
                  Preencha os dados abaixo para adicionar um novo usuário ao sistema.
                </DialogDescription>
              </DialogHeader>
              <UserForm 
                onSave={handleAddUser} 
                onCancel={() => setIsAddUserOpen(false)} 
              />
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Card className="border-primary/5">
          <CardHeader>
            <CardTitle>Lista de Usuários</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredUsers.length === 0 ? (
              <div className="text-center py-10">
                <UserCheck className="h-10 w-10 text-primary/40 mx-auto mb-4" />
                <h3 className="text-lg font-medium">Nenhum usuário encontrado</h3>
                <p className="text-muted-foreground mt-1">
                  {searchTerm ? `Nenhum resultado para "${searchTerm}"` : 'Adicione novos usuários clicando no botão acima.'}
                </p>
              </div>
            ) : (
              <>
                {/* Mobile view - cards */}
                <div className="md:hidden">
                  {filteredUsers.map((user) => (
                    <MobileUserCard 
                      key={user.id} 
                      user={user} 
                      onEdit={() => setEditingUser(user)}
                      onDelete={() => openDeleteDialog(user)}
                    />
                  ))}
                </div>
                
                {/* Desktop view - table */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Função</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="group hover:bg-accent/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                <User className="h-4 w-4 text-primary" />
                              </div>
                              <div>{user.name}</div>
                            </div>
                          </TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.role}</TableCell>
                          <TableCell>
                            <Badge variant={user.status === 'Ativo' ? 'default' : 'secondary'} className={
                              user.status === 'Ativo' 
                                ? 'bg-green-500/20 text-green-700 hover:bg-green-500/30 dark:bg-green-500/20 dark:text-green-300' 
                                : 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30 dark:bg-amber-500/20 dark:text-amber-300'
                            }>
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Dialog open={!!editingUser && editingUser.id === user.id} onOpenChange={(open) => !open && setEditingUser(null)}>
                                <DialogTrigger asChild>
                                  <Button variant="ghost" size="icon" onClick={() => setEditingUser(user)}>
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Editar Usuário</DialogTitle>
                                    <DialogDescription>
                                      Edite os dados do usuário abaixo.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {editingUser && editingUser.id === user.id && (
                                    <UserForm 
                                      onSave={handleUpdateUser} 
                                      onCancel={() => setEditingUser(null)} 
                                      editingUser={editingUser}
                                    />
                                  )}
                                </DialogContent>
                              </Dialog>
                              
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => openDeleteDialog(user)}
                                className="hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center p-4 border rounded-md bg-destructive/5 border-destructive/20 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 mr-4">
              <User className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <p className="font-medium">{userToDelete?.name}</p>
              <p className="text-sm text-muted-foreground">{userToDelete?.email}</p>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)} className="w-full sm:w-auto">
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser} className="w-full sm:w-auto">
              <Trash2 className="h-4 w-4 mr-2" /> Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default AdminUsers;
