import React from 'react'
import Image from 'next/image'

const Sec5 = () => {

  const sports=[
    {
    name:"Tennis",
    img:'/tennis.jpg',
    link:''
   },
   {
    name:"Football",
    img:'/football.jpg',
    link:''
   },
  {
    name:"Basketball",
    img:'/basketball.jpeg',
    link:''
  },
  {
    name:"Running",
    img:'/running.jpg',
    link:''
  },
  {
    name:"Training",
    img:'/training.jpg',
    link:''
  }
]
  return (
    <>
    <p className='text-7xl font-extrabold text-center pt-12 tracking-tighter'>PRESSURE-TESTED, PRO-APPROVED.</p>
    <p className='text-xl text-center pt-2 font-semibold'>Serve grand slams styles, served by great Aryan Shrivastava</p>

    <div className='p-12'>
        <p className='text-3xl font-semibold'>Shop by Sport</p>
          <div className='flex gap-6 pt-6 overflow-x-auto flex-nowrap pb-6 custom-scrollbar'>
           {sports.map((item,index)=>(
           <div key={index} className='w-[45%] h-80 bg-gray-600 relative shrink-0'>
            <Image src={item.img} alt={item.name} fill className='object-cover'/>
            <span className='z-10 font-semibold text-xl bg-white px-2 py-1 rounded-2xl absolute bottom-10 left-10'>
            {item.name}
          </span>
          </div>
      ))}
        </div>
    </div>
    </>
  )
}

export default Sec5