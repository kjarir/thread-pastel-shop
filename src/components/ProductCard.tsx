import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Star, Eye, Share } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew: boolean;
  colors: string[];
  sizes: string[];
  tags: string[];
}

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isHovered, setIsHovered] = useState(false);

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const colorMap: { [key: string]: string } = {
    'Blue': 'bg-blue-400',
    'Black': 'bg-gray-800',
    'White': 'bg-white border-2 border-gray-200',
    'Pink': 'bg-pink-400',
    'Mint': 'bg-green-300',
    'Lavender': 'bg-purple-300',
    'Grey': 'bg-gray-400',
    'Red': 'bg-red-400',
    'Navy': 'bg-blue-800',
    'Olive': 'bg-green-600'
  };

  if (viewMode === 'list') {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex">
          <Link to={`/product/${product.id}`} className="relative w-48 h-48">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform"
            />
            {product.isNew && (
              <Badge className="absolute top-2 left-2 bg-green-500 text-white">New</Badge>
            )}
            {discount > 0 && (
              <Badge className="absolute top-2 right-2 bg-red-500 text-white">-{discount}%</Badge>
            )}
          </Link>
          <CardContent className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="outline" className="text-xs">{product.category}</Badge>
                  {product.tags.map((tag) => (
                    <Badge key={tag} className="text-xs bg-rose-100 text-rose-600">{tag}</Badge>
                  ))}
                </div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-rose-600 transition-colors">{product.name}</h3>
                </Link>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Colors:</span>
                    <div className="flex space-x-1">
                      {product.colors.map((color) => (
                        <button
                          key={color}
                          className={`w-6 h-6 rounded-full ${colorMap[color]} ${
                            selectedColor === color ? 'ring-2 ring-rose-400' : ''
                          }`}
                          onClick={() => setSelectedColor(color)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Sizes:</span>
                    <span className="text-sm text-gray-800">{product.sizes.join(', ')}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsLiked(!isLiked)}
                  className={isLiked ? 'text-red-500' : 'text-gray-400'}
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Link to={`/product/${product.id}`}>
                  <Button variant="ghost" size="sm" className="text-gray-400">
                    <Eye className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="text-gray-400">
                  <Share className="h-5 w-5" />
                </Button>
                <Button size="sm" className="bg-rose-400 hover:bg-rose-500 text-white">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="group overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {product.isNew && (
            <Badge className="bg-green-500 text-white shadow-md">New</Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-red-500 text-white shadow-md">-{discount}%</Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsLiked(!isLiked)}
            className={`w-10 h-10 rounded-full p-0 shadow-md ${
              isLiked ? 'bg-red-100 text-red-500' : 'bg-white text-gray-600'
            }`}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
          <Link to={`/product/${product.id}`}>
            <Button variant="secondary" size="sm" className="w-10 h-10 rounded-full p-0 bg-white text-gray-600 shadow-md">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="secondary" size="sm" className="w-10 h-10 rounded-full p-0 bg-white text-gray-600 shadow-md">
            <Share className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Add to Cart */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Button className="w-full bg-white text-gray-900 hover:bg-rose-50 hover:text-rose-600">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="outline" className="text-xs">{product.category}</Badge>
          {product.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} className="text-xs bg-rose-100 text-rose-600">{tag}</Badge>
          ))}
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-rose-600 transition-colors cursor-pointer">{product.name}</h3>
        </Link>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(product.rating) 
                    ? 'text-yellow-400 fill-current' 
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        {/* Color Selection */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs text-gray-600">Colors:</span>
          <div className="flex space-x-1">
            {product.colors.slice(0, 4).map((color) => (
              <button
                key={color}
                className={`w-5 h-5 rounded-full ${colorMap[color]} ${
                  selectedColor === color ? 'ring-2 ring-rose-400 ring-offset-1' : ''
                }`}
                onClick={() => setSelectedColor(color)}
              />
            ))}
            {product.colors.length > 4 && (
              <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
            )}
          </div>
        </div>

        {/* Size Availability */}
        <div className="text-xs text-gray-600 mb-3">
          Sizes: {product.sizes.slice(0, 3).join(', ')}
          {product.sizes.length > 3 && '...'}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
