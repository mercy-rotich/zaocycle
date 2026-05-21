import { apiClient } from '@/core/http/client';
import type { OrderResponse, Page } from '@/types/api';

export const dashOrdersService = {
  list: (params?: { page?: number; status?: string }): Promise<Page<OrderResponse>> =>
    apiClient.get('/dashboard/orders', { params }).then((r) => r.data),

  markReady: (id: string): Promise<OrderResponse> =>
    apiClient.post(`/dashboard/orders/${id}/ready`).then((r) => r.data),

  markDelivered: (id: string): Promise<OrderResponse> =>
    apiClient.post(`/dashboard/orders/${id}/deliver`).then((r) => r.data),
};
