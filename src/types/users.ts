export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar_url?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
  permissions: string[];
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
} 