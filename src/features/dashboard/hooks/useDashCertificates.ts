'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { dashCertificatesService } from '@/features/dashboard/services/dashCertificates.service';

export function useCertificateQuery(id: string) {
  return useQuery({
    queryKey: ['dashboard', 'certificates', id],
    queryFn: () => dashCertificatesService.get(id),
    enabled: !!id,
    retry: false,
  });
}

export function useRevokeCertificateMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => dashCertificatesService.revoke(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['dashboard', 'certificates', data.id] });
      toast.success('Certificate revoked.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
