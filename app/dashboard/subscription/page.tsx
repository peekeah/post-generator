"use client"

import { useState, useEffect } from "react"
import { Check, CreditCard, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

export default function SubscriptionPage() {
  const [mounted, setMounted] = useState(false)
  const [annual, setAnnual] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Subscription</h2>
        <p className="text-muted-foreground">Manage your subscription plan and billing information.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Choose Your Plan</CardTitle>
              <CardDescription>Select the plan that best fits your needs.</CardDescription>
              <div className="mt-4 flex items-center space-x-4">
                <span className={`text-sm ${!annual ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  Monthly
                </span>
                <div className="flex items-center space-x-2">
                  <Switch id="billing-toggle" checked={annual} onCheckedChange={setAnnual} />
                  <Label htmlFor="billing-toggle" className="sr-only">
                    Toggle billing period
                  </Label>
                </div>
                <span className={`text-sm ${annual ? "font-medium text-foreground" : "text-muted-foreground"}`}>
                  Annual{" "}
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    Save 20%
                  </span>
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card className="border-2 border-muted">
                  <CardHeader>
                    <CardTitle className="text-xl">Free</CardTitle>
                    <CardDescription>Perfect for getting started with AI-powered posts.</CardDescription>
                    <div className="mt-4 flex items-baseline text-foreground">
                      <span className="text-3xl font-bold">$0</span>
                      <span className="ml-1 text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>10 AI-generated posts per month</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Basic platform support</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Standard tone options</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Post history (7 days)</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Current Plan
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="border-2 border-primary">
                  <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                      <CardTitle className="text-xl">Premium</CardTitle>
                      <Badge className="bg-primary text-primary-foreground">Recommended</Badge>
                    </div>
                    <CardDescription>For professionals and growing businesses.</CardDescription>
                    <div className="mt-4 flex items-baseline text-foreground">
                      <span className="text-3xl font-bold">${annual ? "19" : "24"}</span>
                      <span className="ml-1 text-muted-foreground">
                        /{annual ? "month (billed annually)" : "month"}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-sm">
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Unlimited AI-generated posts</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>All platform integrations</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Advanced tone customization</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Post scheduling</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Analytics dashboard</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="mr-2 h-4 w-4 text-primary" />
                        <span>Priority support</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Upgrade to Premium
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>Manage your payment methods and billing details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Current Plan</h3>
                <div className="rounded-md border p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Free Plan</p>
                      <p className="text-xs text-muted-foreground">10 posts per month</p>
                    </div>
                    <Badge variant="outline">Active</Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Payment Method</h3>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Add Payment Method
                </Button>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Billing History</h3>
                <p className="text-xs text-muted-foreground">No billing history available on the Free plan.</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


