import { apiClient } from '@/core/http/client';
import type { RiderResponse } from '@/types/api';
import type { CreateRiderInput } from '@/shared/utils/validators';

export const adminRidersService = {
  list: (): Promise<RiderResponse[]> =>
    apiClient.get('/riders').then((r) => r.data),

  get: (id: string): Promise<RiderResponse> =>
    apiClient.get(`/admin/riders/${id}`).then((r) => r.data),

  create: (data: CreateRiderInput): Promise<RiderResponse> =>
    apiClient.post('/admin/riders', data).then((r) => r.data),

  deactivate: (id: string): Promise<RiderResponse> =>
    apiClient.delete(`/admin/riders/${id}`).then((r) => r.data),

  activate: (id: string): Promise<RiderResponse> =>
    apiClient.post(`/admin/riders/${id}/activate`).then((r) => r.data),
};
