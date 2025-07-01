
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, ShoppingCart, Star, Eye, Search, Menu, User, Filter, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import FeaturedBanner from '@/components/FeaturedBanner';
import CategoryGrid from '@/components/CategoryGrid';
import TestimonialSection from '@/components/TestimonialSection';
import BlogPreview from '@/components/BlogPreview';

const featuredProducts = [
  {
    id: 1,
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    originalPrice: 35.00,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop",
    category: "T-Shirts",
    rating: 4.6,
    reviews: 89,
    isNew: false,
    colors: ["White", "Pink", "Mint", "Lavender"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["Organic", "Sustainable"]
  },
  {
    id: 2,
    name: "Classic Denim Shirt",
    price: 45.99,
    originalPrice: 65.00,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop",
    category: "Shirts",
    rating: 4.7,
    reviews: 156,
    isNew: true,
    colors: ["Blue", "Black", "White"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["Premium", "Bestseller"]
  },
  {
    id: 3,
    name: "High-Waisted Jeans",
    price: 75.99,
    originalPrice: 95.00,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=500&fit=crop",
    category: "Jeans",
    rating: 4.9,
    reviews: 156,
    isNew: true,
    colors: ["Blue", "Black", "Grey"],
    sizes: ["24", "26", "28", "30", "32"],
    tags: ["Premium", "Bestseller"]
  },
  {
    id: 4,
    name: "Comfort Track Pants",
    price: 35.99,
    originalPrice: 50.00,
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
    category: "Track Pants",
    rating: 4.5,
    reviews: 92,
    isNew: false,
    colors: ["Black", "Grey", "Navy"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["Comfortable", "Athletic"]
  },
  {
    id: 5,
    name: "Essential Hoodie",
    price: 55.99,
    originalPrice: 75.00,
    image: "https://images.unsplash.com/photo-1556821840-3a9fbc86339e?w=400&h=500&fit=crop",
    category: "Hoodies",
    rating: 4.8,
    reviews: 124,
    isNew: true,
    colors: ["Black", "Grey", "White", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["Bestseller", "Trending"]
  }
];

const Index = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-rose-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-rose-100 text-rose-600 hover:bg-rose-200">
                New Collection 2024
              </Badge>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                404 Thread
                <span className="block text-rose-500">Premium Fashion</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Discover our exclusive collection of t-shirts, shirts, jeans, track pants, 
                and hoodies designed for the modern fashion enthusiast.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/shop">
                  <Button size="lg" className="bg-rose-400 hover:bg-rose-500 text-white px-8 py-3">
                    Shop Collection
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="border-rose-200 text-rose-600 hover:bg-rose-50 px-8 py-3">
                  View Lookbook
                </Button>
              </div>
              <div className="flex items-center space-x-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">100+</div>
                  <div className="text-sm text-gray-600">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">4.9</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&h=700&fit=crop" 
                alt="Fashion Model"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.9 Rating</span>
                </div>
                <p className="text-sm text-gray-600">From 1000+ reviews</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedBanner />
      <CategoryGrid />

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites from our latest collection</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex border rounded-lg overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded-lg px-3 py-2 bg-white"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
          </div>
          
          <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-8`}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/shop">
              <Button variant="outline" size="lg" className="border-rose-200 text-rose-600 hover:bg-rose-50">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <TestimonialSection />
      <BlogPreview />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
