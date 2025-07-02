
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, Eye } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useOrders } from '@/hooks/useOrders';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';

const Orders = () => {
  const { user } = useAuth();
  const { orders, isLoading } = useOrders();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-purple-100 text-purple-800';
      case 'shipped':
        return 'bg-green-100 text-green-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please sign in to view your orders</h1>
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
          <div className="text-lg">Loading your orders...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <Package className="h-24 w-24 mx-auto text-gray-300 mb-6" />
          <h1 className="text-2xl font-bold mb-4">No orders yet</h1>
          <p className="text-gray-600 mb-8">When you place an order, it will appear here.</p>
          <Link to="/shop">
            <Button>Start Shopping</Button>
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
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Order #{order.id.slice(0, 8)}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Placed on {format(new Date(order.created_at), 'MMM dd, yyyy')}
                    </p>
                  </div>
                  <div className="text-right">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    <p className="text-lg font-bold mt-2">
                      ${order.total_amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {order.order_items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.product.image_url || '/placeholder.svg'}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium">{item.product.name}</h4>
                        <div className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                          {item.size && ` • Size: ${item.size}`}
                          {item.color && ` • Color: ${item.color}`}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.unit_price.toFixed(2)} each</p>
                        <p className="text-sm text-gray-600">
                          Total: ${(item.quantity * item.unit_price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-6 pt-4 border-t">
                  <div className="flex space-x-4">
                    {order.tracking_number && (
                      <p className="text-sm text-gray-600">
                        Tracking: <span className="font-mono">{order.tracking_number}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        Reorder
                      </Button>
                    )}
                  </div>
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

export default Orders;
