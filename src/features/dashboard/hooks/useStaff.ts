'use client';

import { useQuery } from '@tanstack/react-query';
import { staffService } from '@/features/dashboard/services/staff.service';

export function useStaffProfileQuery() {
  return useQuery({
    queryKey: ['staff', 'profile'],
    queryFn: staffService.getMe,
  });
}
