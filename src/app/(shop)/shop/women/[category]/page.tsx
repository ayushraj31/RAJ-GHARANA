import React from 'react';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { categoryDetailsQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ category: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const currentCatSlug = resolvedParams.category.toLowerCase();

  // ✨ FIXED: cache: 'no-store' force option lagaya hai taaki database update turant reflect ho
  const categoryData = await client.fetch(
    categoryDetailsQuery, 
    { categorySlug: currentCatSlug },
    { cache: 'no-store' }
  );

  if (!categoryData) {
    return notFound(); 
  }

  return (
    <section className="min-h-screen bg-[#FCFBF7] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-medium block">
            Raj Gharana / Couture / Collection
          </span>
          <h1 className="font-serif text-4xl font-light tracking-wide text-neutral-900 capitalize mt-3">
            {categoryData.title} Trousseau
          </h1>
          {categoryData.description && (
            <p className="text-xs text-neutral-500 max-w-md mx-auto mt-2 font-serif font-light">{categoryData.description}</p>
          )}
          <div className="w-16 h-[1px] bg-amber-700/50 mx-auto mt-4"></div>
        </div>

        {/* Dynamic Subcategory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categoryData.subcategories && categoryData.subcategories.length > 0 ? (
            categoryData.subcategories.map((sub: any, index: number) => (
              <Link 
                key={index} 
                href={`/shop/women/${currentCatSlug}/${sub.slug}`}
                className="group flex flex-col items-center bg-white border border-neutral-200/40 p-4 shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="w-full aspect-[3/4] overflow-hidden bg-neutral-50 relative">
                  {sub.imageUrl ? (
                    <img 
                      src={sub.imageUrl} 
                      alt={sub.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-neutral-400 bg-neutral-100">No Image Uploaded</div>
                  )}
                </div>

                <div className="pt-6 pb-2 text-center max-w-xs px-2">
                  <h3 className="font-serif text-xl text-neutral-900 tracking-wide group-hover:text-amber-800 transition-colors duration-300">
                    {sub.title}
                  </h3>
                  {sub.description && (
                    <p className="text-xs text-neutral-400 font-light leading-relaxed mt-2 line-clamp-2">
                      {sub.description}
                    </p>
                  )}
                  <span className="inline-block text-[9px] tracking-widest uppercase font-semibold text-amber-800 border-b border-amber-800/30 pt-4 group-hover:border-amber-800 transition-all duration-300">
                    Explore Heritage →
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-neutral-400 font-serif">
              No subcategories linked to this block yet.
            </div>
          )}
        </div>

      </div>
    </section>
  );
}