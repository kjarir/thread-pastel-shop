
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const { user } = useAuth();
  const { addToCart, isAddingToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, isAddingToWishlist } = useWishlist();
  const navigate = useNavigate();
  
  // Generate a random rating for demo purposes
  const rating = 4.2 + Math.random() * 0.8;
  const reviews = Math.floor(Math.random() * 200) + 50;
  
  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    addToCart({ productId: product.id });
  };

  const handleWishlistToggle = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };
  
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="flex flex-col sm:flex-row">
            <div className="w-full sm:w-48 h-48 flex-shrink-0">
              <img 
                src={product.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'} 
                alt={product.name}
                className="w-full h-full object-cover sm:rounded-l-lg"
              />
            </div>
            <div className="flex-1 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 space-y-2 sm:space-y-0">
                <div className="flex-1">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleWishlistToggle}
                    disabled={isAddingToWishlist}
                  >
                    <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-rose-500 hover:bg-rose-600"
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({reviews})</span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">${product.price}</span>
                </div>
                
                <div className="flex space-x-1">
                  {product.colors?.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="w-5 h-5 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: color.toLowerCase() }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative overflow-hidden">
          <Link to={`/product/${product.id}`}>
            <img 
              src={product.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'} 
              alt={product.name}
              className="w-full h-48 sm:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 flex flex-col space-y-2">
            {product.stock_quantity && product.stock_quantity < 10 && (
              <Badge className="bg-red-500 text-white text-xs">Low Stock</Badge>
            )}
          </div>
          
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white"
              onClick={handleWishlistToggle}
              disabled={isAddingToWishlist}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
        
        <div className="p-3 sm:p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 hover:text-rose-600 transition-colors text-sm sm:text-base">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 sm:h-4 sm:w-4 ${
                  i < Math.floor(rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs sm:text-sm text-gray-600 ml-2">({reviews})</span>
          </div>
          
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <span className="text-lg sm:text-xl font-bold text-gray-900">${product.price}</span>
            
            <div className="flex space-x-1">
              {product.colors?.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1">
              {product.sizes?.slice(0, 4).map((size) => (
                <Badge key={size} variant="outline" className="text-xs">
                  {size}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            className="w-full bg-rose-500 hover:bg-rose-600 text-white text-sm"
            size="sm"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            {isAddingToCart ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
