'use client';

import React, { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery, homeProductsQuery, homeCategoriesQuery } from '@/sanity/lib/queries';
import ProductCard from '@/components/ProductCard';
import ArchedCategoryScroll from '@/components/ArchedCategoryScroll';
import OfflineStore from '@/components/OfflineStore';

export default function HomePage() {
  const [settings, setSettings] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const settingsData = await client.fetch(siteSettingsQuery);
        const productsData = await client.fetch(homeProductsQuery);
        const categoriesData = await client.fetch(homeCategoriesQuery);
        
        if (settingsData) setSettings(settingsData);
        if (productsData) setProducts(productsData);
        if (categoriesData) setCategories(categoriesData);
      } catch (error) {
        console.error("Sanity content fetch engine failed:", error);
      }
    }
    fetchData();
  }, []);

  // 🔄 AUTO-SCROLL HERO SLIDER (Uses images uploaded in Sanity)
  useEffect(() => {
    const imagesCount = settings?.heroImages?.length || 0;
    if (imagesCount <= 1) return;
    const sliderTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % imagesCount);
    }, 4000);
    return () => clearInterval(sliderTimer);
  }, [settings?.heroImages]);

  const newArrivals = products.filter((p: any) => p.isNewArrival);
  const bestSellers = products.filter((p: any) => p.isBestSeller);

  // Fallback images in case sanity array is empty
  const activeHeroImages = settings?.heroImages?.length > 0 
    ? settings.heroImages 
    : ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600"];

  return (
    <div className="w-full bg-[#FCFBF7] overflow-x-hidden">
      
      {/* HERO BANNER BLOCK */}
      <div className="w-full h-[65vh] md:h-[80vh] bg-neutral-950 text-white text-center relative overflow-hidden flex items-center justify-center">
        {activeHeroImages.map((slideUrl: string, index: number) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${slideUrl}')`,
              opacity: currentSlide === index ? 0.25 : 0
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-transparent to-neutral-950/20" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 space-y-4">
          <h1 className="text-3xl md:text-6xl font-serif tracking-wide font-light max-w-2xl mx-auto leading-tight uppercase">
            {settings?.heroTitle || 'RAJ GHARANA'}
          </h1>
          <div className="w-16 h-[1px] bg-amber-600 mx-auto my-2" />
          <p className="text-neutral-300 text-xs md:text-sm font-light tracking-[0.25em] uppercase">
            {settings?.heroSubtitle || 'Celebrate Every Occasion In Style'}
          </p>
        </div>

        {activeHeroImages.length > 1 && (
          <div className="absolute bottom-6 flex space-x-2.5 z-20">
            {activeHeroImages.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-1 rounded-full transition-all duration-300 ${currentSlide === i ? 'w-6 bg-amber-600' : 'w-1.5 bg-white/40'}`}
              />
            ))}
          </div>
        )}
      </div>

      <ArchedCategoryScroll categories={categories} />

      {/* New Arrivals */}
      <section id="new-arrivals" className="max-w-7xl mx-auto px-6 pt-16 scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-neutral-900">New Arrivals Collection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {newArrivals.map((product: any) => (
            <ProductCard key={product._id} product={{...product, isBestSeller: false}} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section id="best-sellers" className="max-w-7xl mx-auto px-6 pt-24 scroll-mt-24">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-neutral-900">Our Elite Best Sellers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {bestSellers.map((product: any) => (
            <div key={product._id} className="flex flex-col group">
              <ProductCard product={{...product, isNewArrival: false}} />
            </div>
          ))}
        </div>
      </section>

      {/* 🔥 Passing the Sanity store images array directly down */}
      <OfflineStore sanityStoreImages={settings?.storeImages} />
    </div>
  );
}