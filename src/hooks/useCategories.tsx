
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

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
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (error) throw error;

      // Group categories by parent
      const categories: Category[] = [];
      const subcategoriesMap: Record<string, Category[]> = {};

      data.forEach((cat) => {
        if (cat.parent_id) {
          if (!subcategoriesMap[cat.parent_id]) {
            subcategoriesMap[cat.parent_id] = [];
          }
          subcategoriesMap[cat.parent_id].push(cat);
        } else {
          categories.push(cat);
        }
      });

      // Add subcategories to parent categories
      categories.forEach((cat) => {
        cat.subcategories = subcategoriesMap[cat.id] || [];
      });

      return categories;
    },
  });
};
