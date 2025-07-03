import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Star, Share, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useProduct } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart, isAddingToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, isAddingToWishlist } = useWishlist();
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  const { data: product, isLoading, error } = useProduct(id || '');

  // Generate a random rating for demo purposes
  const rating = 4.2 + Math.random() * 0.8;
  const reviews = Math.floor(Math.random() * 200) + 50;

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!product) return;

    // Check if size is required but not selected
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Size required",
        description: "Please select a size before adding to cart",
        variant: "destructive",
      });
      return;
    }

    // Check if color is required but not selected
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Color required",
        description: "Please select a color before adding to cart",
        variant: "destructive",
      });
      return;
    }

    addToCart({ 
      productId: product.id,
      quantity,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
    });
  };

  const handleWishlistToggle = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    if (!product) return;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading product...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Product not found</p>
            <Link to="/shop">
              <Button className="mt-4">Back to Shop</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Use only a single image for the product
  const productImage = product.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop';

  const colorMap: { [key: string]: string } = {
    'Blue': 'bg-blue-400',
    'Black': 'bg-gray-800',
    'White': 'bg-white border-2 border-gray-200',
    'Pink': 'bg-pink-400',
    'Gray': 'bg-gray-400',
    'Navy': 'bg-blue-800',
    'Red': 'bg-red-400',
    'Yellow': 'bg-yellow-400',
    'Green': 'bg-green-400',
    'Purple': 'bg-purple-400',
    'Cream': 'bg-yellow-100',
    'Light Blue': 'bg-blue-200',
    'Light Pink': 'bg-pink-200',
    'Sky Blue': 'bg-sky-300',
    'Dark Blue': 'bg-blue-900'
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <nav className="text-sm text-gray-600">
          <Link to="/" className="hover:text-rose-600">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/shop" className="hover:text-rose-600">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <img 
                src={productImage} 
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover rounded-lg"
              />
              {product.stock_quantity && product.stock_quantity < 10 && (
                <Badge className="absolute top-4 left-4 bg-red-500 text-white">Low Stock</Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.gender && (
                  <Badge variant="outline">{product.gender.charAt(0).toUpperCase() + product.gender.slice(1)}</Badge>
                )}
                <Badge className="bg-rose-100 text-rose-600">Premium</Badge>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              </div>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Color: {selectedColor || 'Select a color'}</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full ${colorMap[color] || 'bg-gray-400'} ${
                        selectedColor === color ? 'ring-2 ring-rose-400 ring-offset-2' : ''
                      }`}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Size: {selectedSize || 'Select a size'}</h3>
                <div className="flex space-x-2">
                  {product.sizes.map((size) => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                      className="min-w-[40px]"
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={product.stock_quantity ? quantity >= product.stock_quantity : false}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">
                  ({product.stock_quantity || 0} in stock)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                size="lg" 
                className="w-full bg-rose-400 hover:bg-rose-500 text-white"
                onClick={handleAddToCart}
                disabled={isAddingToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isAddingToCart ? 'Adding...' : `Add to Cart - ₹${(product.price * quantity).toFixed(2)}`}
              </Button>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={handleWishlistToggle}
                  disabled={isAddingToWishlist}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isInWishlist(product.id) ? 'fill-current text-red-500' : ''}`} />
                  {isInWishlist(product.id) ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="lg">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Product Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-green-600" />
                    <span className="text-sm">Free Shipping</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    <span className="text-sm">2 Year Warranty</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RotateCcw className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">30 Day Returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12">
          <div className="border-b">
            <nav className="flex space-x-8">
              <button className="py-4 px-1 border-b-2 border-rose-400 text-rose-600 font-medium">
                Description
              </button>
              <button className="py-4 px-1 text-gray-500 hover:text-gray-700">
                Reviews ({reviews})
              </button>
              <button className="py-4 px-1 text-gray-500 hover:text-gray-700">
                Size Guide
              </button>
            </nav>
          </div>
          <div className="py-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About This Product</h3>
                <p className="text-gray-600 mb-6">{product.description || 'No description available.'}</p>
                <ul className="space-y-2">
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3"></span>
                    Premium quality material
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3"></span>
                    Comfortable fit
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3"></span>
                    Durable construction
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3"></span>
                    Machine washable
                  </li>
                  <li className="flex items-center text-gray-600">
                    <span className="w-2 h-2 bg-rose-400 rounded-full mr-3"></span>
                    Eco-friendly materials
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Care Instructions</h3>
                <div className="space-y-3 text-gray-600">
                  <p>• Machine wash cold with like colors</p>
                  <p>• Tumble dry low heat</p>
                  <p>• Do not bleach</p>
                  <p>• Iron on low heat if needed</p>
                  <p>• Do not dry clean</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
