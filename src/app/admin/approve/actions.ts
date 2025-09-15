// src/app/admin/approve/actions.ts
'use server';

import { db } from '@/lib/firebase';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

export async function approveProduct(productId: string) {
    try {
        const productRef = doc(db, 'products', productId);
        await updateDoc(productRef, {
            status: 'approved'
        });
        revalidatePath('/admin/approve');
        return { success: true };
    } catch (error) {
        console.error("Error approving product:", error);
        return { success: false, error: "Failed to approve product." };
    }
}

export async function rejectProduct(productId: string) {
    try {
        await deleteDoc(doc(db, 'products', productId));
        revalidatePath('/admin/approve');
        return { success: true };
    } catch (error) {
        console.error("Error rejecting product:", error);
        return { success: false, error: "Failed to reject product." };
    }
}
