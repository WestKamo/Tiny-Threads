import type { Product, Slide } from './types';

export const slides: Slide[] = [
  {
    id: '1',
    title: 'New Arrivals!',
    subtitle: 'Check out the cutest and comfiest outfits for your little one.',
    buttonText: 'Shop Now',
    buttonLink: '#',
    imageId: 'slider-1',
  },
  {
    id: '2',
    title: 'Summer Sale',
    subtitle: 'Up to 30% off on all summer collection items. Limited time only!',
    buttonText: 'Explore Deals',
    buttonLink: '#',
    imageId: 'slider-2',
  },
  {
    id: '3',
    title: 'Playtime Favorites',
    subtitle: 'Durable and adorable clothes for every adventure.',
    buttonText: 'Discover More',
    buttonLink: '#',
    imageId: 'slider-3',
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Cozy Blue Onesie',
    category: 'Onesies',
    ageGroup: 'Newborn',
    gender: 'Unisex',
    price: 24.99,
    imageId: 'product-1',
    seller: 'BabyGlow',
  },
  {
    id: '2',
    name: 'Pink Floral Dress',
    category: 'Dresses',
    ageGroup: '6-12 Months',
    gender: 'Female',
    price: 32.5,
    imageId: 'product-2',
    seller: 'LittleSprout',
  },
  {
    id: '3',
    name: 'First Steps Sneakers',
    category: 'Shoes',
    ageGroup: 'Toddler',
    gender: 'Unisex',
    price: 28.0,
    imageId: 'product-3',
    seller: 'TinyTreads',
  },
  {
    id: '4',
    name: 'Teddy Bear Tee',
    category: 'Shirts',
    ageGroup: '3-6 Months',
    gender: 'Unisex',
    price: 18.99,
    imageId: 'product-4',
    seller: 'CuddleCub',
  },
  {
    id: '5',
    name: 'Everyday Joggers',
    category: 'Pants',
    ageGroup: 'Toddler',
    gender: 'Unisex',
    price: 22.0,
    imageId: 'product-5',
    seller: 'PlayfulWear',
  },
  {
    id: '6',
    name: 'Green Leaf Onesie',
    category: 'Onesies',
    ageGroup: '0-3 Months',
    gender: 'Unisex',
    price: 25.0,
    imageId: 'product-6',
    seller: 'EcoBabes',
  },
  {
    id: '7',
    name: 'Dapper Button-Down',
    category: 'Shirts',
    ageGroup: 'Toddler',
    gender: 'Male',
    price: 29.99,
    imageId: 'product-7',
    seller: 'GentleTots',
  },
  {
    id: '8',
    name: 'Soft Sole Moccasins',
    category: 'Shoes',
    ageGroup: '3-6 Months',
    gender: 'Unisex',
    price: 26.5,
    imageId: 'product-8',
    seller: 'TinyTreads',
  },
  {
    id: '9',
    name: 'Winter Knit Dress',
    category: 'Dresses',
    ageGroup: '6-12 Months',
    gender: 'Female',
    price: 38.0,
    imageId: 'product-9',
    seller: 'WarmHugs',
  },
];

export const productCategories = ['Onesies', 'Dresses', 'Shoes', 'Shirts', 'Pants'];
export const ageGroups = ['Newborn', '0-3 Months', '3-6 Months', '6-12 Months', 'Toddler'];
export const genders = ['Male', 'Female', 'Unisex'];
export const materials = ['Cotton', 'Polyester', 'Blend', 'Wool', 'Organic Cotton'];
export const styles = ['Casual', 'Formal', 'Party', 'Sleepwear'];
