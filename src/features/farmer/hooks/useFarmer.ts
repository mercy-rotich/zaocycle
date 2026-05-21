'use client';

import { useQuery } from '@tanstack/react-query';
import { farmerService } from '@/features/farmer/services/farmer.service';

export function useFarmerProfileQuery() {
  return useQuery({
    queryKey: ['farmer', 'profile'],
    queryFn: farmerService.getMe,
  });
}

export function useFarmerEarningsQuery() {
  return useQuery({
    queryKey: ['farmer', 'earnings'],
    queryFn: farmerService.getEarnings,
  });
}
