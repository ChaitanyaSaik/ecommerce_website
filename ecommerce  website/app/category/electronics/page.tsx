import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { products } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { Separator } from "@/components/ui/separator"

export default function ElectronicsPage() {
  // Filter products by category
  const electronicsProducts = products.filter((product) => product.category === "Electronics")

  // Group products by subcategory
  const subcategories = {
    "Headphones & Audio": electronicsProducts.filter(
      (p) =>
        p.name.toLowerCase().includes("headphone") ||
        p.name.toLowerCase().includes("speaker") ||
        p.name.toLowerCase().includes("earbuds"),
    ),
    "Cameras & Photography": electronicsProducts.filter((p) => p.name.toLowerCase().includes("camera")),
    "Smart Devices": electronicsProducts.filter(
      (p) =>
        p.name.toLowerCase().includes("smart") ||
        p.name.toLowerCase().includes("watch") ||
        p.name.toLowerCase().includes("security"),
    ),
    Accessories: electronicsProducts.filter(
      (p) => p.name.toLowerCase().includes("keyboard") || p.name.toLowerCase().includes("power"),
    ),
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
          <div className="container py-12 md:py-16">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Electronics</h1>
            <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
              Discover the latest in technology with our premium selection of electronics. From headphones to smart
              devices, we have everything you need to stay connected.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container py-12">
          {/* Featured brands */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">Featured Brands</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {["Sony", "Apple", "Samsung", "Bose", "JBL", "Canon"].map((brand) => (
                <div
                  key={brand}
                  className="flex h-24 items-center justify-center rounded-lg border bg-white p-4 dark:border-gray-800 dark:bg-gray-950"
                >
                  <span className="text-lg font-medium">{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Subcategories */}
          {Object.entries(subcategories).map(
            ([subcategory, items]) =>
              items.length > 0 && (
                <div key={subcategory} className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold tracking-tight">{subcategory}</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  <Separator className="mt-12" />
                </div>
              ),
          )}

          {/* All electronics */}
          <div>
            <h2 className="mb-6 text-2xl font-bold tracking-tight">All Electronics</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {electronicsProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}

