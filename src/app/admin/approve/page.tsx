import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";


export default function ApprovePage() {
  const getImageById = (id: string) => PlaceHolderImages.find((img) => img.id === id);
  // In a real app, you'd check for admin authentication here
  const isAdmin = true; 

  if (!isAdmin) {
      return (
          <div className="container mx-auto px-4 py-8 md:py-12 text-center">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Access Denied</h1>
                <p className="text-muted-foreground mb-8">You must be an administrator to view this page.</p>
                <Button asChild>
                    <Link href="/login">Login as Admin</Link>
                </Button>
            </div>
      )
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Approve Listings</h1>
            <Button asChild variant="outline">
                <Link href="/admin/dashboard">View Dashboard</Link>
            </Button>
        </div>
        <div className="grid gap-6">
            {products.slice(0,3).map(product => {
                const image = getImageById(product.imageId)
                return (
                    <Card key={product.id}>
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>Listed by {product.seller}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <div className="relative h-24 w-24 rounded-md overflow-hidden">
                                {image && <Image src={image.imageUrl} alt={product.name} fill className="object-cover" />}
                            </div>
                            <div>
                                <p className="font-semibold">R{product.price.toFixed(2)}</p>
                                <Badge variant="outline">{product.category}</Badge>
                                <p className="text-sm text-muted-foreground mt-2">Awaiting Approval</p>
                            </div>
                        </CardContent>
                        <CardFooter className="flex gap-2">
                            <Button>Approve</Button>
                            <Button variant="destructive">Reject</Button>
                        </CardFooter>
                    </Card>
                )
            })}
        </div>
    </div>
  )
}
