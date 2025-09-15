'use client';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TeddyBear } from "@/components/icons"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    localStorage.setItem('isLoggedIn', 'true');
    window.dispatchEvent(new Event('storage')); // Notify header to update
    router.push('/profile');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <motion.h1 
              className="text-3xl font-bold"
              initial={{ opacity: 0, letterSpacing: "-0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0em" }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Login
            </motion.h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Card>
            <form onSubmit={handleLogin}>
              <CardHeader>
                  <div className="flex items-center justify-center mb-4">
                      <TeddyBear className="h-12 w-12 text-primary-foreground fill-primary" />
                  </div>
                  <CardTitle>Welcome Back!</CardTitle>
                  <CardDescription>Sign in to continue to Tiny Threads.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                      />
                  </div>
                  <div className="grid gap-2">
                      <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                          href="#"
                          className="ml-auto inline-block text-sm underline"
                      >
                          Forgot your password?
                      </Link>
                      </div>
                      <Input id="password" type="password" required />
                  </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full">
                    <Button className="w-full">Sign in</Button>
                  </motion.div>
                  <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="underline">
                      Sign up
                  </Link>
                  </div>
            </CardFooter>
            </form>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
