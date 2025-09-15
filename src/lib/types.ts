import type { Timestamp } from 'firebase/firestore';

export type Product = {
  id: string;
  name: string;
  category: 'Onesies' | 'Dresses' | 'Shoes' | 'Shirts' | 'Pants';
  ageGroup: 'Newborn' | '0-3 Months' | '3-6 Months' | '6-12 Months' | 'Toddler';
  gender: 'Male' | 'Female' | 'Unisex';
  price: number;
  imageUrl: string;
  seller: string;
  description?: string;
  color?: string;
  style?: string;
  material?: string;
  additionalFeatures?: string;
  status?: 'pending' | 'approved' | 'rejected';
  createdAt?: Timestamp;
  sellerId?: string;
};

export type Slide = {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
