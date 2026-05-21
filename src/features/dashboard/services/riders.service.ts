import { apiClient } from '@/core/http/client';
import type { RiderResponse } from '@/types/api';

export const ridersService = {
  list: (): Promise<RiderResponse[]> =>
    apiClient.get('/riders').then((r) => r.data),
};
