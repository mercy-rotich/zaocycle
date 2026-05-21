import { apiClient } from '@/core/http/client';
import type { WastePickupResponse } from '@/types/api';

export const pickupsService = {
  list: (): Promise<WastePickupResponse[]> =>
    apiClient.get('/farmer/pickups').then((r) => r.data),

  request: (notes?: string): Promise<WastePickupResponse> =>
    apiClient.post('/farmer/pickups', { notes }).then((r) => r.data),
};
