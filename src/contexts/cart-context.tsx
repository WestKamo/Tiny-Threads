'use client';

import type { CartItem, Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { createContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartCount: number;
  cartTotal: number;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const addToCart = useCallback(
    (product: Product) => {
      setCartItems((prevItems) => {
        const existingItem = prevItems.find((item) => item.product.id === product.id);
        if (existingItem) {
          return prevItems.map((item) =>
            item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prevItems, { product, quantity: 1 }];
      });
      setIsCartOpen(true);
      toast({
        title: 'Added to cart!',
        description: `${product.name} is now in your shopping cart.`,
        action: <ToastAction altText="View Cart" onClick={() => setIsCartOpen(true)}>View</ToastAction>,
      });
    },
    [toast]
  );

  const removeFromCart = useCallback((productId: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
     toast({
        title: 'Item removed',
        description: `The item has been removed from your cart.`,
        variant: 'destructive',
      });
  }, [toast]);

  const toggleCart = useCallback(() => {
    setIsCartOpen((prev) => !prev);
  }, []);

  const cartCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);
  
  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
      isCartOpen,
      toggleCart,
      cartCount,
      cartTotal,
    }),
    [cartItems, addToCart, removeFromCart, isCartOpen, toggleCart, cartCount, cartTotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
