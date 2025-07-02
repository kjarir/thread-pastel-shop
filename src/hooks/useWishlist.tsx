
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface WishlistItem {
  id: string;
  product_id: string;
  product?: {
    id: string;
    name: string;
    price: number;
    image_url?: string;
  };
}

export const useWishlist = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wishlistItems = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('wishlist_items')
        .select(`
          *,
          product:products(id, name, price, image_url)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      return data as WishlistItem[];
    },
    enabled: !!user,
  });

  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('wishlist_items')
        .insert({
          user_id: user.id,
          product_id: productId,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: "Added to wishlist",
        description: "Item has been added to your wishlist",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add item to wishlist",
        variant: "destructive",
      });
    },
  });

  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: string) => {
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id)
        .eq('product_id', productId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: "Removed from wishlist",
        description: "Item has been removed from your wishlist",
      });
    },
  });

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.product_id === productId);
  };

  return {
    wishlistItems,
    wishlistCount: wishlistItems.length,
    isLoading,
    addToWishlist: addToWishlistMutation.mutate,
    removeFromWishlist: removeFromWishlistMutation.mutate,
    isInWishlist,
    isAddingToWishlist: addToWishlistMutation.isPending,
  };
};
