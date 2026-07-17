'use client';

import React, { useState, useEffect } from 'react';
import { SHOP_CONFIG } from '@/config/shop.config';

interface OfflineStoreProps {
  sanityStoreImages?: string[];
}

export default function OfflineStore({ sanityStoreImages }: OfflineStoreProps) {
  const [currentIdx, setCurrentIdx] = useState(0);

  // 🖼️ 🔥 Dynamic Sanity Images Binding with Fallback Fallbacks
  const storeImages = sanityStoreImages && sanityStoreImages.length > 0 
    ? sanityStoreImages 
    : [
        "https://images.unsplash.com/photo-1567401893930-7dbc536b7aee?q=80&w=800", // Fallback Image 1
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800", // Fallback Image 2
        "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800", // Fallback Image 3
      ];

  // 🔄 AUTO-SCROLL ENGINE: Har 3.5 seconds mein automatic image slide hogi
  useEffect(() => {
    if (storeImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % storeImages.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [storeImages.length]);

  return (
    <section className="max-w-7xl mx-auto px-6 pt-28 pb-20 font-sans">
      
      {/* SECTION HEADER */}
      <div className="text-center mb-16 space-y-3">
        <h2 className="font-serif text-2xl md:text-4xl font-light text-neutral-900 tracking-wide capitalize">
          Experience Raj Gharana In-Store
        </h2>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-medium">
          {SHOP_CONFIG.tagline}
        </p>
        <div className="w-12 h-[1px] bg-amber-800 mx-auto pt-2" />
      </div>

      {/* CORE GRID: Left Carousel & Right Maps/Address */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* 📸 LEFT SIDE: MULTIPLE IMAGES AUTO-SCROLL CAROUSEL (5 Columns) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="w-full aspect-[4/3] bg-neutral-100 overflow-hidden relative border border-neutral-200/40 shadow-lg">
            
            {/* Image Slider Wrapper */}
            <div 
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIdx * 100}%)` }}
            >
              {storeImages.map((imgUrl, i) => (
                <div key={i} className="w-full h-full flex-shrink-0">
                  <img 
                    src={imgUrl} 
                    alt={`Store Layout ${i + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Premium Indicator Dots Overlay */}
            {storeImages.length > 1 && (
              <div className="absolute bottom-4 inset-x-0 flex justify-center space-x-2 z-10">
                {storeImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIdx(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${currentIdx === i ? 'w-5 bg-amber-800' : 'w-1.5 bg-white/60'}`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            )}

          </div>

          {/* Store Quick Info Under Carousel */}
          <div className="bg-amber-50/40 border border-amber-900/10 p-4 text-left">
            <h4 className="text-xs uppercase tracking-wider font-semibold text-amber-900 mb-1">Store Timings</h4>
            <p className="text-xs text-neutral-700">
              Everyday: <span className="font-medium text-neutral-900">{SHOP_CONFIG.operatingHours.Everydays}</span>
            </p>
          </div>
        </div>

        {/* 🗺️ RIGHT SIDE: VERIFIED GOOGLE MAP & ADDRESS (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col space-y-6 text-left">
          
          {/* Address Block */}
          <div className="space-y-2">
            <h3 className="text-xs uppercase tracking-[0.15em] font-semibold text-neutral-400">Our Flagship Atelier</h3>
            <p className="font-serif text-lg text-neutral-800 font-light leading-relaxed capitalize">
              {SHOP_CONFIG.location.address}, <br />
              Gorari, Bihar - {SHOP_CONFIG.location.postalCode}
            </p>
            <p className="text-xs text-neutral-500 font-mono">
              📞 Contact helpline: {SHOP_CONFIG.supportPhone}
            </p>
          </div>

          {/* Dynamic Map Frame with precise config source */}
          <div className="w-full aspect-video bg-neutral-100 border border-neutral-200/60 shadow-md overflow-hidden relative group">
            <iframe 
              src={SHOP_CONFIG.location.googleMapsEmbedUrl} 
              className="w-full h-full grayscale contrast-125 opacity-95 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* Map Link CTA Trigger Button */}
          <div>
            <a 
              href={SHOP_CONFIG.location.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-amber-800 hover:bg-amber-900 text-white px-6 py-3.5 text-xs tracking-[0.2em] font-medium uppercase transition-colors shadow-md cursor-pointer"
            >
              Open Route In Maps
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}