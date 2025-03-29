import { useQuery } from '@tanstack/react-query';
import { getUsers, getUserById } from '@/lib/supabase-queries';

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
} 