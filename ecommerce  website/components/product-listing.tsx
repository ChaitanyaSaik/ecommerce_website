"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Filter, Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ProductCard } from "@/components/product-card"
import { ProductFilters } from "@/components/product-filters"
import { CartSheet } from "@/components/cart-sheet"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/data/products"

export default function ProductListing() {
  const router = useRouter()
  const { cartItems, cartCount } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    colors: [],
    ratings: [],
  })
  const [sortOption, setSortOption] = useState("featured")
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  // Filter products based on search query and active filters
  const filteredProducts = products.filter((product) => {
    // Search filter
    if (
      searchQuery &&
      !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Category filter
    if (activeFilters.categories.length > 0 && !activeFilters.categories.includes(product.category)) {
      return false
    }

    // Price range filter
    if (product.price < activeFilters.priceRange.min || product.price > activeFilters.priceRange.max) {
      return false
    }

    // Color filter
    if (activeFilters.colors.length > 0 && !activeFilters.colors.includes(product.color)) {
      return false
    }

    // Rating filter
    if (activeFilters.ratings.length > 0 && !activeFilters.ratings.includes(Math.floor(product.rating))) {
      return false
    }

    return true
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "rating":
        return b.rating - a.rating
      default:
        return b.featured ? 1 : -1
    }
  })

  const handleFilterChange = (newFilters) => {
    setActiveFilters({ ...activeFilters, ...newFilters })
  }

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Header with search and cart */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Discover Products</h1>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:min-w-[300px]">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <CartSheet />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
        {/* Desktop filters */}
        <div className="hidden md:block">
          <ProductFilters activeFilters={activeFilters} onFilterChange={handleFilterChange} />
        </div>

        {/* Mobile filters */}
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2 md:hidden">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <div className="py-4">
              <ProductFilters
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClose={() => setMobileFiltersOpen(false)}
              />
            </div>
          </SheetContent>
        </Sheet>

        <div className="space-y-6">
          {/* Sort and filter controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:hidden">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filters
              </Button>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-sm text-gray-500 dark:text-gray-400">Sort by:</span>
              <select
                className="px-2 py-1 text-sm border rounded-md border-input bg-background"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {sortedProducts.length} of {products.length} products
          </div>

          {/* Product grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty state */}
          {sortedProducts.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="text-center">
                <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No products found</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <div className="mt-6">
                  <Button
                    onClick={() => {
                      setSearchQuery("")
                      setActiveFilters({
                        categories: [],
                        priceRange: { min: 0, max: 1000 },
                        colors: [],
                        ratings: [],
                      })
                    }}
                  >
                    Reset filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

