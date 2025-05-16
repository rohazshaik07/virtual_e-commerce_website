"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Filter, ArrowUpDown, MoreHorizontal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock orders data
const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    date: "2023-04-15",
    total: 149.99,
    status: "Delivered",
    items: 1,
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    date: "2023-04-14",
    total: 324.98,
    status: "Processing",
    items: 2,
  },
  {
    id: "ORD-003",
    customer: "Robert Johnson",
    email: "robert@example.com",
    date: "2023-04-13",
    total: 169.99,
    status: "Shipped",
    items: 1,
  },
  {
    id: "ORD-004",
    customer: "Emily Davis",
    email: "emily@example.com",
    date: "2023-04-12",
    total: 459.97,
    status: "Delivered",
    items: 3,
  },
  {
    id: "ORD-005",
    customer: "Michael Brown",
    email: "michael@example.com",
    date: "2023-04-11",
    total: 154.99,
    status: "Processing",
    items: 1,
  },
  {
    id: "ORD-006",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    date: "2023-04-10",
    total: 309.98,
    status: "Delivered",
    items: 2,
  },
  {
    id: "ORD-007",
    customer: "David Miller",
    email: "david@example.com",
    date: "2023-04-09",
    total: 169.99,
    status: "Cancelled",
    items: 1,
  },
  {
    id: "ORD-008",
    customer: "Jennifer Taylor",
    email: "jennifer@example.com",
    date: "2023-04-08",
    total: 149.99,
    status: "Delivered",
    items: 1,
  },
]

export default function OrdersPage() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState("date")
  const [sortDirection, setSortDirection] = useState("desc")

  // Filter and sort orders
  useEffect(() => {
    let filteredOrders = [...mockOrders]

    // Apply search filter
    if (searchQuery) {
      filteredOrders = filteredOrders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Apply sorting
    filteredOrders.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a]
      const bValue = b[sortField as keyof typeof b]

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return sortDirection === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number)
      }
    })

    setOrders(filteredOrders)
  }, [searchQuery, sortField, sortDirection])

  const handleSort = (field: string) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("desc")
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Processing":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Shipped":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      {/* Search and Filter */}
      <Card className="mb-8">
        <div className="p-4 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search orders..."
              className="pl-10 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-lg">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </Card>

      {/* Orders Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium">
                  <button className="flex items-center" onClick={() => handleSort("id")}>
                    Order ID
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  <button className="flex items-center" onClick={() => handleSort("customer")}>
                    Customer
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  <button className="flex items-center" onClick={() => handleSort("date")}>
                    Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  <button className="flex items-center" onClick={() => handleSort("total")}>
                    Total
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  <button className="flex items-center" onClick={() => handleSort("status")}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </button>
                </th>
                <th className="text-right py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-border/50 hover:bg-muted/50">
                  <td className="py-3 px-4">{order.id}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div>{order.customer}</div>
                      <div className="text-sm text-muted-foreground">{order.email}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{order.date}</td>
                  <td className="py-3 px-4">
                    <div>
                      <div>${order.total.toFixed(2)}</div>
                      <div className="text-sm text-muted-foreground">{order.items} item(s)</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link href={`/admin/orders/${order.id}`}>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                        </Link>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
