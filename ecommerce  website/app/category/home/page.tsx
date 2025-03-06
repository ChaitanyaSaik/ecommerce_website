import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { products } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { Separator } from "@/components/ui/separator"

export default function HomeAndKitchenPage() {
  // Filter products by category
  const homeProducts = products.filter(
    (product) =>
      product.category === "Home & Kitchen" || product.category === "Home & Garden" || product.category === "Furniture",
  )

  // Add some branded home products
  const brandedHomeProducts = [
    {
      id: 201,
      name: "KitchenAid Stand Mixer",
      description: "Powerful stand mixer with 10 speeds and multiple attachments.",
      longDescription:
        "Take your culinary creations to the next level with the KitchenAid Stand Mixer. This powerful mixer features 10 speeds to thoroughly mix, knead and whip ingredients with ease. The tilt-head design allows clear access to the bowl and attached beater, making adding ingredients simple. Includes coated flat beater, coated dough hook, and wire whip.",
      price: 349.99,
      originalPrice: 399.99,
      discount: 13,
      image: "https://images.unsplash.com/photo-1594486374298-3d5ec5a62320?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Home & Kitchen",
      brand: "KitchenAid",
      color: "red",
      rating: 4.9,
      reviewCount: 245,
      isNew: false,
      featured: true,
      sku: "KITCHENAID-201-RED",
      createdAt: "2023-09-10T00:00:00.000Z",
    },
    {
      id: 202,
      name: "Dyson V11 Cordless Vacuum",
      description: "Powerful cordless vacuum with intelligent suction and LCD screen.",
      longDescription:
        "Experience powerful cleaning with the Dyson V11 Cordless Vacuum. This intelligent vacuum automatically optimizes suction and run time across all floor types. The LCD screen displays current performance, remaining run time, and maintenance alerts. The whole-machine filtration captures 99.99% of particles, dust, and allergens as small as 0.3 microns.",
      price: 599.99,
      originalPrice: 699.99,
      discount: 14,
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Home & Kitchen",
      brand: "Dyson",
      color: "gray",
      rating: 4.8,
      reviewCount: 187,
      isNew: true,
      featured: true,
      sku: "DYSON-202-GRY",
      createdAt: "2023-11-05T00:00:00.000Z",
    },
    {
      id: 203,
      name: "Nespresso Vertuo Coffee Maker",
      description: "Versatile coffee machine for espresso and coffee with Centrifusion technology.",
      longDescription:
        "Enjoy barista-quality coffee at home with the Nespresso Vertuo Coffee Maker. This versatile machine uses Centrifusion technology to brew both espresso and coffee with the perfect crema. The one-touch brewing system automatically recognizes each capsule and adjusts brewing parameters accordingly. Includes a welcome set of Nespresso Vertuo capsules.",
      price: 199.99,
      originalPrice: 249.99,
      discount: 20,
      image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Home & Kitchen",
      brand: "Nespresso",
      color: "black",
      rating: 4.7,
      reviewCount: 156,
      isNew: false,
      featured: true,
      sku: "NESPRESSO-203-BLK",
      createdAt: "2023-10-15T00:00:00.000Z",
    },
    {
      id: 204,
      name: "Le Creuset Dutch Oven",
      description: "Enameled cast iron dutch oven for superior heat retention and distribution.",
      longDescription:
        "Create delicious meals with the Le Creuset Dutch Oven. This enameled cast iron pot offers superior heat retention and even heat distribution, making it perfect for slow cooking, roasting, baking, and frying. The colorful exterior enamel resists chipping and cracking, while the interior enamel makes it easy to monitor cooking progress. Suitable for all cooktops and oven-safe.",
      price: 369.99,
      originalPrice: 399.99,
      discount: 8,
      image: "https://images.unsplash.com/photo-1585442245979-b2de64fea8cb?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Home & Kitchen",
      brand: "Le Creuset",
      color: "orange",
      rating: 4.9,
      reviewCount: 132,
      isNew: false,
      featured: true,
      sku: "LECREUSET-204-ORG",
      createdAt: "2023-09-25T00:00:00.000Z",
    },
    {
      id: 205,
      name: "Philips Air Fryer XXL",
      description: "Large capacity air fryer with fat removal technology for healthier cooking.",
      longDescription:
        "Enjoy healthier fried foods with the Philips Air Fryer XXL. This large capacity air fryer uses fat removal technology to extract and capture excess fat, making your meals healthier. The rapid air technology ensures crispy exteriors and tender interiors with little to no oil. The digital display and preset cooking programs make operation simple and convenient.",
      price: 249.99,
      originalPrice: 299.99,
      discount: 17,
      image: "https://images.unsplash.com/photo-1598511726623-d3e9f2db00e9?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Home & Kitchen",
      brand: "Philips",
      color: "black",
      rating: 4.6,
      reviewCount: 178,
      isNew: true,
      featured: false,
      sku: "PHILIPS-205-BLK",
      createdAt: "2023-11-15T00:00:00.000Z",
    },
  ]

  const allHomeProducts = [...homeProducts, ...brandedHomeProducts]

  // Group products by subcategory
  const subcategories = {
    "Kitchen Appliances": allHomeProducts.filter(
      (p) =>
        p.name.toLowerCase().includes("mixer") ||
        p.name.toLowerCase().includes("coffee") ||
        p.name.toLowerCase().includes("air fryer"),
    ),
    "Cookware & Bakeware": allHomeProducts.filter(
      (p) =>
        p.name.toLowerCase().includes("knife") ||
        p.name.toLowerCase().includes("dutch oven") ||
        p.name.toLowerCase().includes("cheese"),
    ),
    "Home Decor": allHomeProducts.filter(
      (p) =>
        p.name.toLowerCase().includes("candle") ||
        p.name.toLowerCase().includes("clock") ||
        p.name.toLowerCase().includes("towel"),
    ),
    "Cleaning & Organization": allHomeProducts.filter((p) => p.name.toLowerCase().includes("vacuum")),
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
          <div className="container py-12 md:py-16">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Home & Kitchen</h1>
            <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
              Transform your living space with our premium selection of home and kitchen products. From appliances to
              decor, find everything you need to create your perfect home.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container py-12">
          {/* Featured brands */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">Featured Brands</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {["KitchenAid", "Dyson", "Nespresso", "Le Creuset", "Philips", "Cuisinart"].map((brand) => (
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

          {/* All home products */}
          <div>
            <h2 className="mb-6 text-2xl font-bold tracking-tight">All Home & Kitchen Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allHomeProducts.map((product) => (
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

