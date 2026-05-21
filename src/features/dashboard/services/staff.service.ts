import { apiClient } from '@/core/http/client';
import type { StaffResponse } from '@/types/api';

export const staffService = {
  getMe: (): Promise<StaffResponse> =>
    apiClient.get('/staff/me').then((r) => r.data),
};
