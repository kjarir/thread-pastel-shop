
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Mail, Gift, Star, Truck } from 'lucide-react';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-rose-100 via-purple-50 to-indigo-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-rose-500 rounded-full flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Join the 404 Thread Community
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Be the first to know about new arrivals, exclusive sales, and styling tips. 
              Plus, get 15% off your first order!
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Exclusive Offers</h3>
              <p className="text-sm text-gray-600">Member-only discounts and early access to sales</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Style Tips</h3>
              <p className="text-sm text-gray-600">Weekly styling guides and fashion inspiration</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Early Access</h3>
              <p className="text-sm text-gray-600">Shop new collections before anyone else</p>
            </div>
          </div>

          {/* Newsletter Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border-gray-200 rounded-lg focus:border-rose-300"
                      required
                    />
                  </div>
                  <Button 
                    type="submit"
                    className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-lg font-semibold"
                  >
                    Get 15% Off
                  </Button>
                </div>
                <div className="flex items-center justify-center mt-4 space-x-4">
                  <Badge className="bg-green-100 text-green-700">
                    15% Off First Order
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-700">
                    Free Shipping
                  </Badge>
                  <Badge className="bg-purple-100 text-purple-700">
                    Early Access
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 text-center mt-4">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe at any time.
                </p>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Welcome to the Family!</h3>
                <p className="text-gray-600 mb-4">
                  Check your email for your 15% discount code and welcome guide.
                </p>
                <Badge className="bg-green-100 text-green-700">
                  Subscription Confirmed ✓
                </Badge>
              </div>
            )}
          </div>

          {/* Social Proof */}
          <div className="text-center mt-8">
            <p className="text-sm text-gray-600 mb-2">Join 50,000+ fashion lovers</p>
            <div className="flex justify-center items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
              <span className="text-sm text-gray-600 ml-2">4.9/5 from our community</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
