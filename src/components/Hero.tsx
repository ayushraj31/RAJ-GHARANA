'use client';

import React from 'react';
import Link from 'next/link';

interface BannerData {
  title?: string;
  subtitle?: string;
  desktopImageUrl: string;
  mobileImageUrl: string;
  buttonLabel: string;
  targetUrl: string;
}

interface HeroProps {
  banner: BannerData;
}

export default function Hero({ banner }: HeroProps) {
  if (!banner) return null;

  return (
    <div className="relative w-full overflow-hidden bg-neutral-100">
      {/* DESKTOP BANNER IMAGE (Hidden on Mobile) */}
      <div 
        className="hidden md:block w-full bg-cover bg-center transition-transform duration-700 ease-out hover:scale-102"
        style={{ 
          backgroundImage: `url(${banner.desktopImageUrl})`,
          height: 'calc(100vh - 96px)',
          minHeight: '600px'
        }}
      />

      {/* MOBILE BANNER IMAGE (Hidden on Desktop) */}
      <div 
        className="block md:hidden w-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${banner.mobileImageUrl})`,
          height: '70vh',
          minHeight: '450px'
        }}
      />

      {/* LUXURY SEMI-TRANSPARENT OVERLAY TEXT BOX */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 flex items-end md:items-center justify-start p-6 md:p-20">
        <div className="max-w-xl text-left text-white space-y-4 md:space-y-6 animate-fadeIn">
          
          {banner.subtitle && (
            <span className="text-[10px] md:text-xs font-medium tracking-mega uppercase text-amber-300 drop-shadow-sm block">
              {banner.subtitle}
            </span>
          )}
          
          {banner.title && (
            <h1 className="font-serif text-3xl md:text-5xl font-light tracking-wide leading-tight drop-shadow-md">
              {banner.title}
            </h1>
          )}

          <div className="pt-2">
            <Link 
              href={banner.targetUrl} 
              className="inline-block bg-white text-neutral-900 text-xs font-medium tracking-widest uppercase px-6 py-3.5 border border-white transition-all duration-300 hover:bg-transparent hover:text-white backdrop-blur-sm"
            >
              {banner.buttonLabel}
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
}