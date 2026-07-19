'use client';

import React from 'react';
import Link from 'next/link';

interface SubCategory {
  title: string;
  slug: string;
}

interface ArchedCategoryScrollProps {
  categories: Array<{ 
    title: string; 
    slug: string; 
    imageUrl: string;
    subcategories?: SubCategory[];
  }>;
}

export default function ArchedCategoryScroll({ categories }: ArchedCategoryScrollProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 bg-[#FAF9F5] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HEADING SECTION */}
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.25em] text-amber-800 uppercase font-medium block mb-2">
            The Luxury Edit
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-neutral-900">
            Shop By Category
          </h2>
          <div className="w-12 h-[1px] bg-amber-700/40 mx-auto mt-3"></div>
        </div>

        {/* MAIN CATEGORIES SCROLL GRID */}
        {/* pb-24 ko hata kar padding clean kar di hai kyunki ab tags nahi hain */}
        <div className="flex items-start space-x-6 overflow-x-auto pb-6 pt-2 no-scrollbar justify-start md:justify-center scroll-smooth w-full">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex-none w-44 md:w-52 flex flex-col items-center bg-transparent">
              
              {/* MAIN ARCHED CATEGORY BOX */}
              <div className="w-full aspect-[3/4.5] rounded-t-full overflow-hidden relative border border-amber-800/10 bg-neutral-100 shadow-sm transition-all duration-300">
                {cat.imageUrl && (
                  <img 
                    src={cat.imageUrl} 
                    alt={cat.title} 
                    className="w-full h-full object-cover"
                  />
                )}
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-90" />
                
                {/* Category Main Title Link */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 z-10">
                  <Link 
                    href={`/shop/women/${cat.slug}`}
                    className="font-serif text-base tracking-widest text-white uppercase border-b border-white/20 pb-1 hover:border-white transition-all duration-300 block text-center cursor-pointer mb-2"
                  >
                    {cat.title}
                  </Link>
                </div>
              </div>

              {/* 🎯 REMOVED: Sub-categories tags container ko yahan se poori tarah saaf kar diya hai */}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}