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

// Sample products for demonstration with proper UUID format
const sampleProducts: Product[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    name: 'Classic Men\'s T-Shirt',
    description: 'Comfortable cotton t-shirt perfect for everyday wear',
    price: 1299,
    category_id: '550e8400-e29b-41d4-a716-446655440010',
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    stock_quantity: 50,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    gender: 'men',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    name: 'Formal Men\'s Shirt',
    description: 'Premium quality formal shirt for office and events',
    price: 2499,
    category_id: '550e8400-e29b-41d4-a716-446655440011',
    image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop',
    stock_quantity: 30,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Light Blue', 'Pink'],
    gender: 'men',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    name: 'Men\'s Denim Jeans',
    description: 'Stylish and comfortable denim jeans',
    price: 3999,
    category_id: '550e8400-e29b-41d4-a716-446655440012',
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop',
    stock_quantity: 25,
    sizes: ['28', '30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Dark Blue', 'Light Blue'],
    gender: 'men',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    name: 'Women\'s Casual T-Shirt',
    description: 'Soft and comfortable t-shirt for women',
    price: 1199,
    category_id: '550e8400-e29b-41d4-a716-446655440013',
    image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop',
    stock_quantity: 40,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'White', 'Black', 'Purple'],
    gender: 'women',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    name: 'Women\'s Formal Shirt',
    description: 'Elegant formal shirt for professional women',
    price: 2299,
    category_id: '550e8400-e29b-41d4-a716-446655440014',
    image_url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop',
    stock_quantity: 35,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['White', 'Cream', 'Light Pink', 'Sky Blue'],
    gender: 'women',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440006',
    name: 'Women\'s Skinny Jeans',
    description: 'Trendy skinny fit jeans for women',
    price: 3599,
    category_id: '550e8400-e29b-41d4-a716-446655440015',
    image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop',
    stock_quantity: 20,
    sizes: ['26', '28', '30', '32', '34'],
    colors: ['Blue', 'Black', 'Dark Blue', 'Gray'],
    gender: 'women',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440007',
    name: 'Men\'s Track Pants',
    description: 'Comfortable track pants for sports and casual wear',
    price: 1899,
    category_id: '550e8400-e29b-41d4-a716-446655440016',
    image_url: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop',
    stock_quantity: 45,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Red'],
    gender: 'men',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440008',
    name: 'Men\'s Hoodie',
    description: 'Warm and cozy hoodie for cold weather',
    price: 2999,
    category_id: '550e8400-e29b-41d4-a716-446655440017',
    image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=500&fit=crop',
    stock_quantity: 30,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Gray', 'Navy', 'Green'],
    gender: 'men',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const useProducts = (categoryId?: string, gender?: string) => {
  return useQuery({
    queryKey: ['products', categoryId, gender],
    queryFn: async () => {
      try {
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

        if (error) {
          console.log('Database query failed, using sample data:', error);
          return sampleProducts;
        }
        
        // If no data from database, return sample products
        if (!data || data.length === 0) {
          console.log('No products found in database, using sample data');
          return sampleProducts;
        }
        
        return data as Product[];
      } catch (error) {
        console.log('Using sample data due to error:', error);
        return sampleProducts;
      }
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.log('Database query failed, checking sample data:', error);
          const sampleProduct = sampleProducts.find(p => p.id === id);
          if (!sampleProduct) {
            throw new Error('Product not found');
          }
          return sampleProduct;
        }
        
        return data as Product;
      } catch (error) {
        console.log('Checking sample data for product:', id);
        const sampleProduct = sampleProducts.find(p => p.id === id);
        if (!sampleProduct) {
          throw new Error('Product not found');
        }
        return sampleProduct;
      }
    },
    enabled: !!id,
  });
};
