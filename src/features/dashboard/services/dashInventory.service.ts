import { apiClient } from '@/core/http/client';
import type { WasteIntakeBatch, BriquetteBatch, WastePickupResponse } from '@/types/api';
import type { RecordIntakeInput, RecordBatchInput } from '@/shared/utils/validators';

// Some endpoints return each item still wrapped in { success, data, message }.
// These helpers unwrap one level if the payload looks like an ApiResponse.
function unwrapItem<T>(item: unknown): T {
  if (item && typeof item === 'object' && 'success' in item && 'data' in item) {
    return (item as { data: T }).data;
  }
  return item as T;
}

function unwrapList<T>(payload: unknown): T[] {
  const arr: unknown[] = Array.isArray(payload)
    ? payload
    : (payload as { content?: unknown[] })?.content ?? [];
  return arr.map((item) => unwrapItem<T>(item));
}

export const dashInventoryService = {
  getStock: (): Promise<number> =>
    apiClient.get('/dashboard/inventory/stock').then((r) => r.data),

  listIntakes: (): Promise<WasteIntakeBatch[]> =>
    apiClient.get('/dashboard/inventory/intake').then((r) => unwrapList<WasteIntakeBatch>(r.data)),

  recordIntake: (data: RecordIntakeInput): Promise<WasteIntakeBatch> =>
    apiClient.post('/dashboard/inventory/intake', data).then((r) => unwrapItem<WasteIntakeBatch>(r.data)),

  listBatches: (): Promise<BriquetteBatch[]> =>
    apiClient.get('/dashboard/inventory/batches').then((r) => unwrapList<BriquetteBatch>(r.data)),

  recordBatch: (data: RecordBatchInput): Promise<BriquetteBatch> =>
    apiClient.post('/dashboard/inventory/batches', data).then((r) => unwrapItem<BriquetteBatch>(r.data)),

  listCollectedPickups: (): Promise<WastePickupResponse[]> =>
    apiClient
      .get('/dashboard/pickups', { params: { status: 'COLLECTED', size: 100 } })
      .then((r) => {
        const d = r.data;
        return Array.isArray(d) ? d : (d.content ?? []);
      }),
};
