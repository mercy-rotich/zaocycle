'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PickupDetailClient from '@/features/rider/components/PickupDetailClient';
import { useRiderPickupQuery } from '@/features/rider/hooks/useRiderPickups';

interface Props {
  params: Promise<{ id: string }>;
}

const STATUS_LABEL: Record<string, string> = {
  REQUESTED: 'Unassigned',
  ASSIGNED:  'Your Pickup',
  COLLECTED: 'Collected',
  PAID:      'Paid',
  CANCELLED: 'Cancelled',
  FAILED:    'Failed',
};

export default function PickupDetailPage({ params }: Props) {
  const { id } = use(params);
  const { data: pickup, isLoading, isError } = useRiderPickupQuery(id);

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
          <h1 className="text-white font-bold text-base leading-tight">
            {pickup ? `Pickup #${pickup.id.slice(-6).toUpperCase()}` : 'Pickup Detail'}
          </h1>
          {pickup && (
            <p className="text-slate-500 text-xs">
              {STATUS_LABEL[pickup.status] ?? pickup.status}
            </p>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="px-4 pt-6 space-y-4">
          <div className="h-48 bg-slate-800/50 rounded-2xl animate-pulse" />
          <div className="h-32 bg-slate-800/50 rounded-2xl animate-pulse" />
        </div>
      )}

      {isError && (
        <div className="px-4 pt-12 text-center">
          <p className="text-red-400 text-sm mb-3">Pickup not found or failed to load.</p>
          <Link href="/rider/pickups" className="text-green-400 hover:text-green-300 text-sm underline">
            Back to pickups
          </Link>
        </div>
      )}

      {pickup && <PickupDetailClient pickup={pickup} />}
    </div>
  );
}
