"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample data for filters
const categories = ["Electronics", "Clothing", "Home & Kitchen", "Beauty", "Sports", "Books", "Toys"]

const colors = [
  { name: "Black", value: "black" },
  { name: "White", value: "white" },
  { name: "Gray", value: "gray" },
  { name: "Red", value: "red" },
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Yellow", value: "yellow" },
]

const ratings = [5, 4, 3, 2, 1]

export function ProductFilters({ activeFilters, onFilterChange, onClose }) {
  const [priceRange, setPriceRange] = useState([activeFilters.priceRange.min, activeFilters.priceRange.max])

  const handleCategoryChange = (category) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter((c) => c !== category)
      : [...activeFilters.categories, category]
    onFilterChange({ categories: newCategories })
  }

  const handleColorChange = (color) => {
    const newColors = activeFilters.colors.includes(color)
      ? activeFilters.colors.filter((c) => c !== color)
      : [...activeFilters.colors, color]
    onFilterChange({ colors: newColors })
  }

  const handleRatingChange = (rating) => {
    const newRatings = activeFilters.ratings.includes(rating)
      ? activeFilters.ratings.filter((r) => r !== rating)
      : [...activeFilters.ratings, rating]
    onFilterChange({ ratings: newRatings })
  }

  const handlePriceChange = (values) => {
    setPriceRange(values)
    onFilterChange({
      priceRange: { min: values[0], max: values[1] },
    })
  }

  const clearAllFilters = () => {
    setPriceRange([0, 1000])
    onFilterChange({
      categories: [],
      priceRange: { min: 0, max: 1000 },
      colors: [],
      ratings: [],
    })
  }

  const hasActiveFilters =
    activeFilters.categories.length > 0 ||
    activeFilters.colors.length > 0 ||
    activeFilters.ratings.length > 0 ||
    activeFilters.priceRange.min > 0 ||
    activeFilters.priceRange.max < 1000

  return (
    <div className="sticky top-20 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        {onClose && (
          <Button variant="ghost" size="sm" className="md:hidden" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {hasActiveFilters && (
        <Button variant="outline" size="sm" className="w-full" onClick={clearAllFilters}>
          Clear all filters
        </Button>
      )}

      <Accordion type="multiple" defaultValue={["category", "price", "color", "rating"]}>
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={activeFilters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm font-normal cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider
                defaultValue={[activeFilters.priceRange.min, activeFilters.priceRange.max]}
                max={1000}
                step={10}
                value={priceRange}
                onValueChange={handlePriceChange}
              />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">${priceRange[0].toFixed(0)}</span>
                <span className="text-sm font-medium">${priceRange[1].toFixed(0)}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-sm font-medium">Color</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {colors.map((color) => (
                <div key={color.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`color-${color.value}`}
                    checked={activeFilters.colors.includes(color.value)}
                    onCheckedChange={() => handleColorChange(color.value)}
                  />
                  <div className="flex items-center gap-2">
                    <div
                      className="h-4 w-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.value }}
                    />
                    <Label htmlFor={`color-${color.value}`} className="text-sm font-normal cursor-pointer">
                      {color.name}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="rating">
          <AccordionTrigger className="text-sm font-medium">Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={activeFilters.ratings.includes(rating)}
                    onCheckedChange={() => handleRatingChange(rating)}
                  />
                  <Label htmlFor={`rating-${rating}`} className="flex items-center text-sm font-normal cursor-pointer">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                    <span className="ml-1">& Up</span>
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

