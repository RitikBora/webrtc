"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { useRecoilState } from "recoil"
import { IsCallEnded } from "../../recoil/atoms"
import { useRouter } from "next/navigation"

export const EndCallPopup = () =>
{
    const [isCallEnded , setIsCallEnded] = useRecoilState(IsCallEnded);
    const router = useRouter();

    const goToHomepage = () =>
    {
        setIsCallEnded(false);
        router.push("/");
    }
    return(
        <Dialog open={isCallEnded} onOpenChange={setIsCallEnded}>
        <DialogContent className="dark sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Call ended</DialogTitle>
            <DialogDescription>
              Your video call has been terminated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={goToHomepage}>
              Go to homepage
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}