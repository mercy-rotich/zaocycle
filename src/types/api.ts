export type Role = 'BUYER' | 'COOP_MANAGER' | 'ADMIN' | 'FARMER' | 'RIDER';

export type BuyerType = 'SCHOOL' | 'INDIVIDUAL' | 'INSTITUTION' | 'BUSINESS';

export type Ward = 'MWEA' | 'GICHUGU' | 'KIRINYAGA_CENTRAL' | 'NDIA';

export type PickupStatus = 'REQUESTED' | 'ASSIGNED' | 'COLLECTED' | 'PAID' | 'CANCELLED' | 'FAILED';

export type OrderStatus =
  | 'PENDING_PAYMENT'
  | 'PAID'
  | 'READY_FOR_DELIVERY'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED';

export type CertificateStatus = 'ACTIVE' | 'EXPIRED' | 'REVOKED';

export type ApplicationStatus = 'PENDING' | 'SAFE' | 'EXPIRED' | 'INVALIDATED';

export type ChemicalCategory = 'FUNGICIDE' | 'INSECTICIDE' | 'HERBICIDE' | 'OTHER';

export interface UserSummary {
  id: string;
  role: Role;
  displayName: string;
}

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserSummary;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string | null;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface BuyerProfileResponse {
  id: string;
  email: string;
  phone: string;
  buyerType: BuyerType;
  displayName: string;
  contactPerson: string | null;
  address: string | null;
  ward: Ward | null;
}

export interface ProductResponse {
  id: string;
  sku: string;
  name: string;
  description: string;
  weightKg: number;
  unitPrice: number;
  imageUrl: string | null;
  sortOrder: number;
}

export interface OrderResponse {
  id: string;
  buyerId: string;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalKg: number;
  totalAmount: number;
  deliveryAddress: string;
  deliveryPhone: string;
  requestedDelivery: string | null;
  deliveredAt: string | null;
  status: OrderStatus;
  mpesaTransactionId: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WastePickupResponse {
  id: string;
  farmerId: string;
  riderId: string | null;
  applicationId: string | null;
  requestedAt: string;
  scheduledFor: string | null;
  status: PickupStatus;
  weightKg: number | null;
  photoUrl: string | null;
  notes: string | null;
  payoutAmount: number | null;
  collectedAt: string | null;
  paidAt: string | null;
  createdAt: string;
}

export interface FarmerEarningsResponse {
  total: number;
  thisMonth: number;
  pickupCount: number;
  recentPayouts: { amount: number; date: string }[];
}

export interface FarmerResponse {
  id: string;
  phone: string;
  fullName: string;
  ward: string;
  registrationComplete: boolean;
}

export interface PesticideApplicationResponse {
  id: string;
  farmerId: string;
  chemicalId: string;
  crop: string;
  quantityMl: number;
  safeHarvestDate: string;
  status: ApplicationStatus;
}

export interface ChemicalResponse {
  id: string;
  name: string;
  activeIngredient: string;
  category: ChemicalCategory;
  halfLifeDays: number;
  phiDays: number;
  commonCrops: string;
}

export interface CertificateResponse {
  id: string;
  applicationId: string;
  token: string;
  qrImageUrl: string | null;
  status: CertificateStatus;
  issuedAt: string;
  expiresAt: string;
  verifiedCount: number;
}

export interface PublicCertificateResponse {
  token: string;
  status: CertificateStatus;
  issuedAt: string;
  expiresAt: string;
  verifiedCount: number;
  crop: string;
  chemicalName: string;
  farmerName: string;
  ward: string;
}

export interface ProfileImageResponse {
  imageUrl: string;
}

export interface StaffResponse {
  id: string;
  email: string;
  fullName: string;
  role: 'COOP_MANAGER' | 'ADMIN';
  active: boolean;
  profileImageUrl: string | null;
  createdAt: string;
}

export interface RiderResponse {
  id: string;
  phone: string;
  fullName: string;
  ward: Ward;
  active: boolean;
}

export interface WasteIntakeBatch {
  id: string;
  intakeDate: string;
  totalKg: number;
  pickupIds: string[];
  notes: string | null;
  recordedBy: string;
  createdAt: string;
}

export interface RiderEarningsResponse {
  total: number;
  thisMonth: number;
  thisWeek: number;
  today: number;
  pickupCount: number;
  totalWeightKg: number;
}

export interface BriquetteBatch {
  id: string;
  batchNumber: string;
  kgProduced: number;
  kgRemaining: number;
  producedAt: string;
  sourceIntakeId: string | null;
  createdAt: string;
}
