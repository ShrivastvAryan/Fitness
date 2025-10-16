import React from 'react'
import Image from 'next/image'

const Sec3 = () => {
  return (
    <>
    <p className='mt-12 text-3xl ml-12 font-semibold'>Featured</p>

    <div>
        <div className='flex flex-col md:flex-row mt-6 '>
            <div className='w-full md:w-1/2  h-[500px] relative '>
            <Image src='/sec2a.jpg' alt='Sec2a' fill className='object-cover'/>
            </div>
           <div className='w-full md:w-1/2 h-[500px] bg-yellow-600 relative'>
           <Image src='/sec2b.jpg' alt='Sec2a' fill className='object-cover'/>
           </div>
        </div>

        <div className='flex flex-col md:flex-row '>
            <div className='w-full md:w-1/2 h-[500px] bg-green-600 relative'>
            <Image src='/sec2c.jpg' alt='Sec2a' fill className='object-cover'/>
            </div>
           <div className='w-full md:w-1/2 h-[500px] bg-blue-600 relative'>
           <Image src='/sec2d.jpg' alt='Sec2a' fill className='object-cover'/>
           </div>
        </div>
    </div>
    </>
  )
}

export default Sec3