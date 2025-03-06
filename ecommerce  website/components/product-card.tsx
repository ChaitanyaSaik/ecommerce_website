"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Star } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/hooks/use-cart"

export function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [isInWishlist, setIsInWishlist] = useState(false)

  useEffect(() => {
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")
    setIsInWishlist(wishlist.some((item) => item.id === product.id))
  }, [product.id])

  const toggleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]")

    if (isInWishlist) {
      // Remove from wishlist
      const updatedWishlist = wishlist.filter((item) => item.id !== product.id)
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setIsInWishlist(false)
    } else {
      // Add to wishlist
      const updatedWishlist = [...wishlist, product]
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist))
      setIsInWishlist(true)
    }
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
      {product.isNew && <Badge className="absolute top-2 right-2 z-10">New</Badge>}
      {product.discount > 0 && (
        <Badge variant="destructive" className="absolute top-2 left-2 z-10">
          {product.discount}% OFF
        </Badge>
      )}
      <Link href={`/product/${product.id}`} className="aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{product.category}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-sm font-medium text-gray-600 dark:text-gray-300">{product.rating}</span>
          </div>
        </div>
        <Link
          href={`/product/${product.id}`}
          className="mb-2 flex-1 text-lg font-semibold text-gray-900 hover:underline dark:text-white"
        >
          {product.name}
        </Link>
        <p className="mb-4 line-clamp-2 text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through dark:text-gray-400">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className={`h-8 w-8 rounded-full ${isInWishlist ? "text-red-500 hover:text-red-600" : ""}`}
              aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
              onClick={toggleWishlist}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
            </Button>
            <Button size="sm" className="h-8 rounded-full" onClick={() => addToCart(product)}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

