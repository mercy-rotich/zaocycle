import { format, parseISO } from 'date-fns';

export const formatKES = (amount: number) =>
  `KES ${amount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`;

export const formatKg = (kg: number) => `${kg.toFixed(2)} kg`;

export const formatDate = (iso: string) => format(parseISO(iso), 'dd MMM yyyy');

export const formatDateTime = (iso: string) =>
  format(parseISO(iso), 'dd MMM yyyy, HH:mm');
