import React from 'react'
import { Heart ,ShoppingBag,Search} from 'lucide-react'

const Navbar = () => {

    const NavList=[
        { name:'New & Featured', link:"/new" },
        { name:'Men', link:"/men" },
        { name:'Women', link:"/women" },
        { name:'Kids', link:"/kids" },
    ]

  return (
    <>
    <div>
        <nav className=" w-screen py-3 px-6 font-semibold flex flex-row justify-end gap-2 text-sm">
           <p>Join Us  |</p>
           <p>Login  |</p>
           <p>Help</p>
        </nav>
    </div>
    <div>
       <nav className="bg-gray-200 w-screen flex flex-row font-semibold relative">
       <div className=" w-[20%] text-4xl flex justify-center"></div>

       <div className="w-[50%] flex flex-row justify-center gap-6 items-center text-md">
        {NavList.map((item, index) => (
         <div key={index}>{item.name}</div>
       ))}
       </div>

       <div className=" w-[30%] flex flex-row items-center justify-around gap-4">
        
        <div className='flex flex-row items-center gap-6'>

        <div className='flex justify-center items-center '>
        <Search/>
        <input type="text" placeholder="Search" className="p-1 px-2 w-[70%] m-4 rounded-2xl bg-gray-300"/>
        </div>
        
        
        <Heart />
        <ShoppingBag />
        </div>
       </div>
       </nav>

    </div>
    </>
  )
}

export default Navbar