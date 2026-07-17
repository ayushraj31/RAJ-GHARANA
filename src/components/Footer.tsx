import React from 'react';
import Link from 'next/link';
import { SHOP_CONFIG } from '@/config/shop.config';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* BRAND COLUMN */}
        <div className="flex flex-col space-y-4">
          <span className="font-serif text-xl tracking-luxury text-white">
            {SHOP_CONFIG.brandName}
          </span>
          <p className="leading-relaxed text-neutral-400 max-w-xs">
            Bringing you the finest selection of luxury royal sarees, bridal lehengas, and premium ethnic couture curated for your grand celebrations.
          </p>
        </div>

        {/* COLLECTIONS LINKS */}
        <div className="flex flex-col space-y-3">
          <span className="text-white font-medium tracking-widest uppercase mb-1">Shop Collections</span>
          <Link href="/shop/women/saree" className="hover:text-white transition-colors">Banarasi & Silk Sarees</Link>
          <Link href="/shop/women/lehenga" className="hover:text-white transition-colors">Bridal Lehengas</Link>
          <Link href="/shop/new-arrivals" className="hover:text-white transition-colors">Designer Kurtis</Link>
          <Link href="/shop/collections" className="hover:text-white transition-colors">Festive Wear</Link>
        </div>

        {/* CUSTOMER CARE */}
        <div className="flex flex-col space-y-3">
          <span className="text-white font-medium tracking-widest uppercase mb-1">Customer Assistance</span>
          <Link href="/track-order" className="hover:text-white transition-colors">Track Your Order</Link>
          <Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping & Delivery</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link href="/contact" className="hover:text-white transition-colors">Contact Support</Link>
        </div>

        {/* CONTACT / EXPERIENCE */}
        <div className="flex flex-col space-y-3">
          <span className="text-white font-medium tracking-widest uppercase mb-1">The Experience</span>
          <p className="leading-relaxed text-neutral-400">
            <strong>Visit Store:</strong> Gorari, Rohtas, Bihar, India. <br />
            Open Daily: 10:00 AM - 8:30 PM
          </p>
          <div className="pt-2">
            <span className="inline-flex items-center px-3 py-1 rounded bg-neutral-800 text-amber-500 font-medium tracking-wider uppercase text-[10px] border border-neutral-700">
              🔒 Secure Checkout
            </span>
          </div>
        </div>

      </div>

      {/* COPYRIGHT LOWER BAR */}
      <div className="border-t border-neutral-800 py-6 text-center text-neutral-500">
        <p>© {currentYear} {SHOP_CONFIG.brandName} Saree Center. All Rights Reserved.</p>
      </div>
    </footer>
  );
}