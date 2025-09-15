'use server';
/**
 * @fileOverview A Genkit flow for generating sales insights from product data.
 *
 * - generateSalesInsightsFlow - A function that analyzes product data to find trends.
 * - GenerateSalesInsightsInput - The input type for the flow.
 * - GenerateSalesInsightsOutput - The return type for the flow.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { Product } from '@/lib/types';

// We only need a subset of product fields for this analysis
const ProductSchemaForAnalysis = z.object({
  name: z.string(),
  category: z.string(),
  price: z.number(),
});

const GenerateSalesInsightsInputSchema = z.object({
  products: z.array(ProductSchemaForAnalysis),
});

export type GenerateSalesInsightsInput = z.infer<typeof GenerateSalesInsightsInputSchema>;

const GenerateSalesInsightsOutputSchema = z.object({
  insights: z.string().describe('Actionable insights and trends based on the sales data. This should be a few sentences formatted as a paragraph.'),
});

export type GenerateSalesInsightsOutput = z.infer<typeof GenerateSalesInsightsOutputSchema>;

export async function generateSalesInsights(input: GenerateSalesInsightsInput): Promise<GenerateSalesInsightsOutput> {
  return generateSalesInsightsFlow(input);
}


export const generateSalesInsightsFlow = ai.defineFlow(
  {
    name: 'generateSalesInsightsFlow',
    inputSchema: GenerateSalesInsightsInputSchema,
    outputSchema: GenerateSalesInsightsOutputSchema,
  },
  async ({ products }) => {

    const productList = products.map(p => `- ${p.name} (Category: ${p.category}, Price: R${p.price.toFixed(2)})`).join('\n');
    
    const prompt = `
        You are a data analyst for "Tiny Threads", an e-commerce store for baby clothes.
        Analyze the following list of approved products to identify key trends and generate actionable insights for the store owner.

        Product List:
        ${productList}

        Based on the data, provide a short, actionable summary (2-3 sentences). Focus on:
        1.  Which product categories are most popular?
        2.  What is the average price point?
        3.  Suggest one action the store owner could take (e.g., "Consider stocking more X" or "Run a promotion on Y").

        Keep the tone encouraging and straightforward.
    `;

    const { output } = await ai.generate({
      prompt,
      output: {
          schema: GenerateSalesInsightsOutputSchema,
      }
    });

    return output!;
  }
);
