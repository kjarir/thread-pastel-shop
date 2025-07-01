
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star,
  Heart,
  ShoppingCart,
  ChevronDown,
  X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';

const Shop = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const products = [
    // ... (same featured products from Index.tsx plus more)
    {
      id: 1,
      name: "Vintage Denim Jacket",
      price: 89.99,
      originalPrice: 120.00,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=500&fit=crop",
      category: "Jackets",
      rating: 4.8,
      reviews: 124,
      isNew: true,
      colors: ["Blue", "Black", "White"],
      sizes: ["XS", "S", "M", "L", "XL"],
      tags: ["Bestseller", "Trending"]
    },
    // Add more products here...
  ];

  const categories = ["Tops", "Bottoms", "Dresses", "Jackets", "Accessories", "Shoes"];
  const colors = ["Black", "White", "Blue", "Pink", "Green", "Red", "Grey", "Yellow"];
  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-rose-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop All Products</h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover our complete collection of premium fashion
            </p>
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 border-gray-200 rounded-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className={`w-80 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                  className="lg:hidden"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={500}
                  step={10}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([...selectedCategories, category]);
                          } else {
                            setSelectedCategories(selectedCategories.filter(c => c !== category));
                          }
                        }}
                      />
                      <label htmlFor={category} className="text-sm text-gray-700">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
                <div className="grid grid-cols-4 gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-8 h-8 rounded-full border-2 ${
                        selectedColors.includes(color) 
                          ? 'border-rose-400' 
                          : 'border-gray-200'
                      }`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => {
                        if (selectedColors.includes(color)) {
                          setSelectedColors(selectedColors.filter(c => c !== color));
                        } else {
                          setSelectedColors([...selectedColors, color]);
                        }
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Sizes</h4>
                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSizes.includes(size) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (selectedSizes.includes(size)) {
                          setSelectedSizes(selectedSizes.filter(s => s !== size));
                        } else {
                          setSelectedSizes([...selectedSizes, size]);
                        }
                      }}
                      className="text-xs"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setPriceRange([0, 200]);
                  setSelectedCategories([]);
                  setSelectedColors([]);
                  setSelectedSizes([]);
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <span className="text-gray-600">
                  Showing {products.length} of {products.length} products
                </span>
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
                  <option value="popularity">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            } gap-8`}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} viewMode={viewMode} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
