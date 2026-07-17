'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface ColorVariant {
  colorName: string;
  colorHex?: string;
  images: string[];
  videoUrl?: string;
  sizes: any[];
}

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    slug: { current: string };
    price: number;
    compareAtPrice?: number;
    isNewArrival?: boolean;
    isTrending?: boolean;
    isBestSeller?: boolean;
    colorVariants: ColorVariant[];
    // ✨ Step 2: Naye fields types mein add kiye
    rating?: number;
    reviewCount?: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // By default pehla color variant active rahega
  const [activeVariantIdx, setActiveVariantIdx] = useState(0);
  const activeVariant = product.colorVariants?.[activeVariantIdx];

  // Auto Discount percentage calculate karne ke liye
  const calculateDiscount = () => {
    if (!product.compareAtPrice || product.compareAtPrice <= product.price) return null;
    const discount = ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100;
    return Math.round(discount);
  };

  const discountPercent = calculateDiscount();

  return (
    <div className="group flex flex-col bg-white overflow-hidden relative transition-all duration-300">
      
      {/* PRODUCT IMAGE VISUAL FRAME */}
      <Link href={`/product/${product.slug.current}`} className="aspect-[3/4] w-full overflow-hidden bg-neutral-100 relative block">
        {activeVariant?.images?.[0] ? (
          <img 
            src={activeVariant.images[0]} 
            alt={`${product.title} - ${activeVariant.colorName}`}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs">
            No Image
          </div>
        )}

        {/* EXCLUSIVE MERCHANDISE BADGES */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="bg-amber-800 text-white text-[9px] font-medium tracking-widest uppercase px-2 py-0.5">
              New
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-neutral-900 text-white text-[9px] font-medium tracking-widest uppercase px-2 py-0.5">
              Best Seller
            </span>
          )}
          {discountPercent && (
            <span className="bg-red-700 text-white text-[9px] font-semibold tracking-wide uppercase px-2 py-0.5">
              {discountPercent}% OFF
            </span>
          )}
        </div>
      </Link>

      {/* DETAILED INFORMATION BOX */}
      <div className="pt-4 pb-2 flex flex-col flex-grow text-left">
        
        {/* DYNAMIC COLOR DOTS SELECTOR (Koskii Premium Style) */}
        {product.colorVariants && product.colorVariants.length > 1 && (
          <div className="flex items-center space-x-2 mb-2.5 overflow-x-auto no-scrollbar py-0.5">
            {product.colorVariants.map((variant, idx) => {
              // Agar admin ne hex code diya hai toh woh use karein, nahi toh default gray color dot dikhayein
              const dotBg = variant.colorHex || '#d4d4d8';
              return (
                <button
                  key={idx}
                  onClick={() => setActiveVariantIdx(idx)}
                  className={`w-3.5 h-3.5 rounded-full transition-all duration-200 focus:outline-none ${
                    activeVariantIdx === idx 
                      ? 'ring-1 ring-neutral-900 ring-offset-2 scale-110' 
                      : 'hover:scale-105 border border-black/10'
                  }`}
                  style={{ backgroundColor: dotBg }}
                  title={variant.colorName}
                  aria-label={`Select ${variant.colorName} color`}
                />
              );
            })}
          </div>
        )}

        {/* TITLE */}
        <Link href={`/product/${product.slug.current}`} className="block group">
          <h3 className="font-serif text-sm font-light text-neutral-800 tracking-wide line-clamp-1 group-hover:text-amber-700 transition-colors duration-200">
            {product.title}
          </h3>
          <p className="text-[11px] text-neutral-400 capitalize mt-0.5">
            Style: {activeVariant?.colorName || 'Classic'}
          </p>
        </Link>

        {/* ✨ DYNAMIC RATING & REVIEWS BOX */}
        {product.rating && product.rating > 0 && (
          <div className="mt-1.5 flex items-center space-x-1 text-xs text-neutral-700">
            <span className="text-amber-600 font-medium">★ {product.rating.toFixed(1)}</span>
            <span className="text-neutral-300">|</span>
            <span className="text-neutral-400 text-[10px] font-light">
              ({product.reviewCount || 0} {product.reviewCount === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>
        )}

        {/* PRICING BLOCK WITH STRIKE-THROUGH */}
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-sm font-semibold text-neutral-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice && product.compareAtPrice > product.price && (
            <span className="text-xs text-neutral-400 line-through">
              ₹{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

      </div>
    </div>
  );
}