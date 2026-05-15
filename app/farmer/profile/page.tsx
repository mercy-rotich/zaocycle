import { MapPin, Ruler, Sprout, CalendarDays, Phone, KeyRound, LogOut, HelpCircle, ChevronRight } from 'lucide-react';
import { mockFarmer } from '@/lib/farmer-mock-data';

function formatJoinDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('');
}

interface ActionRowProps {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  danger?: boolean;
}

function ActionRow({ icon: Icon, label, sublabel, danger = false }: ActionRowProps) {
  return (
    <button className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-800/50 transition-colors ${danger ? 'text-red-400' : 'text-white'}`}>
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
        danger ? 'bg-red-500/10' : 'bg-slate-800'
      }`}>
        <Icon className={`w-4 h-4 ${danger ? 'text-red-400' : 'text-slate-400'}`} />
      </div>
      <div className="flex-1 text-left">
        <p className={`text-sm font-medium ${danger ? 'text-red-400' : 'text-white'}`}>{label}</p>
        {sublabel && <p className="text-slate-500 text-xs mt-0.5">{sublabel}</p>}
      </div>
      <ChevronRight className={`w-4 h-4 shrink-0 ${danger ? 'text-red-400/50' : 'text-slate-600'}`} />
    </button>
  );
}

export default function ProfilePage() {
  const initials = getInitials(mockFarmer.name);

  return (
    <div className="px-4 pt-6">
      {/* Avatar + name */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center mb-3 ring-4 ring-green-500/20">
          <span className="text-white text-2xl font-extrabold tracking-tight">{initials}</span>
        </div>
        <h1 className="text-white text-xl font-bold">{mockFarmer.name}</h1>
        <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5" />
          {mockFarmer.phone}
        </p>
      </div>

      {/* Farm details card */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 mb-4">
        <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Farm Details</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: MapPin,      label: 'Ward',       value: mockFarmer.ward },
            { icon: Ruler,       label: 'Farm Size',  value: `${mockFarmer.farmSizeAcres} acres` },
            { icon: CalendarDays,label: 'Joined',     value: formatJoinDate(mockFarmer.joinedDate) },
            { icon: Sprout,      label: 'Crops',      value: mockFarmer.crops.join(', ') },
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

      {/* Farmer ID */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 px-4 py-3 mb-4 flex items-center justify-between">
        <span className="text-slate-500 text-xs">Farmer ID</span>
        <span className="text-green-400 text-xs font-mono tracking-widest">{mockFarmer.id}</span>
      </div>

      {/* Account actions */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-6 divide-y divide-slate-800">
        <ActionRow icon={KeyRound}   label="Change PIN"       sublabel="Update your 4-digit login PIN" />
        <ActionRow icon={HelpCircle} label="Help &amp; Support" sublabel="Contact your coop manager" />
        <ActionRow icon={LogOut}     label="Log Out"          danger />
      </div>
    </div>
  );
}
