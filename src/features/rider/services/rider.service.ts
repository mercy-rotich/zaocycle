import { apiClient } from '@/core/http/client';
import type { RiderResponse, RiderEarningsResponse } from '@/types/api';

export const riderService = {
  getMe: (): Promise<RiderResponse> =>
    apiClient.get('/rider/me').then((r) => r.data),

  getEarnings: (): Promise<RiderEarningsResponse> =>
    apiClient.get('/rider/earnings').then((r) => r.data),
};
