
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  Gift,
  Truck,
  Shield,
  Phone
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(7);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-rose-100 to-purple-100 py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Truck className="h-4 w-4 text-rose-600" />
                <span>Free shipping over $75</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4 text-green-600" />
                <span>Secure Payment</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-4 w-4" />
                <span>24/7 Support</span>
              </div>
              <span>|</span>
              <Link to="/track-order" className="hover:text-rose-600">Track Order</Link>
              <span>|</span>
              <Link to="/size-guide" className="hover:text-rose-600">Size Guide</Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-gray-900">
            404 <span className="text-rose-500">Thread</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-full focus:border-rose-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Heart className="h-5 w-5" />
              {wishlistCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs">
                  {wishlistCount}
                </Badge>
              )}
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
            
            <Link to="/login">
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center justify-center space-x-8 mt-4 py-4 border-t">
          <Link to="/women" className="text-gray-700 hover:text-rose-600 font-medium">Women</Link>
          <Link to="/men" className="text-gray-700 hover:text-rose-600 font-medium">Men</Link>
          <Link to="/shop" className="text-gray-700 hover:text-rose-600 font-medium">All Products</Link>
        </nav>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-full"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="space-y-4">
              <Link to="/women" className="block text-gray-700 hover:text-rose-600">Women</Link>
              <Link to="/men" className="block text-gray-700 hover:text-rose-600">Men</Link>
              <Link to="/shop" className="block text-gray-700 hover:text-rose-600">All Products</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
