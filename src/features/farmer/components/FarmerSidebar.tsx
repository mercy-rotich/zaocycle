'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, LayoutDashboard, FlaskConical, Package, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useFarmerProfileQuery } from '@/features/farmer/hooks/useFarmer';

const tabs = [
  { href: '/farmer/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '/farmer/applications', icon: FlaskConical, label: 'Sprays' },
  { href: '/farmer/pickups', icon: Package, label: 'Pickups' },
  { href: '/farmer/profile', icon: User, label: 'Profile' },
];

function getInitials(name: string) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

export default function FarmerSidebar() {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const { data: profile } = useFarmerProfileQuery();

  const displayName = profile?.fullName ?? user?.displayName ?? 'Farmer';
  const ward = profile?.ward ?? '';

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-60 bg-slate-900 border-r border-slate-800 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800">
        <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
          <Leaf className="w-4 h-4 text-white" />
        </div>
        <span className="text-white text-base font-bold">
          Zao<span className="text-green-400">Cycle</span>
        </span>
        <span className="ml-auto text-[10px] text-slate-500 font-semibold bg-slate-800 px-2 py-0.5 rounded-full uppercase tracking-wide">
          Farmer
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {tabs.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-sm font-medium ${
                active
                  ? 'bg-green-500/10 text-green-400 ring-1 ring-green-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" strokeWidth={active ? 2.5 : 1.75} />
              {label}
              {active && (
                <span className="ml-auto w-1.5 h-1.5 bg-green-400 rounded-full" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">{getInitials(displayName)}</span>
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-semibold truncate">{displayName}</p>
            {ward && <p className="text-slate-500 text-xs">{ward} Ward</p>}
          </div>
        </div>
      </div>
    </aside>
  );
}
