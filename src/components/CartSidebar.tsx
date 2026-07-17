'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';

export default function CartSidebar() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal 
  } = useCart();

  if (!isCartOpen) return null;

  // 🔥 PREMIUM WHATSAPP INVOICE GENERATOR
  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    // 1. Apna WhatsApp Business ya Owner Number yahan enter karein (with country code, no + sign)
    const ownerWhatsAppNumber = "918210133085"; 

    // 2. Premium Luxury Invoice Layout
    let message = `Hello RAJ GHARANA\n`;
    message += `=============================\n\n`;
    message += ` I want to order these items:\n\n`;

    cartItems.forEach((item, index) => {
      message += `*🛍️ ITEM #${index + 1}*\n`;
      message += `*Product:* ${item.title}\n`;
      message += `*Size:* ${item.size}\n`;
      message += `*Color/Fabric:* ${item.colorName}\n`;
      message += `*Quantity:* ${item.quantity} x ₹${item.price}\n`;
      message += `*Total:* ₹${item.price * item.quantity}\n`;
      
      // 🔥 URL formatting bypass using clean 'productimagelink' identifier
      if (item.imageUrl) {
        message += `*Link:* productimagelink (${item.imageUrl})\n`;
      }
      message += `-----------------------------------------\n`;
    });

    message += `\n*💰 NET PAYABLE AMOUNT: ₹${cartTotal}*\n`;
    message += `=============================\n\n`;
    message += `Please verify item stock and share the payment confirmation details. ✨`;

    // 3. URL Encode standard parameters parsing
    const encodedMessage = encodeURIComponent(message);
    const whatsAppUrl = `https://wa.me/${ownerWhatsAppNumber}?text=${encodedMessage}`;

    // 4. Redirect browser to official application terminal
    window.open(whatsAppUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans">
      {/* Transparent Dark Backdrop Background Blur */}
      <div 
        className="absolute inset-0 bg-neutral-900/40 backdrop-blur-xs transition-opacity duration-500"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        {/* Main Sliding Panel Body */}
        <div className="w-screen max-w-md bg-[#FCFBF7] shadow-2xl flex flex-col h-full border-l border-neutral-200/60">
          
          {/* HEADER SECTION */}
          <div className="px-6 py-5 border-b border-neutral-200/60 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <span className="font-serif text-lg tracking-wide text-neutral-900 font-light">Royal Bag</span>
              <span className="text-[10px] bg-amber-800 text-white font-medium px-2 py-0.5 rounded-full">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
              </span>
            </div>
            
            {/* Close Cross Trigger Button */}
            <button 
              onClick={() => setIsCartOpen(false)}
              className="p-1 text-neutral-400 hover:text-neutral-900 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* DYNAMIC MIDDLE ITEMS SCROLL LIST */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 text-neutral-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                <p className="font-serif text-sm text-neutral-400 italic tracking-wide">Your luxury bag is currently empty.</p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="flex space-x-4 bg-white p-3 border border-neutral-200/40 shadow-xs relative group">
                  
                  {/* Product Miniature Portrait */}
                  <div className="w-20 aspect-[3/4] bg-neutral-100 overflow-hidden flex-shrink-0 border border-neutral-100">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    )}
                  </div>

                  {/* Core Item Information Card */}
                  <div className="flex-1 flex flex-col justify-between text-left">
                    <div>
                      <h4 className="font-serif text-sm text-neutral-900 tracking-wide font-light line-clamp-1 pr-6">
                        {item.title}
                      </h4>
                      
                      {/* Dynamic Swatch Indicator & Details Row */}
                      <div className="flex items-center space-x-2 mt-1.5">
                        {item.swatchUrl && item.swatchUrl.trim() !== "" && (
                          <img 
                            src={item.swatchUrl} 
                            alt={item.colorName} 
                            className="w-3.5 h-3.5 rounded-full object-cover border border-neutral-300" 
                          />
                        )}
                        <span className="text-[10px] text-neutral-500 font-medium">
                          Size: <span className="text-neutral-900 font-semibold">{item.size || 'Free Size'}</span>
                        </span>
                      </div>
                    </div>

                    {/* Quantity Custom Controller Stepper & Pricing */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-neutral-200 bg-neutral-50 rounded-xs">
                        <button 
                          onClick={() => updateQuantity(item.id, item.colorName, item.size, item.quantity - 1)}
                          className="px-2 py-1 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          −
                        </button>
                        <span className="px-2 text-xs text-neutral-800 font-medium font-mono w-6 text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.colorName, item.size, item.quantity + 1)}
                          className="px-2 py-1 text-xs text-neutral-500 hover:text-neutral-900 transition-colors"
                        >
                          +
                        </button>
                      </div>

                      <span className="font-serif text-sm text-amber-900 font-medium">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Absolute Remove Cross Tag */}
                  <button
                    onClick={() => removeFromCart(item.id, item.colorName, item.size)}
                    className="absolute top-2 right-2 p-1 text-neutral-300 hover:text-red-700 transition-colors"
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>

                </div>
              ))
            )}
          </div>

          {/* BOTTOM TOTAL SUMMARY & CHECKOUT BLOCK */}
          {cartItems.length > 0 && (
            <div className="border-t border-neutral-200/60 p-6 bg-white space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-xs uppercase tracking-[0.15em] font-semibold text-neutral-500">Subtotal Amount</span>
                <span className="font-serif text-xl font-medium text-amber-900">₹{cartTotal}</span>
              </div>
              <p className="text-[10px] text-neutral-400 text-left italic font-light">
                Order details along with selected item variant blueprints will be shared directly to terminal dashboard.
              </p>
              
              <div className="pt-2">
                {/* WHATSAPP TRIGGER BUTTON */}
                <button 
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-amber-800 hover:bg-amber-900 text-white py-4 text-xs tracking-[0.2em] font-medium uppercase transition-colors shadow-md cursor-pointer"
                >
                  Send Order To WhatsApp
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}