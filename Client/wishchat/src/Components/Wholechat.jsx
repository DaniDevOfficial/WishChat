import { useState } from "react"
import { SimpleChat } from "./SimpleChat"
import { PersonalChat } from "./PersonalChat"
import '../Styles/WholeChat.css'

export function WholeChat({ me }) {

    const [user, setUser] = useState(me || "dani");
    const [chattingWith, setChattingWith] = useState()

    return (
        <>
            <div className="WholeChatContainer">
                <div className="SimpleChatContainer">
                    <SimpleChat user={user} setChattingWith={setChattingWith} />

                </div>
                <div className="PersonalChatContainer">
                    <PersonalChat user={user} chattingWith={chattingWith} />

                </div>
            </div>
        </>
    )
}