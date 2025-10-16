import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Sec5 = () => {
  const sports = [
    { name: 'Tennis', img: '/tennis.jpg', link: '' },
    { name: 'Football', img: '/football.jpg', link: '' },
    { name: 'Basketball', img: '/basketball.jpeg', link: '' },
    { name: 'Running', img: '/running.jpg', link: '' },
    { name: 'Training', img: '/training.jpg', link: '' },
  ]

  return (
    <>
      {/* Heading Section */}
      <div className="px-4 md:px-8 text-center pt-10 md:pt-16">
        <p className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
          PRESSURE-TESTED, PRO-APPROVED.
        </p>
        <p className="text-base sm:text-lg md:text-xl pt-3 font-medium text-gray-700">
          Serve grand slam styles, served by great Aryan Shrivastava
        </p>
      </div>

      {/* Shop by Sport */}
      <div className="px-4 md:px-12 pt-10 md:pt-14">
        <p className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6">
          Shop by Sport
        </p>

        <div className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto flex-nowrap pb-6 custom-scrollbar">
          {sports.map((item, index) => (
            <Link
              href={item.link || '#'}
              key={index}
              className="relative w-[75%] sm:w-[45%] md:w-[30%] lg:w-[22%] h-60 sm:h-72 md:h-80 shrink-0 rounded-2xl overflow-hidden group transition-transform duration-300 hover:scale-[1.03]"
            >
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover group-hover:brightness-90 transition-all duration-300"
                sizes="(max-width: 768px) 70vw, 25vw"
              />
              <span className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm text-gray-900 font-semibold text-lg sm:text-xl px-3 py-1.5 rounded-2xl shadow-md">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Sec5
