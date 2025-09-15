'use client';

import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useCart } from '@/hooks/use-cart';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from './ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToCart } = useCart();
  const image = PlaceHolderImages.find((img) => img.id === product.imageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0 relative">
        <div className="aspect-square w-full relative">
          {image && (
            <Image
              src={image.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={image.imageHint}
            />
          )}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/50 backdrop-blur-sm hover:bg-white rounded-full text-rose-500"
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={cn('h-5 w-5', isFavorited && 'fill-current')} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <CardTitle className="text-lg font-semibold tracking-normal leading-tight">
          {product.name}
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-xl font-bold text-foreground">R{product.price.toFixed(2)}</p>
        <Button onClick={() => addToCart(product)}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
