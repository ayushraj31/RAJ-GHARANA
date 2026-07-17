'use client';

import React from 'react';
import Link from 'next/link';

interface ArchedCategoryScrollProps {
  categories: Array<{ title: string; slug: string; imageUrl: string }>;
}

export default function ArchedCategoryScroll({ categories }: ArchedCategoryScrollProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-16 bg-[#FAF9F5] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.25em] text-amber-800 uppercase font-medium block mb-2">
            The Luxury Edit
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-light tracking-wide text-neutral-900">
            Shop By Category
          </h2>
          <div className="w-12 h-[1px] bg-amber-700/40 mx-auto mt-3"></div>
        </div>

        <div className="flex items-center space-x-6 overflow-x-auto pb-6 pt-2 no-scrollbar justify-start md:justify-center scroll-smooth">
          {categories.map((cat, idx) => (
            <Link 
              key={idx}
              href={`/shop/women/${cat.slug}`}
              className="flex-none w-44 md:w-52 flex flex-col items-center group cursor-pointer"
            >
              <div className="w-full aspect-[4/6] rounded-t-full overflow-hidden relative border border-amber-800/10 transition-all duration-700 ease-out bg-neutral-100 shadow-sm group-hover:border-amber-700/40 group-hover:shadow-lg">
                {cat.imageUrl && (
                  <img 
                    src={cat.imageUrl} 
                    alt={cat.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-6">
                  <span className="font-serif text-base tracking-widest text-white uppercase border-b border-white/20 pb-1 group-hover:border-white transition-all duration-300">
                    {cat.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}