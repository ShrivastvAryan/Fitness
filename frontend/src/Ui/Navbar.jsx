"use client"
import React, { use, useState ,useEffect} from "react"
import { Heart, ShoppingBag, Search, Menu, X } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
import useAuthStore from "@/useAuth"

const Navbar = () => {

  const{clearAuth}=useAuthStore();

   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

   const [isLoggedOut, setIsLoggedOut] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if(!token){
      setIsLoggedOut(true)
    }
    else{
      setIsLoggedOut(false)
    }
  }, []);

  const handleLogOut = () => {
    clearAuth();
    setIsLoggedOut(true);
  };


  const NavList = [
    {
      name: "New & Featured",
      subcategories: [
        { cat: "Tshirts", link: "/tshirt" },
        { cat: "Shoes", link: "/shoes" },
        { cat: "Accessories", link: "/accessories" },
      ],
    },
    {
      name: "Men",
      subcategories: [
        { cat: "Tshirts", link: "/men/tshirt" },
        { cat: "Shoes", link: "/" },
        { cat: "Accessories", link: "/" },
      ],
    },
    {
      name: "Women",
      subcategories: [
        { cat: "Tshirts", link: "/" },
        { cat: "Shoes", link: "/" },
        { cat: "Accessories", link: "/" },
      ],
    },
    {
      name: "Kids",
      subcategories: [
        { cat: "Tshirts", link: "/" },
        { cat: "Shoes", link: "/" },
        { cat: "Accessories", link: "/" },
      ],
    },
  ]

  return (
    <>
      {/* Top Navbar (Small links) */}
      <div className="hidden md:flex w-full justify-end py-3 px-6 font-semibold text-sm gap-4">
        <p className="cursor-pointer hover:underline">Join Us</p>
        <p className="cursor-pointer hover:underline">Login</p>
        <p className="cursor-pointer hover:underline">Help</p>
        <p className="cursor-pointer hover:underline hover:text-red-700" onClick={handleLogOut}>Logout</p>
        <p>{isLoggedOut}</p>
      </div>

      {/* Main Navbar */}
      <nav className="bg-gray-200 w-full flex flex-row items-center font-semibold relative px-4 md:px-6 py-3 md:py-4">
        {/* Left: Logo */}
        <div className="flex-1 text-2xl md:text-3xl font-bold">
          <Link href="/">LOGO</Link>
        </div>

        {/* Center: Menu (Desktop) */}
        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {NavList.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="p-4 w-48 space-y-2">
                      {item.subcategories.map((sub, subIndex) => (
                        <li key={subIndex}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={sub.link}
                              className="block p-2 rounded-md hover:bg-gray-100 transition"
                            >
                              {sub.cat}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right: Search + Icons (Desktop) */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-5">
          <div className="flex items-center bg-gray-300 px-3 py-1 rounded-2xl w-[60%] max-w-[200px]">
            <Search className="w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none px-2 w-full text-sm"
            />
          </div>
          <Heart className="cursor-pointer hover:text-red-500" />
          <ShoppingBag className="cursor-pointer hover:text-gray-700" />
        </div>

        {/* Mobile: Menu Icon */}
        <div className="md:hidden flex items-center">
          {mobileMenuOpen ? (
            <X
              className="w-6 h-6 cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            />
          ) : (
            <Menu
              className="w-6 h-6 cursor-pointer"
              onClick={() => setMobileMenuOpen(true)}
            />
          )}
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-100 px-6 py-4 space-y-4">
          {NavList.map((item, index) => (
            <div key={index}>
              <p className="font-semibold mb-2">{item.name}</p>
              <ul className="space-y-1 pl-3">
                {item.subcategories.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      href={sub.link}
                      className="block text-gray-700 hover:underline"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {sub.cat}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Mobile: Search + Icons */}
          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center bg-gray-200 px-3 py-2 rounded-2xl">
              <Search className="w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none px-2 w-full text-sm"
              />
            </div>
            <div className="flex gap-4">
              <Heart className="cursor-pointer hover:text-red-500" />
              <ShoppingBag className="cursor-pointer hover:text-gray-700" />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar
