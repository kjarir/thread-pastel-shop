import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Admin = () => {
  const { user, isAdmin, loading } = useAuth();
  const { data: categories } = useCategories();
  const { data: products } = useProducts();
  const navigate = useNavigate();

  // Fetch admin statistics
  const { data: adminStats } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [ordersRes, revenueRes] = await Promise.all([
        supabase.from('orders').select('id, total_amount, status, created_at'),
        supabase.from('orders').select('total_amount').eq('status', 'delivered')
      ]);

      const orders = ordersRes.data || [];
      const completedOrders = revenueRes.data || [];
      const totalRevenue = completedOrders.reduce((sum, order) => sum + Number(order.total_amount), 0);
      
      return {
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        completedOrders: completedOrders.length,
        recentOrders: orders.slice(0, 5)
      };
    },
    enabled: !!user && isAdmin,
  });

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (!user || !isAdmin) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-4 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-gray-600 mt-2">Manage your store products and categories</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="dashboard" className="text-xs sm:text-sm">Dashboard</TabsTrigger>
            <TabsTrigger value="products" className="text-xs sm:text-sm">Products</TabsTrigger>
            <TabsTrigger value="categories" className="text-xs sm:text-sm">Categories</TabsTrigger>
            <TabsTrigger value="orders" className="text-xs sm:text-sm">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{products?.length || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold">{adminStats?.totalOrders || 0}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    ${adminStats?.totalRevenue?.toFixed(2) || '0.00'}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xl sm:text-2xl font-bold text-orange-600">
                    {adminStats?.pendingOrders || 0}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Order ID</TableHead>
                        <TableHead className="text-xs sm:text-sm">Amount</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminStats?.recentOrders?.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="text-xs sm:text-sm font-mono">
                            {order.id.slice(0, 8)}...
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">${order.total_amount}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={order.status === 'delivered' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold">Products</h2>
              <Button className="bg-rose-500 hover:bg-rose-600 text-sm">Add Product</Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Name</TableHead>
                        <TableHead className="text-xs sm:text-sm">Price</TableHead>
                        <TableHead className="text-xs sm:text-sm">Stock</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products?.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="font-medium text-xs sm:text-sm">
                            {product.name}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">${product.price}</TableCell>
                          <TableCell className="text-xs sm:text-sm">{product.stock_quantity}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={product.is_active ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {product.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="text-xs">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold">Categories</h2>
              <Button className="bg-rose-500 hover:bg-rose-600 text-sm">Add Category</Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Name</TableHead>
                        <TableHead className="text-xs sm:text-sm">Slug</TableHead>
                        <TableHead className="text-xs sm:text-sm">Parent</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {categories?.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium text-xs sm:text-sm">
                            {category.name}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">{category.slug}</TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            {category.parent_id ? 'Subcategory' : 'Main Category'}
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={category.is_active ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {category.is_active ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="text-xs">
                              Edit
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-4 sm:space-y-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
              <h2 className="text-lg sm:text-xl font-semibold">All Orders</h2>
            </div>
            
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">Order ID</TableHead>
                        <TableHead className="text-xs sm:text-sm">Amount</TableHead>
                        <TableHead className="text-xs sm:text-sm">Status</TableHead>
                        <TableHead className="text-xs sm:text-sm">Date</TableHead>
                        <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminStats?.recentOrders?.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="text-xs sm:text-sm font-mono">
                            {order.id.slice(0, 8)}...
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">${order.total_amount}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={order.status === 'delivered' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            {new Date(order.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" className="text-xs">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
