
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Zap, Leaf } from 'lucide-react';

const FeaturedBanner = () => {
  return (
    <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-50 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Flash Sale Banner */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="h-5 w-5" />
                <Badge className="bg-white text-red-500">Limited Time</Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Flash Sale</h3>
              <p className="text-sm mb-4 opacity-90">Up to 70% off selected items</p>
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Ends in 2 days</span>
              </div>
              <Button variant="secondary" size="sm" className="bg-white text-red-500 hover:bg-gray-100">
                Shop Now
              </Button>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>

          {/* New Collection Banner */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <Badge className="bg-white text-purple-500 mb-2">New Arrival</Badge>
              <h3 className="text-xl font-bold mb-2">Spring Collection</h3>
              <p className="text-sm mb-4 opacity-90">Fresh styles for the new season</p>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex -space-x-2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-pink-400 rounded-full border-2 border-white"></div>
                  <div className="w-6 h-6 bg-green-400 rounded-full border-2 border-white"></div>
                </div>
                <span className="text-sm">50+ New Items</span>
              </div>
              <Button variant="secondary" size="sm" className="bg-white text-purple-500 hover:bg-gray-100">
                Explore
              </Button>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>

          {/* Sustainable Banner */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-2">
                <Leaf className="h-5 w-5" />
                <Badge className="bg-white text-green-500">Eco-Friendly</Badge>
              </div>
              <h3 className="text-xl font-bold mb-2">Sustainable Fashion</h3>
              <p className="text-sm mb-4 opacity-90">Organic cotton & recycled materials</p>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-4 h-4 bg-white rounded-full"></div>
                <span className="text-sm">Carbon Neutral Shipping</span>
              </div>
              <Button variant="secondary" size="sm" className="bg-white text-green-500 hover:bg-gray-100">
                Learn More
              </Button>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBanner;
