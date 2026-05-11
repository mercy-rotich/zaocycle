import Link from 'next/link';
import { Leaf } from 'lucide-react';

const platformLinks = ['How It Works', 'Verify Food Safety', 'Farmer Portal', 'Dashboard'];
const wards = ['Mwea Ward', 'Gichugu Ward', 'Kirinyaga Central', 'Ndia Ward'];

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">
                Zao<span className="text-green-400">Cycle</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              A digital circular economy orchestrator eliminating agrochemical health risks and deforestation across Kirinyaga County, Kenya.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2">
              {platformLinks.map((item) => (
                <li key={item}>
                  <span className="text-slate-400 hover:text-green-400 text-sm cursor-pointer transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Target Wards</h4>
            <ul className="space-y-2">
              {wards.map((ward) => (
                <li key={ward}>
                  <span className="text-slate-400 text-sm">{ward}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2026 ZaoCycle · Kirinyaga Youth Summit Innovation Pitch
          </p>
          <p className="text-slate-500 text-sm">Built for Kenya&apos;s smallholder farmers.</p>
        </div>
      </div>
    </footer>
  );
}
