"use client"

import { useState, useEffect, ChangeEventHandler } from "react"
import { motion } from "framer-motion"
import { Save } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import axios from "axios"
import clsx from "clsx"
import { toast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    bio: "",
    image: ""
  })

  useEffect(() => {
    setMounted(true)
    axios.get("/api/profile")
      .then(({ data }) => {
        setFormData(() => ({
          name: data?.data?.name || "",
          email: data?.data?.email || "",
          company: data?.data?.company || "",
          bio: data?.data?.bio || "",
          image: data?.data?.image || ""
        }))
      })
  }, [])

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const onFileUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      const payload = new FormData();
      const file = e.target.files?.[0]
      if (!file) return;
      payload.append("avatar", file)
      const res = await axios.post("/api/profile/avatar", payload, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
      if (res?.data?.status) {
        toast({
          description: res?.data?.data
        })
      }
    } catch (err) {
      console.log("error:", err)
      toast({
        variant: "destructive",
        description: "Error while uploading image"
      })
    }
  }

  const onSubmit = async () => {
    try {
      const res = await axios.post("/api/profile", formData)

    } catch (err) {
      console.log(err, "Error while updating data")
      alert(JSON.stringify(err))
    }
  }

  if (!mounted) return null

  return (
    <div className="space-y-8 max-w-4xl m-auto">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Manage your profile information and account settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4 sm:flex-row sm:items-start sm:space-x-4 sm:space-y-0">
              <Avatar
                className="h-20 w-20"
              >
                <AvatarImage src={formData.image} />
                <AvatarFallback className="text-2xl">JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-lg font-medium">Profile Picture</h3>
                <div className="flex flex-wrap gap-2">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <label
                      htmlFor="avatar"
                      className={
                        clsx("cursor-pointer",
                          buttonVariants({ variant: "default", size: "sm" }),
                        )
                      }
                    >
                      Upload
                    </label>
                    <input
                      type="file"
                      id="avatar"
                      name="filename"
                      className="hidden"
                      onChange={onFileUpload}
                    >
                    </input>
                    <input className="hidden" type="submit" />
                  </form>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue="John Doe"
                  value={formData.name}
                  onChange={onInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue="john@example.com"
                  value={formData.email}
                  onChange={onInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue="Acme Inc"
                  value={formData.company}
                  onChange={onInputChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                name="bio"
                defaultValue="Digital marketing specialist with a passion for AI-driven content."
                value={formData.bio}
                onChange={onInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onSubmit}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}

