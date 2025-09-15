
'use client';

import { WandSparkles, Loader2, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { productCategories, styles } from '@/lib/data';
import { suggestOutfit, type SuggestOutfitOutput } from '@/ai/flows/outfit-suggester';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  category: z.string({ required_error: 'Please select a category.' }),
  style: z.string({ required_error: 'Please select a style.' }),
  color: z.string().min(1, 'Please enter a color.'),
});

export function CompleteTheOutfit() {
  const [isGenerating, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<SuggestOutfitOutput['suggestions'] | null>(null);
   const [noResults, setNoResults] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      color: 'Blue',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    setSuggestions(null);
    setNoResults(false);
    startTransition(async () => {
      const result = await suggestOutfit(values);
      if (result && result.suggestions && result.suggestions.length > 0) {
        setSuggestions(result.suggestions);
      } else {
        setNoResults(true);
        toast({
          title: 'No suggestions found',
          description: 'Could not find items to complete the outfit. Try different options.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <WandSparkles className="h-5 w-5 text-primary" />
          Complete the Outfit
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Pick an item's details and let our AI stylist suggest the perfect match!
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <Label>Main Item Category</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {productCategories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem>
                  <Label>Style</Label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a style" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {styles.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
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
                  <Label>Color</Label>
                  <FormControl>
                    <Input placeholder="e.g., 'Pastel Blue'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isGenerating}>
              {isGenerating ? <Loader2 className="animate-spin" /> : "Find My Outfit!"}
            </Button>
          </form>
        </Form>

        {isGenerating && (
            <div className="mt-6 space-y-3">
                <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                    </div>
                </div>
                 <div className="animate-pulse flex space-x-4">
                    <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                    <div className="flex-1 space-y-2 py-1">
                        <div className="h-2 bg-slate-200 rounded"></div>
                        <div className="h-2 bg-slate-200 rounded w-5/6"></div>
                    </div>
                </div>
            </div>
        )}

        {noResults && !isGenerating && (
            <div className="mt-6 flex flex-col items-center text-center text-muted-foreground p-4 bg-accent/30 rounded-lg">
                <Info className="h-6 w-6 mb-2"/>
                <p className="text-sm font-medium">No outfits found!</p>
                <p className="text-xs">Try selecting a different color or style for new suggestions.</p>
            </div>
        )}

        {suggestions && suggestions.length > 0 && (
          <div className="mt-6">
            <h4 className="font-semibold mb-3">Stylist Suggests:</h4>
            <ul className="space-y-4">
              {suggestions.map((item, index) => (
                <li key={index} className="flex flex-col p-3 bg-accent/50 rounded-lg">
                    <span className="font-semibold text-accent-foreground">{item.name} <span className="text-xs font-normal text-muted-foreground">({item.category})</span></span>
                    <p className="text-sm text-accent-foreground/80">{item.reason}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
