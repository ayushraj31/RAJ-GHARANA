'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Cart Item ka structure definition
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

  // LocalStorage se database load karna jab website open ho
  useEffect(() => {
    const savedCart = localStorage.getItem('raj_gharana_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart data", e);
      }
    }
  }, []);

  // Jab bhi cart items badlein, use localStorage mein save karna
  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem('raj_gharana_cart', JSON.stringify(items));
  };

  // 1. ADD TO CART LOGIC (Matching item, color, and size)
  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    const existingItemIndex = cartItems.findIndex(
      (item) =>
        item.id === newItem.id &&
        item.colorName === newItem.colorName &&
        item.size === newItem.size
    );

    if (existingItemIndex > -1) {
      // Agar same product, same size aur rang pehle se hai toh quantity +1 kar do
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1;
      saveCart(updatedItems);
    } else {
      // Naya unique item add karo
      saveCart([...cartItems, { ...newItem, quantity: 1 }]);
    }
    setIsCartOpen(true); // Item add hote hi dynamic drawer open ho jaye
  };

  // 2. REMOVE FROM CART LOGIC
  const removeFromCart = (id: string, colorName: string, size: string) => {
    const updatedItems = cartItems.filter(
      (item) => !(item.id === id && item.colorName === colorName && item.size === size)
    );
    saveCart(updatedItems);
  };

  // 3. UPDATE QUANTITY LOGIC (+ or - buttons inside cart)
  const updateQuantity = (id: string, colorName: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, colorName, size);
      return;
    }
    const updatedItems = cartItems.map((item) =>
      item.id === id && item.colorName === colorName && item.size === size
        ? { ...item, quantity }
        : item
    );
    saveCart(updatedItems);
  };

  const clearCart = () => saveCart([]);

  // Live total count aur subtotal values calculate karna
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