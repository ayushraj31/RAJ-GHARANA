'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SHOP_CONFIG } from '@/config/shop.config';
import { useCart } from '@/context/CartContext';

// 🎨 EASY COLOR CONFIG — colors change karne ke liye bas yahan values badlo
const BRAND_COLORS = {
  scrolled: {
    mainText: '#7c2d12',
    accentText: '#7c2d12',
    dot: '#7c2d12',
    tagline: '#525252',
    navLink: '#292524',
    navLinkHover: '#7c2d12',
  },
  notScrolled: {
    mainText: '#ffffff',
    accentText: '#ffffff',
    dot: '#ffffff',
    tagline: 'rgba(245,245,245,0.9)',
    navLink: 'rgba(255,255,255,0.95)',
    navLinkHover: '#fcd9b8',
  },
};

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const colors = isScrolled ? BRAND_COLORS.scrolled : BRAND_COLORS.notScrolled;

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white border-b border-neutral-200/60 shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 md:px-6 grid grid-cols-[0.8fr_1.4fr_0.8fr] md:grid-cols-3 items-center">
        
        {/* 1. LEFT SIDE: NEW ARRIVALS — bigger, premium font, brand color */}
        <nav className="flex items-center text-left">
          <button 
            onClick={() => handleScrollToSection('new-arrivals')}
            className="font-serif text-xs sm:text-sm md:text-base tracking-wide md:tracking-[0.1em] uppercase font-semibold transition-colors cursor-pointer whitespace-nowrap"
            style={{ color: colors.navLink }}
            onMouseEnter={(e) => (e.currentTarget.style.color = colors.navLinkHover)}
            onMouseLeave={(e) => (e.currentTarget.style.color = colors.navLink)}
          >
            New Arrivals
          </button>
        </nav>

        {/* 2. CENTER: LOGO + BRAND WORDMARK */}
        <div className="flex justify-center items-center">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group max-w-full">

            {/* Logo */}
            <div className="w-10 h-10 sm:w-12 sm:h-12 overflow-hidden flex-shrink-0 bg-white rounded-full p-0.5 shadow-sm transition-transform duration-300 group-hover:scale-105 border border-amber-800/10">
              <img
                src="/logo.png"
                alt={`${SHOP_CONFIG.brandName || 'Brand'} Logo`}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Brand Text */}
            <div className="flex flex-col items-center justify-center overflow-hidden select-none">
              {(() => {
                const words = (SHOP_CONFIG.brandName || '').trim().split(' ').filter(Boolean);
                const [firstWord = '', secondWord = '', ...rest] = words;
                const firstLetter = firstWord.charAt(0);
                const restOfFirst = firstWord.slice(1);
                const tagline = rest.join(' ');

                return (
                  <>
                    <span
                      className="font-serif text-base sm:text-lg md:text-xl tracking-[0.12em] font-semibold whitespace-nowrap uppercase leading-none flex items-center transition-colors duration-300"
                      style={{ color: colors.mainText }}
                    >
                      <span className="font-extrabold" style={{ color: colors.accentText }}>
                        {firstLetter}
                      </span>
                      <span>{restOfFirst}</span>

                      {secondWord && (
                        <span className="ml-1.5 font-light">{secondWord}</span>
                      )}

                      <span
                        className="inline-block w-1.5 h-1.5 rotate-45 ml-1.5"
                        style={{ backgroundColor: colors.dot }}
                      />
                    </span>

                    {tagline && (
                      <span
                        className="font-sans text-[8px] md:text-[9px] tracking-[0.3em] uppercase font-medium mt-1 leading-none opacity-85 transition-colors duration-300 text-center"
                        style={{ color: colors.tagline }}
                      >
                        {tagline}
                      </span>
                    )}
                  </>
                );
              })()}
            </div>
          </Link>
        </div>

        {/* 3. RIGHT SIDE: CART UTILITY — icon size badhaya */}
        <div className="flex justify-end items-center">
          <button 
            onClick={() => setIsCartOpen(true)} 
            className={`transition-colors relative focus:outline-none cursor-pointer p-2 ${
              isScrolled ? 'text-neutral-800 hover:text-amber-700' : 'text-white hover:text-amber-300'
            }`} 
            aria-label="Shopping Cart"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 md:w-7 md:h-7 drop-shadow-sm">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-amber-700 text-white text-[9px] font-semibold rounded-full w-4 h-4 flex items-center justify-center scale-90 shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}