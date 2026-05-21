import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  // Lazy import avoids circular dependency at module load time
  const { useAuthStore } = require('@/store/authStore');
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

apiClient.interceptors.response.use(
  (res) => {
    // Unwrap the standard ApiResponse<T> envelope so callers get T directly
    if (res.data !== null && typeof res.data === 'object' && 'success' in res.data && 'data' in res.data) {
      return { ...res, data: res.data.data };
    }
    return res;
  },
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;
      const { useAuthStore } = require('@/store/authStore');
      const { refreshToken, login, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );
        // data is ApiResponse<TokenResponse> — unwrap before storing
        const tokenData = data.data;
        login(tokenData);
        error.config.headers.Authorization = `Bearer ${tokenData.accessToken}`;
        return apiClient(error.config);
      } catch {
        logout();
        if (typeof window !== 'undefined') window.location.href = '/login';
      }
    }

    const message = error.response?.data?.message ?? 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);
