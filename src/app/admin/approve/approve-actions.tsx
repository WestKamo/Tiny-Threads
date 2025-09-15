// src/app/admin/approve/approve-actions.tsx
'use client';

import { Button } from "@/components/ui/button";
import { approveProduct, rejectProduct } from "./actions";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ApproveActions({ productId }: { productId: string }) {
    const [isPending, startTransition] = useTransition();
    const { toast } = useToast();

    const handleApprove = () => {
        startTransition(async () => {
            const result = await approveProduct(productId);
            if (result.success) {
                toast({ title: "Product Approved" });
            } else {
                toast({ title: "Error", description: result.error, variant: 'destructive' });
            }
        });
    }

    const handleReject = () => {
        startTransition(async () => {
            const result = await rejectProduct(productId);
             if (result.success) {
                toast({ title: "Product Rejected", variant: 'destructive' });
            } else {
                toast({ title: "Error", description: result.error, variant: 'destructive' });
            }
        });
    }

    return (
        <>
            <Button onClick={handleApprove} disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Approve
            </Button>
            <Button variant="destructive" onClick={handleReject} disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reject
            </Button>
        </>
    )
}
