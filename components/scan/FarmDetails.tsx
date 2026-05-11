import { MapPin, Sprout, Calendar, Clock, User, Hash } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { FarmRecord } from '@/lib/types';

interface Props {
  record: FarmRecord;
}

interface DetailRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

function DetailRow({ icon: Icon, label, value }: DetailRowProps) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-slate-800 last:border-0">
      <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-green-400" />
      </div>
      <div className="min-w-0">
        <p className="text-slate-500 text-xs uppercase tracking-wider mb-0.5">{label}</p>
        <p className="text-white text-sm font-medium leading-snug">{value}</p>
      </div>
    </div>
  );
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function FarmDetails({ record }: Props) {
  return (
    <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
      <h2 className="text-white font-bold text-lg mb-2">Farm &amp; Crop Details</h2>
      <p className="text-slate-500 text-xs mb-5">
        Verified data logged by the certified farmer via ZaoCycle USSD platform.
      </p>

      <DetailRow icon={Hash}     label="Batch Code"           value={record.batchCode} />
      <DetailRow icon={User}     label="Certified Farmer"     value={record.farmerName} />
      <DetailRow icon={MapPin}   label="Farm Location"        value={record.farmLocation} />
      <DetailRow icon={Sprout}   label="Crop Type"            value={record.cropType} />
      <DetailRow icon={Calendar} label="Last Spray Date"      value={formatDate(record.lastSprayDate)} />
      <DetailRow
        icon={Clock}
        label="Pre-Harvest Interval"
        value={`${record.preHarvestIntervalDays} days · ${record.chemical}`}
      />
      <DetailRow icon={Calendar} label="Safe Harvest Date"    value={formatDate(record.safeHarvestDate)} />
      <DetailRow icon={Calendar} label="Actual Harvest Date"  value={formatDate(record.harvestDate)} />
    </div>
  );
}
