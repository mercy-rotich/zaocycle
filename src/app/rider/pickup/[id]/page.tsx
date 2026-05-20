import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PickupDetailClient from '@/features/rider/components/PickupDetailClient';
import { mockRiderPickups } from '@/lib/rider-mock-data';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function PickupDetailPage({ params }: Props) {
  const { id } = await params;
  const pickup = mockRiderPickups.find((p) => p.id === id);

  if (!pickup) notFound();

  const statusLabel = {
    pending:   'Unassigned',
    assigned:  'Your Pickup',
    collected: 'Collected',
    paid:      'Paid',
  }[pickup.status];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4 sticky top-0 bg-slate-950/95 backdrop-blur-sm z-30 border-b border-slate-800/60">
        <Link
          href="/rider/pickups"
          className="w-9 h-9 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center transition-colors shrink-0"
        >
          <ArrowLeft className="w-5 h-5 text-slate-300" />
        </Link>
        <div className="min-w-0">
          <h1 className="text-white font-bold text-base leading-tight truncate">
            {pickup.farmerName}
          </h1>
          <p className="text-slate-500 text-xs">
            {statusLabel} · <span className="font-mono">{pickup.id}</span>
          </p>
        </div>
      </div>

      <PickupDetailClient pickup={pickup} />
    </div>
  );
}
