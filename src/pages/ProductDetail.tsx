
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart, Star, Share, Minus, Plus, Truck, Shield, RotateCcw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Blue');
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock product data - in real app, fetch based on ID
  const product = {
    id: parseInt(id || '1'),
    name: "Premium Cotton T-Shirt",
    price: 24.99,
    originalPrice: 35.00,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=700&fit=crop",
      "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=700&fit=crop"
    ],
    category: "T-Shirts",
    rating: 4.6,
    reviews: 89,
    isNew: false,
    colors: ["Blue", "Black", "White", "Pink"],
    sizes: ["XS", "S", "M", "L", "XL"],
    tags: ["Bestseller", "Organic"],
    description: "Made from 100% organic cotton, this premium t-shirt offers exceptional comfort and durability. Perfect for everyday wear with a modern fit that flatters all body types.",
    features: [
      "100% Organic Cotton",
      "Pre-shrunk fabric",
      "Reinforced seams",
      "Machine washable",
      "Eco-friendly dyes"
    ],
    inStock: true,
    stockCount: 15
  };

  const colorMap: { [key: string]: string } = {
    'Blue': 'bg-blue-400',
    'Black': 'bg-gray-800',
    'White': 'bg-white border-2 border-gray-200',
    'Pink': 'bg-pink-400'
  };

  const discount = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

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
          <Link to={`/${product.category.toLowerCase()}`} className="hover:text-rose-600">{product.category}</Link>
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
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-96 lg:h-[600px] object-cover rounded-lg"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-green-500 text-white">New</Badge>
              )}
              {discount > 0 && (
                <Badge className="absolute top-4 right-4 bg-red-500 text-white">-{discount}%</Badge>
              )}
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-rose-400' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.tags.map((tag) => (
                  <Badge key={tag} className="bg-rose-100 text-rose-600">{tag}</Badge>
                ))}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                )}
                {discount > 0 && (
                  <Badge className="bg-red-100 text-red-600">Save {discount}%</Badge>
                )}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Color: {selectedColor}</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full ${colorMap[color]} ${
                      selectedColor === color ? 'ring-2 ring-rose-400 ring-offset-2' : ''
                    }`}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Size: {selectedSize}</h3>
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
                  disabled={quantity >= product.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-gray-600">({product.stockCount} in stock)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button size="lg" className="w-full bg-rose-400 hover:bg-rose-500 text-white">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </Button>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isLiked ? 'fill-current text-red-500' : ''}`} />
                  {isLiked ? 'Saved' : 'Save'}
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
                Reviews ({product.reviews})
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
                <p className="text-gray-600 mb-6">{product.description}</p>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="w-2 h-2 bg-rose-400 rounded-full mr-3"></span>
                      {feature}
                    </li>
                  ))}
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
