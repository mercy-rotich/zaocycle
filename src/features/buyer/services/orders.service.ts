import { apiClient } from '@/core/http/client';
import type { OrderResponse, Page } from '@/types/api';
import type { PlaceOrderInput } from '@/shared/utils/validators';

export const ordersService = {
  place: (data: PlaceOrderInput): Promise<OrderResponse> =>
    apiClient.post<OrderResponse>('/buyer/orders', data).then((r) => r.data),

  list: (params?: { page?: number; size?: number }): Promise<Page<OrderResponse>> =>
    apiClient.get<Page<OrderResponse>>('/buyer/orders', { params }).then((r) => r.data),

  get: (id: string): Promise<OrderResponse> =>
    apiClient.get<OrderResponse>(`/buyer/orders/${id}`).then((r) => r.data),

  cancel: (id: string): Promise<OrderResponse> =>
    apiClient.delete<OrderResponse>(`/buyer/orders/${id}`).then((r) => r.data),
};
