import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadAvatar } from '@/lib/supabase-utils';
import { type User } from '@supabase/supabase-js';

export function useUploadAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ user, file }: { user: User; file: File }) =>
      uploadAvatar(user, file),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['profile', data?.id] });
    },
  });
} 