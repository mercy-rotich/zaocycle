'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Package, Plus, X, ArrowDownToLine, Box } from 'lucide-react';
import {
  useStockQuery,
  useIntakesQuery,
  useBatchesQuery,
  useCollectedPickupsQuery,
  useRecordIntakeMutation,
  useRecordBatchMutation,
} from '@/features/dashboard/hooks/useDashInventory';
import {
  recordIntakeSchema,
  recordBatchSchema,
  type RecordIntakeInput,
  type RecordBatchInput,
} from '@/shared/utils/validators';
import { formatDate } from '@/shared/utils/formatters';

const INPUT = 'w-full px-3 py-2.5 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-green-500 transition-colors text-sm';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-slate-400">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function IntakeForm({ onDone }: { onDone: () => void }) {
  const { data: pickups = [], isLoading } = useCollectedPickupsQuery();
  const { data: intakes = [] } = useIntakesQuery();
  const { mutate: record, isPending } = useRecordIntakeMutation();

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<RecordIntakeInput>({
    resolver: zodResolver(recordIntakeSchema),
    defaultValues: { intakeDate: new Date().toISOString().slice(0, 10), totalKg: 0, pickupIds: [] },
  });

  function toggle(id: string, weightKg: number | null) {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    setSelectedIds(next);
    setValue('pickupIds', next, { shouldValidate: true });
    const total = pickups
      .filter((p) => next.includes(p.id) && p.weightKg != null)
      .reduce((s, p) => s + (p.weightKg ?? 0), 0);
    setValue('totalKg', Math.round(total * 100) / 100);
  }

  const onSubmit = handleSubmit((data) =>
    record(data, {
      onSuccess: () => {
        reset();
        setSelectedIds([]);
        onDone();
      },
    })
  );

  const alreadyIntaked = new Set(intakes.flatMap((i) => i.pickupIds));
  const available = pickups.filter((p) => !alreadyIntaked.has(p.id));

  return (
    <form onSubmit={onSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 mb-6">
      <h3 className="text-white font-semibold text-sm">Record Waste Intake</h3>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Intake Date" error={errors.intakeDate?.message}>
          <input type="date" {...register('intakeDate')} className={INPUT} />
        </Field>
        <Field label="Total Weight (kg)" error={errors.totalKg?.message}>
          <input type="number" step="0.01" {...register('totalKg', { valueAsNumber: true })} className={INPUT} />
        </Field>
      </div>

      <Field label="Select Collected Pickups" error={errors.pickupIds?.message}>
        {isLoading ? (
          <div className="h-24 bg-slate-800/50 rounded-lg animate-pulse" />
        ) : available.length === 0 ? (
          <p className="text-slate-500 text-xs py-3">No unprocessed collected pickups.</p>
        ) : (
          <div className="border border-slate-700 rounded-lg divide-y divide-slate-700/60 max-h-48 overflow-y-auto">
            {available.map((p) => (
              <label key={p.id} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/40 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedIds.includes(p.id)}
                  onChange={() => toggle(p.id, p.weightKg)}
                  className="accent-green-500"
                />
                <span className="text-slate-300 text-xs font-mono flex-1">…{p.id.slice(-8)}</span>
                <span className="text-slate-400 text-xs">{p.weightKg != null ? `${p.weightKg} kg` : '—'}</span>
                <span className="text-slate-500 text-xs">{p.scheduledFor ? formatDate(p.scheduledFor) : '—'}</span>
              </label>
            ))}
          </div>
        )}
      </Field>

      <Field label="Notes (optional)" error={undefined}>
        <input {...register('notes')} placeholder="e.g. Morning batch, Mwea ward" className={INPUT} />
      </Field>

      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onDone} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
        >
          {isPending ? 'Recording…' : 'Record Intake'}
        </button>
      </div>
    </form>
  );
}

function BatchForm({ intakes, onDone }: { intakes: import('@/types/api').WasteIntakeBatch[]; onDone: () => void }) {
  const { mutate: record, isPending } = useRecordBatchMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecordBatchInput>({
    resolver: zodResolver(recordBatchSchema),
    defaultValues: { producedAt: new Date().toISOString().slice(0, 16) },
  });

  const onSubmit = handleSubmit((data) =>
    record(
      { ...data, sourceIntakeId: data.sourceIntakeId || undefined },
      { onSuccess: () => { reset(); onDone(); } }
    )
  );

  return (
    <form onSubmit={onSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 mb-6">
      <h3 className="text-white font-semibold text-sm">Record Production Batch</h3>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Batch Number" error={errors.batchNumber?.message}>
          <input {...register('batchNumber')} placeholder="e.g. BRQ-2025-05-001" className={INPUT} />
        </Field>
        <Field label="Kg Produced" error={errors.kgProduced?.message}>
          <input type="number" step="0.01" {...register('kgProduced', { valueAsNumber: true })} className={INPUT} />
        </Field>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Produced At" error={errors.producedAt?.message}>
          <input type="datetime-local" {...register('producedAt')} className={INPUT} />
        </Field>
        <Field label="Source Intake (optional)" error={undefined}>
          <select {...register('sourceIntakeId')} className={INPUT}>
            <option value="">— none —</option>
            {intakes.map((i) => (
              <option key={i.id} value={i.id}>
                {formatDate(i.intakeDate)} · {i.totalKg} kg
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="flex gap-3 justify-end">
        <button type="button" onClick={onDone} className="px-4 py-2 text-sm text-slate-400 hover:text-white transition-colors">
          Cancel
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
        >
          {isPending ? 'Recording…' : 'Record Batch'}
        </button>
      </div>
    </form>
  );
}

export default function InventoryPage() {
  const { data: stock, isLoading: stockLoading } = useStockQuery();
  const { data: intakes = [], isLoading: intakesLoading } = useIntakesQuery();
  const { data: batches = [], isLoading: batchesLoading } = useBatchesQuery();

  const [showIntakeForm, setShowIntakeForm] = useState(false);
  const [showBatchForm, setShowBatchForm]   = useState(false);

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
          <Package className="w-5 h-5 text-green-400" />
        </div>
        <div>
          <h1 className="text-white text-xl font-bold leading-tight">Inventory</h1>
          <p className="text-slate-500 text-sm">Waste intake and briquette production</p>
        </div>
      </div>

      {/* Stock metric */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-8">
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-1">Available Stock</p>
        {stockLoading ? (
          <div className="h-10 w-32 bg-slate-800/50 rounded animate-pulse" />
        ) : (
          <p className="text-4xl font-extrabold text-white">
            {stock?.toFixed(1) ?? '—'} <span className="text-slate-500 text-xl font-semibold">kg</span>
          </p>
        )}
      </div>

      {/* ── Waste Intake ── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ArrowDownToLine className="w-4 h-4 text-slate-400" />
            <h2 className="text-white font-semibold">Waste Intake Batches</h2>
            <span className="text-slate-500 text-xs ml-1">{intakes.length} recorded</span>
          </div>
          {!showIntakeForm && (
            <button
              onClick={() => setShowIntakeForm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/15 hover:bg-green-600/25 text-green-400 text-xs font-semibold rounded-lg border border-green-600/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Record Intake
            </button>
          )}
        </div>

        {showIntakeForm && <IntakeForm onDone={() => setShowIntakeForm(false)} />}

        {intakesLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-slate-800/50 rounded-xl animate-pulse" />)}
          </div>
        ) : intakes.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <p className="text-slate-500 text-sm">No intake batches recorded yet.</p>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  {['Date', 'Total Weight', 'Pickups', 'Notes', 'Recorded'].map((h) => (
                    <th key={h} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {intakes.map((intake, i) => (
                  <tr key={intake.id} className={`hover:bg-slate-800/40 transition-colors ${i < intakes.length - 1 ? 'border-b border-slate-800/60' : ''}`}>
                    <td className="px-5 py-4 text-white text-sm font-medium">{formatDate(intake.intakeDate)}</td>
                    <td className="px-5 py-4 text-slate-300 text-sm">{intake.totalKg} kg</td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{intake.pickupIds.length} pickup{intake.pickupIds.length !== 1 ? 's' : ''}</td>
                    <td className="px-5 py-4 text-slate-500 text-sm">{intake.notes ?? '—'}</td>
                    <td className="px-5 py-4 text-slate-500 text-xs">{formatDate(intake.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ── Briquette Batches ── */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-slate-400" />
            <h2 className="text-white font-semibold">Briquette Batches</h2>
            <span className="text-slate-500 text-xs ml-1">{batches.length} recorded</span>
          </div>
          {!showBatchForm && (
            <button
              onClick={() => setShowBatchForm(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-600/15 hover:bg-green-600/25 text-green-400 text-xs font-semibold rounded-lg border border-green-600/20 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Record Batch
            </button>
          )}
        </div>

        {showBatchForm && <BatchForm intakes={intakes} onDone={() => setShowBatchForm(false)} />}

        {batchesLoading ? (
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => <div key={i} className="h-12 bg-slate-800/50 rounded-xl animate-pulse" />)}
          </div>
        ) : batches.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <p className="text-slate-500 text-sm">No production batches recorded yet.</p>
          </div>
        ) : (
          <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-800">
                  {['Batch #', 'Produced', 'Remaining', 'Produced At'].map((h) => (
                    <th key={h} className="text-left text-slate-500 text-xs font-semibold uppercase tracking-wider px-5 py-3.5 whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {batches.map((batch, i) => (
                  <tr key={batch.id} className={`hover:bg-slate-800/40 transition-colors ${i < batches.length - 1 ? 'border-b border-slate-800/60' : ''}`}>
                    <td className="px-5 py-4 text-white text-sm font-mono">{batch.batchNumber}</td>
                    <td className="px-5 py-4 text-slate-300 text-sm">{batch.kgProduced} kg</td>
                    <td className="px-5 py-4">
                      <span className={`text-sm font-medium ${batch.kgRemaining > 0 ? 'text-green-400' : 'text-slate-500'}`}>
                        {batch.kgRemaining} kg
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-sm">{formatDate(batch.producedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
