'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FlaskConical, Package, User } from 'lucide-react';

const tabs = [
  { href: '/farmer/dashboard', icon: LayoutDashboard, label: 'Home' },
  { href: '/farmer/applications', icon: FlaskConical, label: 'Sprays' },
  { href: '/farmer/pickups', icon: Package, label: 'Pickups' },
  { href: '/farmer/profile', icon: User, label: 'Profile' },
];

export default function FarmerBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-t border-slate-800">
      <div className="max-w-md mx-auto px-2">
        <div className="flex items-stretch h-16">
          {tabs.map(({ href, icon: Icon, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`flex-1 flex flex-col items-center justify-center gap-1 transition-colors ${
                  active ? 'text-green-400' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" strokeWidth={active ? 2.5 : 1.75} />
                  {active && (
                    <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-400 rounded-full" />
                  )}
                </div>
                <span className="text-[10px] font-semibold tracking-wide">{label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
