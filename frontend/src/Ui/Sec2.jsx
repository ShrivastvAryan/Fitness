import React from 'react'
import ScrollVelocity from '@/ReactBits/ScrollVelocity'

const Sec2 = () => {
  return (
    <>
      <div className="mt-8 md:mt-12 w-full overflow-hidden">
        <ScrollVelocity
          texts={['CHANGE THE GAME !!', 'BE A NIKE']}
          velocity={80}
          className="custom-scroll-text text-3xl sm:text-4xl md:text-6xl font-extrabold text-center tracking-wide uppercase"
        />
      </div>

      <div className="w-full flex justify-center items-center pt-6 md:pt-10">
        <button className="text-lg sm:text-xl md:text-2xl bg-black text-white px-6 sm:px-8 py-2 sm:py-3 rounded-2xl transition-all duration-300 hover:bg-gray-800 hover:scale-105">
          Shop
        </button>
      </div>
    </>
  )
}

export default Sec2
