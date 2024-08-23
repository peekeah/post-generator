"use client"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    const content = "dog";

    const config = {
      method: "POST",
      "Content-Type": "application/json",
      body: JSON.stringify({
        content
      })
    }

    // const uri = "api/sheet";
    const uri = "api/openai"

    fetch(uri, config)
      .then(res => res.json().then(data => console.log("dd", data)))
    })
}
