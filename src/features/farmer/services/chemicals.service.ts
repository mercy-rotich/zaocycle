import { apiClient } from '@/core/http/client';
import type { ChemicalResponse } from '@/types/api';

export const chemicalsService = {
  list: (): Promise<ChemicalResponse[]> =>
    apiClient.get('/chemicals').then((r) => r.data),

  get: (id: string): Promise<ChemicalResponse> =>
    apiClient.get(`/chemicals/${id}`).then((r) => r.data),
};
