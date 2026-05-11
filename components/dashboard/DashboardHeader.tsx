import { LayoutDashboard, Download, RefreshCw, MapPin } from 'lucide-react';

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString('en-KE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-white text-xl font-bold leading-tight">Cooperative Dashboard</h1>
            <p className="text-slate-500 text-sm">{today}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0" />
            <span className="text-slate-300 text-sm">Live Data</span>
          </div>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm px-3 py-2 rounded-lg transition-colors">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

      </div>

      <div className="flex items-center gap-2 text-slate-500 text-sm">
        <MapPin className="w-3.5 h-3.5 text-green-500 shrink-0" />
        <span>Kirinyaga County — Mwea · Gichugu · Kirinyaga Central · Ndia</span>
      </div>
    </div>
  );
}
