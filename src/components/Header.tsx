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
          ? 'bg-white border-b border-neutral-200/60 shadow-sm py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      {/* ✨ Mobile space badhane ke liye custom grid fractions use kiye hain */}
      <div className="max-w-7xl mx-auto px-3 md:px-6 grid grid-cols-[0.8fr_1.4fr_0.8fr] md:grid-cols-3 items-center">
        
        {/* 1. LEFT SIDE: ONLY NEW ARRIVALS */}
        <nav className="flex items-center text-left">
          <button 
            onClick={() => handleScrollToSection('new-arrivals')}
            className={`text-[10px] md:text-[11px] tracking-wider md:tracking-[0.18em] uppercase font-medium transition-colors cursor-pointer whitespace-nowrap ${
              isScrolled ? 'text-neutral-800 hover:text-amber-700' : 'text-white/95 hover:text-amber-300'
            }`}
          >
            New Arrivals
          </button>
        </nav>

        {/* 2. CENTER: LOGO LEFT & TEXT BLOCK CENTERED & FIXED MIDDLE */}
        <div className="flex justify-center items-center">
          <Link href="/" className="flex items-center space-x-2 group max-w-full text-center">
            {/* Logo container container */}
            <div className="w-7 h-7 md:w-9 md:h-9 overflow-hidden flex-shrink-0 bg-white rounded-full p-1 shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img 
                src="/logo.png" 
                alt="Raj Gharana Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* ✨ FIXED: text-center aur items-center laga kar dono line ko ek dusre ke middle me align kiya hai */}
            <div className="flex flex-col text-center items-center justify-center overflow-hidden">
              <span 
                className={`font-sans text-[10px] sm:text-xs md:text-sm tracking-[0.08em] md:tracking-[0.16em] font-light whitespace-nowrap transition-colors duration-300 uppercase leading-none`}
                style={{ color: isScrolled ? 'var(--color-neutral-900)' : '#ffffff' }}
              >
                {SHOP_CONFIG.brandName.split(' ')[0]} {SHOP_CONFIG.brandName.split(' ')[1]}
              </span>
              <span 
                className={`font-sans text-[7px] md:text-[9px] tracking-[0.1em] md:tracking-[0.18em] uppercase font-medium mt-1 transition-colors duration-300 leading-none block text-center`}
                style={{ color: isScrolled ? '#737373' : 'rgba(245,245,245,0.85)' }}
              >
                {SHOP_CONFIG.brandName.split(' ').slice(2).join(' ')}
              </span>
            </div>
          </Link>
        </div>

        {/* 3. RIGHT SIDE: CART UTILITY */}
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
    </header>
  );
}