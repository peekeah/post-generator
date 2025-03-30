"use client"

import { useState } from "react"
import { Copy, Edit, MoreHorizontal, Trash2, Grid, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample data for generated posts
const samplePosts = [
  {
    id: 1,
    platform: "linkedin",
    content:
      "Excited to announce our new AI-powered feature that helps businesses streamline their workflow and increase productivity by 30%. #AI #Productivity",
    date: "2 days ago",
    tone: "professional",
  },
  {
    id: 2,
    platform: "instagram",
    content:
      "✨ New day, new possibilities! Our team has been working hard to bring you the best experience. Stay tuned for exciting updates coming your way soon! #NewFeatures #ComingSoon",
    date: "1 week ago",
    tone: "inspirational",
  },
  {
    id: 3,
    platform: "twitter",
    content:
      "Just launched our beta version! Early users are reporting a 40% increase in engagement. Want to try it out? Sign up for early access at our website.",
    date: "2 weeks ago",
    tone: "casual",
  },
  {
    id: 4,
    platform: "facebook",
    content:
      "Did you know that 78% of businesses struggle with social media content creation? Our new AI tool solves this problem in just a few clicks. Learn more in our latest blog post!",
    date: "3 weeks ago",
    tone: "educational",
  },
]

const GeneratedPosts = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [posts, setPosts] = useState(samplePosts)

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleDelete = (id: number) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return "in"
      case "instagram":
        return "ig"
      case "facebook":
        return "fb"
      case "twitter":
        return "tw"
      default:
        return ""
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Your Generated Posts</h2>
        <div className="flex items-center gap-2">
          <Tabs defaultValue="grid" value={viewMode} onValueChange={setViewMode}>
            <TabsList>
              <TabsTrigger value="grid">
                <Grid className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
            <CardHeader className="p-4 pb-0 flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                  {getPlatformIcon(post.platform)}
                </span>
                <span className="text-sm font-medium capitalize">{post.platform}</span>
                <span className="text-xs text-muted-foreground">{post.date}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleCopy(post.content)}>
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleDelete(post.id)}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-sm">{post.content}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 flex justify-between">
              <span className="text-xs px-2 py-1 rounded-full bg-muted capitalize">{post.tone}</span>
              <Button variant="ghost" size="sm" onClick={() => handleCopy(post.content)}>
                <Copy className="h-3 w-3 mr-1" /> Copy
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default GeneratedPosts;
