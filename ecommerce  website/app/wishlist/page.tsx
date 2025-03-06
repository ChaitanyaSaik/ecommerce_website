"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogOut, MapPin, Package, Settings, User, Heart, ShoppingCart, Trash2 } from "lucide-react"
import { products } from "@/data/products"
import { useCart } from "@/hooks/use-cart"

export default function WishlistPage() {
  const router = useRouter()
  const { addToCart } = useCart()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [wishlist, setWishlist] = useState([])

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)

        // Get wishlist from localStorage or create empty array
        const storedWishlist = localStorage.getItem("wishlist")
        if (storedWishlist) {
          setWishlist(JSON.parse(storedWishlist))
        } else {
          // Use sample wishlist for demo
          const sampleWishlist = [1, 9, 15, 20]
            .map((id) => products.find((product) => product.id === id))
            .filter(Boolean)

          setWishlist(sampleWishlist)
          localStorage.setItem("wishlist", JSON.stringify(sampleWishlist))
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

  const handleRemoveFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId)
    setWishlist(updatedWishlist)
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
  }

  const handleAddToCart = (product) => {
    addToCart(product)
    // Optionally remove from wishlist after adding to cart
    // handleRemoveFromWishlist(product.id)
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
                <Button variant="ghost" className="justify-start" asChild>
                  <a href="/orders" className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span>Orders</span>
                  </a>
                </Button>
                <Button variant="ghost" className="justify-start bg-primary/10" asChild>
                  <a href="/wishlist" className="flex items-center gap-2">
                    <Heart className="h-4 w-4" />
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
            <h1 className="mb-6 text-3xl font-bold">My Wishlist</h1>

            {wishlist.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center dark:border-gray-800">
                <Heart className="h-12 w-12 text-gray-400" />
                <h2 className="mt-4 text-lg font-medium">Your wishlist is empty</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Save items you love to your wishlist and they'll appear here.
                </p>
                <Button className="mt-6" asChild>
                  <Link href="/">Start Shopping</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-lg border dark:border-gray-800">
                  <div className="p-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {wishlist.map((item) => (
                        <div
                          key={item.id}
                          className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
                        >
                          <Link href={`/product/${item.id}`} className="aspect-square overflow-hidden">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={300}
                              height={300}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </Link>
                          <div className="flex flex-1 flex-col p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {item.category}
                              </span>
                              <div className="flex items-center">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500"
                                  onClick={() => handleRemoveFromWishlist(item.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span className="sr-only">Remove from wishlist</span>
                                </Button>
                              </div>
                            </div>
                            <Link
                              href={`/product/${item.id}`}
                              className="mb-2 flex-1 text-lg font-semibold text-gray-900 hover:underline dark:text-white"
                            >
                              {item.name}
                            </Link>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold text-gray-900 dark:text-white">
                                  ${item.price.toFixed(2)}
                                </span>
                                {item.originalPrice > item.price && (
                                  <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                                    ${item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <Button size="sm" className="h-8 rounded-full" onClick={() => handleAddToCart(item)}>
                                <ShoppingCart className="mr-2 h-4 w-4" />
                                Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

