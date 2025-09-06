"use client"
import React from "react"
import { Heart, ShoppingBag, Search } from "lucide-react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"

const Navbar = () => {
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
        { cat: "Tshirts", link: "/" },
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
      {/* Top Small Navbar */}
      <div>
        <nav className="w-screen py-3 px-6 font-semibold flex flex-row justify-end gap-4 text-sm">
          <p className="cursor-pointer hover:underline">Join Us</p>
          <p className="cursor-pointer hover:underline">Login</p>
          <p className="cursor-pointer hover:underline">Help</p>
        </nav>
      </div>

      {/* Main Navbar */}
      <div>
        <nav className="bg-gray-200 w-screen flex flex-row items-center font-semibold relative px-6 py-4">
          {/* Left (Logo Placeholder) */}
          <div className="w-[20%] text-3xl font-bold flex justify-center">
            <Link href='/'>
            LOGO
            </Link>
          </div>

          {/* Middle (Navigation Menu with shadcn/ui) */}
          <div className="w-[50%] flex justify-center">
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

          {/* Right (Search + Icons) */}
          <div className="w-[30%] flex flex-row items-center justify-end gap-6">
            {/* Search */}
            <div className="flex items-center bg-gray-300 px-3 py-1 rounded-2xl w-[60%]">
              <Search className="w-4 h-4 text-gray-600" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none px-2 w-full text-sm"
              />
            </div>

            {/* Icons */}
            <Heart className="cursor-pointer hover:text-red-500" />
            <ShoppingBag className="cursor-pointer hover:text-gray-700" />
          </div>
        </nav>
      </div>
    </>
  )
}

export default Navbar
