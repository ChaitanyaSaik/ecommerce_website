"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { CreditCard, LogOut, MapPin, Package, Settings, User, ChevronRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

// Sample order data
const sampleOrders = [
  {
    id: "ORD-12345",
    date: "2023-12-15",
    status: "Delivered",
    total: 329.97,
    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        price: 249.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&h=300&auto=format&fit=crop",
      },
      {
        id: 5,
        name: "Natural Face Moisturizer",
        price: 24.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?q=80&w=300&h=300&auto=format&fit=crop",
      },
      {
        id: 12,
        name: "Organic Herbal Tea Set",
        price: 19.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1563911892437-1feda0179e1b?q=80&w=300&h=300&auto=format&fit=crop",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    paymentMethod: "Credit Card (**** 1234)",
  },
  {
    id: "ORD-67890",
    date: "2023-11-28",
    status: "Processing",
    total: 149.98,
    items: [
      {
        id: 9,
        name: "Wireless Bluetooth Speaker",
        price: 79.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=300&h=300&auto=format&fit=crop",
      },
      {
        id: 10,
        name: "Leather Wallet",
        price: 49.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=300&h=300&auto=format&fit=crop",
      },
    ],
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
    },
    paymentMethod: "PayPal",
  },
]

export default function OrdersPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        // Get orders from localStorage or use sample data
        const storedOrders = localStorage.getItem("orders")
        if (storedOrders) {
          setOrders(JSON.parse(storedOrders))
        } else {
          // Use sample orders for demo
          setOrders(sampleOrders)
          localStorage.setItem("orders", JSON.stringify(sampleOrders))
        }
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    } else {
      // Redirect to sign in if not logged in
      router.push("/sign-in")
    }
    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  }

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
      case "Processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
      case "Shipped":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400"
      case "Cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
    }
  }

  if (isLoading) {
    return (
      <>
        <SiteHeader />
        <main className="container py-10">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <main className="container py-10">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Sidebar */}
          <aside className="md:w-1/4">
            <div className="sticky top-20 space-y-6 rounded-lg border p-4 dark:border-gray-800">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold">{user?.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              </div>
              <Separator />
              <nav className="flex flex-col space-y-1">
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/account" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>Profile</span>
                  </a>
                </Button>
                <Button variant="ghost" className="justify-start bg-primary/10" asChild>
                  <a href="/orders" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/wishlist" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    <span>Wishlist</span>
                  </a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/account/addresses" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>Addresses</span>
                  </a>
                </Button>
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/account/settings" className="flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </a>
                </Button>
                <Separator />
                <Button
                  variant="ghost"
                  className="justify-start text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/50"
                  onClick={handleLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </nav>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-3xl font-bold">My Orders</h1>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search orders..."
                  className="pl-8 w-full sm:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center dark:border-gray-800">
                <Package className="h-12 w-12 text-gray-400" />
                <h2 className="mt-4 text-lg font-medium">No orders found</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {searchQuery ? "Try a different search term." : "You haven't placed any orders yet."}
                </p>
                <Button className="mt-6" asChild>
                  <Link href="/">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="rounded-lg border dark:border-gray-800">
                    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-semibold">Order {order.id}</h2>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Placed on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-medium">${order.total.toFixed(2)}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {order.items.length} {order.items.length === 1 ? "item" : "items"}
                          </p>
                        </div>
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/orders/${order.id}`}>
                            <ChevronRight className="h-5 w-5" />
                            <span className="sr-only">View order details</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border dark:border-gray-800">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={64}
                                height={64}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium">{item.name}</h3>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

