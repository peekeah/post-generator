"use client"

import { useEffect, useState } from "react"
import { Check, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function PricingSection() {
  const [mounted, setMounted] = useState(false)
  const [annual, setAnnual] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="pricing" className="py-20">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm">
              <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium">Simple Pricing</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Choose the Perfect Plan for Your Needs
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Whether you're an individual creator or a growing business, we have a plan that fits your requirements.
            </p>
          </motion.div>

          <div className="mt-8 flex items-center justify-center space-x-4">
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
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Save 20%</span>
            </span>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="h-full border">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription className="text-base">
                  Perfect for getting started with AI-powered posts.
                </CardDescription>
                <div className="mt-4 flex items-baseline text-foreground">
                  <span className="text-4xl font-bold">$0</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
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
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="h-full border bg-primary/5 shadow-md">
              <CardHeader>
                <div className="mb-2 flex items-center justify-between">
                  <CardTitle className="text-2xl">Premium</CardTitle>
                  <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">Popular</span>
                </div>
                <CardDescription className="text-base">For professionals and growing businesses.</CardDescription>
                <div className="mt-4 flex items-baseline text-foreground">
                  <span className="text-4xl font-bold">${annual ? "19" : "24"}</span>
                  <span className="ml-1 text-muted-foreground">/{annual ? "month (billed annually)" : "month"}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
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
                  <li className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-primary" />
                    <span>Unlimited post history</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Upgrade to Premium</Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

