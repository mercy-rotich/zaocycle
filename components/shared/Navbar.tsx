'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Leaf, LayoutDashboard, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#impact', label: 'Impact' },
  { href: '/buyer', label: 'Verify Food' },
  { href: '/buy', label: 'Order Briquettes' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-white font-bold text-xl tracking-tight">
              Zao<span className="text-green-400">Cycle</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-slate-300 hover:text-white text-sm transition-colors"
              >
                {label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 py-3 space-y-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-2.5 text-sm font-semibold text-green-400 hover:text-green-300 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
