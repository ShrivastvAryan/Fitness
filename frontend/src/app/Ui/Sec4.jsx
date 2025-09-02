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
            img:'/tshirt.png',
            link:'',
        },
        {
            name:'Pants and Shorts',
            img:'/pant.jpg',
            link:'',
        },
        {
            name:'Accessories',
            img:'/socks.jpg',
            link:'',
        },
        {
            name:'Jerseys and Kits',
            img:'/jersey.jpg',
            link:'',
        }

    ]
  return (
    <>
    <p className='mt-12 font-semibold text-3xl ml-12 mb-6'>Shop by Category</p>

    <div className='px-12'>
    <div className="flex gap-6 pb-6 overflow-x-auto flex-nowrap custom-scrollbar">
  {categories.map((item, index) => (
    <div
      key={index}
      className="h-80 w-[25%] shrink-0 rounded-2xl bg-gradient-to-b from-black to-gray-600"
    >
      <div className="relative h-[70%] w-full">
        <Image
          src={item.img}
          fill
          alt="shoe"
          className="object-contain pt-8"
        />
      </div>
      <p className="text-white text-3xl text-center pt-4">{item.name}</p>
    </div>
  ))}
</div>
</div>

    </>
  )
}

export default Sec4