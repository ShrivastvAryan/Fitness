'use client'
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, Heart } from "lucide-react";
import { useState } from "react";

export default function CheckoutPage() {

    const[count,setCount]=useState(1)


  return (
    <div className="min-h-screen  px-6 py-10 flex flex-col md:flex-row gap-10">
      {/* Bag Section */}
      <div className="flex-1">
        <h2 className="text-2xl font-semibold mb-6">Bag</h2>
        <Card className="shadow-sm rounded-2xl p-4">
          <CardContent className="flex gap-6">
            {/* Product Image */}
            <div className="w-32 h-32 relative rounded-lg overflow-hidden">
              <Image
                src="/tshirt.png" // Replace with actual image path
                alt="Nike T-Shirt"
                fill
                className="object-cover"
              />
            </div>

            {/* Product Info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-lg">Nike</h3>
                <p className="text-gray-600 text-sm">Men&apos;s Dri-FIT Running T-Shirt</p>
                <p className="text-gray-600 text-sm">Black</p>
                <p className="text-gray-600 text-sm">Size <span className="underline">S</span></p>
              </div>
              <p className="font-medium">MRP : ₹ 1,795.00</p>
            </div>
          </CardContent>

          {/* Actions */}
          <div className="flex items-center gap-4 mt-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <Trash2 className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full" onClick={()=>setCount(prev=>(prev>1? prev-1 :1))}>
                <Minus className="w-4 h-4"  />
              </Button>
              <span className="text-lg font-medium">{count}</span>
              <Button variant="outline" size="icon" className="rounded-full"  onClick={()=>setCount(prev=>prev+1)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <Button variant="outline" size="icon" className="rounded-full ml-auto">
              <Heart className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>

      {/* Summary Section */}
      <div className="w-full md:w-96">
        <h2 className="text-2xl font-semibold mb-6">Summary</h2>
        <Card className="shadow-sm rounded-2xl p-6 space-y-4">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹ 1,795.00</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Estimated Delivery & Handling</span>
            <span>₹ 1,250.00</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹ 3,045.00</span>
          </div>

          <div className="space-y-3 pt-4">
            <Button className="w-full rounded-full py-6 text-base font-medium bg-black text-white hover:bg-gray-900">
              Guest Checkout
            </Button>
            <Button className="w-full rounded-full py-6 text-base font-medium bg-black text-white hover:bg-gray-900">
              Member Checkout
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
