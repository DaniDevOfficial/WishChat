import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';
import "../Styles/UniqueChat.css"
import profilepic from '../Images/TempProfilepic.jpeg'
import { FaPaperPlane } from 'react-icons/fa';

export function PersonalChat({ user, chattingWith }) {
    const userName = user;
    let chattingwith = chattingWith;

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView();
        }
    }, [chattingwith]);

    console.log(chattingWith)

    const initialFormData = {
        name: userName,
        message: '',
        recipient: chattingwith,
        sentDate: null,
    };
    const [formData, setFormData] = useState(initialFormData);
    useEffect(() => {
        setFormData({ ...formData, recipient: chattingwith });
    }, [chattingwith]);
    console.log(formData)
    const [messagesArray, setMessagesArray] = useState([]);
    const database = getDatabase();
    const bottomRef = useRef(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedMessage = formData.message.trim();

        if (trimmedMessage !== "") {
            const now = new Date();
            const year = now.getFullYear();
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const day = now.getDate().toString().padStart(2, '0');
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');

            const sentDate = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
            const messagesRef = ref(database, 'messages');

            push(messagesRef, { ...formData, message: trimmedMessage, sentDate });

            setFormData({
                name: `${userName}`,
                message: '',
                recipient: `${chattingwith}`,
                sentDate: null,
            });

            setTimeout(() => {
                bottomRef.current.scrollIntoView({});
            }, 10);
        } else {
        }
    };


    useEffect(() => {
        const messagesRef = ref(database, 'messages');
        onValue(messagesRef, (snapshot) => {
            if (snapshot.exists()) {
                const messages = [];
                snapshot.forEach((childSnapshot) => {
                    const message = childSnapshot.val();
                    messages.push(message);
                });
                setMessagesArray(messages);

                if (bottomRef.current) {
                    bottomRef.current.scrollIntoView({});
                }
            }
        });

        return () => {
            off(messagesRef);
        };
    }, [database]);

    const filteredmessages = messagesArray.filter(
        message => (message.name === userName && message.recipient === chattingwith) || (message.name === chattingwith && message.recipient === userName)
    );
    const formatTimestamp = (timestamp) => {
        
        const date = new Date(timestamp);
        const hour = date.getHours().toString().padStart(2, '0'); // Get hours with leading zero if needed
        const minute = date.getMinutes().toString().padStart(2, '0'); // Get minutes with leading zero if needed
        return `${hour}:${minute}`;
    };

    return (
        <div className=''>
            {chattingWith ? (
                <div className="TopPart">
                    <div className="TopLeft">
                        <img className="ProfilePic" src={profilepic} alt="" />
                        <div className="ChatName">
                            <div className="ChatNameName">
                                {chattingWith}
                            </div>
                            <div className="ChatNameStatus">
                                { /** Here for Status but later */}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="NoChattingWith">
                    Start Chatting by adding new friends or continue chatting with them
                </div>
            )}

            {chattingWith && (
                <div className=''>
                    <div className="MessagesContainer">
                        <h2>Messages:</h2>
                        {filteredmessages.map((message, index) => (
                            <div className="SingleMessageContainer" key={index}>
                                <div className={`SingleMessage ${message.name === userName ? 'mymessage' : 'notmymessage'}`}>
                                    <div className="SingleMessageName">
                                        {message.name}
                                        :
                                        <div className="SingleMessageDate">
                                            {formatTimestamp(message.sentDate)}
                                        </div>
                                    </div>
                                    <div className="SingleMessageDate">
                                        {/* Add date content here */}
                                    </div>
                                    <div className="SingleMessageMessage">
                                        {message.message}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div ref={bottomRef}></div>

                    <div className="BottomPart">
                        <form className="newMessageForm" onSubmit={handleSubmit}>
                            <input
                                className="messageInput"
                                name="message"
                                placeholder='New Message ...'
                                value={formData.message}
                                onChange={handleInputChange}
                                required={true}
                                maxLength={100}
                            />
                            <button className='sendMessage' onClick={handleSubmit}>
                                <FaPaperPlane className='icon' />
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
}
