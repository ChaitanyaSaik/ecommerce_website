"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Premium Wireless Headphones",
    subtitle: "Robust, flexible and extremely customizable.",
    description: "Experience immersive sound with our premium wireless headphones.",
    buttonText: "Shop now",
    buttonLink: "/product/1",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&h=600&auto=format&fit=crop",
    bgColor: "bg-teal-50 dark:bg-teal-950/30",
  },
  {
    id: 2,
    title: "Smart Fitness Watches",
    subtitle: "Track your fitness goals with precision.",
    description: "Stay on top of your health with advanced tracking features.",
    buttonText: "Explore collection",
    buttonLink: "/category/electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&h=600&auto=format&fit=crop",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
  },
  {
    id: 3,
    title: "Stylish Home Decor",
    subtitle: "Transform your living space.",
    description: "Discover our collection of modern and elegant home accessories.",
    buttonText: "View products",
    buttonLink: "/category/home",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1200&h=600&auto=format&fit=crop",
    bgColor: "bg-amber-50 dark:bg-amber-950/30",
  },
]

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goToSlide = useCallback(
    (index) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrentSlide(index)
      setTimeout(() => setIsAnimating(false), 500)
    },
    [isAnimating],
  )

  const nextSlide = useCallback(() => {
    goToSlide((currentSlide + 1) % slides.length)
  }, [currentSlide, goToSlide, slides.length])

  const prevSlide = useCallback(() => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length)
  }, [currentSlide, goToSlide, slides.length])

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="relative overflow-hidden">
      <div
        className="relative flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className={`min-w-full ${slide.bgColor}`}>
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-8 py-12 md:py-24 items-center">
              <div className="space-y-6 order-2 md:order-1">
                <div>
                  <h2 className="text-lg font-medium text-gray-600 dark:text-gray-400">{slide.subtitle}</h2>
                  <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{slide.title}</h1>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md">{slide.description}</p>
                <Button size="lg" asChild>
                  <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                </Button>
              </div>
              <div className="relative h-[300px] md:h-[400px] lg:h-[500px] order-1 md:order-2">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-gray-800 shadow-md hover:bg-white dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-800"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 text-gray-800 shadow-md hover:bg-white dark:bg-gray-800/80 dark:text-gray-200 dark:hover:bg-gray-800"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? "w-8 bg-primary" : "bg-gray-300 dark:bg-gray-600"
            }`}
            onClick={() => goToSlide(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

