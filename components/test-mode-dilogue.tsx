import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode } from "react"

export const TestModeMessage = ({ triggerButton }: { triggerButton: ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>Payment gatway integration is under progress</DialogTitle>
          <DialogDescription className="py-3">
            Payment gateway integration is currently in progress. In the meantime, users can generate up to 5 posts per month for free.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
