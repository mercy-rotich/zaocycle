'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { buyerService } from '@/features/buyer/services/buyer.service';
import { profileService } from '@/features/buyer/services/profile.service';
import type { UpdateBuyerInput } from '@/shared/utils/validators';

export function useBuyerProfileQuery() {
  return useQuery({
    queryKey: ['buyer', 'profile'],
    queryFn: buyerService.getMe,
  });
}

export function useUpdateBuyerMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateBuyerInput) => buyerService.updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buyer', 'profile'] });
      toast.success('Profile updated.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useUploadImageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => profileService.upload(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buyer', 'profile'] });
      toast.success('Profile photo updated.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
