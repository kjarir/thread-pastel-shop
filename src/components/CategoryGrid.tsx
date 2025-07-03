import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = [
  {
    id: 1,
    name: "Men's Fashion",
    count: 245,
    image: "https://res.cloudinary.com/dzkfhdhs0/image/upload/v1751536922/fire_2_ydtfwq.png",
    href: "/shop?category=men",
    featured: true
  },
  {
    id: 2,
    name: "Women's Fashion",
    count: 189,
    image: "https://res.cloudinary.com/dzkfhdhs0/image/upload/v1751536920/dreams_1_vuqumc.png",
    href: "/shop?category=women",
    featured: true
  },
  {
    id: 3,
    name: "Kid's Fashion",
    count: 156,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
    href: "/shop?category=kids",
    featured: false
  },
];

const CategoryGrid = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections designed for every style and occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} to={category.href} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  {category.featured && (
                    <Badge className="absolute top-4 left-4 bg-rose-500 text-white">
                      Featured
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                <CardContent className="p-6 relative">
                  <div className="absolute -top-8 left-6 right-6">
                    <div className="bg-white rounded-lg p-4 shadow-lg">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {category.count} products
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 text-center">
                    <div className="inline-flex items-center text-rose-600 font-medium group-hover:underline">
                      Shop Now
                      <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Special Categories Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=300&fit=crop" 
              alt="Sale Collection"
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/80 to-pink-600/80 flex items-center justify-center">
              <div className="text-center text-white">
                <Badge className="bg-white text-red-600 mb-3">Up to 70% Off</Badge>
                <h3 className="text-2xl font-bold mb-2">End of Season Sale</h3>
                <p className="text-sm opacity-90">Limited time offer on selected items</p>
              </div>
            </div>
          </div>
          
          <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=300&fit=crop" 
              alt="New Arrivals"
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-indigo-600/80 flex items-center justify-center">
              <div className="text-center text-white">
                <Badge className="bg-white text-purple-600 mb-3">Just Dropped</Badge>
                <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
                <p className="text-sm opacity-90">Fresh styles from top designers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
