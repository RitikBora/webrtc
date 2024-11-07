import { atom } from "recoil";

const isMutedAtom = atom({
    key: "isMutedAtom",
    default: false
    }
)

const IsVideoOnAtom = atom({
    key: "IsVideoOnAtom",
    default: false
    }
)

export {isMutedAtom , IsVideoOnAtom};