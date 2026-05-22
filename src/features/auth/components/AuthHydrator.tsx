'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import axios from 'axios';

// Pages that must render immediately — no session check needed
const PUBLIC_PATHS = ['/', '/login', '/register', '/products', '/scan', '/verify'];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

export function AuthHydrator({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isHydrating, setIsHydrating] = useState(true);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const { refreshToken, user, accessToken, login, logout } = useAuthStore.getState();

    const hydrate = async () => {
      // Condition: User has a persisted session, but the in-memory access token was lost (e.g., page reload)
      if (refreshToken && user && !accessToken) {
        try {
          // Note: We use standard axios here, NOT apiClient, to avoid interceptor loops
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/refresh`,
            { refreshToken },
            { timeout: 8000 }
          );

          login(data.data);
        } catch {
          // If refresh token is expired or invalid, clear the corrupted state
          logout();
        }
      }
      setIsHydrating(false);
    };

    hydrate();
  }, []);

  // Never block public pages — they render immediately regardless of session state
  if (isHydrating && !isPublicPath(pathname)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 bg-emerald-600 rounded-full mb-4"></div>
          <p className="text-slate-400 text-sm font-medium">Securing session...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}