'use client';

import { useQuery } from '@tanstack/react-query';
import { productsService } from '@/features/products/services/products.service';

export function useProductsQuery() {
  return useQuery({
    queryKey: ['products'],
    queryFn: productsService.list,
  });
}

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsService.get(id),
    enabled: !!id,
  });
}
