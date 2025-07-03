
import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const CheckoutSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardContent className="p-6 sm:p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
              <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
              <p className="text-gray-600 mb-6">
                Thank you for your purchase. Your order has been confirmed and will be processed shortly.
              </p>
              {sessionId && (
                <p className="text-sm text-gray-500 mb-6">
                  Order ID: {sessionId.slice(0, 8)}...
                </p>
              )}
              <div className="space-y-3">
                <Link to="/orders" className="block">
                  <Button className="w-full bg-rose-500 hover:bg-rose-600">
                    View Orders
                  </Button>
                </Link>
                <Link to="/shop" className="block">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
