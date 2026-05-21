'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { dashPickupsService } from '@/features/dashboard/services/dashPickups.service';
import { ridersService } from '@/features/dashboard/services/riders.service';

export function useDashPickupsQuery() {
  return useQuery({
    queryKey: ['dashboard', 'pickups'],
    queryFn: dashPickupsService.list,
  });
}

export function useRidersListQuery() {
  return useQuery({
    queryKey: ['riders', 'list'],
    queryFn: ridersService.list,
    staleTime: 5 * 60 * 1000,
  });
}

export function useAssignRiderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, riderId }: { id: string; riderId: string }) =>
      dashPickupsService.assign(id, riderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'pickups'] });
      toast.success('Rider assigned.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useCancelPickupMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => dashPickupsService.cancel(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'pickups'] });
      toast.success('Pickup cancelled.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
