import { Leaf, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/shared/components/Navbar';
import SafetyBadge from '@/features/certificates/components/SafetyBadge';
import FarmDetails from '@/features/certificates/components/FarmDetails';
import ChemicalTimeline from '@/features/certificates/components/ChemicalTimeline';
import { mockFarmRecord } from '@/lib/mock-data';

export default function ScanResultPage() {
  const record = mockFarmRecord;

  return (
    <div className="min-h-screen bg-slate-950">
      <Navbar />

      <main className="max-w-lg mx-auto px-4 pt-24 pb-16">

        {/* Page header */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Leaf className="w-4 h-4 text-green-400" />
            <span className="text-green-400 text-xs font-semibold uppercase tracking-widest">
              ZaoCycle Food Verification
            </span>
          </div>
          <p className="text-slate-500 text-xs text-center">
            Scan result for batch scanned at retail point of sale
          </p>
        </div>

        {/* Content stack */}
        <div className="space-y-4">
          <SafetyBadge record={record} />
          <FarmDetails record={record} />
          <ChemicalTimeline record={record} />
        </div>

        {/* Footer note */}
        <div className="mt-8 text-center space-y-1">
          <p className="text-slate-600 text-xs">
            Verified by ZaoCycle Digital Platform · Kirinyaga County, Kenya
          </p>
          <p className="text-slate-700 text-xs font-mono">
            Certificate issued: {new Date(record.certifiedAt).toLocaleString('en-KE')}
          </p>
        </div>

        {/* Back link */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-500 hover:text-green-400 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to ZaoCycle Home
          </Link>
        </div>

      </main>
    </div>
  );
}
