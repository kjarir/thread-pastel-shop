
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useWishlist } from '@/hooks/useWishlist';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';

const Wishlist = () => {
  const { user } = useAuth();
  const { wishlistItems, removeFromWishlist, isLoading } = useWishlist();
  const { addToCart } = useCart();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your wishlist</h1>
          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-lg">Loading your wishlist...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Heart className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold mb-4">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-8">Save items you love for later!</p>
          <Link to="/shop">
            <Button>Browse Products</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={item.product?.image_url || '/placeholder.svg'}
                  alt={item.product?.name}
                  className="w-full h-64 object-cover"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                  onClick={() => removeFromWishlist(item.product_id)}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.product?.name}</h3>
                <div className="text-xl font-bold text-rose-600 mb-4">
                  ${item.product?.price}
                </div>
                
                <div className="space-y-2">
                  <Button 
                    className="w-full bg-rose-500 hover:bg-rose-600"
                    onClick={() => addToCart({ productId: item.product_id })}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Link to={`/product/${item.product_id}`}>
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Wishlist;
