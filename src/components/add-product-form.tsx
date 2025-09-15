'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { ImagePlus, Loader2, Wand2 } from 'lucide-react';
import { ageGroups, genders, materials, productCategories, styles } from '@/lib/data';
import { useState, useTransition } from 'react';
import { getAIDescription } from '@/app/sell/actions';
import type { GenerateProductDescriptionInput } from '@/ai/flows/ai-suggested-product-descriptions';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters.'),
  category: z.string({ required_error: 'Please select a category.' }),
  ageGroup: z.string({ required_error: 'Please select an age group.' }),
  gender: z.string({ required_error: 'Please select a gender.' }),
  material: z.string({ required_error: 'Please select a material.' }),
  color: z.string().min(1, 'Please enter a color.'),
  style: z.string({ required_error: 'Please select a style.' }),
  price: z.coerce.number().min(0, 'Price must be a positive number.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  additionalFeatures: z.string().optional(),
});

export function AddProductForm() {
  const [isGenerating, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      color: '',
      price: 0.0,
      description: '',
      additionalFeatures: '',
    },
  });

  const handleGenerateDescription = () => {
    const values = form.getValues();
    const { name, category, ageGroup, gender, material, color, style, additionalFeatures } = values;

    if (!name || !category || !ageGroup || !gender || !material || !color || !style) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all product details before generating a description.',
        variant: 'destructive',
      });
      return;
    }
    
    startTransition(async () => {
      const result = await getAIDescription(values as GenerateProductDescriptionInput);
      if (result.success && result.description) {
        form.setValue('description', result.description);
        toast({
          title: 'Description Generated!',
          description: 'The AI has created a description for your product.',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Could not generate description.',
          variant: 'destructive',
        });
      }
    });
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
        title: "Product Submitted!",
        description: "Your item has been listed for sale (mock).",
    });
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-muted-foreground hover:bg-accent/50 transition-colors cursor-pointer">
              <ImagePlus className="h-10 w-10 mb-2" />
              <span className="font-medium">Upload Product Images</span>
            </div>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Cozy Blue Onesie'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {productCategories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ageGroup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age Group</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select an age group" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ageGroups.map((ag) => <SelectItem key={ag} value={ag}>{ag}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a gender" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {genders.map((g) => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="24.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select material" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {materials.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
                <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 'Pastel Blue'" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="style"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Style</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                       <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select style" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {styles.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="additionalFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Features (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Snap buttons, ruffles'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex justify-between items-center">
                    <FormLabel>Product Description</FormLabel>
                    <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isGenerating}>
                      {isGenerating ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Wand2 className="mr-2 h-4 w-4" />
                      )}
                      Generate with AI
                    </Button>
                  </div>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the item, its condition, and any special features."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    A well-written description helps your item sell faster.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" className="w-full">
              List Item for Sale
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
