
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Grid, List } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import FeaturedBanner from '@/components/FeaturedBanner';
import CategoryGrid from '@/components/CategoryGrid';
import TestimonialSection from '@/components/TestimonialSection';
import BlogPreview from '@/components/BlogPreview';
import { useProducts } from '@/hooks/useProducts';

const Index = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const { data: products, isLoading } = useProducts();

  // Take first 5 products as featured
  const featuredProducts = products?.slice(0, 5) || [];

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
                  <div className="text-2xl font-bold text-gray-900">{products?.length || 0}+</div>
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
                src="https://res.cloudinary.com/dzkfhdhs0/image/upload/v1751536923/stoicism_1_yzfgzf.png" 
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
          
          {isLoading ? (
            <div className="text-center py-8">
              <p>Loading products...</p>
            </div>
          ) : (
            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-1'} gap-8`}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>
          )}
          
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
      {/* <BlogPreview /> */}
      {/* <Newsletter /> */}
      <Footer />
    </div>
  );
};

export default Index;
