import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/AllChats.css'
import profilePic from '../Images/TempProfilepic.jpeg'
import { toast } from 'react-toastify';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001/');
export function SimpleChat({ user, setUser, setChattingWith, chattingWith }) {
    const navigate = useNavigate();
    const [wantToChatWith, setWantToChatWith] = useState()





    const handleChattingWithChange = (event) => {
        setWantToChatWith(event.target.value)
    };

    const handleChatLinkClick = (name) => {
        if (name == chattingWith) {
            toast.error("You are already chatting with " + name + "")
            return
        }
        setChattingWith(name);
        socket.emit('join room', name);

    };


    const handleSubmit = (event) => {
        event.preventDefault();
        setChattingWith(wantToChatWith)
        socket.emit('join room', wantToChatWith);

        toast.success("Added a new Friend " + wantToChatWith + ". Start by writing a message");
        setWantToChatWith('');
    }
    const [messagesArray, setMessagesArray] = useState([]);
    const database = getDatabase();

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
            }
        });

        return () => {

            off(messagesRef);
        };
    }, [database]);

    const filteredChatsWith = messagesArray.filter(message =>
        message.name.toLowerCase() === user.toLowerCase() || message.recipient.toLowerCase() === user.toLowerCase()
    );


    const uniqueConversations = new Map();

    filteredChatsWith.forEach(message => {
        const isMyMessage = message.name.toLowerCase() === user.toLowerCase();
        const key = isMyMessage ? message.recipient.toLowerCase() : message.name.toLowerCase();
        let content = message.message;

        if (content.length > 30) {
            content = content.substring(0, 30) + '...';
        } else if (content.length == 0) {
            content = "File"
        }

        if (!uniqueConversations.has(key) || message.sentDate > uniqueConversations.get(key).sentDate) {
            uniqueConversations.set(key, { name: key, message: content, sentDate: message.sentDate });
        }
    });

    const latestMessages = Array.from(uniqueConversations.values());
    latestMessages.sort((a, b) => {
        const dateA = new Date(a.sentDate);
        const dateB = new Date(b.sentDate);

        const nameA = a.name.charAt(0).toUpperCase() + a.name.slice(1);
        const nameB = b.name.charAt(0).toUpperCase() + b.name.slice(1);

        a.name = nameA;
        b.name = nameB;

        return dateB - dateA;
    });

    function handleLogout() {
        setUser(null);
        navigate('/')
    }

    return (
        <div className='AllChatsContainer2'>
            <div className='AllChatsContainer'>
                <div>
                    <div className="uniqueChatBoxContainer noLinkStyling" >
                        <div className="ProfilePicAllChats">
                            <img className="ProfilePicSmall" src={profilePic} alt="" />
                        </div>
                        <div className="noLinkStyling" >
                            <div className="singleChatLinkContainer">
                                Your Username: {user}
                            </div>
                            <button
                                onClick={handleLogout}
                                style={{
                                    backgroundColor: '#dc3545',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                }}
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {latestMessages.map((message, index) => (
                        <div className="uniqueChatBoxContainer" onClick={() => handleChatLinkClick(message.name)}>
                            <div className="ProfilePicAllChats">
                                <img className="ProfilePicSmall" src={profilePic} alt="" />
                            </div>
                            <div className="noLinkStyling" >
                                <div className="singleChatLinkContainer" key={index}>
                                    <strong>{message.name} </strong> <div className="newestMessage">{message.message}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <hr />
                    <form className='addNewFriend' onSubmit={handleSubmit}>
                        <div className="subtitle">Add a new Friend</div>
                        <input
                            className='NewFriendInput'
                            placeholder='Their user...'
                            type="text"
                            id="name"
                            name="name"
                            value={wantToChatWith}
                            onChange={handleChattingWithChange}
                            required={true}
                        />
                    </form>
                    <div
                        className="buttonContainer"
                    >
                        <input
                            type='submit'
                            onClick={handleSubmit}
                            className={`newChatButton ${!wantToChatWith ? 'disabledButton' : ''}`}
                            disabled={!wantToChatWith}
                            value={"+"}
                        >

                        </input>
                    </div>
                </div>
            </div>
        </div>
    );
}
