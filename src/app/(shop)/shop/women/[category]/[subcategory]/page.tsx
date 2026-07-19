import React from 'react';
import { client } from '@/sanity/lib/client';
import { homeProductsQuery } from '@/sanity/lib/queries';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: Promise<{ category: string; subcategory: string }>;
}

export default async function SubCategoryProductsPage({ params }: Props) {
  const resolvedParams = await params;
  const { category, subcategory } = resolvedParams;

  // ✨ FIXED: cache: 'no-store' add kiya taaki live data refresh ho sake
  const allProducts = await client.fetch(homeProductsQuery, {}, { cache: 'no-store' }) || [];

  // 🎯 DYNAMIC FILTER PIPELINE
  const filteredProducts = allProducts.filter((product: any) => {
    // URL ka subcategory slug nikalte hain (lowercase)
    const currentUrlSubcat = subcategory.toLowerCase();
    
    // Product ke dono possible reference slugs ko check karte hain
    const prodSubcat1 = product.subcategorySlug?.toLowerCase();
    const prodSubcat2 = product.subCategorySlug?.toLowerCase();

    // Sirf wahi product return hoga jo is specific subcategory se match karega
    return prodSubcat1 === currentUrlSubcat || prodSubcat2 === currentUrlSubcat;
  });

  return (
    <section className="min-h-screen bg-[#FCFBF7] pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* LUXURY CATALOG HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-200/60 pb-8 mb-16">
          <div className="text-left">
            <span className="text-[10px] tracking-[0.25em] text-amber-800 uppercase font-medium block mb-2">
              Authentic Raj Gharana Collection
            </span>
            <h1 className="font-serif text-3xl md:text-4xl font-light text-neutral-900 tracking-wide capitalize">
              Premium {subcategory.replace('-', ' ')}
            </h1>
            <p className="text-xs text-neutral-400 mt-2 font-serif font-light capitalize">
              Curated masterpiece ensembles from the {category} division.
            </p>
          </div>
          
          {/* PRODUCT COUNT BADGE */}
          <div className="text-xs text-neutral-500 font-serif font-light mt-4 md:mt-0 tracking-wide border border-neutral-200 px-4 py-2 bg-white shadow-sm">
            Available: <span className="font-semibold text-amber-900">{filteredProducts.length}</span> Designs
          </div>
        </div>

        {/* HIGH-END PRODUCTS GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-16">
            {filteredProducts.map((product: any) => (
              <div key={product._id} className="transition-all duration-500 hover:-translate-y-1.5">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white border border-neutral-200/40 rounded shadow-sm max-w-xl mx-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 mx-auto text-neutral-300 mb-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <p className="font-serif text-base text-neutral-500 tracking-wide">
              Presently crafting new masterpieces for this segment.
            </p>
          </div>
        )}

      </div>
    </section>
  );
}