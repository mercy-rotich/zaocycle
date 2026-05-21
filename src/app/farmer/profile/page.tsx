'use client';

import { MapPin, Phone, KeyRound, LogOut, HelpCircle, ChevronRight, Loader2 } from 'lucide-react';
import { useFarmerProfileQuery } from '@/features/farmer/hooks/useFarmer';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

function getInitials(name: string) {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('');
}

interface ActionRowProps {
  icon: React.ElementType;
  label: string;
  sublabel?: string;
  danger?: boolean;
  onClick?: () => void;
}

function ActionRow({ icon: Icon, label, sublabel, danger = false, onClick }: ActionRowProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 hover:bg-slate-800/50 transition-colors ${danger ? 'text-red-400' : 'text-white'}`}
    >
      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${danger ? 'bg-red-500/10' : 'bg-slate-800'}`}>
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

export default function FarmerProfilePage() {
  const { data: profile, isLoading } = useFarmerProfileQuery();
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const displayName = profile?.fullName ?? user?.displayName ?? 'Farmer';
  const initials = getInitials(displayName);

  function handleLogout() {
    logout();
    document.cookie = 'zao-role=; Max-Age=0; path=/';
    router.push('/login');
  }

  return (
    <div className="px-4 pt-6">
      {/* Avatar + name */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center mb-3 ring-4 ring-green-500/20">
          {isLoading ? (
            <Loader2 className="w-6 h-6 text-white animate-spin" />
          ) : (
            <span className="text-white text-2xl font-extrabold tracking-tight">{initials}</span>
          )}
        </div>
        <h1 className="text-white text-xl font-bold">{displayName}</h1>
        {profile && (
          <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            {profile.phone}
          </p>
        )}
      </div>

      {/* Farm details card */}
      {profile && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 mb-4">
          <h2 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">Account Details</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">Ward</p>
                <p className="text-white text-sm font-semibold">{profile.ward}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <div>
                <p className="text-slate-500 text-xs">Phone</p>
                <p className="text-white text-sm font-semibold">{profile.phone}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Farmer ID */}
      {profile && (
        <div className="bg-slate-900 rounded-2xl border border-slate-800 px-4 py-3 mb-4 flex items-center justify-between">
          <span className="text-slate-500 text-xs">Farmer ID</span>
          <span className="text-green-400 text-xs font-mono tracking-widest">{profile.id.slice(-12).toUpperCase()}</span>
        </div>
      )}

      {/* Account actions */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden mb-6 divide-y divide-slate-800">
        <ActionRow icon={KeyRound}   label="Change PIN"        sublabel="Update your 4-digit login PIN" />
        <ActionRow icon={HelpCircle} label="Help &amp; Support" sublabel="Contact your coop manager" />
        <ActionRow icon={LogOut}     label="Log Out"           danger onClick={handleLogout} />
      </div>
    </div>
  );
}
