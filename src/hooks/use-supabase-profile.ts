import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getUserProfile, updateUserProfile } from '@/lib/supabase-utils';
import { type User } from '@supabase/supabase-js';

export function useProfile(user: User | null) {
  return useQuery({
    queryKey: ['profile', user?.id],
    queryFn: () => getUserProfile(user!),
    enabled: !!user,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user, updates }: { user: User; updates: any }) =>
      updateUserProfile(user, updates),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', data?.id] });
    },
  });
} 