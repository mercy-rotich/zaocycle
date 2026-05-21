'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Leaf, ShoppingBag, ClipboardList, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function BuyNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/buy', label: 'Products' },
    { href: '/buy/orders', label: 'My Orders' },
    { href: '/buy/profile', label: 'Profile' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-base">
              Zao<span className="text-green-400">Cycle</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6">
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium transition-colors ${
                  pathname === href
                    ? 'text-green-400'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/buy"
              className="hidden sm:flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-medium transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Order
            </Link>
            <Link
              href="/buy/orders"
              className="hidden sm:flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
            >
              <ClipboardList className="w-4 h-4" />
              Track Order
            </Link>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="sm:hidden w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-slate-950 px-4 py-3 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="block py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            href="/buy/orders"
            onClick={() => setMenuOpen(false)}
            className="block py-2.5 text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
          >
            Track Order
          </Link>
        </div>
      )}
    </nav>
  );
}
