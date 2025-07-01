
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Shield, 
  Truck, 
  Gift,
  CreditCard,
  Users,
  Leaf
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      {/* Trust Badges */}
      <div className="border-b bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Truck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $75</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% protected</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Gift className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day policy</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-rose-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-sm text-gray-600">Always here to help</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              404 <span className="text-rose-500">Thread</span>
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Premium fashion brand committed to sustainable, high-quality clothing 
              that makes you look and feel amazing. Join our community of fashion 
              enthusiasts who care about style and the planet.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">123 Fashion St, Style City, SC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">+1 (555) 404-THREAD</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">hello@404thread.com</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full">
                📘
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full">
                📷
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full">
                🐦
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full">
                📌
              </Button>
              <Button variant="outline" size="sm" className="w-10 h-10 p-0 rounded-full">
                🎵
              </Button>
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/women" className="text-gray-600 hover:text-rose-600 transition-colors">Women</Link></li>
              <li><Link to="/men" className="text-gray-600 hover:text-rose-600 transition-colors">Men</Link></li>
              <li><Link to="/accessories" className="text-gray-600 hover:text-rose-600 transition-colors">Accessories</Link></li>
              <li><Link to="/new-arrivals" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center">
                New Arrivals <Badge className="ml-2 bg-green-100 text-green-600 text-xs">Hot</Badge>
              </Link></li>
              <li><Link to="/sale" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center">
                Sale <Badge className="ml-2 bg-red-100 text-red-600 text-xs">-50%</Badge>
              </Link></li>
              <li><Link to="/sustainable" className="text-gray-600 hover:text-rose-600 transition-colors flex items-center">
                Sustainable <Leaf className="ml-1 h-3 w-3 text-green-500" />
              </Link></li>
              <li><Link to="/gift-cards" className="text-gray-600 hover:text-rose-600 transition-colors">Gift Cards</Link></li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Customer Care</h3>
            <ul className="space-y-3">
              <li><Link to="/contact" className="text-gray-600 hover:text-rose-600 transition-colors">Contact Us</Link></li>
              <li><Link to="/size-guide" className="text-gray-600 hover:text-rose-600 transition-colors">Size Guide</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-rose-600 transition-colors">Shipping Info</Link></li>
              <li><Link to="/returns" className="text-gray-600 hover:text-rose-600 transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/track-order" className="text-gray-600 hover:text-rose-600 transition-colors">Track Your Order</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-rose-600 transition-colors">FAQ</Link></li>
              <li><Link to="/student-discount" className="text-gray-600 hover:text-rose-600 transition-colors">Student Discount</Link></li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">About</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-600 hover:text-rose-600 transition-colors">Our Story</Link></li>
              <li><Link to="/sustainability" className="text-gray-600 hover:text-rose-600 transition-colors">Sustainability</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-rose-600 transition-colors">Careers</Link></li>
              <li><Link to="/press" className="text-gray-600 hover:text-rose-600 transition-colors">Press</Link></li>
              <li><Link to="/blog" className="text-gray-600 hover:text-rose-600 transition-colors">Blog</Link></li>
              <li><Link to="/reviews" className="text-gray-600 hover:text-rose-600 transition-colors">Reviews</Link></li>
              <li><Link to="/affiliate" className="text-gray-600 hover:text-rose-600 transition-colors">Affiliate Program</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t bg-gradient-to-r from-rose-50 to-purple-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay in Style</h3>
            <p className="text-gray-600 mb-4">Get the latest trends, exclusive offers, and style tips delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1"
              />
              <Button className="bg-rose-400 hover:bg-rose-500 text-white">
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-sm text-gray-600">© 2024 404 Thread. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link to="/privacy" className="text-sm text-gray-600 hover:text-rose-600">Privacy Policy</Link>
                <Link to="/terms" className="text-sm text-gray-600 hover:text-rose-600">Terms of Service</Link>
                <Link to="/cookies" className="text-sm text-gray-600 hover:text-rose-600">Cookie Policy</Link>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 mr-2">We accept:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">V</div>
                <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">M</div>
                <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">A</div>
                <div className="w-8 h-5 bg-yellow-400 rounded text-gray-900 text-xs flex items-center justify-center font-bold">P</div>
                <div className="w-8 h-5 bg-indigo-600 rounded text-white text-xs flex items-center justify-center font-bold">S</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
