import { atom } from "recoil";

const IsMutedAtom = atom({
    key: "IsMutedAtom",
    default: false
    }
)

const IsVideoOnAtom = atom({
    key: "IsVideoOnAtom",
    default: false
    }
)

const IsCallEnded = atom({
    key: "IsCallEnded",
    default: false
})

export {IsMutedAtom , IsVideoOnAtom , IsCallEnded};