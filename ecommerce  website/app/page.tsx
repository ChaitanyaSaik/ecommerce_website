import { HeroSlider } from "@/components/hero-slider"
import { ProductCarousel } from "@/components/product-carousel"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { products } from "@/data/products"

export default function Home() {
  // Filter products for different sections
  const featuredProducts = products.filter((product) => product.featured)
  const newArrivals = products.filter((product) => product.isNew)
  const discountedProducts = products.filter((product) => product.discount > 0)

  // Group products by category
  const categories = {}
  products.forEach((product) => {
    if (!categories[product.category]) {
      categories[product.category] = []
    }
    categories[product.category].push(product)
  })

  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero slider */}
        <section>
          <HeroSlider />
        </section>

        {/* Featured products */}
        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="container">
            <ProductCarousel title="Featured Products" products={featuredProducts} viewAllLink="/featured" />
          </div>
        </section>

        {/* Categories grid */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.keys(categories).map((category) => (
                <a
                  key={category}
                  href={`/category/${category.toLowerCase()}`}
                  className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800"
                >
                  <div className="aspect-square bg-gray-100 dark:bg-gray-700">
                    {/* Use the first product image from each category */}
                    <img
                      src={categories[category][0].image || "/placeholder.svg"}
                      alt={category}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white">{category}</h3>
                    <p className="text-sm text-white/80">{categories[category].length} products</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* New arrivals */}
        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="container">
            <ProductCarousel title="New Arrivals" products={newArrivals} viewAllLink="/new-arrivals" />
          </div>
        </section>

        {/* Special offers */}
        <section className="py-12 bg-gray-50 dark:bg-gray-900">
          <div className="container">
            <ProductCarousel title="Special Offers" products={discountedProducts} viewAllLink="/special-offers" />
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white dark:bg-gray-950">
          <div className="container">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Free Shipping</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">On all orders over $50</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Secure Payments</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">100% secure payment</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">Easy Returns</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">30 days return policy</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6 text-primary"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold">24/7 Support</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Dedicated support</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

