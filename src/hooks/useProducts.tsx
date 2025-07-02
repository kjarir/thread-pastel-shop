
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
  image_url: string | null;
  stock_quantity: number | null;
  sizes: string[] | null;
  colors: string[] | null;
  gender: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const useProducts = (categoryId?: string, gender?: string) => {
  return useQuery({
    queryKey: ['products', categoryId, gender],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select('*')
        .eq('is_active', true);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      if (gender) {
        query = query.eq('gender', gender);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      return data as Product[];
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Product;
    },
  });
};
