'use server';
/**
 * @fileOverview A Genkit flow for suggesting outfits based on a given clothing item.
 *
 * - suggestOutfit - A function that suggests complementary clothing items.
 * - SuggestOutfitInput - The input type for the suggestOutfit function.
 * - SuggestOutfitOutput - The return type for the suggestOutfit function.
 */

import { ai } from '@/ai/genkit';
import { getApprovedProducts } from '@/lib/firestore-helper';
import { z } from 'genkit';

const SuggestOutfitInputSchema = z.object({
  category: z.string().describe('The category of the main clothing item (e.g., "Shirts", "Pants").'),
  style: z.string().describe('The style of the main clothing item (e.g., "Casual", "Formal").'),
  color: z.string().describe('The color of the main clothing item.'),
});

export type SuggestOutfitInput = z.infer<typeof SuggestOutfitInputSchema>;

const SuggestedItemSchema = z.object({
    name: z.string().describe('The name of the suggested clothing item.'),
    category: z.string().describe('The category of the suggested item.'),
    reason: z.string().describe('A brief reason why this item complements the main piece.'),
});

const SuggestOutfitOutputSchema = z.object({
  suggestions: z.array(SuggestedItemSchema).describe('A list of suggested items to complete the outfit.'),
});

export type SuggestOutfitOutput = z.infer<typeof SuggestOutfitOutputSchema>;


export async function suggestOutfit(input: SuggestOutfitInput): Promise<SuggestOutfitOutput> {
    return suggestOutfitFlow(input);
}

const suggestOutfitFlow = ai.defineFlow(
  {
    name: 'suggestOutfitFlow',
    inputSchema: SuggestOutfitInputSchema,
    outputSchema: SuggestOutfitOutputSchema,
  },
  async (input) => {
    const allProducts = await getApprovedProducts();
    const productCatalog = allProducts.map(p => ({ name: p.name, category: p.category, style: p.style, color: p.color })).map(p => JSON.stringify(p)).join('\n');

    const prompt = `You are a fashion stylist for a baby clothes store. Your task is to suggest items to complete an outfit based on a main piece.

    Main clothing item details:
    - Category: ${input.category}
    - Style: ${input.style}
    - Color: ${input.color}

    Here is the catalog of available products:
    ${productCatalog}

    Based on the main item, suggest 2-3 other items from the catalog that would create a complete and stylish outfit. For each suggestion, provide the item name, its category, and a short reason for your choice. Do not suggest items from the same category as the main item.
    `;

    const { output } = await ai.generate({
      prompt,
      output: {
          schema: SuggestOutfitOutputSchema,
      }
    });

    return output!;
  }
);
