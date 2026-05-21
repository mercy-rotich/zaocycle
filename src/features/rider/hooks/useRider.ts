'use client';

import { useQuery } from '@tanstack/react-query';
import { riderService } from '@/features/rider/services/rider.service';

export function useRiderProfileQuery() {
  return useQuery({
    queryKey: ['rider', 'profile'],
    queryFn: riderService.getMe,
  });
}

export function useRiderEarningsQuery() {
  return useQuery({
    queryKey: ['rider', 'earnings'],
    queryFn: riderService.getEarnings,
  });
}
