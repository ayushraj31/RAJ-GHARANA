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
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔥 SMOOTH SCROLL MECHANISM WITHOUT 404 ERRORS
  const handleScrollToSection = (sectionId: string) => {
    // Agar user home page par nahi hai, toh pehle use home route par redirect karein
    if (pathname !== '/') {
      router.push(`/#${sectionId}`);
      return;
    }

    // Agar home page par hi hai, toh bina redirect kiye direct smoothly niche scroll karein
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md border-b border-neutral-200/50 shadow-sm py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LEFT: LOGO */}
        <Link href="/" className="flex items-center space-x-3 group text-left">
          <div className="w-10 h-10 overflow-hidden flex-shrink-0">
            <img 
              src="/logo.png" 
              alt="Raj Gharana Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl tracking-luxury text-neutral-900 transition-colors duration-300 group-hover:text-amber-700 uppercase">
              {SHOP_CONFIG.brandName}
            </span>
            <span className="text-[9px] tracking-mega text-neutral-500 uppercase font-medium -mt-0.5">
              {SHOP_CONFIG.tagline}
            </span>
          </div>
        </Link>

        {/* MIDDLE: FIXED DYNAMIC SCROLL ACTIONS */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => handleScrollToSection('new-arrivals')}
            className="text-xs tracking-widest uppercase font-medium text-neutral-800 hover:text-amber-700 transition-colors cursor-pointer"
          >
            New Arrivals
          </button>
          <button 
            onClick={() => handleScrollToSection('best-sellers')}
            className="text-xs tracking-widest uppercase font-medium text-neutral-800 hover:text-amber-700 transition-colors cursor-pointer"
          >
            Best Sellers
          </button>
          
        </nav>

        {/* RIGHT: CART UTILITY */}
        <div className="flex items-center text-neutral-800">
          <button 
            onClick={() => setIsCartOpen(true)} 
            className="hover:text-amber-700 transition-colors relative focus:outline-none cursor-pointer p-2" 
            aria-label="Shopping Cart"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 bg-amber-700 text-white text-[9px] font-semibold rounded-full w-4 h-4 flex items-center justify-center scale-90">
                {cartCount}
              </span>
            )}
          </button>
        </div>

      </div>
    </header>
  );
}