import { FlaskConical } from 'lucide-react';
import ApplicationsClient from '@/components/farmer/ApplicationsClient';
import { mockApplications } from '@/lib/farmer-mock-data';

export default function ApplicationsPage() {
  return (
    <div className="px-4 pt-6">
      {/* Page header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
          <FlaskConical className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h1 className="text-white font-bold text-lg leading-tight">Spray Applications</h1>
          <p className="text-slate-500 text-xs mt-0.5">Your pesticide log &amp; PHI tracking</p>
        </div>
      </div>

      {/* Info note */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 mb-5">
        <p className="text-slate-400 text-xs leading-relaxed">
          Applications are logged automatically when you dial USSD. The status updates every day as the Pre-Harvest Interval counts down.
        </p>
      </div>

      {/* Filterable list — client component */}
      <ApplicationsClient applications={mockApplications} />
    </div>
  );
}
