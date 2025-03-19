"use client"

import { useEffect, useState } from "react"
import { Clock, Gauge, Globe, Lightbulb, Palette, Target, Zap } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: <Globe className="h-6 w-6 text-primary" />,
    title: "Multi-Platform Support",
    description: "Create optimized posts for Twitter, LinkedIn, Instagram, Facebook, and more.",
  },
  {
    icon: <Target className="h-6 w-6 text-primary" />,
    title: "Audience Targeting",
    description: "Tailor content to specific demographics and interests for maximum engagement.",
  },
  {
    icon: <Palette className="h-6 w-6 text-primary" />,
    title: "Tone Customization",
    description: "Choose from professional, casual, humorous, or inspirational tones.",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: "Smart Suggestions",
    description: "Get real-time AI recommendations as you type to improve your content.",
  },
  {
    icon: <Clock className="h-6 w-6 text-primary" />,
    title: "Scheduling Tools",
    description: "Plan and schedule your posts for optimal posting times.",
  },
  {
    icon: <Gauge className="h-6 w-6 text-primary" />,
    title: "Performance Analytics",
    description: "Track engagement and optimize your content strategy with detailed insights.",
  },
]

export function FeatureSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm">
              <Zap className="mr-1 h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium">Powerful Features</span>
            </div>
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Everything You Need to Create Engaging Content
            </h2>
            <p className="text-muted-foreground md:text-lg">
              Our AI-powered platform offers a comprehensive suite of tools to help you create, optimize, and manage
              your social media presence.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border bg-card transition-all hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

