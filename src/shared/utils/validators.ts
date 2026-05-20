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

export type LoginEmailInput = z.infer<typeof loginEmailSchema>;
export type LoginPhonePinInput = z.infer<typeof loginPhonePinSchema>;
export type LoginPhonePasswordInput = z.infer<typeof loginPhonePasswordSchema>;
export type RegisterBuyerInput = z.infer<typeof registerBuyerSchema>;
