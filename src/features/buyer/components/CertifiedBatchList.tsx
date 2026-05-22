import Link from 'next/link';
import CertifiedCard from './CertifiedCard';
import type { FarmRecord } from '@/lib/types';

const INITIAL_SHOW = 3;

interface Props {
  records: FarmRecord[];
  variant: 'desktop' | 'mobile';
}

export function CertifiedBatchList({ records, variant }: Props) {
  const visible = records.slice(0, INITIAL_SHOW);
  const hidden = records.length - INITIAL_SHOW;

  const showMoreButton = hidden > 0 && (
    <Link
      href="/buyer/batches"
      className={
        variant === 'desktop'
          ? 'block w-full py-2.5 text-sm font-semibold text-center text-green-400 bg-slate-800/40 hover:bg-slate-800 transition-colors rounded-xl'
          : 'block w-full py-3 text-sm font-semibold text-center text-green-400 bg-slate-900 border border-slate-800 rounded-2xl hover:bg-slate-800 transition-colors'
      }
    >
      View all {records.length} batches →
    </Link>
  );

  if (variant === 'desktop') {
    return (
      <>
        <div className="divide-y divide-slate-800/60">
          {visible.map((record) => (
            <div key={record.id} className="px-4 py-3">
              <CertifiedCard record={record} />
            </div>
          ))}
        </div>
        {hidden > 0 && (
          <div className="px-4 py-3 border-t border-slate-800/60">
            {showMoreButton}
          </div>
        )}
      </>
    );
  }

  return (
    <div className="space-y-2">
      {visible.map((record) => (
        <CertifiedCard key={record.id} record={record} />
      ))}
      {showMoreButton}
    </div>
  );
}
