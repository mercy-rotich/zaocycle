'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { pickupsService } from '@/features/farmer/services/pickups.service';

export function useFarmerPickupsQuery() {
  return useQuery({
    queryKey: ['farmer', 'pickups'],
    queryFn: pickupsService.list,
  });
}

export function useRequestPickupMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (notes?: string) => pickupsService.request(notes),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farmer', 'pickups'] });
      toast.success('Pickup requested! A rider will be assigned soon.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
