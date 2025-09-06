import React from 'react'
import Image from 'next/image'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const page = () => {
  return (
    <div>

        <p className='text-3xl font-semibold p-5'>Men'S Running Shoes</p>

        <div className='flex'>

            <div className='w-[20%] bg-amber-300 h-screen p-5'>
                <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                    <AccordionTrigger>Is it accessible?</AccordionTrigger>
                    <AccordionContent>
                     Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            <div className='w-[80%]  h-screen flex flex-wrap gap-6 p-10 '>
                <div className='w-[30%] h-[60vh] bg-white rounded-2xl shadow-xl'>
                    <div className='w-full h-[60%]  relative'>
                        <Image src='/shoe1.avif' alt="images" fill className='object-cover'/>
                    </div>

                    <div className='w-full h-[40%] p-3 flex flex-col gap-2'>
                        <h1 className='text-xl font-semibold'>Nike Vomiro Plus</h1>
                        <p className='text-gray-500 font-semibold'>Men's Road Running shoes</p>
                        <p className='text-gray-500 font-semibold'>1 Color</p>

                        <h1 className=' font-semibold text-black'>MRP:₹15,4000</h1>
                    </div>
                </div>
               
            </div>

        </div>
    </div>
  )
}

export default page