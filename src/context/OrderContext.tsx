import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Order, ShippingAddress, PaymentDetails } from '../types/order';
import type { CartItem } from '../types/cart';
import { orderService } from '../services/orderService';
import { useAuth } from './AuthContext';

interface OrderContextType {
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (
    items: CartItem[],
    shippingAddress: ShippingAddress,
    paymentDetails: PaymentDetails,
    totals: { subtotal: number; discount: number; shipping: number; tax: number; total: number }
  ) => Promise<Order>;
  getOrder: (orderId: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>(() => orderService.getOrders());
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(orderService.getOrders());
  }, [user]);

  const placeOrder = async (
    items: CartItem[],
    shippingAddress: ShippingAddress,
    paymentDetails: PaymentDetails,
    totals: { subtotal: number; discount: number; shipping: number; tax: number; total: number }
  ): Promise<Order> => {
    await new Promise((res) => setTimeout(res, 800));
    const order = orderService.createOrder(items, shippingAddress, paymentDetails, totals, user?.uid);
    setOrders((prev) => [order, ...prev]);
    setCurrentOrder(order);
    return order;
  };

  const getOrder = (orderId: string) => {
    return orderService.getOrderById(orderId);
  };

  return (
    <OrderContext.Provider value={{ orders, currentOrder, placeOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
