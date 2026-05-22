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
      logout: () => {
        if (typeof window !== 'undefined') {
          // Clear any role-based routing cookies if they exist
          document.cookie = 'zao-role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict';
        }
        return set({ accessToken: null, refreshToken: null, user: null });
      },
    }),
    {
      name: 'zao-auth',
     
      partialize: (s) => ({ refreshToken: s.refreshToken, user: s.user }),
    }
  )
);