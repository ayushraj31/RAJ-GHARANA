import React from 'react';
import { client } from '@/sanity/lib/client';
import { productDetailQuery } from '@/sanity/lib/queries';
import { notFound } from 'next/navigation';
import ProductClientDetails from './ProductClientDetails';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Sanity se live dynamic detail layer pull karna
  const product = await client.fetch(productDetailQuery, { slug });

  if (!product) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-[#FCFBF7] pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <ProductClientDetails product={product} />
      </div>
    </main>
  );
}