'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ordersService } from '@/features/buyer/services/orders.service';
import type { PlaceOrderInput } from '@/shared/utils/validators';

export function useMyOrdersQuery(page = 0) {
  return useQuery({
    queryKey: ['buyer', 'orders', page],
    queryFn: () => ordersService.list({ page }),
  });
}

export function useOrderQuery(id: string) {
  return useQuery({
    queryKey: ['buyer', 'orders', id],
    queryFn: () => ordersService.get(id),
    enabled: !!id,
  });
}

export function usePlaceOrderMutation() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: PlaceOrderInput) => ordersService.place(data),
    onSuccess: (order) => {
      queryClient.invalidateQueries({ queryKey: ['buyer', 'orders'] });
      toast.success('Order placed! Check your phone for M-Pesa prompt.');
      router.push(`/buy/orders/${order.id}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });
}

export function useCancelOrderMutation(orderId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => ordersService.cancel(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['buyer', 'orders'] });
      toast.success('Order cancelled.');
    },
    onError: (e: Error) => toast.error(e.message),
  });
}
