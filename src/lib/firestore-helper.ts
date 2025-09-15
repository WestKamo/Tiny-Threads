// src/lib/firestore-helper.ts
import { collection, getDocs, query, where, DocumentData, QueryDocumentSnapshot, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { Product } from './types';

// A helper function to convert a Firestore document to a Product object
const toProduct = (doc: QueryDocumentSnapshot<DocumentData> | DocumentData): Product => {
    const data = doc.data();
    if (!data) throw new Error("Document data is empty");
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
        material: data.material,
        color: data.color,
        style: data.style,
        additionalFeatures: data.additionalFeatures,
    } as Product;
}

export async function getApprovedProducts(): Promise<Product[]> {
    const q = query(collection(db, "products"), where("status", "==", "approved"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(toProduct);
}

export async function getProductById(productId: string): Promise<Product | null> {
    const productRef = doc(db, 'products', productId);
    const productSnap = await getDoc(productRef);

    if (productSnap.exists()) {
        return toProduct(productSnap);
    } else {
        return null;
    }
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
