'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { adminRidersService } from '@/features/admin/services/adminRiders.service';
import type { CreateRiderInput } from '@/shared/utils/validators';

export function useAdminRidersListQuery() {
  return useQuery({
    queryKey: ['admin', 'riders'],
    queryFn: adminRidersService.list,
  });
}

export function useAdminRiderQuery(id: string) {
  return useQuery({
    queryKey: ['admin', 'riders', id],
    queryFn: () => adminRidersService.get(id),
    enabled: !!id,
  });
}

export function useCreateRiderMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: CreateRiderInput) => adminRidersService.create(data),
    onSuccess: (rider) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'riders'] });
      toast.success(`Rider ${rider.fullName} registered.`);
      router.push('/admin/riders');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeactivateRiderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminRidersService.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'riders'] });
      toast.success('Rider deactivated.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useActivateRiderMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminRidersService.activate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'riders'] });
      toast.success('Rider reactivated.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
