"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Bot, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <section className="relative overflow-hidden py-20 md:py-32" >
      {/* Animated gradient background */}
      < div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" >
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      < div className="container relative z-10" >
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center" >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }
          } transition={{ duration: 0.5 }}>
            <div className="mb-4 inline-flex items-center rounded-full border bg-background px-3 py-1 text-sm" >
              <Sparkles className="mr-1 h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium" > AI - Powered Social Media Posts </span>
            </div>
          </motion.div>

          < motion.h1
            className="mb-6 text-4xl font-bold leading-tight tracking-tighter md:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Generate Engaging{" "}
            <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent" >
              Social Media Posts
            </span>{" "}
            with AI
          </motion.h1>

          < motion.p
            className="mb-8 max-w-[42rem] text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Create platform - optimized content in seconds.Save time, increase engagement, and grow your audience with
            our AI - powered post generator.
          </motion.p>

          < motion.div
            className="flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link href="/dashboard" >
              <Button size="lg" className="h-12 px-8" >
                Start Creating < ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            < Link href="#features" >
              <Button variant="outline" size="lg" className="h-12 px-8" >
                See Features
              </Button>
            </Link>
          </motion.div>
        </div>

        < motion.div
          className="mt-16 rounded-lg border bg-card p-4 shadow-lg"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="flex items-center gap-2 border-b pb-4" >
            <Bot className="h-5 w-5 text-primary" />
            <span className="font-medium" > AI Post Generator </span>
          </div>
          < div className="space-y-4 p-4" >
            <div className="space-y-2" >
              <div className="flex items-center justify-between" >
                <span className="text-sm font-medium" > Platform </span>
                < span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary" >
                  LinkedIn
                </span>
              </div>
              < div className="h-10 rounded-md border bg-muted/50 px-3 py-2 text-sm" > Product launch announcement </div>
            </div>
            < div className="space-y-2" >
              <span className="text-sm font-medium" > Generated Post </span>
              < div className="rounded-md border bg-card p-3 text-sm" >
                <p>
                  🚀 <span className="font-medium" > Exciting News! </span> We're thrilled to announce the launch of our
                  new product that will revolutionize how you work.
                </p>
                < p className="mt-2" >
                  After months of development and feedback from our amazing beta testers, we're ready to share it with
                  the world.
                </p>
                < p className="mt-2" >✨ Key features include: </p>
                < ul className="mt-1 list-inside list-disc" >
                  <li>AI - powered workflow automation </li>
                  < li > Seamless integration with your existing tools </li>
                  < li > Real - time collaboration capabilities </li>
                </ul>
                < p className="mt-2" > Early adopters are seeing a 40 % increase in productivity! </p>
                < p className="mt-2" > Learn more at the link below.Who's excited to try it out? 👇</p>
              </div>
            </div>
            < div className="flex justify-end gap-2" >
              <Button variant="outline" size="sm" >
                Regenerate
              </Button>
              < Button size="sm" > Copy Post </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

