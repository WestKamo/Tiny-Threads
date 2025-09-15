'use server';

import { generateProductDescription, type GenerateProductDescriptionInput } from '@/ai/flows/ai-suggested-product-descriptions';
import { db } from '@/lib/firebase';
import type { Product } from '@/lib/types';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function getAIDescription(data: GenerateProductDescriptionInput) {
  try {
    const result = await generateProductDescription(data);
    return { success: true, description: result.description };
  } catch (error) {
    console.error('AI description generation failed:', error);
    return { success: false, error: 'An error occurred while generating the description.' };
  }
}

export async function addProduct(productData: Omit<Product, 'id' | 'status' | 'createdAt'>) {
    try {
        await addDoc(collection(db, 'products'), {
            ...productData,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        revalidatePath('/');
        revalidatePath('/admin/approve');
        revalidatePath('/profile');
        return { success: true };
    } catch (error) {
        console.error('Error adding product to Firestore:', error);
        return { success: false, error: 'Failed to list product.' };
    }
}
