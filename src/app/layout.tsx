'use client';

import React from 'react';
import './globals.css';
import { Inter, Playfair_Display } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`} suppressHydrationWarning>
      <body suppressHydrationWarning className="font-sans bg-zinc-50 text-neutral-900 antialiased min-h-screen flex flex-col selection:bg-amber-100 selection:text-amber-900">
        
        {/* Global Cart Logic Wrapper */}
        <CartProvider>
          {/* Global Premium Sticky Header */}
          <Header />
          
          {/* Sliding Cart Panel (Myntra Drawer style) */}
          <CartSidebar />
          
          {/* ✨ FIXED: main tag se pt-24 ko 100% remove kar diya hai taaki home page top se merge ho sake */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Global Premium Footer */}
          <Footer />
        </CartProvider>
        
      </body>
    </html>
  );
}