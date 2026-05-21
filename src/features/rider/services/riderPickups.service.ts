import { apiClient } from '@/core/http/client';
import type { WastePickupResponse } from '@/types/api';

export const riderPickupsService = {
  list: (): Promise<WastePickupResponse[]> =>
    apiClient.get('/rider/pickups').then((r) => r.data),

  get: (id: string): Promise<WastePickupResponse> =>
    apiClient.get(`/rider/pickups/${id}`).then((r) => r.data),

  collect: (id: string, weightKg: number, notes?: string): Promise<WastePickupResponse> => {
    const form = new FormData();
    form.append('weightKg', String(weightKg));
    if (notes) form.append('notes', notes);
    return apiClient.post(`/rider/pickups/${id}/collect`, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((r) => r.data);
  },
};
