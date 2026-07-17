'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  colorName: string;
  swatchUrl: string;
  imageUrl: string;
  size: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string, colorName: string, size: string) => void;
  updateQuantity: (id: string, colorName: string, size: string, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const loadCartFromStorage = () => {
    const savedCart = localStorage.getItem('raj_gharana_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error(e);
      }
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
    loadCartFromStorage();

    // Listen to custom window updates
    window.addEventListener('cart-updated', loadCartFromStorage);
    return () => window.removeEventListener('cart-updated', loadCartFromStorage);
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('raj_gharana_cart', JSON.stringify(items));
  };

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === newItem.id && item.colorName === newItem.colorName && item.size === newItem.size
    );
    let updated = [...cartItems];
    if (existingItemIndex > -1) {
      updated[existingItemIndex].quantity += 1;
    } else {
      updated.push({ ...newItem, quantity: 1 });
    }
    saveCart(updated);
  };

  const removeFromCart = (id: string, colorName: string, size: string) => {
    const updated = cartItems.filter(
      (item) => !(item.id === id && item.colorName === colorName && item.size === size)
    );
    saveCart(updated);
  };

  const updateQuantity = (id: string, colorName: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, colorName, size);
      return;
    }
    const updated = cartItems.map((item) =>
      item.id === id && item.colorName === colorName && item.size === size ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  const clearCart = () => saveCart([]);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}