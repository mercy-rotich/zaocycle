import axios, { isAxiosError } from 'axios';
import { apiClient } from '@/core/http/client';
import type { ApiResponse, TokenResponse } from '@/types/api';
import type { RegisterBuyerInput } from '@/shared/utils/validators';

// Use plain axios (not intercepted apiClient) for auth calls to avoid
// token-refresh loops on login/register/refresh endpoints.
const base = process.env.NEXT_PUBLIC_API_BASE_URL;

function extractMessage(e: unknown): string {
  if (isAxiosError(e) && e.response?.data?.message) return e.response.data.message as string;
  if (e instanceof Error) return e.message;
  return 'Something went wrong';
}

// The backend uses a single unified login endpoint. Role is auto-detected from
// the identifier format (email → BUYER/STAFF, E.164 phone → FARMER/RIDER) and
// the credential type (PIN → FARMER, password → everyone else).
async function unifiedLogin(identifier: string, credential: string): Promise<TokenResponse> {
  try {
    const r = await axios.post<ApiResponse<TokenResponse>>(`${base}/auth/login`, { identifier, credential });
    return r.data.data;
  } catch (e) {
    throw new Error(extractMessage(e));
  }
}

export const authApi = {
  loginBuyer: (data: { email: string; password: string }) =>
    unifiedLogin(data.email, data.password),

  loginStaff: (data: { email: string; password: string }) =>
    unifiedLogin(data.email, data.password),

  loginFarmer: (data: { phone: string; pin: string }) =>
    unifiedLogin(data.phone, data.pin),

  loginRider: (data: { phone: string; password: string }) =>
    unifiedLogin(data.phone, data.password),

  register: async (data: RegisterBuyerInput): Promise<TokenResponse> => {
    try {
      const r = await axios.post<ApiResponse<TokenResponse>>(`${base}/auth/buyer/register`, data);
      return r.data.data;
    } catch (e) {
      throw new Error(extractMessage(e));
    }
  },

  refresh: async (refreshToken: string): Promise<TokenResponse> => {
    const r = await axios.post<ApiResponse<TokenResponse>>(`${base}/auth/refresh`, { refreshToken });
    return r.data.data;
  },

  logout: (refreshToken: string) =>
    apiClient.post('/auth/logout', { refreshToken }),
};
