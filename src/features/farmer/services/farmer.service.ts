import { apiClient } from '@/core/http/client';
import type { FarmerResponse, FarmerEarningsResponse } from '@/types/api';

export const farmerService = {
  getMe: (): Promise<FarmerResponse> =>
    apiClient.get('/farmer/me').then((r) => r.data),

  getEarnings: (): Promise<FarmerEarningsResponse> =>
    apiClient.get('/farmer/earnings').then((r) => r.data),
};
