import type { Order, ShippingAddress, PaymentDetails } from '../types/order';
import type { CartItem } from '../types/cart';

const LOCAL_STORAGE_ORDERS_KEY = 'mute_orders_history';

const SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-init-001',
    userId: 'demo-mute-member-001',
    orderNumber: 'MUTE-90824',
    createdAt: '2026-02-14T14:30:00.000Z',
    items: [
      {
        id: 'pack-12-one',
        packId: 'pack-12',
        name: 'MUTE',
        packName: 'The Rest 12-Pack',
        unitCount: 12,
        price: 42.00,
        quantity: 1,
        isSubscription: false,
        image: '/images/mute-can.jpg',
      },
    ],
    shippingAddress: {
      fullName: 'Julian Vance',
      email: 'member@drinkmute.com',
      phone: '+1 (555) 892-0192',
      addressLine1: '404 Quiet Avenue, Suite 10',
      city: 'San Francisco',
      state: 'CA',
      postalCode: '94103',
      country: 'United States',
    },
    paymentDetails: {
      method: 'card',
      brand: 'Visa',
      last4: '4242',
      transactionId: 'txn_mock_983192',
      status: 'completed',
    },
    subtotal: 42.00,
    discount: 0,
    shipping: 0,
    tax: 2.10,
    total: 44.10,
    status: 'delivered',
    estimatedDelivery: 'Delivered Feb 18, 2026',
    trackingNumber: 'MUTE-FEDEX-9918231',
  },
];

export const orderService = {
  getOrders(): Order[] {
    try {
      const data = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      if (data) {
        return JSON.parse(data);
      }
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(SAMPLE_ORDERS));
      return SAMPLE_ORDERS;
    } catch {
      return SAMPLE_ORDERS;
    }
  },

  getOrderById(orderId: string): Order | undefined {
    const orders = this.getOrders();
    return orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  },

  createOrder(
    items: CartItem[],
    shippingAddress: ShippingAddress,
    paymentDetails: PaymentDetails,
    totals: { subtotal: number; discount: number; shipping: number; tax: number; total: number },
    userId?: string
  ): Order {
    const orders = this.getOrders();
    const orderNumber = `MUTE-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      userId,
      orderNumber,
      createdAt: new Date().toISOString(),
      items: [...items],
      shippingAddress,
      paymentDetails,
      subtotal: totals.subtotal,
      discount: totals.discount,
      shipping: totals.shipping,
      tax: totals.tax,
      total: totals.total,
      status: 'confirmed',
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      trackingNumber: `MUTE-EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
    };

    const updated = [newOrder, ...orders];
    try {
      localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save order to localStorage', e);
    }

    return newOrder;
  },
};
