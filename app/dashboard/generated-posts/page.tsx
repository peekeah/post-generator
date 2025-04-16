"use client"

import { useEffect, useState } from "react"
import { Copy, Edit, MoreHorizontal, Trash2, Grid, List } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import axios from "axios"
import { getIcon, mappings, Platform } from "@/lib/constants"
import { timeAgo } from "@/lib/utils"

export interface Post {
  id: string;
  platform: Platform;
  message: string; // Original user input
  wordLimit: number;
  tone: "PROFESSIONAL" | "CASUAL" | "HUMOROUS" | "INSPIRATIONAL" | "EDUCATIONAL";
  generatedContent: string; // AI-generated post
  createdAt: Date; // Timestamp of creation
}

const GeneratedPosts = () => {
  const [viewMode, setViewMode] = useState("grid")
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = () => {
    axios.get("/api/posts")
      .then(res => {
        setPosts(res?.data?.data)
      })
  }

  useEffect(() => {
    fetchPosts();
  }, [])

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const handleDelete = (id: string) => {
    axios.delete("/api/posts/", {
      data: { id }
    }).then(fetchPosts)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center w-full">

        <h2 className="text-3xl font-bold tracking-tight">Generated Posts</h2>
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
        {posts?.length ?
          posts.map((post) => (
            <Card key={post.id} className="overflow-hidden transition-all duration-200 hover:shadow-md">
              <CardHeader className="p-4 pb-0 flex flex-row justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 scale-75 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
                    {getIcon(post?.platform)}
                  </span>
                  <span className="text-sm font-medium capitalize">{mappings.get(post.platform)}</span>
                  <span className="text-xs text-muted-foreground">{timeAgo(post.createdAt)}</span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleCopy(post.generatedContent)}>
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
                <p className="text-sm">{post?.generatedContent}</p>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between">
                <span className="text-xs px-2 py-1 rounded-full bg-muted capitalize">{mappings.get(post.tone)}</span>
                <Button variant="ghost" size="sm" onClick={() => handleCopy(post.generatedContent)}>
                  <Copy className="h-3 w-3 mr-1" /> Copy
                </Button>
              </CardFooter>
            </Card>
          )) : null}
      </div>
    </div>
  )
}

export default GeneratedPosts;
