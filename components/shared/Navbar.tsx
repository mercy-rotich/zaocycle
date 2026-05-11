import Link from 'next/link';
import { Leaf, LayoutDashboard, ScanLine, Menu } from 'lucide-react';

const navLinks = [
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#impact', label: 'Impact' },
];

export default function Navbar() {
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
              href="/scan/demo"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white text-sm transition-colors"
            >
              <ScanLine className="w-4 h-4" />
              Verify Food
            </Link>

            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </div>

          <button className="md:hidden text-slate-300 hover:text-white transition-colors">
            <Menu className="w-6 h-6" />
          </button>

        </div>
      </div>
    </nav>
  );
}
