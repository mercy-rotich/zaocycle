import { apiClient } from '@/core/http/client';
import type { CertificateResponse } from '@/types/api';

export const dashCertificatesService = {
  get: (id: string): Promise<CertificateResponse> =>
    apiClient.get(`/dashboard/certificates/${id}`).then((r) => r.data),

  revoke: (id: string): Promise<CertificateResponse> =>
    apiClient.post(`/dashboard/certificates/${id}/revoke`).then((r) => r.data),
};
