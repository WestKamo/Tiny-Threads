import type { ImagePlaceholder } from './placeholder-images';

export type Product = {
  id: string;
  name: string;
  category: 'Onesies' | 'Dresses' | 'Shoes' | 'Shirts' | 'Pants';
  ageGroup: 'Newborn' | '0-3 Months' | '3-6 Months' | '6-12 Months' | 'Toddler';
  gender: 'Male' | 'Female' | 'Unisex';
  price: number;
  imageId: string;
  seller: string;
};

export type Slide = {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageId: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};
