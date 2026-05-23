import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
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
    const status = error.response?.status;
    const originalRequest = error.config;
    const { useAuthStore } = require('@/store/authStore');

    // Handle 401 Unauthorized
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { refreshToken, login, logout } = useAuthStore.getState();

      if (!refreshToken) {
        logout();
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
          { refreshToken }
        );
        
        // Unwrap token response
        const tokenData = data.data; 
        
        // Update global state
        login(tokenData);
        
        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;
        return apiClient(originalRequest);
        
      } catch (refreshError) {
        logout();
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle 403 Forbidden
    if (status === 403) {
      useAuthStore.getState().logout();
      if (typeof window !== 'undefined') window.location.href = '/login';
      return Promise.reject(new Error('Session expired. Please log in again.'));
    }

    const message = error.response?.data?.message ?? 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);