import Image from 'next/image';
import Link from 'next/link';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { slides } from '@/lib/data';

export function HomeSlider() {

  return (
    <section className="w-full py-6 md:py-12">
      <div className="container mx-auto">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {slides.map((slide) => {
              return (
                <CarouselItem key={slide.id}>
                  <Card className="overflow-hidden border-0 shadow-none">
                    <CardContent className="relative flex aspect-video items-center justify-center p-0">
                      <Image
                        src={slide.imageUrl}
                        alt={slide.title}
                        fill
                        className="object-cover brightness-75"
                        data-ai-hint="baby clothes"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4 bg-black/20">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                          {slide.title}
                        </h2>
                        <p className="mt-2 md:mt-4 max-w-lg text-sm md:text-lg">
                          {slide.subtitle}
                        </p>
                        <Button asChild className="mt-4 md:mt-6" size="lg">
                          <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>
    </section>
  );
}
