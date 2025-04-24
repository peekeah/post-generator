"use client"

import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { useContext } from "react"
import { SubscriptionContext } from "@/context/subscription"
import { TestModeMessage } from "@/components/test-mode-dilogue"

export default function Subscriptions() {
  const { subscription } = useContext(SubscriptionContext);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground mt-2">Select the perfect plan for your social media needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <Card className="border-muted transition-all duration-300 hover:shadow-md">
          <CardHeader>
            <CardTitle>Free</CardTitle>
            <CardDescription>For personal use</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">₹0</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>5 posts per month</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Basic tones</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Standard response time</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Current Plan
            </Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="border-primary shadow-lg relative transition-all duration-300 hover:shadow-xl">
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium rounded-bl-lg rounded-tr-lg">
            Popular
          </div>
          <CardHeader>
            <CardTitle>Pro</CardTitle>
            <CardDescription>For professionals</CardDescription>
            <div className="mt-4">
              <span className="text-3xl font-bold">₹150</span>
              <span className="text-muted-foreground">/month</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>30 posts per month</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>All tones available</span>
              </li>
              <li className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                <span>Faster response time</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <TestModeMessage
              triggerButton={
                <Button className="w-full">Upgrade to Pro</Button>
              }
            />
          </CardFooter>
        </Card>

      </div>

      <div className="mt-12 bg-muted/50 p-6 rounded-lg">
        <h3 className="text-lg font-medium">Current Usage</h3>
        <div className="mt-4">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Posts Generated</span>
            <span className="text-sm font-medium">{subscription.totalUsage}/{subscription.postLimit}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="bg-primary h-full w-1/3 rounded-full"></div>
          </div>
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div>
            <p className="text-sm font-medium">Billing Cycle</p>
            <p className="text-sm text-muted-foreground">Renew on {subscription.nextBillingDate}</p>
          </div>
          <TestModeMessage
            triggerButton={
              <Button variant="outline" size="sm">
                Manage Billing
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}
