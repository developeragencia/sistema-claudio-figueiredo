import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  avatar_url: string | null;
}

interface Contract {
  id: number;
  number: string;
  client: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  value: number;
}

interface Role {
  id: number;
  name: string;
  label: string;
  description: string;
  permissions: string[];
  usersCount: number;
}

interface AuditLog {
  id: number;
  action: string;
  description: string;
  details: Record<string, any>;
  actor: string;
  actorRole: string;
  timestamp: string;
  ip: string;
}

interface Store {
  // Users
  users: User[];
  setUsers: (users: User[]) => void;
  addUser: (user: User) => void;
  updateUser: (id: number, data: Partial<User>) => void;
  deleteUser: (id: number) => void;

  // Contracts
  contracts: Contract[];
  setContracts: (contracts: Contract[]) => void;
  addContract: (contract: Contract) => void;
  updateContract: (id: number, data: Partial<Contract>) => void;
  deleteContract: (id: number) => void;

  // Roles
  roles: Role[];
  setRoles: (roles: Role[]) => void;
  addRole: (role: Role) => void;
  updateRole: (id: number, data: Partial<Role>) => void;
  deleteRole: (id: number) => void;

  // Audit Logs
  auditLogs: AuditLog[];
  setAuditLogs: (logs: AuditLog[]) => void;
  addAuditLog: (log: AuditLog) => void;

  // UI State
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Users
      users: [],
      setUsers: (users) => set({ users }),
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      updateUser: (id, data) =>
        set((state) => ({
          users: state.users.map((user) =>
            user.id === id ? { ...user, ...data } : user
          ),
        })),
      deleteUser: (id) =>
        set((state) => ({
          users: state.users.filter((user) => user.id !== id),
        })),

      // Contracts
      contracts: [],
      setContracts: (contracts) => set({ contracts }),
      addContract: (contract) =>
        set((state) => ({ contracts: [...state.contracts, contract] })),
      updateContract: (id, data) =>
        set((state) => ({
          contracts: state.contracts.map((contract) =>
            contract.id === id ? { ...contract, ...data } : contract
          ),
        })),
      deleteContract: (id) =>
        set((state) => ({
          contracts: state.contracts.filter((contract) => contract.id !== id),
        })),

      // Roles
      roles: [],
      setRoles: (roles) => set({ roles }),
      addRole: (role) => set((state) => ({ roles: [...state.roles, role] })),
      updateRole: (id, data) =>
        set((state) => ({
          roles: state.roles.map((role) =>
            role.id === id ? { ...role, ...data } : role
          ),
        })),
      deleteRole: (id) =>
        set((state) => ({
          roles: state.roles.filter((role) => role.id !== id),
        })),

      // Audit Logs
      auditLogs: [],
      setAuditLogs: (logs) => set({ auditLogs: logs }),
      addAuditLog: (log) =>
        set((state) => ({ auditLogs: [log, ...state.auditLogs] })),

      // UI State
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'app-store',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
); 