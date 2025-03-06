import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { products } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { Separator } from "@/components/ui/separator"

export default function ClothingPage() {
  // Filter products by category
  const clothingProducts = products.filter((product) => product.category === "Clothing")

  // Add some branded clothing products
  const brandedClothing = [
    {
      id: 101,
      name: "Nike Dri-FIT Running Shirt",
      description: "Moisture-wicking fabric keeps you dry and comfortable during workouts.",
      longDescription:
        "Stay cool and dry with the Nike Dri-FIT Running Shirt. Designed with moisture-wicking technology, this shirt pulls sweat away from your skin for quicker evaporation, helping you stay comfortable during your run. The lightweight fabric and ergonomic seams allow for a full range of motion.",
      price: 35.99,
      originalPrice: 45.99,
      discount: 22,
      image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Clothing",
      brand: "Nike",
      color: "blue",
      rating: 4.7,
      reviewCount: 128,
      isNew: false,
      featured: true,
      sku: "NIKE-101-BLU",
      createdAt: "2023-10-15T00:00:00.000Z",
    },
    {
      id: 102,
      name: "Adidas Originals T-Shirt",
      description: "Classic cotton t-shirt with iconic Adidas trefoil logo.",
      longDescription:
        "Show off your style with this Adidas Originals T-Shirt. Made from soft cotton fabric, this classic tee features the iconic Adidas trefoil logo on the chest. The regular fit and ribbed crew neck provide comfort for everyday wear, making it a versatile addition to your casual wardrobe.",
      price: 29.99,
      originalPrice: 29.99,
      discount: 0,
      image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Clothing",
      brand: "Adidas",
      color: "white",
      rating: 4.5,
      reviewCount: 94,
      isNew: true,
      featured: false,
      sku: "ADIDAS-102-WHT",
      createdAt: "2023-11-05T00:00:00.000Z",
    },
    {
      id: 103,
      name: "Levi's 501 Original Fit Jeans",
      description: "Iconic straight leg jeans with button fly and five-pocket styling.",
      longDescription:
        "A cultural icon. The Levi's 501 Original Fit Jeans are the original blue jeans that started it all. Featuring a straight leg fit with the signature button fly and five-pocket styling, these jeans sit at the waist and are regular through the thigh. Made from durable denim, they're designed to be worn and loved for years.",
      price: 69.99,
      originalPrice: 79.99,
      discount: 13,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Clothing",
      brand: "Levi's",
      color: "blue",
      rating: 4.8,
      reviewCount: 215,
      isNew: false,
      featured: true,
      sku: "LEVIS-103-BLU",
      createdAt: "2023-09-20T00:00:00.000Z",
    },
    {
      id: 104,
      name: "Under Armour Performance Polo",
      description: "Lightweight, anti-odor polo shirt perfect for golf or casual wear.",
      longDescription:
        "Elevate your game with the Under Armour Performance Polo. This lightweight, anti-odor shirt features UA's signature moisture-wicking technology to keep you dry and comfortable on or off the course. The 4-way stretch construction moves better in every direction, while the material prevents growth of odor-causing microbes.",
      price: 49.99,
      originalPrice: 59.99,
      discount: 17,
      image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Clothing",
      brand: "Under Armour",
      color: "black",
      rating: 4.6,
      reviewCount: 78,
      isNew: true,
      featured: false,
      sku: "UA-104-BLK",
      createdAt: "2023-11-15T00:00:00.000Z",
    },
    {
      id: 105,
      name: "The North Face Fleece Jacket",
      description: "Warm, lightweight fleece jacket for outdoor adventures.",
      longDescription:
        "Stay warm without the bulk with The North Face Fleece Jacket. This lightweight, soft fleece provides exceptional warmth while remaining breathable for comfort during outdoor activities. The full-zip design and stand-up collar help block the wind, while the zippered pockets keep your essentials secure.",
      price: 89.99,
      originalPrice: 99.99,
      discount: 10,
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Clothing",
      brand: "The North Face",
      color: "gray",
      rating: 4.9,
      reviewCount: 156,
      isNew: false,
      featured: true,
      sku: "TNF-105-GRY",
      createdAt: "2023-10-05T00:00:00.000Z",
    },
  ]

  const allClothingProducts = [...clothingProducts, ...brandedClothing]

  // Group products by brand
  const brands = {}
  allClothingProducts.forEach((product) => {
    const brand = product.brand || "Other"
    if (!brands[brand]) {
      brands[brand] = []
    }
    brands[brand].push(product)
  })

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30">
          <div className="container py-12 md:py-16">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Clothing</h1>
            <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
              Discover the latest fashion trends from top brands. From casual wear to athletic apparel, find the perfect
              addition to your wardrobe.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container py-12">
          {/* Featured brands */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">Featured Brands</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {["Nike", "Adidas", "Levi's", "Under Armour", "The North Face", "H&M"].map((brand) => (
                <div
                  key={brand}
                  className="flex h-24 items-center justify-center rounded-lg border bg-white p-4 dark:border-gray-800 dark:bg-gray-950"
                >
                  <span className="text-lg font-medium">{brand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Brands */}
          {Object.entries(brands).map(
            ([brand, items]) =>
              items.length > 0 && (
                <div key={brand} className="mb-12">
                  <h2 className="mb-6 text-2xl font-bold tracking-tight">{brand}</h2>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {items.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                  <Separator className="mt-12" />
                </div>
              ),
          )}

          {/* All clothing */}
          <div>
            <h2 className="mb-6 text-2xl font-bold tracking-tight">All Clothing</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allClothingProducts.map((product) => (
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

