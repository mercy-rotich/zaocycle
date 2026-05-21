import { z } from 'zod';

export const loginEmailSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export const loginPhonePinSchema = z.object({
  phone: z.string().min(10, 'Enter a valid phone number'),
  pin: z.string().min(4, 'PIN must be at least 4 digits').max(6),
});

export const loginPhonePasswordSchema = z.object({
  phone: z.string().min(10, 'Enter a valid phone number'),
  password: z.string().min(1, 'Password is required'),
});

export const registerBuyerSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  buyerType: z.enum(['SCHOOL', 'INDIVIDUAL', 'INSTITUTION', 'BUSINESS']),
  displayName: z.string().min(1, 'Display name is required'),
  contactPerson: z.string().optional(),
  address: z.string().optional(),
  ward: z.string().optional(),
});

export const placeOrderSchema = z.object({
  productId: z.string().min(1),
  quantity: z.number().int().min(1, 'Quantity must be at least 1'),
  deliveryAddress: z.string().min(1, 'Delivery address is required'),
  deliveryPhone: z.string().min(10, 'Enter a valid phone number'),
  requestedDelivery: z.string().optional(),
  notes: z.string().optional(),
});

export const createStaffSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['COOP_MANAGER', 'ADMIN']),
});

export const createRiderSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  phone: z.string().min(10, 'Enter a valid phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  ward: z.enum(['MWEA', 'GICHUGU', 'KIRINYAGA_CENTRAL', 'NDIA']),
});

export const updateBuyerSchema = z.object({
  displayName: z.string().min(1, 'Display name is required'),
  contactPerson: z.string().optional(),
  address: z.string().optional(),
  ward: z.string().optional(),
});

export const recordIntakeSchema = z.object({
  intakeDate: z.string().min(1, 'Date is required'),
  totalKg: z.number().positive('Enter a positive weight'),
  pickupIds: z.array(z.string()).min(1, 'Select at least one pickup'),
  notes: z.string().optional(),
});

export const recordBatchSchema = z.object({
  batchNumber: z.string().min(1, 'Batch number is required'),
  kgProduced: z.number().positive('Enter a positive weight'),
  producedAt: z.string().min(1, 'Production date is required'),
  sourceIntakeId: z.string().optional(),
});

export type RecordIntakeInput = z.infer<typeof recordIntakeSchema>;
export type RecordBatchInput  = z.infer<typeof recordBatchSchema>;

export type CreateStaffInput = z.infer<typeof createStaffSchema>;
export type CreateRiderInput = z.infer<typeof createRiderSchema>;
export type LoginEmailInput = z.infer<typeof loginEmailSchema>;
export type LoginPhonePinInput = z.infer<typeof loginPhonePinSchema>;
export type LoginPhonePasswordInput = z.infer<typeof loginPhonePasswordSchema>;
export type RegisterBuyerInput = z.infer<typeof registerBuyerSchema>;
export type PlaceOrderInput = z.infer<typeof placeOrderSchema>;
export type UpdateBuyerInput = z.infer<typeof updateBuyerSchema>;
