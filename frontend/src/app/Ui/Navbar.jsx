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
        <nav className=" w-screen p-4"></nav>
    </div>
    <div>
       <nav className="bg-gray-200 w-screen flex flex-row font-semibold">
       <div className=" w-[20%] p-1 text-6xl flex justify-center">NIKE</div>

       <div className="w-[50%] flex flex-row justify-center gap-6 items-center p-2 text-md">
        {NavList.map((item, index) => (
         <div key={index}>{item.name}</div>
       ))}
       </div>

       <div className=" w-[30%] flex flex-row items-center justify-around gap-4">
        
        <div className='flex flex-row items-center'>
        <Search/>
        <input type="text" placeholder="Search" className="p-2 w-[70%] m-4 rounded-2xl bg-gray-300"/>
        </div>
        <Heart />
        <ShoppingBag />
       </div>
       </nav>

    </div>
    </>
  )
}

export default Navbar