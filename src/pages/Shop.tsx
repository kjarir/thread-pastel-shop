import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  X
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';

const Shop = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const subcategoryParam = searchParams.get('subcategory');
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: products, isLoading: productsLoading } = useProducts();

  // Filter products based on URL parameters and selected filters
  const filteredProducts = products?.filter(product => {
    // Gender filter from URL
    if (categoryParam) {
      const normalizedCategory = categoryParam.toLowerCase();
      if (normalizedCategory === 'men' && product.gender !== 'men') return false;
      if (normalizedCategory === 'women' && product.gender !== 'women') return false;
      if (normalizedCategory === 'kids' && product.gender !== 'kids') return false;
    }

    // Subcategory filter from URL - robust normalization
    if (subcategoryParam) {
      // Normalize: lowercase, remove dashes, remove spaces
      const normalize = (str: string) => str.toLowerCase().replace(/[-\s]/g, '');
      const normalizedSubcategory = normalize(subcategoryParam);
      const productName = normalize(product.name);
      const productDesc = normalize(product.description || '');
      if (!productName.includes(normalizedSubcategory) && !productDesc.includes(normalizedSubcategory)) {
        return false;
      }
    }

    // Price filter
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    
    // Search query filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Category filter (from sidebar) - simplified logic
    if (selectedCategories.length > 0) {
      const hasSelectedCategory = selectedCategories.some(cat => {
        const catLower = cat.toLowerCase();
        const productNameLower = product.name.toLowerCase();
        const productGender = product.gender?.toLowerCase();
        if ((catLower === 'men' && productGender === 'men') ||
            (catLower === 'women' && productGender === 'women') ||
            (catLower === 'kids' && productGender === 'kids')) {
          return true;
        }
        if (productNameLower.includes(catLower)) {
          return true;
        }
        return false;
      });
      if (!hasSelectedCategory) return false;
    }
    
    // Colors filter
    if (selectedColors.length > 0 && product.colors) {
      const hasSelectedColor = selectedColors.some(color => 
        product.colors?.includes(color)
      );
      if (!hasSelectedColor) {
        return false;
      }
    }
    
    // Sizes filter
    if (selectedSizes.length > 0 && product.sizes) {
      const hasSelectedSize = selectedSizes.some(size => 
        product.sizes?.includes(size)
      );
      if (!hasSelectedSize) {
        return false;
      }
    }
    
    return true;
  }) || [];

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      default:
        return 0;
    }
  });

  // Get unique colors and sizes from all products
  const allColors = Array.from(new Set(products?.flatMap(p => p.colors || []) || []));
  const allSizes = Array.from(new Set(products?.flatMap(p => p.sizes || []) || []));

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  // Get page title based on URL parameters
  const getPageTitle = () => {
    if (categoryParam && subcategoryParam) {
      const category = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      const subcategory = subcategoryParam.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
      return `${category} ${subcategory}`;
    }
    if (categoryParam) {
      return categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
    }
    return "Shop All Products";
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-rose-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{getPageTitle()}</h1>
            <p className="text-lg text-gray-600 mb-6">
              Discover our complete collection of premium fashion
            </p>
            <div className="max-w-md mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-gray-200 rounded-full"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </form>
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
                  max={25000}
                  step={500}
                  className="mb-3"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
              </div>

              {/* Categories */}
              {!categoriesLoading && categories && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id}>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id={category.id}
                            checked={selectedCategories.includes(category.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCategories([...selectedCategories, category.name]);
                              } else {
                                setSelectedCategories(selectedCategories.filter(c => c !== category.name));
                              }
                            }}
                          />
                          <label htmlFor={category.id} className="text-sm text-gray-700">
                            {category.name}
                          </label>
                        </div>
                        {category.subcategories?.map((sub) => (
                          <div key={sub.id} className="ml-4 flex items-center space-x-2">
                            <Checkbox 
                              id={sub.id}
                              checked={selectedCategories.includes(sub.name)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedCategories([...selectedCategories, sub.name]);
                                } else {
                                  setSelectedCategories(selectedCategories.filter(c => c !== sub.name));
                                }
                              }}
                            />
                            <label htmlFor={sub.id} className="text-sm text-gray-600">
                              {sub.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Colors */}
              {allColors.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {allColors.map((color) => (
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
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {allSizes.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Sizes</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {allSizes.map((size) => (
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
              )}

              {/* Clear Filters */}
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setPriceRange([0, 25000]);
                  setSelectedCategories([]);
                  setSelectedColors([]);
                  setSelectedSizes([]);
                  setSearchQuery('');
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
                  {productsLoading ? 'Loading...' : `Showing ${sortedProducts.length} of ${products?.length || 0} products`}
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
            {productsLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">Loading products...</div>
              </div>
            ) : sortedProducts.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <div className="text-lg text-gray-600">No products found matching your criteria.</div>
              </div>
            ) : (
              <div className={`grid ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              } gap-8`}>
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {sortedProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">Previous</Button>
                  <Button size="sm">1</Button>
                  <Button variant="outline" size="sm">2</Button>
                  <Button variant="outline" size="sm">3</Button>
                  <Button variant="outline" size="sm">Next</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
