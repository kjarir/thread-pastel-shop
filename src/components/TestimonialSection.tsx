
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    text: "The quality of 404 Thread's clothing is exceptional! The fabrics are so soft and the fit is perfect. I've gotten so many compliments on my recent purchases.",
    product: "Vintage Denim Jacket",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
    verified: true
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Los Angeles, CA",
    rating: 5,
    text: "Love the sustainable approach! Knowing that my clothes are made from organic materials makes me feel good about my purchases. Great customer service too.",
    product: "Cotton Oversized T-Shirt",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    verified: true
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    location: "Chicago, IL",
    rating: 5,
    text: "Fast shipping, beautiful packaging, and the clothes exceeded my expectations. The attention to detail is amazing. This is now my go-to fashion brand!",
    product: "Floral Summer Dress",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    verified: true
  }
];

const TestimonialSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-rose-50 to-purple-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Customers Say</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers who love our quality and service
          </p>
          <div className="flex items-center justify-center space-x-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.9/5</span>
            <span className="text-gray-600">from 1,247 reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      {testimonial.verified && (
                        <Badge className="bg-green-100 text-green-600 text-xs">Verified</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{testimonial.location}</p>
                    <div className="flex items-center mt-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 h-6 w-6 text-rose-200" />
                  <p className="text-gray-700 leading-relaxed pl-4">
                    {testimonial.text}
                  </p>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <p className="text-sm text-gray-600">
                    Purchased: <span className="font-medium text-gray-900">{testimonial.product}</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">10K+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">4.9★</div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">98%</div>
              <div className="text-sm text-gray-600">Recommend Us</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">24/7</div>
              <div className="text-sm text-gray-600">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
