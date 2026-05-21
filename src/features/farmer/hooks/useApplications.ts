'use client';

import { useQuery } from '@tanstack/react-query';
import { applicationsService } from '@/features/farmer/services/applications.service';
import { chemicalsService } from '@/features/farmer/services/chemicals.service';

export function useFarmerApplicationsQuery() {
  return useQuery({
    queryKey: ['farmer', 'applications'],
    queryFn: applicationsService.list,
  });
}

export function useChemicalsQuery() {
  return useQuery({
    queryKey: ['chemicals'],
    queryFn: chemicalsService.list,
    staleTime: 10 * 60 * 1000,
  });
}
