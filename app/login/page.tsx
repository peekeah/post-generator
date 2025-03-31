"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Facebook, Loader2, LucideSparkles } from "lucide-react"
import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { signIn } from "next-auth/react"

export default function LoginPage() {
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    signIn("google")
    /*
    e.preventDefault()
    setIsLoading(true)
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = "/dashboard"
    }, 1500)
    */
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Abstract background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <div className="flex justify-center mb-2">
              <div className="flex items-center gap-2 text-blue-600">
                <LucideSparkles className="h-6 w-6" />
                <span className="text-xl font-bold">PostAI</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
            <CardDescription>Sign in to your account to continue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="bg-white hover:bg-gray-50"
                  onClick={() => signIn("google")}
                >
                  <FcGoogle className="mr-2 h-4 w-4" />
                  Google
                </Button>
                <Button variant="outline" className="bg-[#1877F2] text-white hover:bg-[#0C63D4]">
                  <Facebook className="mr-2 h-4 w-4" />
                  Facebook
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <form onSubmit={handleLogin}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="hello@example.com" required />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs text-blue-600 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input id="password" type="password" required />
                  </div>
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="#" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

