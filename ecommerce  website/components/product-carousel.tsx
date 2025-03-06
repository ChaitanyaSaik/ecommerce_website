"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"

export function ProductCarousel({ title, products, viewAllLink }) {
  const carouselRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const checkScrollButtons = () => {
    if (!carouselRef.current) return

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScrollButtons()
    window.addEventListener("resize", checkScrollButtons)
    return () => window.removeEventListener("resize", checkScrollButtons)
  }, [])

  const scrollLeft = () => {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: -300, behavior: "smooth" })
    setTimeout(checkScrollButtons, 300)
  }

  const scrollRight = () => {
    if (!carouselRef.current) return
    carouselRef.current.scrollBy({ left: 300, behavior: "smooth" })
    setTimeout(checkScrollButtons, 300)
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {viewAllLink && (
          <Button variant="link" asChild>
            <Link href={viewAllLink}>View all</Link>
          </Button>
        )}
      </div>

      <div className="relative">
        {canScrollLeft && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-gray-800 shadow-md hover:bg-white dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-800"
            onClick={scrollLeft}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Scroll left</span>
          </Button>
        )}

        <div
          ref={carouselRef}
          className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide"
          onScroll={checkScrollButtons}
        >
          {products.map((product) => (
            <div key={product.id} className="min-w-[250px] md:min-w-[280px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {canScrollRight && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-gray-800 shadow-md hover:bg-white dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-800"
            onClick={scrollRight}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Scroll right</span>
          </Button>
        )}
      </div>
    </div>
  )
}

