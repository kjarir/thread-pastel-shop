
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Order {
  id: string;
  status: string;
  total_amount: number;
  payment_status: string;
  tracking_number?: string;
  created_at: string;
  order_items: {
    id: string;
    quantity: number;
    unit_price: number;
    size?: string;
    color?: string;
    product: {
      id: string;
      name: string;
      image_url?: string;
    };
  }[];
}

export const useOrders = () => {
  const { user } = useAuth();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:products(id, name, image_url)
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    enabled: !!user,
  });

  return {
    orders,
    isLoading,
  };
};
