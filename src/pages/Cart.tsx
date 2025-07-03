
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DummyPaymentGateway from '@/components/DummyPaymentGateway';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    cartTotal,
    cartCount,
    isLoading 
  } = useCart();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [showPayment, setShowPayment] = useState(false);

  if (!user) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please login to view your cart</h1>
          <Link to="/login">
            <Button>Login</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoDiscount(cartTotal * 0.1);
    } else if (promoCode.toLowerCase() === 'save20') {
      setPromoDiscount(cartTotal * 0.2);
    } else {
      setPromoDiscount(0);
    }
  };

  const shipping = cartTotal > 1000 ? 0 : 99;
  const tax = (cartTotal - promoDiscount) * 0.18; // 18% GST
  const finalTotal = cartTotal - promoDiscount + shipping + tax;

  const handlePaymentSuccess = () => {
    clearCart();
    navigate('/checkout/success');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="text-lg text-gray-600">Loading cart...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setShowPayment(false)}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
            <DummyPaymentGateway
              total={finalTotal}
              onSuccess={handlePaymentSuccess}
              onCancel={() => setShowPayment(false)}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center space-x-2 mb-8">
          <Link to="/shop">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Add some products to get started!</p>
            <Link to="/shop">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Shopping Cart ({cartCount} items)</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => clearCart()}
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={`${item.product_id}-${item.size || 'no-size'}-${item.color || 'no-color'}`} className="flex items-center space-x-4 py-4 border-b">
                      <img 
                        src={item.product?.image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'} 
                        alt={item.product?.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.product?.name}</h3>
                        <div className="flex items-center space-x-4 mt-2">
                          {item.size && (
                            <Badge variant="outline">Size: {item.size}</Badge>
                          )}
                          {item.color && (
                            <Badge variant="outline">Color: {item.color}</Badge>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity({ itemId: item.id, quantity: item.quantity - 1 })}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-12 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity({ itemId: item.id, quantity: item.quantity + 1 })}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold">₹{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="mt-8 lg:mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cartTotal.toFixed(2)}</span>
                  </div>
                  
                  {promoDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Promo Discount</span>
                      <span>-₹{promoDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{finalTotal.toFixed(2)}</span>
                  </div>

                  {shipping > 0 && (
                    <p className="text-sm text-gray-600">
                      Add ₹{(1000 - cartTotal).toFixed(2)} more for free shipping!
                    </p>
                  )}

                  {/* Promo Code */}
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyPromoCode}>
                        Apply
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                      Try: SAVE10 or SAVE20
                    </p>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => setShowPayment(true)}
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
