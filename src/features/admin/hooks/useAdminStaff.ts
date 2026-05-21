'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { adminStaffService } from '@/features/admin/services/adminStaff.service';
import type { CreateStaffInput } from '@/shared/utils/validators';

export function useAdminStaffListQuery() {
  return useQuery({
    queryKey: ['admin', 'staff'],
    queryFn: adminStaffService.list,
  });
}

export function useAdminStaffQuery(id: string) {
  return useQuery({
    queryKey: ['admin', 'staff', id],
    queryFn: () => adminStaffService.get(id),
    enabled: !!id,
  });
}

export function useCreateStaffMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation({
    mutationFn: (data: CreateStaffInput) => adminStaffService.create(data),
    onSuccess: (staff) => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff'] });
      toast.success(`Staff member ${staff.fullName} created.`);
      router.push('/admin/staff');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useDeactivateStaffMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminStaffService.deactivate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff'] });
      toast.success('Staff member deactivated.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useActivateStaffMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminStaffService.activate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'staff'] });
      toast.success('Staff member reactivated.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
