
-- Create profiles table for user information
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  parent_id UUID REFERENCES public.categories(id),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  gender TEXT CHECK (gender IN ('men', 'women', 'unisex')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user roles enum and table
CREATE TYPE public.user_role AS ENUM ('admin', 'customer');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role user_role NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, role)
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_roles.user_id = is_admin.user_id
    AND role = 'admin'
  );
$$;

-- Create RLS policies for categories (public read, admin write)
CREATE POLICY "Anyone can view active categories" ON public.categories
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage categories" ON public.categories
  FOR ALL USING (public.is_admin(auth.uid()));

-- Create RLS policies for products (public read, admin write)
CREATE POLICY "Anyone can view active products" ON public.products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage products" ON public.products
  FOR ALL USING (public.is_admin(auth.uid()));

-- Create RLS policies for user_roles (admins only)
CREATE POLICY "Admins can view all user roles" ON public.user_roles
  FOR SELECT USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage user roles" ON public.user_roles
  FOR ALL USING (public.is_admin(auth.uid()));

-- Create trigger function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name',
    NEW.email
  );
  
  -- Assign customer role by default
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'customer');
  
  RETURN NEW;
END;
$$;

-- Create trigger to handle new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert initial categories
INSERT INTO public.categories (name, slug, sort_order) VALUES
  ('Men', 'men', 1),
  ('Women', 'women', 2);

-- Insert subcategories for Men
INSERT INTO public.categories (name, slug, parent_id, sort_order)
SELECT 'T-Shirts', 't-shirts', id, 1 FROM public.categories WHERE slug = 'men'
UNION ALL
SELECT 'Shirts', 'shirts', id, 2 FROM public.categories WHERE slug = 'men'
UNION ALL
SELECT 'Jeans', 'jeans', id, 3 FROM public.categories WHERE slug = 'men'
UNION ALL
SELECT 'Track Pants', 'track-pants', id, 4 FROM public.categories WHERE slug = 'men'
UNION ALL
SELECT 'Hoodies', 'hoodies', id, 5 FROM public.categories WHERE slug = 'men';

-- Insert subcategories for Women
INSERT INTO public.categories (name, slug, parent_id, sort_order)
SELECT 'T-Shirts', 'women-t-shirts', id, 1 FROM public.categories WHERE slug = 'women'
UNION ALL
SELECT 'Shirts', 'women-shirts', id, 2 FROM public.categories WHERE slug = 'women'
UNION ALL
SELECT 'Jeans', 'women-jeans', id, 3 FROM public.categories WHERE slug = 'women'
UNION ALL
SELECT 'Track Pants', 'women-track-pants', id, 4 FROM public.categories WHERE slug = 'women'
UNION ALL
SELECT 'Hoodies', 'women-hoodies', id, 5 FROM public.categories WHERE slug = 'women';

-- Insert sample products
INSERT INTO public.products (name, description, price, category_id, image_url, stock_quantity, sizes, colors, gender)
SELECT 
  'Classic Cotton T-Shirt',
  'Comfortable cotton t-shirt perfect for everyday wear',
  29.99,
  c.id,
  '/placeholder.svg',
  50,
  ARRAY['S', 'M', 'L', 'XL'],
  ARRAY['Black', 'White', 'Gray'],
  'men'
FROM public.categories c 
WHERE c.slug = 't-shirts' AND c.parent_id IS NOT NULL;
