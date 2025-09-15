
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

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <Card>
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
              <Button className="w-full">Sign in</Button>
              <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline">
                  Sign up
              </Link>
              </div>
        </CardFooter>
        </Card>
      </div>
    </div>
  )
}
