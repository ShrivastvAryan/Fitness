'use client'
import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Heart, Share2, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
import axios from 'axios';
import { useParams } from 'next/navigation';

const ProductPage = () => {

const{category,id}=useParams()

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [liked, setLiked] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  React.useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/product/category/id/${category}/${id}`
      );
      setProduct(response.data.data);
      if (response.data.sizes?.length > 0) {
        setSelectedSize(response.data.sizes[2] || response.data.sizes[0]);
      }
      if (response.data.colors?.length > 0) {
        setSelectedColor(response.data.colors[0].name);
      }
    } catch (err) {
      setError('Failed to load product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (value) => {
    if (value > 0) setQuantity(value);
  };

  const handleAddToCart = async () => {
    if (!product) return;
    
    setLoading(true);
    try {
      const response = await axios.post('/api/cart/add', {
        productId: product.id,
        quantity,
        size: selectedSize,
        color: selectedColor
      });
      alert(`✨ Added ${quantity} item(s) to cart\nSize: ${selectedSize} | Color: ${selectedColor}`);
    } catch (err) {
      alert('Failed to add to cart');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">{error}</p>
          <button
            onClick={fetchProduct}
            className="bg-black text-white px-6 py-2 rounded-xl font-semibold hover:bg-gray-900 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader className="animate-spin text-black" size={32} />
      </div>
    );
  }

  const imageCount = product.images?.length || 3;
  const productImages = product.images || Array.from({ length: imageCount }, (_, i) => ({
    id: i + 1,
    bg: `from-gray-${900 - i * 100} to-gray-${800 - i * 100}`
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Product Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-start">
            
            {/* Left - Product Images with Carousel */}
            <div className="space-y-4">
              <div className="relative group">
                <div className={`bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden aspect-square flex items-center justify-center transition-all duration-500`}>
                  <div className="text-center">
                    <div className="text-6xl sm:text-7xl font-black text-white/20 mb-4">PRODUCT</div>
                    <div className="text-white/10 text-xs sm:text-sm">IMAGE {activeImageIndex + 1}</div>
                  </div>
                </div>
                
                {/* Image Navigation */}
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                >
                  <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % productImages.length)}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm"
                >
                  <ChevronRight size={18} className="sm:w-5 sm:h-5" />
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => setLiked(!liked)}
                  className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-white/95 hover:bg-white p-2 sm:p-3 rounded-full shadow-lg transition-all hover:scale-110"
                >
                  <Heart size={18} className={`sm:w-5 sm:h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-black'}`} />
                </button>
              </div>

              {/* Thumbnail Navigation */}
              <div className="flex gap-2 sm:gap-3">
                {productImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`flex-1 h-16 sm:h-20 rounded-lg transition-all ${
                      activeImageIndex === idx
                        ? 'ring-2 ring-black scale-105'
                        : 'opacity-50 hover:opacity-75'
                    } bg-gradient-to-br from-gray-900 to-gray-800`}
                  />
                ))}
              </div>
            </div>

            {/* Right - Product Details */}
            <div className="space-y-6 sm:space-y-8">
              {/* Header */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-gray-600 tracking-widest">{product.collection || 'PREMIUM COLLECTION'}</p>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-2">{product.product_name}</h1>
                    <p className='text-xs sm:text-sm font-bold bg-black text-white px-2 sm:px-3 py-1 rounded-full mt-4 inline-block'>{product.gender}</p>
                  </div>
                  <button className="p-2 sm:p-3 hover:bg-gray-100 rounded-full transition flex-shrink-0">
                    <Share2 size={18} className="sm:w-5 sm:h-5 text-gray-600" />
                  </button>
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-2 sm:gap-3 pt-2 flex-wrap">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-base sm:text-lg">★</span>
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm font-semibold">{product.rating || 4.9}</span>
                  <span className="text-xs sm:text-sm text-gray-600">({(product.reviews || 1250).toLocaleString()} reviews)</span>
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2 sm:space-y-3 pb-4 sm:pb-6 border-b border-black/10">
                <div className="flex items-baseline gap-2 sm:gap-3 flex-wrap">
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-black">₹{product.offer_price}</span>
                  {product.original_price && (
                    <>
                      <span className="text-lg sm:text-xl text-gray-400 line-through">₹{product.original_price}</span>
                      <span className="text-xs sm:text-sm font-bold bg-black text-white px-2 sm:px-3 py-1 rounded-full">
                        {Math.round(((product.original_price - product.offer_price) / product.original_price) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-gray-600">{product.shippingInfo || 'Tax included. Free shipping on orders over ₹500.'}</p>
              </div>

              {/* Description */}
              <div className="space-y-2 sm:space-y-3">
                <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-medium">{product.description}</p>
               
              </div>

              {/* Size Selection */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs sm:text-sm font-black tracking-wider">SELECT SIZE</label>
                  <button className="text-xs font-semibold text-gray-600 underline hover:text-black">SIZE GUIDE</button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {product.size?.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 sm:py-3 border-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-black bg-black text-white shadow-lg scale-105'
                          : 'border-black/20 text-black hover:border-black/50 hover:shadow-md'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="space-y-3 sm:space-y-4">
                <label className="text-xs sm:text-sm font-black tracking-wider">CHOOSE COLOR</label>
                <div className="flex gap-2 sm:gap-4 flex-wrap py-2">
                  {product.color?.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 border-2 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
                        selectedColor === color.name
                          ? 'border-black bg-black text-white shadow-lg'
                          : 'border-black/20 text-black hover:border-black/50'
                      }`}
                    >
                        {color.name}
                     <div
  className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 transition-transform"
  style={{ backgroundColor: color.code }}
/>
                      <span className="hidden sm:inline">{color.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-2 sm:gap-4 pt-2 sm:pt-4">
  {/* Quantity Selector */}
  <div className="flex items-center border-2 border-black/20 rounded-xl overflow-hidden hover:border-black/40 transition flex-1">
    <button
      onClick={() => handleQuantityChange(quantity - 1)}
      className="flex-1 p-3 sm:p-4 text-black hover:bg-black/5 transition font-bold flex items-center justify-center"
    >
      <Minus size={16} className="sm:w-5 sm:h-5" />
    </button>
    <span className="px-4 sm:px-6 font-black text-lg text-center">{quantity}</span>
    <button
      onClick={() => handleQuantityChange(quantity + 1)}
      className="flex-1 p-3 sm:p-4 text-black hover:bg-black/5 transition font-bold flex items-center justify-center"
    >
      <Plus size={16} className="sm:w-5 sm:h-5" />
    </button>
  </div>

  {/* Add to Cart Button */}
  <button
    onClick={handleAddToCart}
    disabled={loading}
    className="flex-1 bg-black text-white font-black text-sm sm:text-lg rounded-xl py-3 sm:py-4 hover:bg-gray-900 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 tracking-wide"
  >
    {loading ? (
      <Loader size={18} className="animate-spin sm:w-5 sm:h-5" />
    ) : (
      <>
        <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
        <span>ADD TO CART</span>
      </>
    )}
  </button>
</div>



              {/* Trust Badges */}
              <div className="flex gap-4 sm:gap-6 pt-4 border-t border-black/10 flex-wrap">
                <div className="text-center flex-1 min-w-[80px]">
                  <p className="text-xl sm:text-2xl font-black">100%</p>
                  <p className="text-xs text-gray-600 font-semibold">AUTHENTIC</p>
                </div>
                <div className="text-center flex-1 min-w-[80px]">
                  <p className="text-xl sm:text-2xl font-black">30D</p>
                  <p className="text-xs text-gray-600 font-semibold">RETURNS</p>
                </div>
                <div className="text-center flex-1 min-w-[80px]">
                  <p className="text-xl sm:text-2xl font-black">24/7</p>
                  <p className="text-xs text-gray-600 font-semibold">SUPPORT</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;