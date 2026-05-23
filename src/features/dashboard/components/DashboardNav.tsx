'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Truck, ShoppingBag, Package, ShieldCheck, Leaf, LogOut, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

const NAV = [
  { href: '/dashboard',              label: 'Overview',     icon: LayoutDashboard },
  { href: '/dashboard/pickups',      label: 'Pickups',      icon: Truck },
  { href: '/dashboard/orders',       label: 'Orders',       icon: ShoppingBag },
  { href: '/dashboard/inventory',    label: 'Inventory',    icon: Package },
  { href: '/dashboard/certificates', label: 'Certificates', icon: ShieldCheck },
];

export default function DashboardNav() {
  const pathname = usePathname();
  const { logout, user } = useAuthStore();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  function handleLogout() {
    logout();
    document.cookie = 'zao-role=; Max-Age=0; path=/';
    router.push('/login');
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-14 flex items-center gap-3 px-4 bg-slate-900 border-b border-slate-800 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-600 rounded-md flex items-center justify-center shrink-0">
            <Leaf className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-white text-sm font-bold">Zao<span className="text-green-400">Cycle</span></span>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation sidebar */}
      <aside className={`fixed lg:sticky top-14 lg:top-0 left-0 h-[calc(100vh-3.5rem)] lg:h-auto flex flex-col w-56 shrink-0 bg-slate-900 border-r border-slate-800 lg:min-h-screen z-40 transition-transform duration-200 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
          <Leaf className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-bold">Zao<span className="text-green-400">Cycle</span></span>
      </Link>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = href === '/dashboard' ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                active
                  ? 'bg-green-600/15 text-green-400 border border-green-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* User + logout */}
      <div className="px-3 py-4 border-t border-slate-800 space-y-1">
        {user && (
          <div className="px-3 py-2 mb-1">
            <p className="text-white text-xs font-semibold truncate">{user.displayName}</p>
            <p className="text-slate-500 text-xs capitalize">{user.role.toLowerCase().replace('_', ' ')}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Log Out
        </button>
      </div>
      </aside>
    </>
  );
}
