import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, CartTotals, PromoCode } from '../types/cart';
import type { ProductPack } from '../types/product';
import { MUTE_PRODUCT } from '../data/product';

interface CartContextType {
  items: CartItem[];
  totalQuantity: number;
  isCartDrawerOpen: boolean;
  appliedPromo: PromoCode | null;
  totals: CartTotals;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  addToCart: (pack: ProductPack, quantity?: number, isSubscription?: boolean, frequency?: CartItem['frequency']) => void;
  updateQuantity: (itemId: string, newQuantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
}

const LOCAL_STORAGE_CART_KEY = 'mute_cart_items';
const LOCAL_STORAGE_PROMO_KEY = 'mute_cart_promo';
const FREE_SHIPPING_THRESHOLD = 35.00;
const STANDARD_SHIPPING_RATE = 5.00;

const VALID_PROMOS: Record<string, number> = {
  PAUSE10: 10,
  MUTE15: 15,
  SHUTDOWN20: 20,
  QUIET: 10,
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_PROMO_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(LOCAL_STORAGE_PROMO_KEY, JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_PROMO_KEY);
      }
    } catch (e) {
      console.warn('Failed to save promo to localStorage', e);
    }
  }, [appliedPromo]);

  const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Check if any item in cart qualifies for automatic free shipping
  const hasFreeShippingItem = items.some((item) => {
    const pack = MUTE_PRODUCT.packs.find((p) => p.id === item.packId);
    return pack?.freeShipping;
  });

  const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || hasFreeShippingItem || items.length === 0;
  const shipping = items.length === 0 || hasFreeShipping ? 0 : STANDARD_SHIPPING_RATE;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPercentage) / 100 : 0;
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const tax = items.length > 0 ? +(discountedSubtotal * 0.05).toFixed(2) : 0;
  const total = items.length > 0 ? +(discountedSubtotal + shipping + tax).toFixed(2) : 0;

  const totals: CartTotals = {
    subtotal: +subtotal.toFixed(2),
    discount: +discountAmount.toFixed(2),
    shipping: +shipping.toFixed(2),
    tax: +tax.toFixed(2),
    total: +total.toFixed(2),
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    amountToFreeShipping: +amountToFreeShipping.toFixed(2),
    hasFreeShipping,
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const addToCart = (
    pack: ProductPack,
    quantity = 1,
    isSubscription = false,
    frequency: CartItem['frequency'] = 'every-4-weeks'
  ) => {
    const effectivePrice = isSubscription ? +(pack.price * 0.85).toFixed(2) : pack.price;
    const itemId = `${pack.id}-${isSubscription ? 'sub' : 'one'}`;

    setItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          packId: pack.id,
          name: MUTE_PRODUCT.name,
          packName: pack.name,
          unitCount: pack.unitCount,
          price: effectivePrice,
          quantity,
          isSubscription,
          frequency: isSubscription ? frequency : undefined,
          image: MUTE_PRODUCT.images.hero,
        },
      ];
    });

    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    if (VALID_PROMOS[cleanCode]) {
      const discount = VALID_PROMOS[cleanCode];
      setAppliedPromo({
        code: cleanCode,
        discountPercentage: discount,
        description: `${discount}% OFF applied`,
      });
      return { success: true, message: `Code ${cleanCode} applied (-${discount}%)` };
    }
    return { success: false, message: 'Invalid or expired code. Try "PAUSE10" or "QUIET".' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        isCartDrawerOpen,
        appliedPromo,
        totals,
        openCartDrawer,
        closeCartDrawer,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyPromoCode,
        removePromoCode,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
