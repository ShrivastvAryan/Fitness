'use client'
import React from 'react'
import Image from 'next/image'
import { useQuery } from '@tanstack/react-query'
import api from '@/app/api/api'
import { useParams } from 'next/navigation'


import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const Page = () => {

  const getPage=async()=>{
    const response=await api.get()
    return response.data
  }

  const box=()=>{
    const{data,error,isLoading}=useQuery({
      queryKey:['cards',cardsId]
      
    })

  }


  // Prices
  const prices = [
    { price: "₹0-2000" },
    { price: "₹2000-5000" },
    { price: "₹5000 and above" },
  ];

  // Sizes
  const sizes = [
    { size: "3.5" }, { size: "4" }, { size: "4.5" }, { size: "5" },
    { size: "5.5" }, { size: "6" }, { size: "6.5" }, { size: "7" },
    { size: "7.5" }, { size: "8" }, { size: "8.5" }, { size: "9" },
    { size: "9.5" }, { size: "10" }, { size: "10.5" }, { size: "11" },
    { size: "11.5" },
  ];

  // Colors
 const colors = [
  { color: "Black", code: "#000000" },
  { color: "White", code: "#FFFFFF" },
  { color: "Grey", code: "#808080" },
  { color: "Blue", code: "#0000FF" },
  { color: "Red", code: "#FF0000" },
  { color: "Green", code: "#008000" },
  { color: "Yellow", code: "#FFFF00" },
  { color: "Orange", code: "#FFA500" },
  { color: "Brown", code: "#A52A2A" },
  { color: "Purple", code: "#800080" },
  { color: "Pink", code: "#FFC0CB" },
];


  // Combine all into one filter array
  const filters = [
    { trigger: "Shop By Price", items: prices.map(p => p.price) },
    { trigger: "Shop By Size", items: sizes.map(s => s.size) },
    { trigger: "Shop By Color", items: colors.map(c => c.color) },
  ];

  return (
    <div>
      <p className='text-3xl font-semibold p-5'>Men'S Running Shoes</p>

      <div className='flex'>
        {/* Sidebar */}
        <div className='w-[20%] h-screen p-5'>
          <Accordion type="single" collapsible>
            {filters.map((filter, index) => (
              <AccordionItem key={index} value={`filter-${index}`}>
                <AccordionTrigger>{filter.trigger}</AccordionTrigger>
                
                
                <AccordionContent>
                  <div className="flex flex-wrap gap-2">
                    {filter.items.map((item, subIndex) => (
                      <span 
                        key={subIndex} 
                        className="px-3 py-1 border rounded-md cursor-pointer hover:bg-gray-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </AccordionContent>

              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Products Section */}
        <div className='w-[80%] h-screen flex flex-wrap gap-6 p-10 '>
          <div className='w-[30%] h-[60vh] bg-white rounded-2xl shadow-xl'>
            <div className='w-full h-[60%] relative'>
              <Image src='/shoe1.avif' alt="images" fill className='object-cover'/>
            </div>

            <div className='w-full h-[40%] p-3 flex flex-col gap-2'>
              <h1 className='text-xl font-semibold'>Nike Vomiro Plus</h1>
              <p className='text-gray-500 font-semibold'>Men's Road Running shoes</p>
              <p className='text-gray-500 font-semibold'>1 Color</p>
              <h1 className='font-semibold text-black'>MRP: ₹15,400</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
