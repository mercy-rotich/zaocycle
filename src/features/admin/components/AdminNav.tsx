'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Leaf, Users, Bike, LogOut, ShieldCheck, Menu, X } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useState, useEffect } from 'react';

const NAV = [
  { href: '/admin/staff',  label: 'Staff',  icon: Users },
  { href: '/admin/riders', label: 'Riders', icon: Bike },
];

export default function AdminNav() {
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
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen lg:h-auto flex flex-col w-56 shrink-0 bg-slate-900 border-r border-slate-800 min-h-screen z-40 transition-transform duration-200 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-slate-800">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center shrink-0">
          <Leaf className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-bold">Zao<span className="text-green-400">Cycle</span></span>
      </div>

      {/* Admin badge */}
      <div className="px-5 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 bg-amber-400/10 border border-amber-400/20 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          Admin Panel
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
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
            <p className="text-slate-500 text-xs">Administrator</p>
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
