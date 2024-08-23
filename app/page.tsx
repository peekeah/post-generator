"use client"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react"

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState("")
  const [result, setResult] = useState(null)

  const onSubmit = () => {
    setLoading(() => true)
    const config = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        content
      })
    }

    const uri = "api/openai"

    fetch(uri, config)
      .then(res => res.json().then(data => {
        console.log("dd", data)
        setResult(() => data?.data?.slice(1))
        setLoading(() => false)
      }))
  }

  return (
    <div className="bg-primary text-white">
      <div className="w-7/12 m-auto flex-col gap-10 h-full min-h-screen">
        <div className="text-white text-2xl p-5 text-center text-white">Social media post generator</div>
        <div className="h-full mt-[10%] px-7 py-9 rounded-md bg-gray-500 grow-0 space-y-5">
          <div className="flex flex-col gap-5 items-end">
            <Textarea className="h-[120px] text-black" value={content} onChange={(e) => setContent(e.target.value)}/>
            <Button onClick={onSubmit}>Generate post</Button>
          </div>
          <div className="h-36">
            {
              loading ? <Spinner /> :
                (result ? result : null)
            }
          </div>
        </div>
      </div>
    </div>
  )
}
