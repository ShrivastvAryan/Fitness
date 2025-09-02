import React from 'react'
import Image from 'next/image'

const Sec1 = () => {
  return (
    <>

    <div className='flex flex-row w-screen gap-2'>
        <div className='w-1/2 h-[70vh] bg-white relative '>
            <Image src="/sec1a.jpg" alt="Picture of the author"
             fill
             className='object-cover '/>
        </div>
          <div className='w-1/2 h-[70vh] bg-white relative '>
            <Image src="/sec1b.jpg" alt="Picture of the author"
             fill
             className='object-cover '/>
        </div>
    </div>
    </>
  )
}

export default Sec1