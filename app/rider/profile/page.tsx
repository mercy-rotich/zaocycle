import { MapPin, CalendarDays, Phone, Bike, KeyRound, LogOut, HelpCircle, Download, ChevronRight } from 'lucide-react';
import type { ElementType } from 'react';
import { mockRider, mockRiderEarnings } from '@/lib/rider-mock-data';

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('');
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

interface ActionRowProps {
  icon: ElementType;
  label: string;
  sublabel?: string;
  danger?: boolean;
}

function ActionRow({ icon: Icon, label, sublabel, danger = false }: ActionRowProps) {
  return (
    <button className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-800/50 transition-colors">
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${danger ? 'bg-red-500/10' : 'bg-slate-800'}`}>
        <Icon className={`w-4 h-4 ${danger ? 'text-red-400' : 'text-slate-400'}`} />
      </div>
      <div className="flex-1 text-left">
        <p className={`text-sm font-medium ${danger ? 'text-red-400' : 'text-white'}`}>{label}</p>
        {sublabel && <p className="text-slate-500 text-xs mt-0.5">{sublabel}</p>}
      </div>
      <ChevronRight className={`w-4 h-4 shrink-0 ${danger ? 'text-red-400/40' : 'text-slate-600'}`} />
    </button>
  );
}

export default function RiderProfilePage() {
  const initials = getInitials(mockRider.name);
  const e = mockRiderEarnings;

  return (
    <div className="px-4 pt-6">
      {/* Avatar + identity */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-sky-500 to-blue-700 rounded-full flex items-center justify-center mb-3 ring-4 ring-sky-500/20 shadow-xl shadow-sky-500/20">
          <span className="text-white text-2xl font-extrabold tracking-tight">{initials}</span>
        </div>
        <h1 className="text-white text-xl font-bold">{mockRider.name}</h1>
        <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5" />
          {mockRider.phone}
        </p>
        <div className="flex items-center gap-1.5 mt-2.5 text-green-400 text-xs bg-green-400/10 border border-green-400/20 px-3 py-1 rounded-full">
          <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
          Active Rider · {mockRider.ward} Ward
        </div>
      </div>

      {/* Rider details */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 mb-4">
        <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Account Info</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: MapPin,       label: 'Ward',     value: mockRider.ward },
            { icon: Bike,        label: 'Vehicle',  value: mockRider.vehicleType },
            { icon: CalendarDays,label: 'Joined',   value: formatDate(mockRider.joinedDate) },
            { icon: Phone,       label: 'Phone',    value: mockRider.phone },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-slate-800/50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Icon className="w-3.5 h-3.5 text-slate-600" />
                <p className="text-slate-500 text-xs">{label}</p>
              </div>
              <p className="text-white text-sm font-semibold leading-snug">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Performance stats */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 mb-4">
        <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Performance</h2>
        <div className="flex gap-3">
          {[
            { label: 'Pickups',  value: String(e.completedPickups) },
            { label: 'Kg done',  value: `${e.totalWeightKg.toLocaleString()} kg` },
            { label: 'Earned',   value: `KES ${e.totalKES.toLocaleString()}` },
          ].map(({ label, value }) => (
            <div key={label} className="flex-1 bg-slate-800/50 rounded-xl p-2.5 text-center">
              <p className="text-green-400 text-sm font-extrabold tabular-nums leading-tight">{value}</p>
              <p className="text-slate-600 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Rider ID chip */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 px-4 py-3 mb-4 flex items-center justify-between">
        <span className="text-slate-500 text-xs">Rider ID</span>
        <span className="text-sky-400 text-xs font-mono tracking-widest">{mockRider.id}</span>
      </div>

      {/* Actions */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-6 divide-y divide-slate-800">
        <ActionRow icon={Download}   label="Install App"      sublabel="Add ZaoCycle Riders to your home screen" />
        <ActionRow icon={KeyRound}   label="Change Password"  sublabel="Update your account password" />
        <ActionRow icon={HelpCircle} label="Help & Support"   sublabel="Contact your coop manager" />
        <ActionRow icon={LogOut}     label="Log Out"          danger />
      </div>
    </div>
  );
}
