'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SHOP_CONFIG } from '@/config/shop.config';
import { useCart } from '@/context/CartContext';

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white border-b border-neutral-200/60 shadow-sm py-2 md:py-3' 
          : 'bg-transparent py-3 md:py-4'
      }`}
    >
      {/* MAIN NAVBAR TOP ROW */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-3 items-center">
        
        {/* 1. LEFT SIDE: DESKTOP ONLY LINKS */}
        <nav className="hidden md:flex items-center space-x-6 text-left">
          <button 
            onClick={() => handleScrollToSection('new-arrivals')}
            className={`text-xs tracking-widest uppercase font-medium transition-colors cursor-pointer ${
              isScrolled ? 'text-neutral-800 hover:text-amber-700' : 'text-white/95 hover:text-amber-300'
            }`}
          >
            New Arrivals
          </button>
          <button 
            onClick={() => handleScrollToSection('best-sellers')}
            className={`text-xs tracking-widest uppercase font-medium transition-colors cursor-pointer ${
              isScrolled ? 'text-neutral-800 hover:text-amber-700' : 'text-white/95 hover:text-amber-300'
            }`}
          >
            Best Sellers
          </button>
        </nav>

        {/* Mobile Spacer to balance the grid layout */}
        <div className="md:hidden w-6" />

        {/* 2. CENTER: BRANDING LOGO & NAME */}
        <div className="flex justify-center items-center text-center">
          <Link href="/" className="flex items-center space-x-2 md:space-x-3 group max-w-full">
            <div className="w-7 h-7 md:w-8 md:h-8 overflow-hidden flex-shrink-0 bg-white rounded-full p-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Raj Gharana Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-center items-center overflow-hidden">
              <span 
                className={`font-sans text-xs sm:text-sm md:text-base tracking-[0.15em] md:tracking-[0.2em] font-light whitespace-nowrap transition-colors duration-300 uppercase ${
                  isScrolled ? 'text-neutral-900 group-hover:text-amber-700' : 'text-white drop-shadow-md group-hover:text-amber-300'
                }`}
              >
                {SHOP_CONFIG.brandName}
              </span>
              <span 
                className={`text-[6px] md:text-[8px] tracking-[0.25em] uppercase font-medium -mt-0.5 transition-colors duration-300 text-center mx-auto block whitespace-nowrap ${
                  isScrolled ? 'text-neutral-500' : 'text-neutral-200/90 drop-shadow-sm'
                }`}
              >
                {SHOP_CONFIG.tagline}
              </span>
            </div>
          </Link>
        </div>

        {/* 3. RIGHT SIDE: CART */}
        <div className="flex justify-end items-center">
          <button 
            onClick={() => setIsCartOpen(true)} 
            className={`transition-colors relative focus:outline-none cursor-pointer p-2 ${
              isScrolled ? 'text-neutral-800 hover:text-amber-700' : 'text-white hover:text-amber-300'
            }`} 
            aria-label="Shopping Cart"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 drop-shadow-sm">
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

      {/* ✨ NEW MOBILE-ONLY ROW: Clean sub-links bar underneath branding */}
      <div className="md:hidden w-full flex justify-center items-center space-x-6 mt-1.5 pt-1 border-t border-white/10 md:border-none">
        <button 
          onClick={() => handleScrollToSection('new-arrivals')}
          className={`text-[9px] tracking-widest uppercase font-medium transition-colors cursor-pointer ${
            isScrolled ? 'text-neutral-700 hover:text-amber-700' : 'text-white/90 hover:text-amber-300'
          }`}
        >
          New Arrivals
        </button>
        <button 
          onClick={() => handleScrollToSection('best-sellers')}
          className={`text-[9px] tracking-widest uppercase font-medium transition-colors cursor-pointer ${
            isScrolled ? 'text-neutral-700 hover:text-amber-700' : 'text-white/90 hover:text-amber-300'
          }`}
        >
          Best Sellers
        </button>
      </div>

    </header>
  );
}