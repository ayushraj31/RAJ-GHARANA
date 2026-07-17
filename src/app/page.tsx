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

  // 🔄 AUTO-SCROLL HERO SLIDER
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

  const activeHeroImages = settings?.heroImages?.length > 0 
    ? settings.heroImages 
    : ["https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600"];

  return (
    // ✨ DYNAMIC FIXED: Hardcoded bg-[#FCFBF7] ko hata kar css variable se connect kar diya hai
    <div className="w-full overflow-x-hidden p-0 m-0" style={{ backgroundColor: 'var(--color-neutral-50)' }}>
      
      {/* HERO BANNER BLOCK */}
      <div className="w-full h-screen bg-neutral-950 text-white text-center relative overflow-hidden flex items-center justify-center -mt-24">
        {activeHeroImages.map((slideUrl: string, index: number) => (
          <div
            key={index}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
            style={{
              backgroundImage: `url('${slideUrl}')`,
              opacity: currentSlide === index ? 1 : 0
            }}
          />
        ))}

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-neutral-950/10" />

        {/* Slide Indicators / Dots */}
        {activeHeroImages.length > 1 && (
          <div className="absolute bottom-12 flex space-x-2.5 z-20">
            {activeHeroImages.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                // ✨ DYNAMIC FIXED: Active slider dot ka color gold variable se connect kar diya hai
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: currentSlide === i ? '24px' : '6px',
                  backgroundColor: currentSlide === i ? 'var(--color-gold-400)' : 'rgba(255,255,255,0.4)'
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="pt-10">
        <ArchedCategoryScroll categories={categories} />
      </div>

      {/* New Arrivals Section */}
      {/* ✨ DYNAMIC FIXED: Text color ko global heading variable se tie kar diya hai */}
      <section id="new-arrivals" className="max-w-7xl mx-auto px-6 pt-16 scroll-mt-24" style={{ color: 'var(--color-neutral-900)' }}>
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-light">New Arrivals Collection</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {newArrivals.map((product: any) => (
            <ProductCard key={product._id} product={{...product, isBestSeller: false}} />
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section id="best-sellers" className="max-w-7xl mx-auto px-6 pt-24 scroll-mt-24" style={{ color: 'var(--color-neutral-900)' }}>
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl md:text-3xl font-light">Our Elite Best Sellers</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
          {bestSellers.map((product: any) => (
            <div key={product._id} className="flex flex-col group">
              <ProductCard product={{...product, isNewArrival: false}} />
            </div>
          ))}
        </div>
      </section>

      <OfflineStore sanityStoreImages={settings?.storeImages} />
    </div>
  );
}