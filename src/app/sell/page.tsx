import { AddProductForm } from '@/components/add-product-form';
import { PackagePlus } from 'lucide-react';

export default function SellPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
      <div className="flex flex-col items-center text-center mb-8">
        <PackagePlus className="h-12 w-12 mb-4 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Sell Your Item</h1>
        <p className="mt-2 text-muted-foreground max-w-md">
          Fill out the form below to list your gently used baby clothes on Tiny Threads.
        </p>
      </div>
      <AddProductForm />
    </div>
  );
}
