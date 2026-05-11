export interface FarmRecord {
  id: string;
  batchCode: string;
  farmerName: string;
  farmLocation: string;
  ward: string;
  cropType: string;
  lastSprayDate: string;
  chemical: string;
  preHarvestIntervalDays: number;
  safeHarvestDate: string;
  harvestDate: string;
  certifiedAt: string;
  status: 'safe' | 'pending' | 'flagged';
}

export interface WasteCollectionLog {
  id: string;
  farmerName: string;
  ward: string;
  wasteType: string;
  weightKg: number;
  collectionDate: string;
  riderName: string;
  mpesaAmountKES: number;
  status: 'completed' | 'in-transit' | 'pending';
}

export interface DashboardMetrics {
  activeFarmers: number;
  biomassCollectedKg: number;
  ecoBriquettesProduced: number;
  totalMpesaPayoutsKES: number;
}
