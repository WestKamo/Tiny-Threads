import { getPendingProducts } from "@/lib/firestore-helper";
import { ApproveActions } from "./approve-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import { Button } from "@/components/ui/button";


export default async function ApprovePage() {
  const pendingProducts = await getPendingProducts();
  const getImageById = (id: string) => PlaceHolderImages.find((img) => img.id === id);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Approve Listings</h1>
            <Button asChild variant="outline">
                <Link href="/admin/dashboard">View Dashboard</Link>
            </Button>
        </div>
        <div className="grid gap-6">
            {pendingProducts.length > 0 ? pendingProducts.map(product => {
                const image = getImageById(product.imageId);
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
                           <ApproveActions productId={product.id} />
                        </CardFooter>
                    </Card>
                )
            })
            : (
                <Card>
                    <CardContent className="p-8 text-center">
                        <p className="text-lg text-muted-foreground">No pending products to approve.</p>
                    </CardContent>
                </Card>
            )
        }
        </div>
    </div>
  )
}

