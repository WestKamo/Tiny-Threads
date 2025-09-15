import type { Product, Slide } from './types';

export const slides: Slide[] = [
  {
    id: '1',
    title: 'New Arrivals!',
    subtitle: 'Check out the cutest and comfiest outfits for your little one.',
    buttonText: 'Shop Now',
    buttonLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1200&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Summer Sale',
    subtitle: 'Up to 30% off on all summer collection items. Limited time only!',
    buttonText: 'Explore Deals',
    buttonLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1559535332-db9971593356?q=80&w=1200&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Playtime Favorites',
    subtitle: 'Durable and adorable clothes for every adventure.',
    buttonText: 'Discover More',
    buttonLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1620022412856-f25b65a5509b?q=80&w=1200&h=600&fit=crop',
  },
];

export const productCategories = ['Onesies', 'Dresses', 'Shoes', 'Shirts', 'Pants'];
export const ageGroups = ['Newborn', '0-3 Months', '3-6 Months', '6-12 Months', 'Toddler'];
export const genders = ['Male', 'Female', 'Unisex'];
export const materials = ['Cotton', 'Polyester', 'Blend', 'Wool', 'Organic Cotton'];
export const styles = ['Casual', 'Formal', 'Party', 'Sleepwear'];
