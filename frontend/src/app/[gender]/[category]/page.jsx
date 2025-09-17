'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import api from '@/app/api/api'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// -------- Color Map -------- //
const colorOptions = [
  { color: "Black", code: "#000000" },
  { color: "White", code: "#FFFFFF" },
  { color: "Grey", code: "#808080" },
  { color: "Blue", code: "#0000FF" },
  { color: "Red", code: "#FF0000" },
  { color: "Green", code: "#008000" },
  { color: "Yellow", code: "#FFFF00" },
  { color: "Orange", code: "#FFA500" },
]

const Page = ({ params }) => {
  const { gender, category } = params; // ✅ Now params works

  // fetch function
  const getPage = async () => {
    const response = await api.get()
    return response.data
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ['cards'],
    queryFn: getPage,
  })

  // ------------------ Filters ------------------ //
  const [selectedFilters, setSelectedFilters] = useState({
    price: null,
    sizes: [],
    colors: [],
  })

  // Prices
  const prices = ["₹0-2000", "₹2000-5000", "₹5000 and above"]

  // Sizes
  const sizes = ["S", "M", "L", "XL", "XXL"]

  // Handle price select (single)
  const handlePriceSelect = (price) => {
    setSelectedFilters(prev => ({
      ...prev,
      price: prev.price === price ? null : price,
    }))
  }

  // Handle size toggle (multi)
  const handleSizeToggle = (size) => {
    setSelectedFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }))
  }

  // Handle color toggle (multi)
  const handleColorToggle = (color) => {
    setSelectedFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color],
    }))
  }

  // ------------------ Filtering Logic ------------------ //
  const filteredProducts = data?.filter(product => {
    let isValid = true

    // Filter by gender + category from params
    isValid =
      isValid &&
      product.gender?.toLowerCase() === gender &&
      product.category?.toLowerCase() === category

    // Price filter
    if (selectedFilters.price) {
      if (selectedFilters.price === "₹0-2000") {
        isValid = isValid && product.price <= 2000
      } else if (selectedFilters.price === "₹2000-5000") {
        isValid = isValid && product.price > 2000 && product.price <= 5000
      } else if (selectedFilters.price === "₹5000 and above") {
        isValid = isValid && product.price > 5000
      }
    }

    // Size filter
    if (selectedFilters.sizes.length > 0) {
      isValid =
        isValid &&
        product.sizes?.some(size => selectedFilters.sizes.includes(size))
    }

    // Color filter
    if (selectedFilters.colors.length > 0) {
      isValid =
        isValid &&
        product.colors?.some(color => selectedFilters.colors.includes(color))
    }

    return isValid
  })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <p className='text-3xl font-semibold p-5 capitalize'>
        {gender}&apos;s {category}
      </p>

      <div className='flex'>
        {/* Sidebar */}
        <div className='w-[20%] h-screen p-5'>
          <Accordion type="multiple" collapsible>
            {/* Price */}
            <AccordionItem value="price">
              <AccordionTrigger>Shop By Price</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-2">
                  {prices.map((p, i) => (
                    <span
                      key={i}
                      onClick={() => handlePriceSelect(p)}
                      className={`px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-300 ${
                        selectedFilters.price === p ? "bg-gray-300" : ""
                      }`}
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Size */}
            <AccordionItem value="size">
              <AccordionTrigger>Shop By Size</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((s, i) => (
                    <span
                      key={i}
                      onClick={() => handleSizeToggle(s)}
                      className={`px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-300 ${
                        selectedFilters.sizes.includes(s) ? "bg-gray-300" : ""
                      }`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Color */}
            <AccordionItem value="color">
              <AccordionTrigger>Shop By Color</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2 mt-2">
                  {colorOptions.map((c, i) => (
                    <span
                      key={i}
                      onClick={() => handleColorToggle(c.color)}
                      className={`w-8 h-8 rounded-full border cursor-pointer ${
                        selectedFilters.colors.includes(c.color)
                          ? "ring-2 ring-black"
                          : ""
                      }`}
                      style={{ backgroundColor: c.code }}
                      title={c.color}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Products Section */}
        <div className='w-[80%] h-auto flex flex-wrap gap-6 p-10'>
          {filteredProducts?.length > 0 ? (
            filteredProducts.map((product, i) => (
              <div
                key={i}
                className='w-[30%] h-[60vh] bg-white rounded-2xl shadow-xl'
              >
                <div className='w-full h-[60%] relative'>
                  <Image
                    src={product.image || '/shoe1.avif'}
                    alt={product.name}
                    fill
                    className='object-cover rounded-t-2xl'
                  />
                </div>

                <div className='w-full h-[40%] p-3 flex flex-col gap-2'>
                  <h1 className='text-xl font-semibold'>{product.name}</h1>
                  <p className='text-gray-500 font-semibold'>
                    {product.category}
                  </p>

                  {/* Show all product colors */}
                  <div className="flex gap-2 mt-2">
                    {product.colors?.map((c, i) => {
                      const hex = colorOptions.find(col => col.color === c)?.code
                      return (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full border"
                          style={{ backgroundColor: hex || "#ccc" }}
                          title={c}
                        />
                      )
                    })}
                  </div>

                  <h1 className='font-semibold text-black'>
                    MRP: ₹{product.price}
                  </h1>
                </div>
              </div>
            ))
          ) : (
            <p className="text-lg">No products found 🚫</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Page
