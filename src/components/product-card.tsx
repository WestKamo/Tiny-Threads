
'use client';

import Image from 'next/image';
import type { Product } from '@/lib/types';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Heart } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from './ui/badge';
import Link from 'next/link';
import { AddToCartButton } from './add-to-cart-button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const image = PlaceHolderImages.find((img) => img.id === product.imageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg group">
       <CardHeader className="p-0 relative">
        <Link href={`/product/${product.id}`} className="block aspect-square w-full relative">
            {image && (
                <Image
                src={image.imageUrl}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={image.imageHint}
                />
            )}
        </Link>
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 bg-white/50 backdrop-blur-sm hover:bg-white rounded-full text-rose-500 z-10"
          onClick={() => setIsFavorited(!isFavorited)}
        >
          <Heart className={cn('h-5 w-5', isFavorited && 'fill-current')} />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
        <CardTitle className="text-lg font-semibold tracking-normal leading-tight">
           <Link href={`/product/${product.id}`} className="hover:text-primary transition-colors">
            {product.name}
          </Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        <p className="text-xl font-bold text-foreground">R{product.price.toFixed(2)}</p>
        <AddToCartButton product={product} />
      </CardFooter>
    </Card>
  );
}
