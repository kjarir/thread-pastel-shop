
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

// Sample products for demonstration
const sampleProducts: Product[] = [
  {
    id: 'men-tshirt-1',
    name: 'Classic Men\'s T-Shirt',
    description: 'Comfortable cotton t-shirt perfect for everyday wear',
    price: 1299,
    category_id: 'men-tshirts',
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
    id: 'men-shirt-1',
    name: 'Formal Men\'s Shirt',
    description: 'Premium quality formal shirt for office and events',
    price: 2499,
    category_id: 'men-shirts',
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
    id: 'men-jeans-1',
    name: 'Men\'s Denim Jeans',
    description: 'Stylish and comfortable denim jeans',
    price: 3999,
    category_id: 'men-jeans',
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
    id: 'women-tshirt-1',
    name: 'Women\'s Casual T-Shirt',
    description: 'Soft and comfortable t-shirt for women',
    price: 1199,
    category_id: 'women-tshirts',
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
    id: 'women-shirt-1',
    name: 'Women\'s Formal Shirt',
    description: 'Elegant formal shirt for professional women',
    price: 2299,
    category_id: 'women-shirts',
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
    id: 'women-jeans-1',
    name: 'Women\'s Skinny Jeans',
    description: 'Trendy skinny fit jeans for women',
    price: 3599,
    category_id: 'women-jeans',
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
    id: 'kids-tshirt-1',
    name: 'Kids Fun T-Shirt',
    description: 'Colorful and fun t-shirt for kids',
    price: 899,
    category_id: 'kids-tshirts',
    image_url: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop',
    stock_quantity: 60,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['Red', 'Blue', 'Yellow', 'Green'],
    gender: 'kids',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'kids-shirt-1',
    name: 'Kids Formal Shirt',
    description: 'Smart formal shirt for special occasions',
    price: 1499,
    category_id: 'kids-shirts',
    image_url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop',
    stock_quantity: 30,
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: ['White', 'Light Blue', 'Cream'],
    gender: 'kids',
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
  });
};
