export interface CartItem {
  id: string; // unique item id (packId + subscription status)
  packId: string;
  name: string;
  packName: string;
  unitCount: number;
  price: number;
  quantity: number;
  isSubscription: boolean;
  frequency?: 'every-2-weeks' | 'every-4-weeks' | 'every-8-weeks';
  image: string;
}

export interface PromoCode {
  code: string;
  discountPercentage: number;
  description: string;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
  hasFreeShipping: boolean;
}
