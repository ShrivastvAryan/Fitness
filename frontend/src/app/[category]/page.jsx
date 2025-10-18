"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";


const Category = () => {
  const { category } = useParams();
  const [filters, setFilters] = useState({
    color: "",
    size: "",
    price: "",
  });

  const allSizes=[
    'XS','S','M','L','XL','XXL'
  ]

  const allPrices=[
    '0-500','500-1000','1000-2000','2000-3000','3000+'
  ]

  const { data: allProducts = [] } = useQuery({
  queryKey: ['products'],
  queryFn: async () => {
    const res = await axios.get('http://localhost:5000/api/all-product')
    return res.data.data
  },
})

const allColor = allProducts
  .flatMap(product => product.color) 
  .filter((c, index, arr) => 
    index === arr.findIndex(obj => obj.name === c.name)
  )

  const { data: products = [], isLoading, isError } = useQuery({
    queryKey: ["product", category],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/api/product/category/${category}`
      );
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (isError) return <div className="text-center mt-10">Error fetching products</div>;

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex bg-white text-black min-h-screen">
      {/* Filter Section */}
      <div className="hidden md:flex md:w-1/4 flex-col border-r border-gray-200 p-6 sticky top-0 h-screen overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6 text-black">Filters</h2>

        {/* Color Filter */}
        <div className="mb-8">
          <h3 className="font-semibold text-sm uppercase text-gray-700 mb-3">Color</h3>
        <div className="flex gap-4 flex-wrap">
  {allColor?.map((color, index) => (
    <div
      key={index}
      onClick={() => handleFilterChange(color.name)}
      className="flex items-center justify-center font-semibold w-10 h-10 rounded-full border border-black/40 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
      style={{ backgroundColor: color.code, color: color.name === "White" ? "black" : "white" }}
    >
      
    </div>
  ))}
</div>

        </div>

        {/* Size Filter */}
        <div className="mb-8">
          <h3 className="font-semibold text-sm uppercase text-gray-700 mb-3">Size</h3>
          <div
            name="size"
            onChange={handleFilterChange}
            className="flex gap-4 flex-wrap"
          >
           {allSizes?.map((sizes,index)=>(
            <div className=" flex items-center justify-center font-semibold w-10 h-10 rounded-full border border-black/40 hover:bg-black hover:text-white cursor-pointer hover:scale-110  transition-transform duration-300 ease-in-out" key={index}>{sizes}</div>
           ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="font-semibold text-sm uppercase text-gray-700 mb-3">Price Range</h3>
         <div
            name="price"
            onChange={handleFilterChange}
            className="flex gap-4 flex-wrap"
          >
           {allPrices?.map((prices,index)=>(
            <div className=" flex items-center justify-center font-semibold p-2 px-4 rounded-full border border-black/40 hover:bg-black hover:text-white cursor-pointer hover:scale-110  transition-transform duration-300 ease-in-out" key={index}>₹{prices}</div>
           ))}
          </div>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={() => setFilters({ color: "", size: "", price: "" })}
          className="mt-8 w-full py-2 border-2 border-gray-300 rounded-lg font-semibold text-black hover:bg-black hover:text-white hover:scale-110 duration-300 ease-in-out transition-transform cursor-pointer"
        >
          Clear Filters
        </button>
      </div>

      {/* Product Section */}
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <h1 className="text-4xl font-bold mb-8 capitalize text-black">{category}</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products?.data?.map((p) => (
            <div
              key={p.id}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex flex-col cursor-pointer"
            >
              
              <div className="relative w-full h-56 bg-gray-100 overflow-hidden">
                <Image
                  src={p.image_url || "/placeholder.png"}
                  alt={p.product_name}
                  fill
                  className="object-cover "
                />
              </div>

             
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-bold truncate text-black mb-3">
                  {p.product_name}
                </h2>

                {/* Price Section */}
                <div className="flex justify-between gap-2 mb-4">
                  <div className="gap-2 flex">
                  <span className="text-lg font-semibold text-black">
                    ₹{p.offer_price}
                  </span>
                  <span className="text-lg text-gray-500  line-through">
                    ₹{p.original_price}
                  </span>
                  </div>

                  <div>
                  <span className="text-sm bg-black text-white rounded-2xl p-1 px-2 font-bold">
                    {((1 - p.offer_price / p.original_price) * 100).toFixed(0)}% off
                  </span>
                  </div>

                </div>

                <div className="w-full rounded-4xl flex p-2">
                  <div className="w-[80%]">

                   {Array.isArray(p.color) && p.color.length > 0 && (
  <div className="flex flex-wrap gap-2">
    {p.color.map((c, i) => (
      <div
        key={i}
        className="w-[25px] h-[25px] rounded-full flex items-center justify-center border border-gray-300 text-sm font-medium"
        style={{ backgroundColor: c.code }}
        title={c.name} // optional tooltip with color name
      >
        {/* You can put the name inside if you want */}
        {/* {c.name} */}
      </div>
    ))}
  </div>
)}
                  </div>

                  <div className="w-[20%] rounded-full p-2 bg-black h-full text-white text-3xl flex justify-center items-center">
                    <ShoppingCart />
                  </div>
                </div>

                {/* Color Options */}
                {p.colors && (
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {p.colors.split(",").map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-gray-300  hover:border-black transition-colors cursor-pointer"
                        style={{ backgroundColor: color.trim() }}
                        title={color.trim()}
                      ></div>
                    ))}
                  </div>
                )}

                <div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Category;