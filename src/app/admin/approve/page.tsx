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


export default function ApprovePage() {
  const getImageById = (id: string) => PlaceHolderImages.find((img) => img.id === id);
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-8">Approve Listings</h1>
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
                                <p className="font-semibold">${product.price.toFixed(2)}</p>
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
