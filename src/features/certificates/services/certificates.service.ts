import { apiClient } from '@/core/http/client';
import type { CertificateResponse } from '@/types/api';

export const certificatesService = {
  get: (id: string): Promise<CertificateResponse> =>
    apiClient.get<CertificateResponse>(`/dashboard/certificates/${id}`).then((r) => r.data),

  revoke: (id: string): Promise<CertificateResponse> =>
    apiClient.post<CertificateResponse>(`/dashboard/certificates/${id}/revoke`).then((r) => r.data),
};
