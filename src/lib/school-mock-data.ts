import type { BriquetteProduct, BriquetteOrder } from './types';

export const mockProducts: BriquetteProduct[] = [
  {
    id: 'BR-50',
    name: '50 kg Sack',
    weightKg: 50,
    priceKES: 850,
    description:
      'Bulk supply for large kitchens. Approx. 3–4 week supply for a school cooking for 200+ learners. Save up to 45% vs. firewood.',
    inStock: true,
    stockBags: 47,
  },
  {
    id: 'BR-25',
    name: '25 kg Sack',
    weightKg: 25,
    priceKES: 450,
    description:
      'Our most popular size. Ideal for medium kitchens cooking up to 150 meals per day. Easy to handle and store.',
    inStock: true,
    stockBags: 83,
  },
  {
    id: 'BR-10',
    name: '10 kg Sack',
    weightKg: 10,
    priceKES: 200,
    description:
      'Starter pack. Try eco-briquettes for the first time or top-up mid-month. No minimum order.',
    inStock: true,
    stockBags: 120,
  },
];

export const mockOrders: BriquetteOrder[] = [
  {
    id: 'ORD-2026-0041',
    schoolName: 'Mwea Irrigation Boarding School',
    contactName: 'Joseph Kamau',
    phone: '0712345678',
    ward: 'Mwea East',
    deliveryAddress: 'Mwea Town, near Co-op Bank ATM',
    items: [
      {
        productId: 'BR-50',
        productName: '50 kg Sack',
        weightKg: 50,
        priceKES: 850,
        quantity: 4,
      },
      {
        productId: 'BR-25',
        productName: '25 kg Sack',
        weightKg: 25,
        priceKES: 450,
        quantity: 2,
      },
    ],
    totalKES: 4300,
    status: 'delivered',
    mpesaTransactionId: 'PJK7R2L5M9',
    placedAt: '2026-05-02T09:15:00Z',
    estimatedDelivery: '2026-05-05',
  },
  {
    id: 'ORD-2026-0042',
    schoolName: 'Kirinyaga Central Primary School',
    contactName: 'Mary Njoki',
    phone: '0723456789',
    ward: 'Kirinyaga Central',
    deliveryAddress: 'Kutus Town, opposite Total Petrol Station',
    items: [
      {
        productId: 'BR-50',
        productName: '50 kg Sack',
        weightKg: 50,
        priceKES: 850,
        quantity: 6,
      },
    ],
    totalKES: 5100,
    status: 'dispatched',
    mpesaTransactionId: 'QMN3T8V4X6',
    placedAt: '2026-05-13T14:30:00Z',
    estimatedDelivery: '2026-05-16',
  },
];
