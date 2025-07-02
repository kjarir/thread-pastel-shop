
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  // Generate a random rating for demo purposes
  const rating = 4.2 + Math.random() * 0.8;
  const reviews = Math.floor(Math.random() * 200) + 50;
  
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-shadow duration-300">
        <CardContent className="p-0">
          <div className="flex">
            <div className="w-48 h-48 flex-shrink-0">
              <img 
                src={product.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'} 
                alt={product.name}
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold text-gray-900 hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mt-1">{product.description}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" className="bg-rose-500 hover:bg-rose-600">
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
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                </div>
                
                <div className="flex space-x-1">
                  {product.colors?.slice(0, 4).map((color, index) => (
                    <div
                      key={index}
                      className="w-6 h-6 rounded-full border-2 border-gray-200"
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
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
          
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {product.stock_quantity && product.stock_quantity < 10 && (
              <Badge className="bg-red-500 text-white">Low Stock</Badge>
            )}
          </div>
          
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button variant="outline" size="sm" className="bg-white">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-semibold text-gray-900 mb-2 hover:text-rose-600 transition-colors">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-1 mb-3">
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
            <span className="text-sm text-gray-600 ml-2">({reviews})</span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold text-gray-900">${product.price}</span>
            
            <div className="flex space-x-1">
              {product.colors?.slice(0, 3).map((color, index) => (
                <div
                  key={index}
                  className="w-5 h-5 rounded-full border border-gray-200"
                  style={{ backgroundColor: color.toLowerCase() }}
                  title={color}
                />
              ))}
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-wrap gap-1">
              {product.sizes?.slice(0, 4).map((size) => (
                <Badge key={size} variant="outline" className="text-xs">
                  {size}
                </Badge>
              ))}
            </div>
          </div>
          
          <Button 
            className="w-full bg-rose-500 hover:bg-rose-600 text-white"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
