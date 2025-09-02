'use client'
import Image from "next/image";
import { useState } from "react";

import { Heart } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const images = [
  "/shirt-front.jpg",
  "/shirt-back.jpg",
  "/shirt-close.jpg",
  "/shirt-model.jpg",
];

const colors = [
  { img: "/shirt-black.jpg", name: "Black" },
  { img: "/shirt-white.jpg", name: "White" },
  { img: "/shirt-blue.jpg", name: "Blue" },
];

export default function ProductPage() {
  const [selectedImg, setSelectedImg] = useState(images[0]);
  

  return (
    <div className="max-w-7xl mx-auto px-6 py-15 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* LEFT: Image gallery */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className={`relative w-20 h-20 cursor-pointer border ${
                selectedImg === src ? "border-black" : "border-gray-200"
              }`}
              onClick={() => setSelectedImg(src)}
            >
              <Image src={src} alt="product" fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Main image */}
        <div className="flex-1 relative h-[600px]">
          <Image
            src={selectedImg}
            alt="product main"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* RIGHT: Product details */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium">Nike</h1>
          <p className="text-gray-600">Men&apos;s Dri-FIT Running T-Shirt</p>
          <p className="text-xl font-semibold mt-2">MRP: ₹1,795.00</p>
          <p className="text-sm text-gray-500">Inclusive of all taxes</p>
        </div>

        {/* Color Options */}
        <div className="flex gap-3">
          {colors.map((color, i) => (
            <div
              key={i}
              className="relative w-16 h-16 border border-gray-200 cursor-pointer"
            >
              <Image src={color.img} alt={color.name} fill className="object-cover" />
            </div>
          ))}
        </div>

        {/* Size Selector */}
        <div>
          <div className="flex items-center justify-between">
            <p className="font-medium">Select Size</p>
            <a href="#" className="text-sm underline text-gray-600">
              Size Guide
            </a>
          </div>
          <div className="grid grid-cols-5 gap-2 mt-3">
            {["S", "M", "L", "XL", "2XL"].map((size) => (
              <button
                key={size}
                disabled={size === "2XL"}
                className={`border py-2 rounded ${
                  size === "2XL"
                    ? "text-gray-400 border-gray-200 cursor-not-allowed"
                    : "hover:border-black"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button className="w-full bg-black text-white py-3 rounded-full text-lg font-medium cursor-pointer">
            Add to Bag
          </button>
          <button className="w-full border py-3 rounded-full text-lg font-medium flex items-center justify-center gap-2">
        
            <span className="p-2 rounded-full hover:bg-pink-500 hover:text-white cursor-pointer transition">
            <Heart className="w-6 h-6" />
            </span> Favourite
               
          </button>
        </div>

        {/* Description */}
        <div>
          <p className="text-md text-gray-700 font-semibold">
            Unleash your speed in this smooth and breathable tee, powered by sweat-wicking Dri-FIT technology.
          </p>

          <Accordion type="single" collapsible className="mt-6 " >

          <AccordionItem value="item-1">
          <AccordionTrigger>Product Details</AccordionTrigger>
          <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
         </AccordionItem>

         <AccordionItem value="item-2">
          <AccordionTrigger>Size & Fit</AccordionTrigger>
          <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
         </AccordionItem>

         <AccordionItem value="item-3">
          <AccordionTrigger>Delivery and Returns</AccordionTrigger>
          <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
         </AccordionItem>

         </Accordion>


        </div>
      </div>
    </div>
  );
}
