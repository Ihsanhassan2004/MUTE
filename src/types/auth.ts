export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber?: string;
  isAnonymous?: boolean;
  createdAt?: string;
  shippingAddress?: {
    fullName: string;
    street: string;
    apartment?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
}

export interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}
