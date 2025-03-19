"use client"

import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Alex Johnson",
    role: "Marketing Director",
    company: "TechCorp",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "PostAI has completely transformed our social media strategy. We're saving hours each week and seeing a 40% increase in engagement.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Content Creator",
    company: "CreativeMinds",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "As a solo creator, I was struggling to maintain a consistent posting schedule. PostAI helps me create quality content in minutes instead of hours.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Social Media Manager",
    company: "GrowthLabs",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "The platform's ability to adapt to different social media platforms is impressive. Our LinkedIn posts now feel professional while our Twitter content is punchy and engaging.",
    rating: 4,
  },
  {
    name: "Emily Rodriguez",
    role: "Startup Founder",
    company: "InnovateCo",
    avatar: "/placeholder.svg?height=40&width=40",
    content:
      "PostAI has been a game-changer for our small team. We can now maintain an active social media presence without hiring additional staff.",
    rating: 5,
  },
]

export function TestimonialSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Loved by Content Creators</h2>
            <p className="text-muted-foreground md:text-lg">
              See what our users have to say about how PostAI has transformed their social media strategy.
            </p>
          </motion.div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-muted"}`}
                      />
                    ))}
                  </div>
                  <p className="mb-6 text-sm">{testimonial.content}</p>
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

