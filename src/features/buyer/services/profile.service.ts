import { apiClient } from '@/core/http/client';
import type { ProfileImageResponse } from '@/types/api';

export const profileService = {
  upload: (file: File): Promise<ProfileImageResponse> => {
    const form = new FormData();
    form.append('file', file);
    return apiClient
      .post<ProfileImageResponse>('/profile/image', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data);
  },

  get: (): Promise<ProfileImageResponse> =>
    apiClient.get<ProfileImageResponse>('/profile/image').then((r) => r.data),
};
