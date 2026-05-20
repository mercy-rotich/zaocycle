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

export interface FarmerProfile {
  id: string;
  name: string;
  phone: string;
  ward: string;
  farmSizeAcres: number;
  crops: string[];
  joinedDate: string;
}

export interface PesticideApplication {
  id: string;
  cropType: string;
  plotName: string;
  chemical: string;
  sprayedDate: string;
  phiDays: number;
  safeHarvestDate: string;
  status: 'pending' | 'safe' | 'expired';
  batchCode?: string;
}

export interface FarmerPickup {
  id: string;
  scheduledDate: string;
  collectedDate?: string;
  wasteType: string;
  estimatedWeightKg: number;
  actualWeightKg?: number;
  amountKES?: number;
  mpesaTransactionId?: string;
  riderName: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface EarningsSummary {
  thisMonthKES: number;
  lastMonthKES: number;
  totalEarnedKES: number;
  lastPaymentDate: string;
  lastPaymentKES: number;
}

export interface RiderProfile {
  id: string;
  name: string;
  phone: string;
  ward: string;
  vehicleType: string;
  joinedDate: string;
}

export type RiderPickupStatus = 'pending' | 'assigned' | 'collected' | 'paid';

export interface RiderPickupTask {
  id: string;
  farmerName: string;
  farmerPhone: string;
  farmLocation: string;
  ward: string;
  wasteType: string;
  estimatedWeightKg: number;
  actualWeightKg?: number;
  scheduledTime: string;
  scheduledDate: string;
  distanceKm: number;
  status: RiderPickupStatus;
  payoutRateKES: number;
  actualPayoutKES?: number;
  notes?: string;
  collectedAt?: string;
  mpesaTransactionId?: string;
}

export interface RiderEarningsSummary {
  todayKES: number;
  thisWeekKES: number;
  thisMonthKES: number;
  totalKES: number;
  completedPickups: number;
  totalWeightKg: number;
  dailyEarnings: { day: string; amountKES: number }[];
}

export interface BriquetteProduct {
  id: string;
  name: string;
  weightKg: number;
  priceKES: number;
  description: string;
  inStock: boolean;
  stockBags: number;
}

export type OrderStatus =
  | 'pending_payment'
  | 'confirmed'
  | 'processing'
  | 'dispatched'
  | 'delivered';

export interface BriquetteOrderItem {
  productId: string;
  productName: string;
  weightKg: number;
  priceKES: number;
  quantity: number;
}

export interface BriquetteOrder {
  id: string;
  schoolName: string;
  contactName: string;
  phone: string;
  ward: string;
  deliveryAddress: string;
  items: BriquetteOrderItem[];
  totalKES: number;
  status: OrderStatus;
  mpesaTransactionId?: string;
  placedAt: string;
  estimatedDelivery?: string;
}
