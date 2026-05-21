import { apiClient } from '@/core/http/client';
import type { WastePickupResponse } from '@/types/api';

export const dashPickupsService = {
  list: (): Promise<WastePickupResponse[]> =>
    apiClient.get('/dashboard/pickups').then((r) => r.data),

  assign: (id: string, riderId: string): Promise<WastePickupResponse> =>
    apiClient.post(`/dashboard/pickups/${id}/assign`, null, { params: { riderId } }).then((r) => r.data),

  cancel: (id: string): Promise<WastePickupResponse> =>
    apiClient.post(`/dashboard/pickups/${id}/cancel`).then((r) => r.data),
};
