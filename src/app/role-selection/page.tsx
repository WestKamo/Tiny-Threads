'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ShoppingBag, Store } from "lucide-react";
import { motion } from "framer-motion";

export default function RoleSelectionPage() {
  const router = useRouter();

  const handleRoleSelection = (role: 'buyer' | 'seller') => {
    localStorage.setItem('userRole', role);
    if (role === 'buyer') {
      router.push('/');
    } else {
      router.push('/sell');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-2">How do you want to start?</h1>
        <p className="text-muted-foreground mb-8">You can always switch roles later from your profile.</p>
        <div className="flex flex-col md:flex-row gap-8">
          <motion.div whileHover={{ y: -5 }} className="w-full">
            <Card
              className="w-full md:w-64 cursor-pointer hover:shadow-primary/20 hover:shadow-lg transition-shadow"
              onClick={() => handleRoleSelection('buyer')}
            >
              <CardHeader>
                <CardTitle className="flex flex-col items-center gap-4">
                  <ShoppingBag className="h-12 w-12 text-primary" />
                  <span>I'm a Buyer</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Browse and buy adorable, gently-used baby clothes.</p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="w-full">
            <Card
              className="w-full md:w-64 cursor-pointer hover:shadow-accent/40 hover:shadow-lg transition-shadow"
              onClick={() => handleRoleSelection('seller')}
            >
              <CardHeader>
                <CardTitle className="flex flex-col items-center gap-4">
                  <Store className="h-12 w-12 text-accent-foreground" />
                   <span>I'm a Seller</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>List your baby's outgrown clothes and earn some cash.</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
