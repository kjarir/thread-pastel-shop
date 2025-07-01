
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "The Ultimate Guide to Sustainable Fashion",
    excerpt: "Discover how to build a eco-friendly wardrobe without compromising on style. Learn about sustainable materials and ethical brands.",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=250&fit=crop",
    author: "Emma Green",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Sustainability",
    href: "/blog/sustainable-fashion-guide"
  },
  {
    id: 2,
    title: "Spring Fashion Trends You Need to Know",
    excerpt: "From pastel colors to flowy fabrics, explore the hottest trends for spring 2024 and how to incorporate them into your wardrobe.",
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=250&fit=crop",
    author: "Style Team",
    date: "March 12, 2024",
    readTime: "3 min read",
    category: "Trends",
    href: "/blog/spring-fashion-trends"
  },
  {
    id: 3,
    title: "How to Style Vintage Pieces for Modern Looks",
    excerpt: "Master the art of mixing vintage finds with contemporary pieces to create unique, eye-catching outfits that stand out.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=250&fit=crop",
    author: "Vintage Vibes",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Styling",
    href: "/blog/vintage-styling-guide"
  }
];

const BlogPreview = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Style Stories & Tips</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get inspired with our latest fashion insights, styling tips, and trend reports
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} to={post.href} className="group">
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute top-4 left-4 bg-white text-gray-900 shadow-md">
                    {post.category}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-rose-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-rose-600 font-medium hover:underline"
          >
            View All Articles
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
