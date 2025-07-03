
import { useQuery } from '@tanstack/react-query';

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id: string | null;
  is_active: boolean;
  sort_order: number;
  subcategories?: Category[];
}

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      // Return simplified categories structure
      const categories: Category[] = [
        {
          id: 'men',
          name: 'Men',
          slug: 'men',
          parent_id: null,
          is_active: true,
          sort_order: 1,
          subcategories: [
            { id: 'men-tshirts', name: 'T-Shirts', slug: 't-shirts', parent_id: 'men', is_active: true, sort_order: 1 },
            { id: 'men-shirts', name: 'Shirts', slug: 'shirts', parent_id: 'men', is_active: true, sort_order: 2 },
            { id: 'men-jeans', name: 'Jeans', slug: 'jeans', parent_id: 'men', is_active: true, sort_order: 3 },
            { id: 'men-track-pants', name: 'Track Pants', slug: 'track-pants', parent_id: 'men', is_active: true, sort_order: 4 },
            { id: 'men-hoodies', name: 'Hoodies', slug: 'hoodies', parent_id: 'men', is_active: true, sort_order: 5 },
          ]
        },
        {
          id: 'women',
          name: 'Women',
          slug: 'women',
          parent_id: null,
          is_active: true,
          sort_order: 2,
          subcategories: [
            { id: 'women-tshirts', name: 'T-Shirts', slug: 't-shirts', parent_id: 'women', is_active: true, sort_order: 1 },
            { id: 'women-shirts', name: 'Shirts', slug: 'shirts', parent_id: 'women', is_active: true, sort_order: 2 },
            { id: 'women-jeans', name: 'Jeans', slug: 'jeans', parent_id: 'women', is_active: true, sort_order: 3 },
            { id: 'women-track-pants', name: 'Track Pants', slug: 'track-pants', parent_id: 'women', is_active: true, sort_order: 4 },
            { id: 'women-hoodies', name: 'Hoodies', slug: 'hoodies', parent_id: 'women', is_active: true, sort_order: 5 },
          ]
        },
        {
          id: 'kids',
          name: 'Kids',
          slug: 'kids',
          parent_id: null,
          is_active: true,
          sort_order: 3,
          subcategories: [
            { id: 'kids-tshirts', name: 'T-Shirts', slug: 't-shirts', parent_id: 'kids', is_active: true, sort_order: 1 },
            { id: 'kids-shirts', name: 'Shirts', slug: 'shirts', parent_id: 'kids', is_active: true, sort_order: 2 },
            { id: 'kids-jeans', name: 'Jeans', slug: 'jeans', parent_id: 'kids', is_active: true, sort_order: 3 },
            { id: 'kids-track-pants', name: 'Track Pants', slug: 'track-pants', parent_id: 'kids', is_active: true, sort_order: 4 },
            { id: 'kids-hoodies', name: 'Hoodies', slug: 'hoodies', parent_id: 'kids', is_active: true, sort_order: 5 },
          ]
        }
      ];

      return categories;
    },
  });
};
