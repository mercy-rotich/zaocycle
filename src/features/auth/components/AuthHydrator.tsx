'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { authApi } from '@/features/auth/services/auth.service';

export function AuthHydrator({ children }: { children: React.ReactNode }) {
  const { refreshToken, login, logout } = useAuthStore();

  useEffect(() => {
    // Access token is in-memory only — restore it silently on page load
    if (refreshToken && !useAuthStore.getState().accessToken) {
      authApi.refresh(refreshToken).then(login).catch(logout);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
