import { useEffect, useRef, useState } from "react"
import { UserTemplate } from "./UserTemplate"

export function Sender() {
    return (
        <div>
            <UserTemplate usertype="sender"/>
        </div>
    )
}