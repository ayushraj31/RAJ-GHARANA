'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext'; // Context import kiya

// ✨ TypeScript Types for Review and Product Structure
interface Review {
  reviewerName: string;
  reviewRating: number;
  comment?: string;
  realPhotos?: string[];
}

interface SizeVariant {
  sizeLabel: string;
  stockStatus: string;
}

interface ColorVariant {
  colorName: string;
  swatchUrl?: string;
  images: string[];
  sizes?: SizeVariant[];
}

interface ProductClientDetailsProps {
  product: {
    _id: string;
    title: string;
    slug?: { current: string };
    price: number;
    compareAtPrice?: number;
    description?: string;
    videoUrl?: string;
    rating?: number;
    reviewCount?: number;
    colorVariants: ColorVariant[];
    reviews?: Review[];
  };
}

export default function ProductClientDetails({ product }: ProductClientDetailsProps) {
  // 🔥 FIXED: addToCart ke sath setIsCartOpen ko bhi nikal liya taaki strict close command de sakein
  const { addToCart, setIsCartOpen } = useCart(); 
  
  const [activeVariantIndex, setActiveVariantIndex] = useState(0);
  const activeVariant = product.colorVariants?.[activeVariantIndex] || null;
  
  const [activeImg, setActiveImg] = useState(activeVariant?.images?.[0] || '');
  const [activeSize, setActiveSize] = useState('');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleVariantChange = (index: number) => {
    setActiveVariantIndex(index);
    const targetVariant = product.colorVariants?.[index];
    if (targetVariant?.images?.length > 0) {
      setActiveImg(targetVariant.images[0]);
    }
    setIsVideoPlaying(false); 
  };

  // 🔥 REAL-TIME SILENT ADD TO BAG WITH LOCK
  const handleAddToBagSubmit = () => {
    if (!activeVariant) return;
    
    // 1. Data ko state memory mein bheja jisse counter instantly real-time update ho
    addToCart({
      id: product._id,
      title: product.title,
      slug: product.slug?.current || '',
      price: product.price,
      colorName: activeVariant.colorName,
      swatchUrl: activeVariant.swatchUrl || '',
      imageUrl: activeVariant.images?.[0] || '',
      size: activeSize || 'Free Size'
    });

    // 2. 🔥 STRICT CLOSURE LOCK: Data update hote hi state drawer ko forcefully close (false) rakhega
    setIsCartOpen(false);
  };

  const discountPercent = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <div className="flex flex-col space-y-16">
      
      {/* UPPER MAIN PRODUCT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COL: IMAGES MULTI-GALLERY & VIDEO CANVAS */}
        <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
          
          {/* Vertical Thumbnails List */}
          <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible space-x-3 md:space-x-0 md:space-y-3 w-full md:w-20 flex-shrink-0 no-scrollbar">
            {activeVariant?.images?.map((imgUrl: string, i: number) => (
              <button 
                key={i}
                onClick={() => { setActiveImg(imgUrl); setIsVideoPlaying(false); }}
                className={`w-16 aspect-[3/4] overflow-hidden border transition-all ${activeImg === imgUrl && !isVideoPlaying ? 'border-amber-800 scale-95 shadow-md' : 'border-neutral-200'}`}
              >
                <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
            
            {product.videoUrl && (
              <button 
                onClick={() => setIsVideoPlaying(true)}
                onMouseEnter={() => setIsVideoPlaying(true)}
                className={`w-16 aspect-[3/4] flex flex-col items-center justify-center bg-neutral-900 text-white border transition-all relative ${isVideoPlaying ? 'border-amber-800 scale-95 shadow-md' : 'border-transparent'}`}
              >
                <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url(${activeVariant?.images?.[0]})` }} />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative z-10 text-amber-500">
                  <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                </svg>
                <span className="text-[8px] tracking-widest uppercase font-bold mt-1 relative z-10">Live Fall</span>
              </button>
            )}
          </div>

          {/* Main Display Area */}
          <div className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden border border-neutral-200/40 relative">
            {isVideoPlaying && product.videoUrl ? (
              <video 
                src={product.videoUrl} 
                className="w-full h-full object-cover" 
                autoPlay 
                loop 
                muted 
                playsInline
              />
            ) : (
              activeImg && <img src={activeImg} alt={product.title} className="w-full h-full object-cover" />
            )}

            {discountPercent > 0 && (
              <span className="absolute top-4 left-4 bg-amber-800 text-white text-[9px] tracking-widest font-semibold uppercase px-3 py-1">
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* RIGHT COL: DETAILS & SELECTION */}
        <div className="lg:col-span-5 flex flex-col space-y-6 text-left">
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-light text-neutral-900 tracking-wide">
              {product.title}
            </h1>

            {/* ✨ STAR RATING DISPLAY UNDER TITLE */}
            {product.rating && product.rating > 0 && (
              <div className="mt-2 flex items-center space-x-1.5 text-xs text-neutral-800">
                <span className="text-amber-700 font-medium text-sm">★ {product.rating.toFixed(1)}</span>
                <span className="text-neutral-300">|</span>
                <span className="text-neutral-500 font-light">
                  {product.reviewCount || 0} Customer Reviews
                </span>
              </div>
            )}

            <div className="flex items-cols space-x-3 mt-4">
              <span className="text-xl font-serif font-medium text-amber-900">₹{product.price}</span>
              {product.compareAtPrice && (
                <span className="text-sm line-through text-neutral-400">₹{product.compareAtPrice}</span>
              )}
            </div>
          </div>

          <div className="w-full h-[1px] bg-neutral-200/60" />

          {/* SWATCHES */}
          <div>
            <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-neutral-500 block mb-3">
              Select Fabric / Color: <span className="text-neutral-900 font-normal">{activeVariant?.colorName}</span>
            </span>
            <div className="flex flex-wrap gap-3">
              {product.colorVariants?.map((variant: any, index: number) => (
                <button
                  key={index}
                  onClick={() => handleVariantChange(index)}
                  className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all p-[2px] ${activeVariantIndex === index ? 'border-amber-800 scale-105 shadow-md' : 'border-transparent hover:border-neutral-300'}`}
                  title={variant.colorName}
                >
                  <img src={variant.swatchUrl} alt={variant.colorName} className="w-full h-full rounded-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Sizes */}
          {activeVariant?.sizes && activeVariant.sizes.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-neutral-500 block mb-3">
                Select Size
              </span>
              <div className="flex flex-wrap gap-2">
                {activeVariant.sizes.map((sz: any, i: number) => {
                  const isOutOfStock = sz.stockStatus === 'Out of Stock';
                  const isLowStock = sz.stockStatus === 'Low Stock';
                  return (
                    <button
                      key={i}
                      disabled={isOutOfStock}
                      onClick={() => setActiveSize(sz.sizeLabel)}
                      className={`px-4 py-2 border text-xs tracking-wider transition-all relative ${isOutOfStock ? 'opacity-40 bg-neutral-100 border-neutral-200 text-neutral-400 cursor-not-allowed line-through' : activeSize === sz.sizeLabel ? 'border-neutral-900 bg-neutral-900 text-white' : 'border-neutral-200 hover:border-neutral-900 text-neutral-800'} ${isLowStock && activeSize !== sz.sizeLabel ? 'border-orange-200 text-orange-800' : ''}`}
                    >
                      {sz.sizeLabel}
                      {isLowStock && (
                        <span className="absolute -top-1.5 -right-1 bg-orange-600 text-white text-[7px] px-1 rounded-sm scale-90">Low</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-[0.15em] font-semibold text-neutral-500 block mb-2">
                The Artisan Note
              </span>
              <p className="text-xs text-neutral-600 font-light leading-relaxed font-serif">
                {product.description}
              </p>
            </div>
          )}

          {/* PREMIUM FIXED BUTTON */}
          <div className="pt-4">
            <button 
              onClick={handleAddToBagSubmit}
              disabled={!activeSize && (activeVariant?.sizes?.length ?? 0) > 0}
              className="w-full bg-amber-800 text-white py-4 text-xs tracking-[0.2em] font-medium uppercase hover:bg-amber-900 transition-colors duration-300 disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed shadow-md"
              >
             {activeSize || (activeVariant?.sizes?.length ?? 0) === 0 ? 'Add To Royal Bag' : 'Select A Size First'}
              </button>
          </div>
        </div>
      </div>

      {/* ✨ LOWER COL: CUSTOMER REVIEWS & REAL PHOTOS SECTION */}
      <div className="w-full h-[1px] bg-neutral-200/60 mt-4" />
      
      <div className="text-left max-w-4xl">
        <h2 className="font-serif text-xl tracking-wide text-neutral-900 mb-6">
          Royal Reviews & Experiences
        </h2>

        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-8">
            {product.reviews.map((rev, idx) => (
              <div key={idx} className="border-b border-neutral-100 pb-6 flex flex-col space-y-2">
                
                {/* Review Header (Name & Individual Rating Stars) */}
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm text-neutral-800">{rev.reviewerName}</span>
                  <div className="text-xs text-amber-600 font-medium">
                    {Array.from({ length: rev.reviewRating || 5 }).map((_, i) => '★')}
                  </div>
                </div>

                {/* Review Message/Comment */}
                {rev.comment && (
                  <p className="text-xs font-serif text-neutral-600 font-light leading-relaxed">
                    {rev.comment}
                  </p>
                )}

                {/* Dynamic Real Product Photos Grid attached by customers */}
                {rev.realPhotos && rev.realPhotos.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2 pt-1">
                    {rev.realPhotos.map((photoUrl, imgIdx) => (
                      <div key={imgIdx} className="w-16 h-20 overflow-hidden border border-neutral-200 bg-neutral-50">
                        <img 
                          src={photoUrl} 
                          alt={`Review attachment by ${rev.reviewerName}`} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-neutral-400 font-serif font-light italic">
            No reviews published yet for this artisan masterpiece.
          </p>
        )}
      </div>

    </div>
  );
}