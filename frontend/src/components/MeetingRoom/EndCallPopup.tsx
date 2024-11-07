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
import { IsCallEnded } from "../../../recoil/atoms"
import { useNavigate } from "react-router-dom"

export const EndCallPopup = () =>
{
    const [isCallEnded , setIsCallEnded] = useRecoilState(IsCallEnded);
    const navigate = useNavigate();

    const goToHomepage = () =>
    {
        navigate("/");
    }
    return(
        <Dialog open={isCallEnded} onOpenChange={setIsCallEnded}>
        <DialogContent className="sm:max-w-[425px] bg-[#fef6e4] text-[#001858]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Call Ended</DialogTitle>
            <DialogDescription className="text-[#172c66]">
              Your video call has been terminated.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={goToHomepage} className="bg-[#f582ae] text-[#001858] hover:bg-[#f582ae]/80">
              Go to Homepage
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}