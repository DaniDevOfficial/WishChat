import React, { useState, useEffect, useRef } from 'react';
import { getDatabase, ref, push, onValue, off } from 'firebase/database';
import "../Styles/UniqueChat.css"
import profilepic from '../Images/TempProfilepic.jpeg'
import { FaPaperPlane } from 'react-icons/fa';

export function PersonalChat({ user, chattingWith }) {
    const userName = user;
    const chattingwith = chattingWith;

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView();
        }
    }, [chattingwith]);

    const [formData, setFormData] = useState({
        name: `${userName}`,
        message: '',
        recipient: `${chattingwith}`,
        sentDate: null,
    });

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
            const sentDate = new Date().toLocaleString();
            const messagesRef = ref(database, 'messages');

            push(messagesRef, { ...formData, message: trimmedMessage, sentDate });

            setFormData({
                name: `${userName}`,
                message: '',
                recipient: `${chattingwith}`,
                sentDate: null,
            });

            // Scroll to the bottom after adding a new message
            if (bottomRef.current) {
                bottomRef.current.scrollIntoView({});
            }
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

                // Scroll to the bottom when messages update
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

    return (
        <div className=''>
            <div className="TopPart">
                <div className="TopLeft">
                    <img className="ProfilePic" src={profilepic} alt="" />
                    <div className="ChatName">
                        <div className="ChatNameName">
                            {chattingWith}
                        </div>
                        <div className="ChatNameStatus">
                            { /** Here for Staus but later */}
                        </div>
                    </div>
                </div>
            </div>
            <div className=''>

                <div className="MessagesContainer">
                    <h2>Messages:</h2>
                    {filteredmessages.map((message, index) => (
                        <div className="SingleMessageContainer" key={index}>
                            <div className={`SingleMessage ${message.name === userName ? 'mymessage' : 'notmymessage'}`}>
                                <div className="SingleMessageName">
                                    {message.name}
                                    ({message.sentDate}):
                                </div>
                                <div className="SingleMessageDate">

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
        </div>
    );
}
