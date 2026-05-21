import { apiClient } from '@/core/http/client';
import type { PesticideApplicationResponse } from '@/types/api';

export const applicationsService = {
  list: (): Promise<PesticideApplicationResponse[]> =>
    apiClient.get('/farmer/applications').then((r) => r.data),
};
