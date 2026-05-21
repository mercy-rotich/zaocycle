'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { dashInventoryService } from '@/features/dashboard/services/dashInventory.service';
import type { RecordIntakeInput, RecordBatchInput } from '@/shared/utils/validators';

export function useStockQuery() {
  return useQuery({
    queryKey: ['dashboard', 'inventory', 'stock'],
    queryFn: dashInventoryService.getStock,
  });
}

export function useIntakesQuery() {
  return useQuery({
    queryKey: ['dashboard', 'inventory', 'intakes'],
    queryFn: dashInventoryService.listIntakes,
  });
}

export function useBatchesQuery() {
  return useQuery({
    queryKey: ['dashboard', 'inventory', 'batches'],
    queryFn: dashInventoryService.listBatches,
  });
}

export function useCollectedPickupsQuery() {
  return useQuery({
    queryKey: ['dashboard', 'pickups', 'collected'],
    queryFn: dashInventoryService.listCollectedPickups,
    staleTime: 60 * 1000,
  });
}

export function useRecordIntakeMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RecordIntakeInput) => dashInventoryService.recordIntake(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'inventory'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'pickups', 'collected'] });
      toast.success('Intake batch recorded.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useRecordBatchMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RecordBatchInput) => dashInventoryService.recordBatch(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'inventory'] });
      toast.success('Production batch recorded.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
