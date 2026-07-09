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
        setIsCallEnded(false);
        navigate("/");
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