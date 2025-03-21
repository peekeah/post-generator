"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, MessageSquarePlus, Share2, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import {
  Bar,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  Tooltip,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chart, ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

const engagementData = [
  { day: "Mon", engagement: 120 },
  { day: "Tue", engagement: 220 },
  { day: "Wed", engagement: 190 },
  { day: "Thu", engagement: 275 },
  { day: "Fri", engagement: 310 },
  { day: "Sat", engagement: 190 },
  { day: "Sun", engagement: 150 },
]

const platformData = [
  { name: "Twitter", posts: 12, engagement: 840 },
  { name: "LinkedIn", posts: 8, engagement: 1200 },
  { name: "Instagram", posts: 6, engagement: 950 },
  { name: "Facebook", posts: 4, engagement: 620 },
]

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#205781] dark:text-[#F6F8D5]">Dashboard</h2>
          <p className="text-[#4F959D] dark:text-[#98D2C0]">
            Welcome back! Here's an overview of your social media performance.
          </p>
        </div>
        <Button className="w-full md:w-auto bg-[#205781] hover:bg-[#205781]/90 text-white">
          <MessageSquarePlus className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#205781] dark:text-[#F6F8D5]">Total Posts</CardTitle>
              <div className="h-8 w-8 rounded-full bg-[#98D2C0]/30 flex items-center justify-center dark:bg-[#4F959D]/30">
                <MessageSquarePlus className="h-4 w-4 text-[#205781] dark:text-[#98D2C0]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#205781] dark:text-[#F6F8D5]">30</div>
              <p className="text-xs text-[#4F959D] dark:text-[#98D2C0]">
                <span className="text-green-600 dark:text-green-400">+12%</span> from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#205781] dark:text-[#F6F8D5]">Engagement</CardTitle>
              <div className="h-8 w-8 rounded-full bg-[#98D2C0]/30 flex items-center justify-center dark:bg-[#4F959D]/30">
                <TrendingUp className="h-4 w-4 text-[#205781] dark:text-[#98D2C0]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#205781] dark:text-[#F6F8D5]">3,610</div>
              <p className="text-xs text-[#4F959D] dark:text-[#98D2C0]">
                <span className="text-green-600 dark:text-green-400">+18%</span> from last month
              </p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#205781] dark:text-[#F6F8D5]">Platforms</CardTitle>
              <div className="h-8 w-8 rounded-full bg-[#98D2C0]/30 flex items-center justify-center dark:bg-[#4F959D]/30">
                <Share2 className="h-4 w-4 text-[#205781] dark:text-[#98D2C0]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#205781] dark:text-[#F6F8D5]">4</div>
              <p className="text-xs text-[#4F959D] dark:text-[#98D2C0]">Twitter, LinkedIn, Instagram, Facebook</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card className="gradient-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-[#205781] dark:text-[#F6F8D5]">Next Post</CardTitle>
              <div className="h-8 w-8 rounded-full bg-[#98D2C0]/30 flex items-center justify-center dark:bg-[#4F959D]/30">
                <Calendar className="h-4 w-4 text-[#205781] dark:text-[#98D2C0]" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-[#205781] dark:text-[#F6F8D5]">Today</div>
              <p className="text-xs text-[#4F959D] dark:text-[#98D2C0]">
                <Clock className="mr-1 inline h-3 w-3" /> 2:30 PM
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList className="bg-[#F6F8D5]/70 dark:bg-[#205781]/50">
          <TabsTrigger
            value="engagement"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#205781]/80 text-[#205781] dark:text-[#F6F8D5]"
          >
            Engagement
          </TabsTrigger>
          <TabsTrigger
            value="platforms"
            className="data-[state=active]:bg-white dark:data-[state=active]:bg-[#205781]/80 text-[#205781] dark:text-[#F6F8D5]"
          >
            Platforms
          </TabsTrigger>
        </TabsList>
        <TabsContent value="engagement" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="gradient-card">
              <CardHeader className="gradient-header">
                <CardTitle className="text-[#205781] dark:text-[#F6F8D5]">Weekly Engagement</CardTitle>
                <CardDescription className="text-[#4F959D] dark:text-[#98D2C0]">
                  Your post engagement over the past week
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 pt-6">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={engagementData}>
                        <XAxis dataKey="day" stroke="#4F959D" />
                        <YAxis stroke="#4F959D" />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <ChartTooltipContent>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="font-medium text-[#205781]">Day</div>
                                    <div className="text-[#4F959D]">{payload[0].payload.day}</div>
                                    <div className="font-medium text-[#205781]">Engagement</div>
                                    <div className="text-[#4F959D]">{payload[0].value}</div>
                                  </div>
                                </ChartTooltipContent>
                              )
                            }
                            return null
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="engagement"
                          stroke="#205781"
                          strokeWidth={2}
                          activeDot={{ r: 8, fill: "#4F959D" }}
                        />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
        <TabsContent value="platforms" className="space-y-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Card className="gradient-card">
              <CardHeader className="gradient-header">
                <CardTitle className="text-[#205781] dark:text-[#F6F8D5]">Platform Performance</CardTitle>
                <CardDescription className="text-[#4F959D] dark:text-[#98D2C0]">
                  Engagement across different social media platforms
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80 pt-6">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={platformData}>
                        <XAxis dataKey="name" stroke="#4F959D" />
                        <YAxis stroke="#4F959D" />
                        <Tooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <ChartTooltipContent>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="font-medium text-[#205781]">Platform</div>
                                    <div className="text-[#4F959D]">{payload[0].payload.name}</div>
                                    <div className="font-medium text-[#205781]">Posts</div>
                                    <div className="text-[#4F959D]">{payload[0].payload.posts}</div>
                                    <div className="font-medium text-[#205781]">Engagement</div>
                                    <div className="text-[#4F959D]">{payload[0].value}</div>
                                  </div>
                                </ChartTooltipContent>
                              )
                            }
                            return null
                          }}
                        />
                        <Bar dataKey="engagement" fill="#4F959D" radius={[4, 4, 0, 0]} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

