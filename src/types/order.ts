import type { CartItem } from './cart';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentDetails {
  method: 'card' | 'upi' | 'applepay' | 'mock_gateway';
  brand?: string;
  last4?: string;
  upiId?: string;
  transactionId: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Order {
  id: string;
  userId?: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentDetails: PaymentDetails;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
  estimatedDelivery: string;
  trackingNumber?: string;
}
