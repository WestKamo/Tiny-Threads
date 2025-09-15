
'use client';

import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product, children, ...props }: { product: Product } & React.ComponentProps<typeof Button>) {
    const { addToCart } = useCart();

    return (
        <Button onClick={() => addToCart(product)} {...props}>
          {children || (
            <>
                <ShoppingBag className="mr-2 h-4 w-4" />
                Add to Cart
            </>
          )}
        </Button>
    )
}
