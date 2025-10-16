import React from 'react'
import Image from 'next/image'

const Sec1 = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row w-full gap-2">
        <div className="relative w-full md:w-1/2 h-[500px]  bg-white">
          <Image
            src="/sec1a.jpg"
            alt="Section Image 1"
            fill
            className="object-cover"
           
            priority
          />
        </div>
        <div className="relative w-full md:w-1/2 h-[500px]  bg-white">
          <Image
            src="/sec1b.jpg"
            alt="Section Image 2"
            fill
            className="object-cover"
           
            priority
          />
        </div>
      </div>
    </>
  )
}

export default Sec1
