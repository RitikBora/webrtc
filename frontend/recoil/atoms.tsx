import { atom } from "recoil";

const IsMicOnAtom = atom({
    key: "IsMicOnAtom",
    default: true
    }
)

const IsVideoOnAtom = atom({
    key: "IsVideoOnAtom",
    default: true
    }
)

const IsCallEnded = atom({
    key: "IsCallEnded",
    default: false
})

const VideoRefAtom = atom<MediaStream | null>({
    key: "VideoRefAtom",
    default: null

})

export {IsMicOnAtom , IsVideoOnAtom , IsCallEnded , VideoRefAtom};