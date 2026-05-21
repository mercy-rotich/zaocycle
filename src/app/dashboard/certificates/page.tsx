'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Search } from 'lucide-react';

export default function CertificatesPage() {
  const [id, setId] = useState('');
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = id.trim();
    if (trimmed) router.push(`/dashboard/certificates/${trimmed}`);
  }

  return (
    <div className="px-6 py-8 max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
          <ShieldCheck className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold leading-tight">Certificates</h1>
          <p className="text-slate-500 text-sm">Look up a produce safety certificate</p>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <p className="text-slate-400 text-sm mb-5">
          Enter the certificate UUID to view details or revoke it.
        </p>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="e.g. c3d4e5f6-…"
            className="flex-1 px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors text-sm font-mono"
          />
          <button
            type="submit"
            disabled={!id.trim()}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Search className="w-4 h-4" /> Look Up
          </button>
        </form>
      </div>
    </div>
  );
}
