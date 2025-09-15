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

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="text-balance text-muted-foreground">
            Create an account to start selling and shopping.
          </p>
        </div>
        <Card>
          <CardHeader>
              <div className="flex items-center justify-center mb-4">
                  <TeddyBear className="h-12 w-12 text-primary-foreground fill-primary" />
              </div>
              <CardTitle>Create an Account</CardTitle>
              <CardDescription>Join the Tiny Threads community.</CardDescription>
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
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" required />
              </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input id="confirm-password" type="password" required />
              </div>
          </CardContent>
          <CardFooter className="flex flex-col">
              <Button className="w-full">Create Account</Button>
              <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                  Sign in
              </Link>
              </div>
        </CardFooter>
        </Card>
      </div>
    </div>
  )
}
