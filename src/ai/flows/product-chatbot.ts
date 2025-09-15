
'use server';
/**
 * @fileOverview This file contains a Genkit flow for a product chatbot.
 *
 * - answerQuestion - A function that answers questions about a product.
 * - ProductQuestionInput - The input type for the answerQuestion function.
 * - ProductQuestionOutput - The return type for the answerQuestion function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Product } from '@/lib/types';

const ProductQuestionInputSchema = z.object({
  product: z.object({
      name: z.string(),
      category: z.string(),
      description: z.string().optional(),
      price: z.number(),
      color: z.string().optional(),
      material: z.string().optional(),
      style: z.string().optional(),
      ageGroup: z.string().optional(),
      gender: z.string().optional(),
      additionalFeatures: z.string().optional(),
  }),
  question: z.string().describe('The user\'s question about the product.'),
});

export type ProductQuestionInput = z.infer<typeof ProductQuestionInputSchema>;

const ProductQuestionOutputSchema = z.object({
  answer: z.string().describe('The AI-generated answer to the user\'s question.'),
});

export type ProductQuestionOutput = z.infer<typeof ProductQuestionOutputSchema>;

export async function answerProductQuestion(input: ProductQuestionInput): Promise<ProductQuestionOutput> {
  return productChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'productChatbotPrompt',
  input: { schema: ProductQuestionInputSchema },
  output: { schema: ProductQuestionOutputSchema },
  prompt: `You are a helpful and friendly chatbot assistant for an e-commerce store called "Tiny Threads" that sells baby clothes.

  A customer is asking a question about a product. Based on the product details provided, answer their question.
  If the information is not available in the product details, be honest and say that you don't have that information. Do not make up facts.
  Keep your answers concise and friendly.

  Product Details:
  - Name: {{{product.name}}}
  - Category: {{{product.category}}}
  - Description: {{{product.description}}}
  - Price: R{{{product.price}}}
  - Color: {{{product.color}}}
  - Material: {{{product.material}}}
  - Style: {{{product.style}}}
  - Age Group: {{{product.ageGroup}}}
  - Gender: {{{product.gender}}}
  - Additional Features: {{{product.additionalFeatures}}}

  Customer's Question:
  "{{{question}}}"

  Your Answer:`,
});


const productChatbotFlow = ai.defineFlow(
  {
    name: 'productChatbotFlow',
    inputSchema: ProductQuestionInputSchema,
    outputSchema: ProductQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
