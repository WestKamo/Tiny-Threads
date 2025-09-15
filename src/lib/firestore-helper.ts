// src/lib/firestore-helper.ts
import { collection, getDocs, query, where, DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import type { Product } from './types';

// A helper function to convert a Firestore document to a Product object
const toProduct = (doc: QueryDocumentSnapshot<DocumentData, DocumentData>): Product => {
    const data = doc.data();
    return {
        id: doc.id,
        name: data.name,
        category: data.category,
        ageGroup: data.ageGroup,
        gender: data.gender,
        price: data.price,
        imageId: data.imageId,
        seller: data.seller,
        status: data.status,
        description: data.description,
        createdAt: data.createdAt,
        sellerId: data.sellerId,
    } as Product;
}

export async function getApprovedProducts(): Promise<Product[]> {
    const q = query(collection(db, "products"), where("status", "==", "approved"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(toProduct);
}


export async function getPendingProducts(): Promise<Product[]> {
    const q = query(collection(db, "products"), where("status", "==", "pending"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(toProduct);
}

export async function getProductsBySeller(sellerId: string): Promise<Product[]> {
    const q = query(collection(db, "products"), where("sellerId", "==", sellerId));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(toProduct);
}
