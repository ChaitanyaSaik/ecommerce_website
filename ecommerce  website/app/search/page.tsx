"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { products } from "@/data/products"
import { Search } from "lucide-react"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(query)
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    if (query) {
      performSearch(query)
    }
  }, [query])

  const performSearch = (searchTerm) => {
    const results = products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    setSearchResults(results)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      performSearch(searchQuery)
      // Update URL without refreshing the page
      const url = new URL(window.location)
      url.searchParams.set("q", searchQuery)
      window.history.pushState({}, "", url)
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="container py-10">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Search Results</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {searchResults.length} results found for "{query}"
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
            {/* Search and filters */}
            <div>
              <div className="sticky top-20 space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Search</h2>
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <Input
                        type="search"
                        placeholder="Search products..."
                        className="pl-9"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button type="submit">Search</Button>
                  </form>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Categories</h2>
                  <div className="space-y-2">
                    {Array.from(new Set(products.map((p) => p.category))).map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          setSearchQuery(category)
                          performSearch(category)
                        }}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Price Range</h2>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="w-full">
                      Under $50
                    </Button>
                    <Button variant="outline" className="w-full">
                      $50 - $100
                    </Button>
                    <Button variant="outline" className="w-full">
                      $100 - $200
                    </Button>
                    <Button variant="outline" className="w-full">
                      Over $200
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-6">
              {searchResults.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center dark:border-gray-800">
                  <Search className="h-12 w-12 text-gray-400" />
                  <h2 className="mt-4 text-lg font-medium">No results found</h2>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    We couldn't find any products matching "{query}". Try different keywords or browse our categories.
                  </p>
                  <Button className="mt-6" onClick={() => window.history.back()}>
                    Go Back
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {searchResults.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

