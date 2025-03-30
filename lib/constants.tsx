import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export type Platform = "LINKEDIN" | "INSTAGRAM" | "TWITTER" | "FACEBOOK";

export const getIcon = (platform: Platform) => {
  if (platform === "FACEBOOK") {
    return <Facebook />;
  } else if (platform === "TWITTER") {
    return <Twitter />;
  } else if (platform === "INSTAGRAM") {
    return <Instagram />
  } else {
    return <Linkedin />
  }
}

export const mappings = new Map([
  ["LINKEDIN", "LinkedIn"],
  ["INSTAGRAM", "Instagram"],
  ["TWITTER", "Twitter"],
  ["FACEBOOK", "Facebook"],
  ["PROFESSIONAL", "Professional"],
  ["CASUAL", "Casual"],
  ["HUMOROUS", "Humorous"],
  ["INSPIRATIONAL", "Inspirational"],
  ["EDUCATIONAL", "Educational"]
])


