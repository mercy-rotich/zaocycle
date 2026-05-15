'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Search, QrCode } from 'lucide-react';

export default function VerifyInput() {
  const router = useRouter();
  const [code, setCode] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = code.trim().toUpperCase();
    if (trimmed.length > 0) {
      router.push(`/buyer/verify/${encodeURIComponent(trimmed)}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <QrCode className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g. ZC-BATCH-042-2026"
            autoComplete="off"
            autoCapitalize="characters"
            className="w-full bg-slate-800 border border-slate-700 focus:border-green-500 rounded-xl pl-10 pr-4 py-3 text-white text-sm placeholder:text-slate-500 focus:outline-none transition-colors font-mono"
          />
        </div>
        <button
          type="submit"
          disabled={code.trim().length === 0}
          className="bg-green-600 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white font-bold px-5 py-3 rounded-xl flex items-center gap-2 transition-colors shrink-0"
        >
          <Search className="w-4 h-4" />
          <span className="hidden sm:inline">Verify</span>
        </button>
      </div>
      <p className="text-slate-600 text-xs mt-2 text-center">
        Try: <button
          type="button"
          onClick={() => setCode('ZC-BATCH-042-2026')}
          className="text-green-500 hover:text-green-400 font-mono underline transition-colors"
        >
          ZC-BATCH-042-2026
        </button>
      </p>
    </form>
  );
}
