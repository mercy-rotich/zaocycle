import axios from 'axios';
import { apiClient } from '@/core/http/client';
import type { TokenResponse } from '@/types/api';
import type { RegisterBuyerInput } from '@/shared/utils/validators';

// Use plain axios (not intercepted apiClient) for auth calls to avoid
// token-refresh loops on login/register/refresh endpoints.
const base = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = {
  loginBuyer: (data: { email: string; password: string }) =>
    axios.post<TokenResponse>(`${base}/auth/buyer/login`, data).then((r) => r.data),

  loginStaff: (data: { email: string; password: string }) =>
    axios.post<TokenResponse>(`${base}/auth/staff/login`, data).then((r) => r.data),

  loginFarmer: (data: { phone: string; pin: string }) =>
    axios.post<TokenResponse>(`${base}/auth/farmer/login`, data).then((r) => r.data),

  loginRider: (data: { phone: string; password: string }) =>
    axios.post<TokenResponse>(`${base}/auth/rider/login`, data).then((r) => r.data),

  register: (data: RegisterBuyerInput) =>
    axios.post<TokenResponse>(`${base}/auth/buyer/register`, data).then((r) => r.data),

  refresh: (refreshToken: string) =>
    axios.post<TokenResponse>(`${base}/auth/refresh`, { refreshToken }).then((r) => r.data),

  logout: (refreshToken: string) =>
    apiClient.post('/auth/logout', { refreshToken }),
};
