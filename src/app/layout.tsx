import './globals.css';
import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { SHOP_CONFIG } from '@/config/shop.config';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar'; // Hum abhi isko step 3 mein banayenge

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: {
    default: "Raj Gharana Saree Centre gorari",
    template: "%s | Raj Gharana Saree Centre gorari"
  },
  description: "Best saree and boutique collection in Gorari",
  verification: {
    google: "V-8mOU6XjsrGxh_GaCaLoE_Fg4l-oY_UzX9-38lF9qI",
  },
};

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
          
          {/* Content Area */}
          <main className="flex-grow pt-24">
            {children}
          </main>
          
          {/* Global Premium Footer */}
          <Footer />
        </CartProvider>
        
      </body>
    </html>
  );
}