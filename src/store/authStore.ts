'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TokenResponse, UserSummary } from '@/types/api';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserSummary | null;
  login: (tokenResponse: TokenResponse) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      login: (t) =>
        set({
          accessToken: t.accessToken,
          refreshToken: t.refreshToken,
          user: t.user,
        }),
      logout: () =>
        set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: 'zao-auth',
      // Only persist refresh token + user; access token stays in-memory only
      partialize: (s) => ({ refreshToken: s.refreshToken, user: s.user }),
    }
  )
);
