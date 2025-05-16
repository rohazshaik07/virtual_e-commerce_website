"use client"

import { useState, useEffect } from "react"
import { BarChart3, Package, ShoppingCart, Users, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalCustomers: 0,
    recentOrders: [],
    topProducts: [],
  })

  // Simulate fetching dashboard data
  useEffect(() => {
    // In a real app, this would be an API call
    setStats({
      totalSales: 24659.75,
      totalOrders: 156,
      totalProducts: 48,
      totalCustomers: 312,
      recentOrders: [
        {
          id: "ORD-001",
          customer: "John Doe",
          date: "2023-04-15",
          total: 1499.99,
          status: "Delivered",
        },
        {
          id: "ORD-002",
          customer: "Jane Smith",
          date: "2023-04-14",
          total: 3249.98,
          status: "Processing",
        },
        {
          id: "ORD-003",
          customer: "Robert Johnson",
          date: "2023-04-13",
          total: 1699.99,
          status: "Shipped",
        },
        {
          id: "ORD-004",
          customer: "Emily Davis",
          date: "2023-04-12",
          total: 4599.97,
          status: "Delivered",
        },
        {
          id: "ORD-005",
          customer: "Michael Brown",
          date: "2023-04-11",
          total: 1549.99,
          status: "Processing",
        },
      ],
      topProducts: [
        {
          id: 1,
          name: "Men Slim Fit Checkered Spread Collar Casual Shirt",
          sales: 42,
          revenue: 16719.58,
        },
        {
          id: 2,
          name: "Men Slim Fit Striped Spread Collar Casual Shirt",
          sales: 38,
          revenue: 15009.62,
        },
        {
          id: 3,
          name: "RUNAWAY Brown Linen Overshirt",
          sales: 35,
          revenue: 10114.65,
        },
        {
          id: 4,
          name: "Men Solid Polo Neck Polyester White T-Shirt",
          sales: 29,
          revenue: 7974.71,
        },
      ],
    })
  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Admin</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Sales</p>
                <h3 className="text-2xl font-bold mt-1">₹{stats.totalSales.toLocaleString()}</h3>
                <div className="flex items-center mt-2 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>12.5% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Orders</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalOrders}</h3>
                <div className="flex items-center mt-2 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>8.2% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Products</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalProducts}</h3>
                <div className="flex items-center mt-2 text-sm text-green-500">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>4.1% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Package className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Total Customers</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalCustomers}</h3>
                <div className="flex items-center mt-2 text-sm text-red-500">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>2.3% from last month</span>
                </div>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Recent Orders and Top Products */}
      <Tabs defaultValue="recent-orders" className="mb-8">
        <TabsList className="mb-4">
          <TabsTrigger value="recent-orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="top-products">Top Products</TabsTrigger>
        </TabsList>

        <TabsContent value="recent-orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Latest orders from your customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium">Customer</th>
                      <th className="text-left py-3 px-4 font-medium">Date</th>
                      <th className="text-left py-3 px-4 font-medium">Total</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentOrders.map((order: any) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-3 px-4">{order.id}</td>
                        <td className="py-3 px-4">{order.customer}</td>
                        <td className="py-3 px-4">{order.date}</td>
                        <td className="py-3 px-4">₹{order.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : order.status === "Shipped"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top-products">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Best selling products by revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium">Product</th>
                      <th className="text-left py-3 px-4 font-medium">Units Sold</th>
                      <th className="text-left py-3 px-4 font-medium">Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.topProducts.map((product: any) => (
                      <tr key={product.id} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="py-3 px-4">{product.name}</td>
                        <td className="py-3 px-4">{product.sales}</td>
                        <td className="py-3 px-4">₹{product.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sales Overview Chart Placeholder */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sales Overview</CardTitle>
          <CardDescription>Monthly sales performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-muted/30 rounded-lg">
            <div className="text-center">
              <BarChart3 className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Chart visualization would appear here</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
