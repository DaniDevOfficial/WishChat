import { useState } from "react"
import { SimpleChat } from "./SimpleChat"
import { PersonalChat } from "./PersonalChat"


export function WholeChat({me}) {

    const [user, setUser] = useState(me || "dani");
    const [chattingWith, setChattingWith] = useState()
    
    return (
        <>
            <SimpleChat user={user} setChattingWith={setChattingWith}/>
            {chattingWith} + asd
            <PersonalChat user={user} chattingWith={chattingWith}/>
        </>
    )
}