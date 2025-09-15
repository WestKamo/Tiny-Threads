'use server';
/**
 * @fileOverview This file contains a Genkit flow for generating suggested product descriptions for baby clothes.
 *
 * The flow takes product details as input and returns an AI-generated description.
 * @fileOverview This file contains a Genkit flow for generating suggested product descriptions for baby clothes.
 *
 * - generateProductDescription - A function that generates product descriptions for baby clothes.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  name: z.string().describe('The name of the baby clothes item.'),
  ageGroup: z.string().describe('The age group the clothes are designed for (e.g., newborn, 0-3 months, toddler).'),
  category: z.string().describe('The category of the clothing item (e.g., onesie, dress, pants, shirt).'),
  gender: z.string().describe('The gender the clothing item is designed for (e.g. Male, Female, Unisex)'),
  material: z.string().describe('The material the clothing item is made of (e.g., cotton, polyester, blend).'),
  color: z.string().describe('The color of the clothing item.'),
  style: z.string().describe('The style of the clothing item (e.g., casual, formal, party).'),
  additionalFeatures: z.string().optional().describe('Any additional features of the clothing item (e.g., snaps, ruffles, elastic waistband).'),
});

export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The AI-generated product description.'),
});

export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are an expert product description writer for a baby clothes e-commerce website.

  Based on the following details, write a compelling and informative product description for the baby clothes item. Focus on highlighting the key features and benefits for parents.

  Name: {{{name}}}
  Age Group: {{{ageGroup}}}
  Category: {{{category}}}
  Gender: {{{gender}}}
  Material: {{{material}}}
  Color: {{{color}}}
  Style: {{{style}}}
  Additional Features: {{{additionalFeatures}}}

  Product Description:`,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
