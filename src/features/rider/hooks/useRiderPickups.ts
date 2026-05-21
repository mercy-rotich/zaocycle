'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { riderPickupsService } from '@/features/rider/services/riderPickups.service';

export function useRiderPickupsQuery() {
  return useQuery({
    queryKey: ['rider', 'pickups'],
    queryFn: riderPickupsService.list,
  });
}

export function useRiderPickupQuery(id: string) {
  return useQuery({
    queryKey: ['rider', 'pickups', id],
    queryFn: () => riderPickupsService.get(id),
    enabled: !!id,
  });
}

export function useCollectPickupMutation(id: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (weightKg: number) => riderPickupsService.collect(id, weightKg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rider', 'pickups'] });
      toast.success('Collection logged! Farmer payout is being processed.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
