import { apiClient } from '@/core/http/client';
import type { StaffResponse } from '@/types/api';
import type { CreateStaffInput } from '@/shared/utils/validators';

export const adminStaffService = {
  list: (): Promise<StaffResponse[]> =>
    apiClient.get('/admin/staff').then((r) => r.data),

  get: (id: string): Promise<StaffResponse> =>
    apiClient.get(`/admin/staff/${id}`).then((r) => r.data),

  create: (data: CreateStaffInput): Promise<StaffResponse> =>
    apiClient.post('/admin/staff', data).then((r) => r.data),

  deactivate: (id: string): Promise<StaffResponse> =>
    apiClient.delete(`/admin/staff/${id}`).then((r) => r.data),

  activate: (id: string): Promise<StaffResponse> =>
    apiClient.post(`/admin/staff/${id}/activate`).then((r) => r.data),
};
