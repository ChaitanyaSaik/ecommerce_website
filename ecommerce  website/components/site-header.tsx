"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CartSheet } from "@/components/cart-sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/hooks/use-cart"

export function SiteHeader() {
  const pathname = usePathname()
  const { cartCount } = useCart()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    window.location.href = "/"
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm dark:bg-gray-950/90" : "bg-white dark:bg-gray-950"
      }`}
    >
      {/* Top bar */}
      <div className="border-b border-gray-200 bg-gray-50 py-2 text-center text-sm dark:border-gray-800 dark:bg-gray-900">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline">Pay within 30 days with Klarna</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden md:inline">Not satisfied? Money back</span>
            <span className="hidden md:inline">•</span>
            <span className="hidden lg:inline">30 day trial*</span>
          </div>
          <div className="text-right">
            <Link href="/support" className="text-sm hover:underline">
              Customer support
            </Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container flex h-16 items-center justify-between py-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/" className={`${pathname === "/" ? "text-primary" : "text-foreground"} hover:text-primary`}>
                Home
              </Link>
              <Link
                href="/category/electronics"
                className={`${
                  pathname === "/category/electronics" ? "text-primary" : "text-foreground"
                } hover:text-primary`}
              >
                Electronics
              </Link>
              <Link
                href="/category/clothing"
                className={`${
                  pathname === "/category/clothing" ? "text-primary" : "text-foreground"
                } hover:text-primary`}
              >
                Clothing
              </Link>
              <Link
                href="/category/home"
                className={`${pathname === "/category/home" ? "text-primary" : "text-foreground"} hover:text-primary`}
              >
                Home & Kitchen
              </Link>
              <Link
                href="/category/beauty"
                className={`${pathname === "/category/beauty" ? "text-primary" : "text-foreground"} hover:text-primary`}
              >
                Beauty
              </Link>
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight">ShopNCS</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className={`${pathname === "/" ? "text-primary" : "text-foreground"} font-medium hover:text-primary`}
          >
            Home
          </Link>
          <Link
            href="/category/electronics"
            className={`${
              pathname === "/category/electronics" ? "text-primary" : "text-foreground"
            } font-medium hover:text-primary`}
          >
            Electronics
          </Link>
          <Link
            href="/category/clothing"
            className={`${
              pathname === "/category/clothing" ? "text-primary" : "text-foreground"
            } font-medium hover:text-primary`}
          >
            Clothing
          </Link>
          <Link
            href="/category/home"
            className={`${
              pathname === "/category/home" ? "text-primary" : "text-foreground"
            } font-medium hover:text-primary`}
          >
            Home & Kitchen
          </Link>
          <Link
            href="/category/beauty"
            className={`${
              pathname === "/category/beauty" ? "text-primary" : "text-foreground"
            } font-medium hover:text-primary`}
          >
            Beauty
          </Link>
        </nav>

        {/* Search and cart */}
        <div className="flex items-center gap-2">
          <form onSubmit={handleSearch} className="hidden sm:flex relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-[200px] lg:w-[300px] pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start gap-2 p-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account">My Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/wishlist">Wishlist</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/sign-in">
                <User className="h-5 w-5" />
                <span className="sr-only">Sign in</span>
              </Link>
            </Button>
          )}

          <CartSheet />
        </div>
      </div>
    </header>
  )
}

