import type { Product, Slide } from './types';

export const slides: Slide[] = [
  {
    id: '1',
    title: 'New Arrivals!',
    subtitle: 'Check out the cutest and comfiest outfits for your little one.',
    buttonText: 'Shop Now',
    buttonLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1604467795338-bf091268317a?q=80&w=1200&h=600&fit=crop',
  },
  {
    id: '2',
    title: 'Summer Sale',
    subtitle: 'Up to 30% off on all summer collection items. Limited time only!',
    buttonText: 'Explore Deals',
    buttonLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1595390757365-43a9b9a5da44?q=80&w=1200&h=600&fit=crop',
  },
  {
    id: '3',
    title: 'Playtime Favorites',
    subtitle: 'Durable and adorable clothes for every adventure.',
    buttonText: 'Discover More',
    buttonLink: '#',
    imageUrl: 'https://images.unsplash.com/photo-1546768292-fb12f6c92568?q=80&w=1200&h=600&fit=crop',
  },
];

export const productCategories = ['Onesies', 'Dresses', 'Shoes', 'Shirts', 'Pants'];
export const ageGroups = ['Newborn', '0-3 Months', '3-6 Months', '6-12 Months', 'Toddler'];
export const genders = ['Male', 'Female', 'Unisex'];
export const materials = ['Cotton', 'Polyester', 'Blend', 'Wool', 'Organic Cotton'];
export const styles = ['Casual', 'Formal', 'Party', 'Sleepwear'];
