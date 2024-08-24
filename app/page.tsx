"use client"
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState("")
  const [result, setResult] = useState(null)

  const router = useRouter();

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
        if(data?.status){
          setResult(() => data?.data?.slice(1))
        }
        setLoading(() => false)
      })).catch(err => {
        console.log("err", err);
      })
  }

  return (
    <div className="w-7/12 m-auto h-full mt-[7%] px-7 py-9 rounded-md bg-gray-500 grow-0 space-y-5">
      <div className="flex flex-col gap-5 items-end">
        <Textarea 
          placeholder="Please enter the topic"
          className="h-[120px] text-black"
          value={content} 
          onChange={(e) => setContent(e.target.value)}
        />
        <Button 
          onClick={onSubmit} 
          disabled={loading}
        >Generate post</Button>
      </div>
      <div className="h-36">
        {
          loading ? <Spinner /> :
            (result ? result : null)
        }
      </div>
      <div className="flex justify-end">
        <Button onClick={() => router.push("history")}>View history</Button>
      </div>
    </div>
  )
}
