import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { products } from "@/data/products"
import { ProductCard } from "@/components/product-card"
import { Separator } from "@/components/ui/separator"

export default function BeautyPage() {
  // Filter products by category
  const beautyProducts = products.filter((product) => product.category === "Beauty")

  // Add some branded beauty products
  const brandedBeautyProducts = [
    {
      id: 301,
      name: "Estée Lauder Advanced Night Repair Serum",
      description: "Anti-aging serum that works overnight to reveal smoother, more radiant skin.",
      longDescription:
        "Wake up to more beautiful skin every day with Estée Lauder Advanced Night Repair Serum. This powerful night serum with Chronolux™ Power Signal Technology reduces the look of multiple signs of aging caused by the environmental assaults of modern life. Skin looks smoother and less lined, radiant, and more even toned. Hydrated with 72-hour hydration. Strengthened. Younger looking.",
      price: 75.99,
      originalPrice: 89.99,
      discount: 16,
      image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Beauty",
      brand: "Estée Lauder",
      color: "brown",
      rating: 4.8,
      reviewCount: 312,
      isNew: false,
      featured: true,
      sku: "ESTEE-301-BRN",
      createdAt: "2023-09-15T00:00:00.000Z",
    },
    {
      id: 302,
      name: "Fenty Beauty Pro Filt'r Foundation",
      description: "Long-wearing, light-as-air foundation with buildable medium to full coverage.",
      longDescription:
        "A soft matte, long-wearing foundation with buildable, medium to full coverage, in a boundary-breaking range of 50 shades. Finally — the ultimate photo filter in foundation form. Pro Filt'r Soft Matte Longwear Foundation gives skin an instantly smooth, pore-diffused, shine-free finish that easily builds to medium to full coverage. The oil-free formula is made with climate-adaptive technology that's resistant to sweat and humidity.",
      price: 36.99,
      originalPrice: 36.99,
      discount: 0,
      image: "https://images.unsplash.com/photo-1631214503851-a17ebcb2d97c?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Beauty",
      brand: "Fenty Beauty",
      color: "beige",
      rating: 4.7,
      reviewCount: 245,
      isNew: true,
      featured: true,
      sku: "FENTY-302-BGE",
      createdAt: "2023-11-10T00:00:00.000Z",
    },
    {
      id: 303,
      name: "Olaplex No. 3 Hair Perfector",
      description: "At-home treatment that reduces breakage and visibly strengthens hair.",
      longDescription:
        "Olaplex No. 3 Hair Perfector is not a conditioner, it's a weekly at-home treatment that reduces breakage and visibly strengthens hair, improving its look and feel. It restores your hair's healthy appearance and texture by repairing damage and protecting hair structure. Works on all hair types. Apply to damp hair, leave on for at least 10 minutes, then rinse, shampoo, and condition.",
      price: 28.99,
      originalPrice: 28.99,
      discount: 0,
      image: "https://images.unsplash.com/photo-1626108860700-7b0d1b5f5d3c?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Beauty",
      brand: "Olaplex",
      color: "white",
      rating: 4.9,
      reviewCount: 378,
      isNew: false,
      featured: true,
      sku: "OLAPLEX-303-WHT",
      createdAt: "2023-08-20T00:00:00.000Z",
    },
    {
      id: 304,
      name: "Drunk Elephant C-Firma Vitamin C Serum",
      description: "Potent antioxidant complex that firms and brightens skin while improving signs of photoaging.",
      longDescription:
        "Drunk Elephant C-Firma Vitamin C Serum is a super-potent vitamin C day serum packed with a powerful antioxidant complex, essential nutrients, fruit enzymes, and a chronopeptide that mimics the antioxidant benefits of vitamin D. C-Firma helps firm and brighten the appearance of skin while improving the signs of photoaging. The formula's reservoir effect stays active on skin for up to 72 hours and can't be washed or  The formula's reservoir effect stays active on skin for up to 72 hours and can't be washed or rubbed off, making it an ideal daytime treatment for all skin types.",
      price: 78.99,
      originalPrice: 89.99,
      discount: 12,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Beauty",
      brand: "Drunk Elephant",
      color: "orange",
      rating: 4.7,
      reviewCount: 203,
      isNew: true,
      featured: false,
      sku: "DRUNK-304-ORG",
      createdAt: "2023-10-25T00:00:00.000Z",
    },
    {
      id: 305,
      name: "La Mer Moisturizing Cream",
      description: "Luxurious cream that helps heal dryness and improve skin's appearance.",
      longDescription:
        "Experience the miracle of La Mer Moisturizing Cream. This luxurious cream with cell-renewing Miracle Broth™ helps heal dryness and improve skin's appearance. The ultra-rich formula deeply moisturizes and helps heal even the driest complexions. With daily use, skin appears softer, firmer, and more lifted. Redness and irritation are visibly diminished, and pores look reduced.",
      price: 190.99,
      originalPrice: 190.99,
      discount: 0,
      image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=300&h=300&auto=format&fit=crop",
      category: "Beauty",
      brand: "La Mer",
      color: "white",
      rating: 4.9,
      reviewCount: 156,
      isNew: false,
      featured: true,
      sku: "LAMER-305-WHT",
      createdAt: "2023-09-05T00:00:00.000Z",
    },
  ]

  const allBeautyProducts = [...beautyProducts, ...brandedBeautyProducts]

  // Group products by subcategory
  const subcategories = {
    Skincare: allBeautyProducts.filter(
      (p) =>
        p.name.toLowerCase().includes("serum") ||
        p.name.toLowerCase().includes("moisturizer") ||
        p.name.toLowerCase().includes("cream") ||
        p.name.toLowerCase().includes("face"),
    ),
    Makeup: allBeautyProducts.filter(
      (p) =>
        p.name.toLowerCase().includes("foundation") ||
        p.name.toLowerCase().includes("lipstick") ||
        p.name.toLowerCase().includes("mascara"),
    ),
    Haircare: allBeautyProducts.filter(
      (p) =>
        p.name.toLowerCase().includes("hair") ||
        p.name.toLowerCase().includes("shampoo") ||
        p.name.toLowerCase().includes("conditioner"),
    ),
    Fragrance: allBeautyProducts.filter(
      (p) =>
        p.name.toLowerCase().includes("perfume") ||
        p.name.toLowerCase().includes("cologne") ||
        p.name.toLowerCase().includes("fragrance"),
    ),
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero section */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/30 dark:to-purple-950/30">
          <div className="container py-12 md:py-16">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Beauty</h1>
            <p className="mt-4 max-w-3xl text-gray-600 dark:text-gray-400">
              Discover premium beauty products from top brands. From skincare to makeup, find everything you need for
              your beauty routine.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container py-12">
          {/* Featured brands */}
          <div className="mb-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight">Featured Brands</h2>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {["Estée Lauder", "Fenty Beauty", "Olaplex", "Drunk Elephant", "La Mer", "Glossier"].map((brand) => (
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

          {/* All beauty products */}
          <div>
            <h2 className="mb-6 text-2xl font-bold tracking-tight">All Beauty Products</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {allBeautyProducts.map((product) => (
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

