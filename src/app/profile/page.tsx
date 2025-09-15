'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, LogOut, Package, Star, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getProductsBySeller } from "@/lib/firestore-helper";
import type { Product } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
    const router = useRouter();
    const { user, loading } = useAuth();
    const [userListedItems, setUserListedItems] = useState<Product[]>([]);
    const [isFetchingListings, setIsFetchingListings] = useState(true);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

     useEffect(() => {
        if (user) {
            const fetchListings = async () => {
                setIsFetchingListings(true);
                const products = await getProductsBySeller(user.uid);
                setUserListedItems(products);
                setIsFetchingListings(false);
            };
            fetchListings();
        }
    }, [user]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    }

    if (loading || !user) {
        return (
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }

    const getStatusVariant = (status: string | undefined): "default" | "secondary" | "destructive" | "outline" => {
        switch (status) {
            case 'approved': return 'default';
            case 'pending': return 'secondary';
            case 'rejected': return 'destructive';
            default: return 'outline';
        }
    }


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/3 lg:w-1/4">
                <Card>
                    <CardHeader className="items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src={user.photoURL || "https://picsum.photos/seed/user-avatar/200/200"} alt={user.displayName || 'User'} data-ai-hint="person portrait" />
                            <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <CardTitle>{user.displayName || user.email}</CardTitle>
                        <CardDescription>Joined in {user.metadata.creationTime ? new Date(user.metadata.creationTime).getFullYear() : 'this year'}</CardDescription>
                         <div className="flex items-center gap-1 text-yellow-500 pt-2">
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5 fill-current" />
                            <Star className="h-5 w-5" />
                            <span className="text-sm text-muted-foreground ml-1">(4.0)</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <Button variant="outline">
                            <Edit className="mr-2 h-4 w-4"/>
                            Edit Profile
                        </Button>
                         <Button onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4"/>
                            Logout
                        </Button>
                    </CardContent>
                </Card>
            </aside>
            <main className="flex-1">
                 <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Your Listings</h1>
                 <div className="grid gap-6">
                    {isFetchingListings ? (
                        <div className="flex items-center justify-center py-16">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : userListedItems.length > 0 ? userListedItems.map(product => {
                        return (
                             <Card key={product.id}>
                                <CardContent className="flex gap-4 p-4 items-center">
                                    <div className="relative h-20 w-20 rounded-md overflow-hidden">
                                        <Image src={product.imageUrl} alt={product.name} fill className="object-cover" data-ai-hint={`${product.category} ${product.color}`} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p className="font-semibold text-lg">R{product.price.toFixed(2)}</p>
                                        <Badge variant={getStatusVariant(product.status)} className="capitalize">{product.status || 'Unknown'}</Badge>
                                    </div>
                                    <Button variant="outline" size="sm">Edit Listing</Button>
                                </CardContent>
                            </Card>
                        )
                    })
                    : (
                        <div className="text-center py-16 border-2 border-dashed rounded-lg flex flex-col items-center">
                            <Package className="h-10 w-10 mb-4 text-muted-foreground"/>
                          <h2 className="text-2xl font-semibold">You haven't listed any items yet.</h2>
                          <p className="mt-2 text-muted-foreground">
                            Start selling your gently used baby clothes today!
                          </p>
                          <Button asChild className="mt-4">
                              <Link href="/sell">List an Item</Link>
                          </Button>
                        </div>
                    )}
                 </div>
            </main>
        </div>
    </div>
  )
}
