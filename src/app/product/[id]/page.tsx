
import { getProductById } from '@/lib/firestore-helper';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { ProductChatbot } from '@/components/product-chatbot';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { PageWrapper } from '@/components/page-wrapper';


export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <PageWrapper>
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          
          <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    data-ai-hint={`${product.category} ${product.color}`}
                  />
              </div>
              {/* Future thumbnails could go here */}
          </div>

          <div className="flex flex-col">
            <div className="space-y-4">
              <Badge variant="secondary">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
              <p className="text-3xl font-bold text-primary">R{product.price.toFixed(2)}</p>
              <p className="text-muted-foreground">{product.description}</p>
              
              <div className="flex items-center gap-4 pt-4">
                  <AddToCartButton product={product} />
                  <Button variant="outline" size="lg">
                      <Heart className="mr-2 h-5 w-5" />
                      Add to Favorites
                  </Button>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t">
                <ProductChatbot product={product} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

