import React from 'react'
import Image from 'next/image'

const Sec4 = () => {

    const categories=[
        {
            name:'Shoes',
            img:'/bg-removed-shoe.png',
            link:'',
        },
        {
            name:'Tops and Tshirts',
            img:'/bg-removed-shirt.png',
            link:'',
        },
        {
            name:'Pants and Shorts',
            img:'/bg-removed-pant.png',
            link:'',
        },
        {
            name:'Accessories',
            img:'/bg-removed-accessories.png',
            link:'',
        },
        {
            name:'Jerseys and Kits',
            img:'/bg-removed-jersey.png',
            link:'',
        }

    ]
  return (
    <>
    <p className='mt-12 font-semibold text-3xl ml-12'>Shop by Category</p>

    <div className='flex gap-6 p-6'>
      
        {categories.map((item,index)=>(
            <div key={index} className=' h-80 w-full rounded-2xl bg-gradient-to-b from-black to-gray-600'>
                <div className='relative h-[70%] w-full'>
                <Image src='/bg-removed-shoe.png' fill alt='shoe' className='object-cover pt-4'/>
                </div>
                <p className='text-white text-4xl text-center pt-4'>{item.name}</p>
            </div>
       
        ))}
     
    </div>
    </>
  )
}

export default Sec4