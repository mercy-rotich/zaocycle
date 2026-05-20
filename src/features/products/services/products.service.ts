import { apiClient } from '@/core/http/client';
import type { ProductResponse } from '@/types/api';

export const productsService = {
  list: (): Promise<ProductResponse[]> =>
    apiClient.get<ProductResponse[]>('/products').then((r) => r.data),

  get: (id: string): Promise<ProductResponse> =>
    apiClient.get<ProductResponse>(`/products/${id}`).then((r) => r.data),
};
