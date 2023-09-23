import { useState } from "react"
import { SimpleChat } from "./SimpleChat"
import { PersonalChat } from "./PersonalChat"
import { Route, Router, Routes } from "react-router-dom"
import { SimpleAccount } from "./SimpleAccount"


export function WholeChat() {

    const [user, setUser] = useState("")
    const [chattingwith, setChattingwith] = useState("")
    return (
        <>
            <SimpleChat />
            <PersonalChat />
        </>
    )
}