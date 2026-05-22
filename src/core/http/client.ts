import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// --- REFRESH TOKEN CONCURRENCY LOCK ---
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

// Adds failed requests to a queue while a refresh is happening
const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

// Processes the queue once the new token arrives
const onRefreshed = (token: string) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

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
      if (isRefreshing) {
        // If a refresh is already in progress, wait for it to finish
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const { refreshToken, login, logout } = useAuthStore.getState();

      if (!refreshToken) {
        isRefreshing = false;
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
        
        // Notify all queued requests that the token is ready
        onRefreshed(tokenData.accessToken);
        
        // Retry the original request
        originalRequest.headers.Authorization = `Bearer ${tokenData.accessToken}`;
        return apiClient(originalRequest);
        
      } catch (refreshError) {
        // If the refresh fails, wipe the queue and log the user out
        refreshSubscribers = [];
        logout();
        if (typeof window !== 'undefined') window.location.href = '/login';
        return Promise.reject(refreshError);
      } finally {
        // Always release the lock
        isRefreshing = false; 
      }
    }

    // 403 = authenticated but wrong role, or no token sent at all.
    if (status === 403) {
      useAuthStore.getState().logout();
      if (typeof window !== 'undefined') window.location.href = '/login';
      return Promise.reject(new Error('Session expired. Please log in again.'));
    }

    const message = error.response?.data?.message ?? 'An unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);