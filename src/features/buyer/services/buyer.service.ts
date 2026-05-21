import { apiClient } from '@/core/http/client';
import type { BuyerProfileResponse } from '@/types/api';
import type { UpdateBuyerInput } from '@/shared/utils/validators';

export const buyerService = {
  getMe: (): Promise<BuyerProfileResponse> =>
    apiClient.get<BuyerProfileResponse>('/buyer/me').then((r) => r.data),

  updateMe: (data: UpdateBuyerInput): Promise<BuyerProfileResponse> =>
    apiClient.patch<BuyerProfileResponse>('/buyer/me', data).then((r) => r.data),
};
