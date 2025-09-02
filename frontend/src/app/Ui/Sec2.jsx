import React from 'react'
import ScrollVelocity from '../../ReactBits/ScrollVelocity';

const Sec2 = () => {
  return (
    <>
    
    <div className='mt-12 max-w-screen '>
        <ScrollVelocity
         texts={['CHANGE THE GAME !!', 'BE A NIKE']} 
         velocity={100} 
         className="custom-scroll-text "
        />
    </div>

     <div className='w-screen flex justify-center items-center pt-6'>
     <button className='text-xl bg-black text-white px-6 py-2 rounded-2xl'>Shop</button>
     </div>
    </>
  )
}

export default Sec2