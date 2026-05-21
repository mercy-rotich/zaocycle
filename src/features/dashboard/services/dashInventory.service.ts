import { apiClient } from '@/core/http/client';
import type { WasteIntakeBatch, BriquetteBatch, WastePickupResponse } from '@/types/api';
import type { RecordIntakeInput, RecordBatchInput } from '@/shared/utils/validators';

export const dashInventoryService = {
  getStock: (): Promise<number> =>
    apiClient.get('/dashboard/inventory/stock').then((r) => r.data),

  listIntakes: (): Promise<WasteIntakeBatch[]> =>
    apiClient.get('/dashboard/inventory/intake').then((r) => r.data),

  recordIntake: (data: RecordIntakeInput): Promise<WasteIntakeBatch> =>
    apiClient.post('/dashboard/inventory/intake', data).then((r) => r.data),

  listBatches: (): Promise<BriquetteBatch[]> =>
    apiClient.get('/dashboard/inventory/batches').then((r) => r.data),

  recordBatch: (data: RecordBatchInput): Promise<BriquetteBatch> =>
    apiClient.post('/dashboard/inventory/batches', data).then((r) => r.data),

  listCollectedPickups: (): Promise<WastePickupResponse[]> =>
    apiClient
      .get('/dashboard/pickups', { params: { status: 'COLLECTED', size: 100 } })
      .then((r) => {
        const d = r.data;
        return Array.isArray(d) ? d : (d.content ?? []);
      }),
};
