import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Sec4 = () => {
  const categories = [
    { name: 'Shoes', img: '/bg-removed-shoe.png', link: '' },
    { name: 'Tops and Tshirts', img: '/tshirt.png', link: '' },
    { name: 'Pants and Shorts', img: '/pant.jpg', link: '' },
    { name: 'Accessories', img: '/socks.jpg', link: '' },
    { name: 'Jerseys and Kits', img: '/jersey.jpg', link: '' },
  ]

  return (
    <>
      <p className="mt-10 md:mt-12 font-semibold text-2xl md:text-3xl text-center md:text-left px-4 md:ml-12 mb-4 md:mb-6">
        Shop by Category
      </p>

      <div className="px-4 md:px-12">
        <div className="flex gap-4 md:gap-6 pb-4 md:pb-6 overflow-x-auto flex-nowrap custom-scrollbar">
          {categories.map((item, index) => (
            <Link
              href={item.link || '#'}
              key={index}
              className="shrink-0 w-[70%] sm:w-[45%] md:w-[25%] h-64 md:h-80 rounded-2xl bg-gradient-to-b from-black to-gray-700 hover:scale-105 transition-transform duration-300"
            >
              <div className="relative h-[70%] w-full">
                <Image
                  src={item.img}
                  fill
                  alt={item.name}
                  className="object-contain pt-6 md:pt-8"
                  sizes="(max-width: 768px) 70vw, 25vw"
                />
              </div>
              <p className="text-white text-xl md:text-2xl text-center pt-2 md:pt-4 font-medium">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sec4
