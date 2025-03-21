"use client"

import { useState, useEffect } from "react"
import { Bot, Copy, Loader2, RefreshCw, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function GeneratorPage() {
  const [mounted, setMounted] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [platform, setPlatform] = useState("linkedin")
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("professional")
  const [wordLimit, setWordLimit] = useState([100])
  const [generatedPost, setGeneratedPost] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
    // Simulate suggestions as user types
    if (topic.length > 3) {
      const demoSuggestions = [
        "Consider adding industry statistics to support your point",
        "Try mentioning how this relates to current trends",
        "A question at the end could boost engagement",
      ]
      setSuggestions(demoSuggestions)
    } else {
      setSuggestions([])
    }
  }, [topic])

  // Simulate post generation
  const generatePost = () => {
    if (!topic) return

    setGenerating(true)
    setGeneratedPost("")

    // Simulate API call delay
    setTimeout(() => {
      const posts = {
        linkedin: `🚀 Excited to share some thoughts on ${topic}!\n\nIn today's rapidly evolving landscape, it's crucial for professionals to stay ahead of the curve. Based on my experience, here are three key insights that can transform your approach:\n\n1️⃣ Focus on continuous learning and adaptation\n2️⃣ Build meaningful connections across your industry\n3️⃣ Embrace innovation while maintaining core values\n\nWhat strategies have worked for you? I'd love to hear your perspectives in the comments below! #ProfessionalDevelopment #${topic.replace(/\s+/g, "")} #IndustryInsights`,
        twitter: `Just had a breakthrough moment thinking about ${topic}! 🔥\n\nKey takeaway: innovation happens at the intersection of disciplines.\n\nWho else is exploring this space? Drop your thoughts below! #${topic.replace(/\s+/g, "")}`,
        instagram: `✨ ${topic.toUpperCase()} INSIGHTS ✨\n\nSwipe through for my top 3 takeaways from exploring this fascinating topic!\n\nSave this post for later reference and tag someone who needs to see this!\n\n#${topic.replace(/\s+/g, "")} #ContentCreator #InspoDaily`,
      }

      setGeneratedPost(posts[platform as keyof typeof posts])
      setGenerating(false)
    }, 2000)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPost)
  }

  if (!mounted) return null

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-[#205781] dark:text-[#F6F8D5]">Post Generator</h2>
        <p className="text-[#4F959D] dark:text-[#98D2C0]">Create engaging social media content with AI assistance.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="gradient-card">
            <CardHeader className="gradient-header">
              <CardTitle className="text-[#205781] dark:text-[#F6F8D5]">Create Your Post</CardTitle>
              <CardDescription className="text-[#4F959D] dark:text-[#98D2C0]">
                Fill in the details below to generate your social media post.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="platform" className="text-[#205781] dark:text-[#F6F8D5]">
                  Platform
                </Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger
                    id="platform"
                    className="border-[#98D2C0] focus:ring-[#205781] text-[#205781] dark:text-[#F6F8D5] dark:border-[#4F959D]"
                  >
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="linkedin">LinkedIn</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topic" className="text-[#205781] dark:text-[#F6F8D5]">
                  Topic or Key Message
                </Label>
                <Textarea
                  id="topic"
                  placeholder="What would you like to post about?"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="min-h-[100px] resize-none border-[#98D2C0] focus-visible:ring-[#205781] text-[#205781] dark:text-[#F6F8D5] dark:border-[#4F959D]"
                />
                {suggestions.length > 0 && (
                  <div className="mt-2 space-y-2">
                    <p className="text-xs font-medium text-[#4F959D] dark:text-[#98D2C0]">AI Suggestions:</p>
                    <div className="flex flex-wrap gap-2">
                      {suggestions.map((suggestion, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs bg-[#F6F8D5] text-[#205781] hover:bg-[#F6F8D5]/80 border-[#98D2C0] dark:bg-[#205781]/20 dark:text-[#F6F8D5] dark:border-[#4F959D] dark:hover:bg-[#205781]/30"
                        >
                          <Sparkles className="mr-1 h-3 w-3 text-[#4F959D]" />
                          {suggestion}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone" className="text-[#205781] dark:text-[#F6F8D5]">
                  Tone
                </Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger
                    id="tone"
                    className="border-[#98D2C0] focus:ring-[#205781] text-[#205781] dark:text-[#F6F8D5] dark:border-[#4F959D]"
                  >
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="humorous">Humorous</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="word-limit" className="text-[#205781] dark:text-[#F6F8D5]">
                    Word Limit
                  </Label>
                  <span className="text-sm text-[#4F959D] dark:text-[#98D2C0]">{wordLimit[0]} words</span>
                </div>
                <Slider
                  id="word-limit"
                  min={50}
                  max={300}
                  step={10}
                  value={wordLimit}
                  onValueChange={setWordLimit}
                  className="[&>[role=slider]]:bg-[#205781] [&>[role=slider]]:border-[#205781] [&>span]:bg-[#205781] dark:[&>[role=slider]]:bg-[#4F959D] dark:[&>[role=slider]]:border-[#4F959D] dark:[&>span]:bg-[#4F959D]"
                />
              </div>
            </CardContent>
            <CardFooter className="gradient-footer">
              <Button
                onClick={generatePost}
                disabled={!topic || generating}
                className="w-full bg-[#205781] hover:bg-[#205781]/90 text-white dark:bg-[#4F959D] dark:hover:bg-[#4F959D]/90"
              >
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Generate Post
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Card className="h-full gradient-card">
            <CardHeader className="gradient-header">
              <CardTitle className="text-[#205781] dark:text-[#F6F8D5]">Generated Post</CardTitle>
              <CardDescription className="text-[#4F959D] dark:text-[#98D2C0]">
                Your AI-generated social media post will appear here.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="preview" className="h-full">
                <TabsList className="w-full rounded-none border-b border-[#98D2C0]/30 dark:border-[#4F959D]/30 bg-[#F6F8D5]/70 dark:bg-[#205781]/50">
                  <TabsTrigger
                    value="preview"
                    className="rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-[#205781]/80 text-[#205781] dark:text-[#F6F8D5] flex-1"
                  >
                    Preview
                  </TabsTrigger>
                  <TabsTrigger
                    value="edit"
                    className="rounded-none data-[state=active]:bg-white dark:data-[state=active]:bg-[#205781]/80 text-[#205781] dark:text-[#F6F8D5] flex-1"
                  >
                    Edit
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="h-full p-6">
                  {generating ? (
                    <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed border-[#98D2C0]/30 dark:border-[#4F959D]/30">
                      <div className="flex flex-col items-center text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-[#205781] dark:text-[#98D2C0]" />
                        <p className="mt-2 text-sm text-[#4F959D] dark:text-[#98D2C0]">Generating your post...</p>
                      </div>
                    </div>
                  ) : generatedPost ? (
                    <div className="rounded-md border border-[#98D2C0]/30 dark:border-[#4F959D]/30 bg-white dark:bg-[#205781]/20 p-4">
                      <div className="mb-4 flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="text-xs bg-[#F6F8D5] text-[#205781] border-[#98D2C0] dark:bg-[#205781]/30 dark:text-[#F6F8D5] dark:border-[#4F959D]"
                        >
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="text-xs bg-[#F6F8D5] text-[#205781] border-[#98D2C0] dark:bg-[#205781]/30 dark:text-[#F6F8D5] dark:border-[#4F959D]"
                        >
                          {tone.charAt(0).toUpperCase() + tone.slice(1)}
                        </Badge>
                      </div>
                      <div className="whitespace-pre-line text-sm text-[#205781] dark:text-[#F6F8D5]">
                        {generatedPost}
                      </div>
                    </div>
                  ) : (
                    <div className="flex h-[300px] items-center justify-center rounded-md border border-dashed border-[#98D2C0]/30 dark:border-[#4F959D]/30">
                      <div className="flex flex-col items-center text-center">
                        <Bot className="h-8 w-8 text-[#205781] dark:text-[#98D2C0]" />
                        <p className="mt-2 text-sm text-[#4F959D] dark:text-[#98D2C0]">
                          Fill in the details and click "Generate Post" to create your content.
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
                <TabsContent value="edit" className="p-6">
                  <Textarea
                    value={generatedPost}
                    onChange={(e) => setGeneratedPost(e.target.value)}
                    placeholder="Your generated post will appear here for editing."
                    className="min-h-[300px] border-[#98D2C0] focus-visible:ring-[#205781] text-[#205781] dark:text-[#F6F8D5] dark:border-[#4F959D]"
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between gap-2 gradient-footer">
              <Button
                variant="outline"
                onClick={() => generatePost()}
                disabled={!topic || generating}
                className="w-1/2 border-[#98D2C0] hover:bg-[#98D2C0]/20 text-[#205781] dark:border-[#4F959D] dark:text-[#F6F8D5] dark:hover:bg-[#4F959D]/20"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button
                onClick={copyToClipboard}
                disabled={!generatedPost || generating}
                className="w-1/2 bg-[#205781] hover:bg-[#205781]/90 text-white dark:bg-[#4F959D] dark:hover:bg-[#4F959D]/90"
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy Post
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

