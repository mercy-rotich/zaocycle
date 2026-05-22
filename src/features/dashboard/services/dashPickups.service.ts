import { apiClient } from '@/core/http/client';
import type { Page, WastePickupResponse } from '@/types/api';

export const dashPickupsService = {
  list: (): Promise<WastePickupResponse[]> =>
    apiClient.get<Page<WastePickupResponse>>('/dashboard/pickups', { params: { size: 200 } })
      .then((r) => (r.data as unknown as Page<WastePickupResponse>).content ?? []),

  assign: (id: string, riderId: string): Promise<WastePickupResponse> =>
    apiClient.post(`/dashboard/pickups/${id}/assign`, null, { params: { riderId } }).then((r) => r.data),

  cancel: (id: string): Promise<WastePickupResponse> =>
    apiClient.post(`/dashboard/pickups/${id}/cancel`).then((r) => r.data),
};
