"use client"

import { Sparkles } from "lucide-react"
import axios from "axios";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { useState } from "react"
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function DashboardPage() {

  const [platform, setPlatform] = useState("linkedin")
  const [wordLimit, setWordLimit] = useState([15])
  const [message, setMessage] = useState("");
  const [tone, setTone] = useState("professional")
  const [isGenerating, setIsGenerating] = useState(false)

  const router = useRouter();

  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const res = await axios.post("/api/posts", {
        platform,
        message,
        wordLimit: wordLimit?.[0],
        tone,
      });

      if (res?.data?.status) {
        toast({
          description: "Successfully generated caption"
        })
        router.push("/dashboard/generated-posts")
      } else {
        throw new Error()
      }

    } catch (err) {
      toast({
        variant: "destructive",
        description: "Error while generating caption"
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-lg border-muted bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Create AI-Generated Social Media Post</CardTitle>
          <CardDescription>
            Select your platform, enter your topic, and our AI will generate the perfect post for you.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Platform</label>
            <Tabs defaultValue="linkedin" value={platform} onValueChange={setPlatform} className="w-full">
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
                <TabsTrigger value="instagram">Instagram</TabsTrigger>
                <TabsTrigger value="facebook">Facebook</TabsTrigger>
                <TabsTrigger value="twitter">Twitter</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium">
              Topic/Message
            </label>
            <Textarea
              id="topic"
              placeholder="Enter the topic or message you want to create a post about..."
              className="min-h-[120px] resize-none"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Tone</label>
            <div className="grid grid-cols-5 gap-2">
              {["professional", "casual", "humorous", "inspirational", "educational"].map((t) => (
                <Button
                  key={t}
                  type="button"
                  variant={tone === t ? "default" : "outline"}
                  onClick={() => setTone(t)}
                  className="capitalize"
                >
                  {t}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-sm font-medium">Word Limit</label>
              <span className="text-sm text-muted-foreground">{wordLimit[0]} words</span>
            </div>
            <Slider
              defaultValue={[15]}
              max={60}
              step={5}
              value={wordLimit}
              onValueChange={setWordLimit}
              className="py-4"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full py-6 text-lg group transition-all duration-300 hover:shadow-md"
            onClick={handleGenerate}
            disabled={isGenerating}
          >
            <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
            {isGenerating ? "Generating..." : "Generate Post"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

