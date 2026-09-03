export interface ProductPack {
  id: string;
  name: string;
  unitCount: number;
  subtitle: string;
  price: number;
  originalPrice?: number;
  pricePerCan: number;
  popular?: boolean;
  bestValue?: boolean;
  freeShipping?: boolean;
  savingsPercentage?: number;
}

export interface ProductDetails {
  id: string;
  name: string;
  tagline: string;
  secondaryTagline: string;
  category: string;
  volume: string;
  description: string;
  extendedDescription: string;
  basePrice: number;
  images: {
    hero: string;
    macro: string;
    ritual: string;
  };
  packs: ProductPack[];
  tastingNotes: {
    title: string;
    description: string;
  }[];
  specifications: {
    volume: string;
    servingSize: string;
    caffeine: string;
    sugar: string;
    calories: string;
    carbonation: string;
  };
  benefits: {
    number: string;
    title: string;
    description: string;
  }[];
  accordions: {
    id: string;
    title: string;
    content: string;
  }[];
  reviews: {
    id: string;
    author: string;
    location: string;
    quote: string;
    verified: boolean;
    rating: number;
    date: string;
  }[];
}
