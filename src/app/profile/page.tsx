// src/app/profile/page.tsx
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { products } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Edit, LogOut, Package, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        // Redirect if not logged in (client-side check)
        if (localStorage.getItem('isLoggedIn') !== 'true') {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        window.dispatchEvent(new Event('storage')); // Notify header to update
        router.push('/');
    }

    if (!isMounted) {
        return null; // or a loading spinner
    }


    const userListedItems = products.slice(0, 2);
    const getImageById = (id: string) => PlaceHolderImages.find((img) => img.id === id);


  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
            <aside className="w-full md:w-1/3 lg:w-1/4">
                <Card>
                    <CardHeader className="items-center text-center">
                        <Avatar className="h-24 w-24 mb-4">
                            <AvatarImage src="https://picsum.photos/seed/user-avatar/200/200" alt="User Name" data-ai-hint="person portrait" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <CardTitle>Alex Doe</CardTitle>
                        <CardDescription>Joined in 2024</CardDescription>
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
                    {userListedItems.length > 0 ? userListedItems.map(product => {
                        const image = getImageById(product.imageId);
                        return (
                             <Card key={product.id}>
                                <CardContent className="flex gap-4 p-4 items-center">
                                    <div className="relative h-20 w-20 rounded-md overflow-hidden">
                                        {image && <Image src={image.imageUrl} alt={product.name} fill className="object-cover" data-ai-hint={image.imageHint} />}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{product.name}</h3>
                                        <p className="font-semibold text-lg">R{product.price.toFixed(2)}</p>
                                        <p className="text-sm text-muted-foreground">Status: <span className="text-green-600 font-medium">Active</span></p>
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
