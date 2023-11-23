import { useState, useEffect } from "react"
import { SimpleChat } from "./SimpleChat"
import { PersonalChat } from "./PersonalChat"
import '../Styles/WholeChat.css'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";

export function WholeChat({ me }) {
    const navigate = useNavigate(); 
    const [user, setUser] = useState(me || "Dani");
    const [chattingWith, setChattingWith] = useState("")

    useEffect(() => {
        if (!user) {
          toast.error("User not authenticated. Redirecting to login.");
          navigate("/");
        }
      }, []);
    return (
        <>
            <div className="WholeChatContainer">
                <div className="SimpleChatContainer">
                    <SimpleChat user={user} setUser={setUser} setChattingWith={setChattingWith} chattingWith={chattingWith}  />

                </div>
                
                <div className="PersonalChatContainer">
                    <PersonalChat user={user} chattingWith={chattingWith} />

                </div>
            </div>
        </>
    )
}