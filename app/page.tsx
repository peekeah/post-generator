"use client"
import { useEffect } from "react"

export default function Home() {
  useEffect(() => {
    const config = {
      method: "GET",
      "Content-Type": "application/json"
    }

    fetch("api/sheet", config)
      .then(res => res.json().then(data => console.log("dd", data)))
    })
}
