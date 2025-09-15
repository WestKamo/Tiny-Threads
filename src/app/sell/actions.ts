'use server';

import { generateProductDescription, type GenerateProductDescriptionInput } from '@/ai/flows/ai-suggested-product-descriptions';

export async function getAIDescription(data: GenerateProductDescriptionInput) {
  try {
    const result = await generateProductDescription(data);
    return { success: true, description: result.description };
  } catch (error) {
    console.error('AI description generation failed:', error);
    return { success: false, error: 'An error occurred while generating the description.' };
  }
}
