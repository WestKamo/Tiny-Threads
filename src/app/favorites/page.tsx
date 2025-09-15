'use client';

import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';
import { Heart } from 'lucide-react';
import { useState } from 'react';

export default function FavoritesPage() {
  // In a real app, this would come from user data
  const [favoriteProducts] = useState([products[1], products[3], products[5]]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="flex items-center gap-4 mb-8">
        <Heart className="h-8 w-8 text-rose-500" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Your Favorites</h1>
      </div>

      {favoriteProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favoriteProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h2 className="text-2xl font-semibold">No favorites yet!</h2>
          <p className="mt-2 text-muted-foreground">
            Click the heart icon on a product to save it here.
          </p>
        </div>
      )}
    </div>
  );
}
