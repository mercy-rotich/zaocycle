'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { dashOrdersService } from '@/features/dashboard/services/dashOrders.service';

export function useDashOrdersQuery(page = 0) {
  return useQuery({
    queryKey: ['dashboard', 'orders', page],
    queryFn: () => dashOrdersService.list({ page }),
  });
}

export function useMarkReadyMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => dashOrdersService.markReady(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'orders'] });
      toast.success('Order marked as ready for delivery.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useMarkDeliveredMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => dashOrdersService.markDelivered(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'orders'] });
      toast.success('Order marked as delivered.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
