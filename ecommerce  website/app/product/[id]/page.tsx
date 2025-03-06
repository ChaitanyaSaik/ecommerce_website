"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/hooks/use-cart"
import { products } from "@/data/products"

export default function ProductPage({ params }) {
  const { id } = params
  const product = products.find((p) => p.id.toString() === id)
  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button asChild className="mt-4">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity })
  }

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center mb-6 text-sm">
        <Link href="/" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
        <Link href="/" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
          {product.category}
        </Link>
        <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
        <span className="text-gray-900 dark:text-white">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
            {product.isNew && <Badge className="absolute top-2 right-2 z-10">New</Badge>}
            {product.discount > 0 && (
              <Badge variant="destructive" className="absolute top-2 left-2 z-10">
                {product.discount}% OFF
              </Badge>
            )}
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="cursor-pointer overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  width={150}
                  height={150}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h1>
            <div className="mt-2 flex items-center gap-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({product.reviewCount} reviews)</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">SKU: {product.sku}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-xl text-gray-500 line-through dark:text-gray-400">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
            {product.discount > 0 && <Badge variant="destructive">Save {product.discount}%</Badge>}
          </div>

          <p className="text-gray-700 dark:text-gray-300">{product.description}</p>

          <div className="space-y-4 border-t border-b py-4 border-gray-200 dark:border-gray-800">
            {/* Color options */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</h3>
              <div className="flex gap-2">
                {["black", "white", "gray", "red", "blue"].map((color) => (
                  <div
                    key={color}
                    className={`h-8 w-8 cursor-pointer rounded-full border-2 ${
                      color === product.color ? "border-primary" : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size options */}
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Size</h3>
                <Button variant="link" className="h-auto p-0 text-sm">
                  Size Guide
                </Button>
              </div>
              <div className="mt-2 grid grid-cols-5 gap-2">
                {["XS", "S", "M", "L", "XL"].map((size) => (
                  <Button key={size} variant="outline" className={size === "M" ? "border-primary bg-primary/10" : ""}>
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Quantity</h3>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex h-9 w-12 items-center justify-center border-y border-input bg-transparent text-center text-sm font-medium">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-l-none"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Stock and delivery info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-500">
              <div className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-500" />
              In stock and ready to ship
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Truck className="h-4 w-4" />
              Free shipping on orders over $50
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              <Heart className="mr-2 h-5 w-5" />
              Add to Wishlist
            </Button>
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details & Specs</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="py-4">
            <div className="prose max-w-none dark:prose-invert">
              <p>
                {product.longDescription ||
                  `${product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`}
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
                laborum.
              </p>
              <h3>Features</h3>
              <ul>
                <li>Premium quality materials</li>
                <li>Durable and long-lasting</li>
                <li>Comfortable fit</li>
                <li>Versatile design</li>
                <li>Easy to care for</li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="details" className="py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Product Specifications</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">Material</span>
                      <span>Premium Cotton</span>
                    </li>
                    <li className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">Weight</span>
                      <span>0.5 kg</span>
                    </li>
                    <li className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">Dimensions</span>
                      <span>30 x 20 x 10 cm</span>
                    </li>
                    <li className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">Country of Origin</span>
                      <span>United States</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Shipping & Returns</h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                      <span>Free over $50</span>
                    </li>
                    <li className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">Delivery</span>
                      <span>3-5 business days</span>
                    </li>
                    <li className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">Returns</span>
                      <span>30 days</span>
                    </li>
                    <li className="flex justify-between border-b pb-2 border-gray-200 dark:border-gray-800">
                      <span className="text-gray-500 dark:text-gray-400">Warranty</span>
                      <span>1 year</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="py-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-2 rounded-lg border p-4 border-gray-200 dark:border-gray-800">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">John Doe</h4>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`h-4 w-4 ${j < 5 - (i % 2) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Great product! Exactly as described and arrived quickly. Would definitely recommend.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related products */}
      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">You might also like</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
            >
              <Link href={`/product/${relatedProduct.id}`} className="aspect-square overflow-hidden">
                <Image
                  src={relatedProduct.image || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <div className="flex flex-1 flex-col p-4">
                <Link
                  href={`/product/${relatedProduct.id}`}
                  className="mb-2 text-base font-semibold text-gray-900 hover:underline dark:text-white"
                >
                  {relatedProduct.name}
                </Link>
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    ${relatedProduct.price.toFixed(2)}
                  </span>
                  <Button variant="outline" size="sm" className="h-8 rounded-full">
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
  )
}

