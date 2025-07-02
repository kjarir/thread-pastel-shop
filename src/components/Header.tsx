
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
  LogOut
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(7);
  const { user, isAdmin, signOut } = useAuth();
  const { data: categories, isLoading } = useCategories();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Categories and Logo */}
          <div className="flex items-center space-x-6">
            {/* Categories Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-1">
                  <Menu className="h-4 w-4" />
                  <span className="hidden md:inline">Categories</span>
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

            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-gray-900">
              404 <span className="text-rose-500">Thread</span>
            </Link>
          </div>

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
            
            {user ? (
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
            ) : (
              <Link to="/login">
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
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

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
              {categories?.map((category) => (
                <div key={category.id}>
                  <Link 
                    to={`/shop?category=${category.slug}`} 
                    className="block text-gray-700 hover:text-rose-600 font-medium"
                  >
                    {category.name}
                  </Link>
                  {category.subcategories?.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/shop?category=${sub.slug}`}
                      className="block ml-4 text-sm text-gray-600 hover:text-rose-600"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
