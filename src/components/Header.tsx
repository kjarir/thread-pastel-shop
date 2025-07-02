
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  ShoppingCart, 
  Heart, 
  User, 
  Menu, 
  ChevronDown,
  LogOut,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { useCategories } from '@/hooks/useCategories';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const { data: categories, isLoading } = useCategories();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Categories and Logo */}
          <div className="flex items-center space-x-2 sm:space-x-6">
            {/* Categories Dropdown - Hidden on mobile */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <Menu className="h-4 w-4" />
                    <span>Categories</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  {isLoading ? (
                    <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
                  ) : (
                    categories?.map((category) => (
                      <div key={category.id}>
                        <DropdownMenuItem asChild>
                          <Link 
                            to={`/shop?category=${category.slug}`}
                            className="font-medium"
                          >
                            {category.name}
                          </Link>
                        </DropdownMenuItem>
                        {category.subcategories?.map((sub) => (
                          <DropdownMenuItem key={sub.id} asChild>
                            <Link 
                              to={`/shop?category=${sub.slug}`}
                              className="pl-4 text-sm text-gray-600"
                            >
                              {sub.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                        {category.subcategories && category.subcategories.length > 0 && (
                          <DropdownMenuSeparator />
                        )}
                      </div>
                    ))
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Logo */}
            <Link to="/" className="text-xl sm:text-2xl font-bold text-gray-900">
              404 <span className="text-rose-500">Thread</span>
            </Link>
          </div>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border-gray-200 rounded-full focus:border-rose-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Navigation Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link to="/wishlist">
              <Button variant="ghost" size="sm" className="relative">
                <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full p-0">
                    {wishlistCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full p-0">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {user ? (
              <div className="hidden sm:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                      <User className="h-5 w-5" />
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <span className="font-medium">{user.email}</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/orders">Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/wishlist">Wishlist</Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem asChild>
                        <Link to="/admin">Admin Panel</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:block">
                <Button variant="ghost" size="sm">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="lg:hidden mt-3">
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
          <div className="md:hidden mt-4 py-4 border-t bg-white">
            <div className="space-y-4">
              {/* User section for mobile */}
              {user ? (
                <div className="space-y-2 pb-4 border-b">
                  <div className="text-sm font-medium text-gray-700">{user.email}</div>
                  <div className="flex flex-col space-y-2">
                    <Link to="/profile" className="text-sm text-gray-600 hover:text-rose-600">
                      Profile
                    </Link>
                    <Link to="/orders" className="text-sm text-gray-600 hover:text-rose-600">
                      Orders
                    </Link>
                    {isAdmin && (
                      <Link to="/admin" className="text-sm text-gray-600 hover:text-rose-600">
                        Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={handleSignOut}
                      className="text-sm text-gray-600 hover:text-rose-600 text-left"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pb-4 border-b">
                  <Link to="/login" className="text-sm text-gray-600 hover:text-rose-600">
                    Sign In
                  </Link>
                </div>
              )}
              
              {/* Categories for mobile */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 mb-2">Categories</div>
                {categories?.map((category) => (
                  <div key={category.id}>
                    <Link 
                      to={`/shop?category=${category.slug}`}
                      className="block text-sm text-gray-600 hover:text-rose-600 font-medium py-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                    {category.subcategories?.map((sub) => (
                      <Link
                        key={sub.id}
                        to={`/shop?category=${sub.slug}`}
                        className="block ml-4 text-sm text-gray-500 hover:text-rose-600 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
