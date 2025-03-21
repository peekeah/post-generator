import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface UploadButtonProps {
  className?: string
}

export function UploadButton({ className }: UploadButtonProps) {
  return (
    <Button asChild className={className}>
      <Link href="/upload">
        <Upload className="mr-2 h-4 w-4" />
        Upload PDF
      </Link>
    </Button>
  )
}

